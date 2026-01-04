import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phone, catalogName } = await request.json();
    
    // This uses the environment variable Neon automatically adds to Vercel
    const sql = neon(process.env.DATABASE_URL!);
    
    // Create the table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        phone TEXT NOT NULL,
        catalog_name TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Save the phone number
    await sql`
      INSERT INTO leads (phone, catalog_name)
      VALUES (${phone}, ${catalogName});
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}