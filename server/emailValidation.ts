export const EMAIL_REGEX = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/;

export async function verifyDomainHasMx(domain: string): Promise<boolean> {
  try {
    const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`, {
      headers: { Accept: 'application/dns-json' },
    });
    if (!res.ok) return true;
    const data = (await res.json()) as { Answer?: Array<{ type: number; data: string }> };
    return Boolean(data.Answer && data.Answer.length > 0);
  } catch {
    return true; // Fallback open on network error
  }
}
