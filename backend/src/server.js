import cors from "cors";
import express from "express";
import { config } from "./config.js";
import { sendContactEmail } from "./mailer.js";
import { validateMessagePayload } from "./validators.js";

const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "32kb" }));
app.use(
  cors({
    origin: config.corsOrigin === "*" ? true : config.corsOrigin,
    credentials: false,
  }),
);

app.get("/v1/health", (req, res) => res.json({ ok: true }));

app.post("/v1/messages", async (req, res) => {
  const parsed = validateMessagePayload(req.body);
  if (!parsed.ok) return res.status(parsed.status).json({ message: parsed.message });

  try {
    const { email, content } = parsed.value;
    const out = await sendContactEmail({ fromEmail: email, content });
    return res.status(202).json({ status: "queued", ...out });
  } catch (err) {
    return res.status(500).json({ message: err?.message || "Internal Server Error" });
  }
});

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`[backend] listening on http://localhost:${config.port}`);
});

