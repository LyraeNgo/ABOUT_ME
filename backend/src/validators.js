const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateMessagePayload(body) {
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const content = typeof body?.content === "string" ? body.content.trim() : "";

  if (!email) return { ok: false, status: 400, message: "email is required" };
  if (!EMAIL_RE.test(email)) return { ok: false, status: 400, message: "email is invalid" };
  if (!content) return { ok: false, status: 400, message: "content is required" };
  if (content.length > 5000)
    return { ok: false, status: 400, message: "content is too long" };

  return { ok: true, value: { email, content } };
}

