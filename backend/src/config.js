import dotenv from "dotenv";

dotenv.config();

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export const config = {
  port: Number(process.env.PORT || 3001),
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",

  dryRun: String(process.env.DRY_RUN || "").toLowerCase() === "true",

  mailFrom: process.env.MAIL_FROM || "",
  mailTo: process.env.MAIL_TO || "",

  smtp: {
    host: process.env.SMTP_HOST || "",
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "").toLowerCase() === "true",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
};

export function assertMailerConfig() {
  if (config.dryRun) return;

  required("MAIL_FROM");
  required("MAIL_TO");
  required("SMTP_HOST");
  required("SMTP_USER");
  required("SMTP_PASS");
  if (!Number.isFinite(config.smtp.port)) throw new Error("Invalid SMTP_PORT");
}

