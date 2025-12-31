import { NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabaseService';

export async function POST(request: Request) {
  try {
    const { name, phone, catalogueName } = await request.json();

    if (!name || !phone || !catalogueName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabaseService
      .from('leads')
      .insert({
        name: name,
        phone: phone,
        desired_catalogue: catalogueName,
      })
      .select();

    if (error) {
      console.error('Supabase error:', error.message);
      return NextResponse.json({ error: 'Error saving lead' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: data }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}