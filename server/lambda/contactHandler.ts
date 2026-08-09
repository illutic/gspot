export interface APIGatewayProxyEventV2 {
  body?: string;
  isBase64Encoded?: boolean;
  requestContext?: {
    http?: {
      method?: string;
    };
  };
}

export interface APIGatewayProxyResultV2 {
  statusCode: number;
  headers?: Record<string, string>;
  body?: string;
}

import { EMAIL_REGEX, verifyDomainHasMx } from '../emailValidation';

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  website?: string;
  formRenderedAt?: number;
}

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*', // Replace with your domain (e.g. 'https://your-domain.com') for extra security
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  // Support both API Gateway v2 (requestContext.http.method) and v1 (httpMethod)
  const method = (event.requestContext?.http?.method || (event as { httpMethod?: string }).httpMethod || '').toUpperCase();

  // Handle HTTP OPTIONS preflight request
  if (method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: '',
    };
  }

  try {
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body || '', 'base64').toString('utf-8')
      : event.body;

    const payload: ContactPayload = JSON.parse(rawBody || '{}');

    // 1. Anti-bot honeypot trap: if website field is filled, silently return 200
    if (payload.website && payload.website.trim() !== '') {
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: true, fake: true }),
      };
    }

    // 2. Submission timing gate (<1200ms = bot)
    if (payload.formRenderedAt && Date.now() - payload.formRenderedAt < 1200) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Form submitted too quickly.' }),
      };
    }

    // 3. Environment variable validation
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (!resendApiKey) {
      throw new Error('Resend API key not configured in process.env.RESEND_API_KEY.');
    }

    if (!notificationEmail) {
      throw new Error('Notification email not configured in process.env.NOTIFICATION_EMAIL.');
    }

    // 4. Payload validation
    if (!payload.name || payload.name.trim().length < 2 || payload.name.length > 100) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Invalid name provided.' }),
      };
    }

    if (!payload.email || !EMAIL_REGEX.test(payload.email)) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Invalid email address.' }),
      };
    }

    if (!payload.message || payload.message.trim().length < 5 || payload.message.length > 2000) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Message must be between 5 and 2000 characters.' }),
      };
    }

    // 5. DoH MX verification
    const domain = payload.email.split('@')[1];
    const hasMx = await verifyDomainHasMx(domain);
    if (!hasMx) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Email domain does not accept incoming emails.' }),
      };
    }

    // 6. Send email via Resend API
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Contact Form <onboarding@resend.dev>',
        to: notificationEmail,
        reply_to: payload.email,
        subject: `New message from ${payload.name}`,
        text: `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`,
      }),
    });

    if (!resendRes.ok) {
      return {
        statusCode: 502,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Failed to send notification.' }),
      };
    }

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('AWS Lambda execution error:', error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Internal server error.' }),
    };
  }
};
