// Run this file ONCE with: npx tsx src/scripts/embed.ts
import { createClient } from '@supabase/supabase-js';
import { OpenAI } from 'openai';
import { knowledge } from './knowledge';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const openaiKey = process.env.OPENAI_API_KEY;

if (!supabaseUrl || !supabaseKey || !openaiKey) {
  throw new Error("Missing environment variables. Check .env.local");
}

const supabase = createClient(supabaseUrl, supabaseKey);
const openai = new OpenAI({ apiKey: openaiKey });

async function embedKnowledge() {
  console.log("Embedding knowledge... Make sure you've run the SQL setup in Supabase!");

  for (const item of knowledge) {
    console.log(`Embedding: "${item.question}"`);
    
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: item.question,
    });

    const embedding = embeddingResponse.data[0].embedding;

    const { data, error } = await supabase
      .from('knowledge_base')
      .insert({
        content: item.answer, // Store the ANSWER
        embedding: embedding, // Store the QUESTION's embedding
      });

    if (error) {
      console.error("Error inserting:", error.message);
    } else {
      console.log(`Successfully embedded.`);
    }
  }

  console.log("Embedding complete.");
}

embedKnowledge();