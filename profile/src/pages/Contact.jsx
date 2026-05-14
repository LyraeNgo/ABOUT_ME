import { useMemo, useState } from "react";
import ApiCard from "../components/Cards/ApiCard";
const API_BASE_URL = "http://localhost:3001"
console.log("🚀 ~ API_BASE_URL:", API_BASE_URL)
const MESSAGE_ENDPOINT = "/v1/messages";

const buildPayload = ({ email, content }) => ({
  email: email.trim(),
  content: content.trim(),
});

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toPostmanLikeJsonHtml(payload) {
  const json = JSON.stringify(payload, null, 2);
  const escaped = escapeHtml(json);

  // Keys: "key":
  const withKeys = escaped.replace(
    /&quot;([^&]*)&quot;(?=:\s)/g,
    '<span class="text-sky-600 dark:text-sky-300">&quot;$1&quot;</span>',
  );

  // String values: : "value"
  const withStrings = withKeys.replace(
    /:\s(&quot;.*?&quot;)/g,
    ': <span class="text-emerald-700 dark:text-emerald-300">$1</span>',
  );

  // Numbers
  const withNumbers = withStrings.replace(
    /:\s(-?\d+(?:\.\d+)?)/g,
    ': <span class="text-violet-700 dark:text-violet-300">$1</span>',
  );

  // Booleans / null
  return withNumbers.replace(
    /:\s(true|false|null)/g,
    ': <span class="text-orange-700 dark:text-orange-300">$1</span>',
  );
}

async function copyToClipboard(text) {
  const value = String(text ?? "");
  if (!value) return;

  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const el = document.createElement("textarea");
  el.value = value;
  el.setAttribute("readonly", "");
  el.style.position = "fixed";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

async function postMessage({ email, content, signal }) {
  const res = await fetch(`${API_BASE_URL}${MESSAGE_ENDPOINT}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildPayload({ email, content })),
    signal,
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text || null;
  }

  if (!res.ok) {
    const message =
      (data && typeof data === "object" && data.message) ||
      (typeof data === "string" && data) ||
      `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return { status: res.status, data };
}

const Contact = () => {
  const status = { status: "200" };
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  const payload = useMemo(() => buildPayload({ email, content }), [email, content]);

  const payloadPreviewHtml = useMemo(
    () => toPostmanLikeJsonHtml(payload),
    [payload],
  );

  const canSubmit = email.trim().length > 0 && content.trim().length > 0 && !submitting;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const controller = new AbortController();
    setSubmitting(true);
    try {
      const res = await postMessage({ email, content, signal: controller.signal });
      setResult(res);
      setEmail("");
      setContent("");
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const onCopy = async (key, value) => {
    try {
      await copyToClipboard(value);
      setCopiedKey(key);
      window.clearTimeout(onCopy._t);
      onCopy._t = window.setTimeout(() => setCopiedKey(null), 1200);
    } catch {
      setCopiedKey(null);
    }
  };
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="w-[50%]">
      <ApiCard method={"GET"} path={"/api/v1/getMe/contact"} summary={"Here's my contact"} meta={status}></ApiCard>
        </div>  
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p className="mt-3 max-w-2xl text-zinc-700 dark:text-zinc-300">
        You can text me email in this form
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/5">
          <div className="text-sm font-semibold">Request (Postman-like)</div>

          <div className="mt-4 overflow-hidden rounded-xl border border-black/10 bg-white/60 dark:border-white/10 dark:bg-black/30">
            <div className="flex items-center justify-between gap-3 border-b border-black/10 px-4 py-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-emerald-600 px-2 py-0.5 font-mono text-[11px] font-semibold text-white dark:bg-emerald-500 dark:text-black">
                  POST
                </span>
                <span className="font-mono text-xs text-zinc-800 dark:text-zinc-200">
                  {API_BASE_URL || ""}
                  {MESSAGE_ENDPOINT}
                </span>
              </div>
              <span className="font-mono text-[11px] text-zinc-500">JSON</span>
            </div>

            <div className="px-4 py-3">
              <div className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                Headers
              </div>
              <div className="mt-2 flex items-center justify-between rounded-lg border border-black/10 bg-white/60 px-3 py-2 font-mono text-[11px] text-zinc-700 dark:border-white/10 dark:bg-black/20 dark:text-zinc-300">
                <span className="text-sky-700 dark:text-sky-300">Content-Type</span>
                <span className="text-emerald-700 dark:text-emerald-300">
                  application/json
                </span>
              </div>

              <div className="mt-4 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                Body (raw)
              </div>
              <pre
                className="mt-2 overflow-auto rounded-lg border border-black/10 bg-white/60 p-3 font-mono text-xs text-zinc-800 dark:border-white/10 dark:bg-black/20 dark:text-zinc-200"
                dangerouslySetInnerHTML={{ __html: payloadPreviewHtml }}
              />
            </div>
          </div>

          <div className="mt-6 text-sm font-semibold">Send a message</div>
          <form onSubmit={onSubmit} className="mt-4 space-y-4">
            <label className="block">
              <div className="mb-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Email
              </div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-cyan-500 dark:border-white/10 dark:bg-black/20 dark:text-zinc-100"
                required
              />
            </label>

            <label className="block">
              <div className="mb-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Content
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your message..."
                rows={6}
                className="w-full resize-none rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-cyan-500 dark:border-white/10 dark:bg-black/20 dark:text-zinc-100"
                required
              />
            </label>

            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-500 dark:text-black"
            >
              {submitting ? "Sending..." : "Send"}
            </button>

            {error ? (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            ) : null}

            {result ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-300">
                Sent (HTTP {result.status})
              </div>
            ) : null}
          </form>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/5">
          <div className="text-sm font-semibold">Links</div>
          <div className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-black/20">
              <span className="font-mono">email</span>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 dark:text-zinc-400">
                  ngominhtam26112005@gmail.com
                </span>
                <button
                  type="button"
                  onClick={() => onCopy("email", "ngominhtam26112005@gmail.com")}
                  className="rounded-lg border border-black/10 bg-white/60 px-2 py-1 text-[11px] font-semibold text-zinc-700 hover:bg-white dark:border-white/10 dark:bg-black/20 dark:text-zinc-200 dark:hover:bg-black/30"
                  aria-label="Copy email"
                >
                  {copiedKey === "email" ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-black/20">
              <span className="font-mono">github</span>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 dark:text-zinc-400">
                  github.com/LyraeNgo
                </span>
                <button
                  type="button"
                  onClick={() => onCopy("github", "github.com/LyraeNgo")}
                  className="rounded-lg border border-black/10 bg-white/60 px-2 py-1 text-[11px] font-semibold text-zinc-700 hover:bg-white dark:border-white/10 dark:bg-black/20 dark:text-zinc-200 dark:hover:bg-black/30"
                  aria-label="Copy github"
                >
                  {copiedKey === "github" ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-black/20">
              <span className="font-mono">linkedin</span>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 dark:text-zinc-400">
                  linkedin.com/in/minh-tam-ngo-631911301/
                </span>
                <button
                  type="button"
                  onClick={() => onCopy("linkedin", "https://www.linkedin.com/in/minh-tam-ngo-631911301/")}
                  className="rounded-lg border border-black/10 bg-white/60 px-2 py-1 text-[11px] font-semibold text-zinc-700 hover:bg-white dark:border-white/10 dark:bg-black/20 dark:text-zinc-200 dark:hover:bg-black/30"
                  aria-label="Copy linkedin"
                >
                  {copiedKey === "linkedin" ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 text-xs text-zinc-500">
            Contact Me
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
