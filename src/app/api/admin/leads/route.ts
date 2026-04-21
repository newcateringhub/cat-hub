import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const authHeader = searchParams.get('auth');
    
    // This pulls from your .env.local 'manav123' or defaults to 'admin123'
    const correctPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (!authHeader || authHeader !== correctPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`SELECT * FROM leads ORDER BY created_at DESC`;
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Admin API Error:', error);
    return NextResponse.json({ error: 'Database Connection Failed' }, { status: 500 });
  }
}