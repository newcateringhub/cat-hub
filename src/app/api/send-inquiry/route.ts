import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, message, items } = body;

    // 1. In a real production app, you would use a service like 'Resend' or 'SendGrid' here
    // For now, we will log the inquiry to the console for testing
    console.log('--- NEW INQUIRY RECEIVED ---');
    console.log(`From: ${name} (${email}) at ${company}`);
    console.log(`Message: ${message}`);
    console.log('Items Requested:', items.map((i: any) => i.name).join(', '));

    // 2. Simulate a database/email delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, message: 'Inquiry sent successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to send inquiry' }, { status: 500 });
  }
}