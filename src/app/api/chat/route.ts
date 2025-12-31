import { createClient } from '@supabase/supabase-js';
import { createOpenAI } from '@ai-sdk/openai'; // New import
import { streamText } from 'ai'; // New import

// Load env variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const openaiKey = process.env.OPENAI_API_KEY!;

// Create new clients
const openai = createOpenAI({ apiKey: openaiKey });
const supabase = createClient(supabaseUrl, supabaseKey);

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastUserMessage = messages[messages.length - 1].content;

  // 1. Get an embedding for the user's question
  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: lastUserMessage,
  });
  const queryEmbedding = embeddingResponse.data[0].embedding;

  // 2. Query Supabase for relevant knowledge
  const { data: contextSections, error } = await supabase.rpc('match_knowledge', {
    query_embedding: queryEmbedding,
    match_threshold: 0.75,
    match_count: 3,
  });

  if (error) {
    console.error(error);
    return new Response("Error finding knowledge.", { status: 500 });
  }

  const context = contextSections
    .map((section: any) => `Context: ${section.content}`)
    .join('\n\n');

  // 3. Create the prompt for the AI
  const prompt = `
    You are a helpful customer support chatbot for "Catering Hub", a website that sells HoReCa (Hotels, Restaurants, Catering) utensils.
    Your tone is professional, friendly, and helpful.
    You will be provided with context from the knowledge base.
    Answer the user's question based *only* on the provided context.
    If the context does not contain the answer, politely say "I'm sorry, I don't have that information, but I can help with questions about our products."
    Do not make up information.
  `;

  // 4. Ask OpenAI for a streaming response (NEW AI SDK METHOD)
  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    system: prompt,
    messages: messages, // Pass the whole history
  });

  // 5. Return the new DataStreamResponse
  return result.toDataStreamResponse();
}