import { NextResponse } from 'next/server';
import { Issuer, generators, BaseClient } from 'openid-client';

let client: BaseClient | null = null;

// Initialize OpenID Client
async function initializeClient(): Promise<BaseClient> {
  if (!client) {
    const issuer = await Issuer.discover('https://cognito-idp.us-east-1.amazonaws.com/us-east-1_FxkGX8MQH');
    client = new issuer.Client({
      client_id: process.env.COGNITO_CLIENT_ID as string,
      client_secret: process.env.COGNITO_CLIENT_SECRET as string,
      redirect_uris: [`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`],
      response_types: ['code'],
    });
  }
  return client;
}

export async function GET(): Promise<NextResponse> {
  const client = await initializeClient();
  const state = generators.state();
  const nonce = generators.nonce();

  // You should store state and nonce securely, e.g., in cookies or a database

  const authUrl = client.authorizationUrl({
    scope: 'openid profile email',
    state,
    nonce,
  });

  return NextResponse.redirect(authUrl);
}
