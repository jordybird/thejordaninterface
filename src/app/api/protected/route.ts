import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  const sessionToken = req.headers.get('cookie'); // Replace with actual session validation logic

  if (!sessionToken) {
    return NextResponse.redirect('/api/auth/login');
  }

  return NextResponse.json({ success: true, message: 'Welcome to the protected route!' });
}
