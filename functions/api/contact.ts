import { EMAIL_REGEX, verifyDomainHasMx } from '../../server/emailValidation';

interface Env {
  RESEND_API_KEY?: string;
  NOTIFICATION_EMAIL?: string;
}

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  website?: string;
  formRenderedAt?: number;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const payload = (await context.request.json()) as ContactPayload;

    // 1. Anti-bot honeypot trap: if website field is filled, silently return 200
    if (payload.website && payload.website.trim() !== '') {
      return new Response(JSON.stringify({ success: true, fake: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Submission timing gate (<1200ms = bot)
    if (payload.formRenderedAt && Date.now() - payload.formRenderedAt < 1200) {
      return new Response(JSON.stringify({ error: 'Form submitted too quickly.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3. Validation
    if (!context.env.RESEND_API_KEY) {
      throw new Error('Resend API key not configured.');
    }

    if (!context.env.NOTIFICATION_EMAIL) {
      throw new Error('Notification email not configured.');
    }

    if (!payload.name || payload.name.trim().length < 2 || payload.name.length > 100) {
      return new Response(JSON.stringify({ error: 'Invalid name provided.' }), { status: 400 });
    }

    if (!payload.email || !EMAIL_REGEX.test(payload.email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address.' }), { status: 400 });
    }

    if (!payload.message || payload.message.trim().length < 5 || payload.message.length > 2000) {
      return new Response(JSON.stringify({ error: 'Message must be between 5 and 2000 characters.' }), { status: 400 });
    }

    // 4. DoH MX verification
    const domain = payload.email.split('@')[1];
    const hasMx = await verifyDomainHasMx(domain);
    if (!hasMx) {
      return new Response(JSON.stringify({ error: 'Email domain does not accept incoming emails.' }), { status: 400 });
    }

    // 5. Send via Resend (if API key configured)
    if (context.env.RESEND_API_KEY) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Contact Form <onboarding@resend.dev>',
          to: context.env.NOTIFICATION_EMAIL,
          reply_to: payload.email,
          subject: `New message from ${payload.name}`,
          text: `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`,
        }),
      });

      if (!resendRes.ok) {
        return new Response(JSON.stringify({ error: 'Failed to send notification.' }), { status: 502 });
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Internal server error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
