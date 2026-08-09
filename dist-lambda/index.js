var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server/lambda/contactHandler.ts
var contactHandler_exports = {};
__export(contactHandler_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(contactHandler_exports);

// server/emailValidation.ts
var EMAIL_REGEX = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/;
async function verifyDomainHasMx(domain) {
  try {
    const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`, {
      headers: { Accept: "application/dns-json" }
    });
    if (!res.ok) return true;
    const data = await res.json();
    return Boolean(data.Answer && data.Answer.length > 0);
  } catch {
    return true;
  }
}

// server/lambda/contactHandler.ts
var CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  // Replace with your domain (e.g. 'https://your-domain.com') for extra security
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};
var handler = async (event) => {
  const method = (event.requestContext?.http?.method || event.httpMethod || "").toUpperCase();
  if (method === "OPTIONS") {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: ""
    };
  }
  try {
    const rawBody = event.isBase64Encoded ? Buffer.from(event.body || "", "base64").toString("utf-8") : event.body;
    const payload = JSON.parse(rawBody || "{}");
    if (payload.website && payload.website.trim() !== "") {
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: true, fake: true })
      };
    }
    if (payload.formRenderedAt && Date.now() - payload.formRenderedAt < 1200) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: "Form submitted too quickly." })
      };
    }
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;
    if (!resendApiKey) {
      throw new Error("Resend API key not configured in process.env.RESEND_API_KEY.");
    }
    if (!notificationEmail) {
      throw new Error("Notification email not configured in process.env.NOTIFICATION_EMAIL.");
    }
    if (!payload.name || payload.name.trim().length < 2 || payload.name.length > 100) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: "Invalid name provided." })
      };
    }
    if (!payload.email || !EMAIL_REGEX.test(payload.email)) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: "Invalid email address." })
      };
    }
    if (!payload.message || payload.message.trim().length < 5 || payload.message.length > 2e3) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: "Message must be between 5 and 2000 characters." })
      };
    }
    const domain = payload.email.split("@")[1];
    const hasMx = await verifyDomainHasMx(domain);
    if (!hasMx) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: "Email domain does not accept incoming emails." })
      };
    }
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Contact Form <onboarding@resend.dev>",
        to: notificationEmail,
        reply_to: payload.email,
        subject: `New message from ${payload.name}`,
        text: `Name: ${payload.name}
Email: ${payload.email}

Message:
${payload.message}`
      })
    });
    if (!resendRes.ok) {
      return {
        statusCode: 502,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: "Failed to send notification." })
      };
    }
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error("AWS Lambda execution error:", error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Internal server error." })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
