import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.WEB3_API_KEY;

    if (!apiKey) {
      // In development or until the user configures their Web3Forms key
      console.log('Inquiry received (Development Mode):', { name, email, phone, message });
      return NextResponse.json({
        success: true,
        message: 'Message received! (Running in development mode without WEB3_API_KEY)',
      });
    }

    // Submit securely to Web3Forms from the server
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: apiKey,
        name,
        email,
        phone: phone || 'N/A',
        message,
        from_name: 'Ubed Khan Portfolio Inquiry',
        subject: `New Portfolio Message from ${name}`,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({
        success: true,
        message: 'Message delivered successfully!',
      });
    }

    return NextResponse.json(
      { success: false, message: data.message || 'Web3Forms submission failed.' },
      { status: 502 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
