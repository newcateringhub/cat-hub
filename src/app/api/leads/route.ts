import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const authHeader = searchParams.get('auth');

    // 1. Ensure the password exactly matches (Case Sensitive)
    // Double check that you aren't using an Uppercase 'A' if you typed 'admin123'
    if (!authHeader || authHeader !== 'admin123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sql = neon(process.env.DATABASE_URL!);
    
    // 2. Fetch leads
    const data = await sql`SELECT * FROM leads ORDER BY created_at DESC`;
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Admin API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}