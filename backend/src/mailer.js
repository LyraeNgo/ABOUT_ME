import nodemailer from "nodemailer";
import { assertMailerConfig, config } from "./config.js";

let transporter;

function getTransporter() {
  if (transporter) return transporter;
  assertMailerConfig();

  if (config.dryRun) {
    transporter = null;
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: { user: config.smtp.user, pass: config.smtp.pass },
  });
  return transporter;
}

export async function sendContactEmail({ fromEmail, content }) {
  if (config.dryRun) {
    return { dryRun: true, messageId: "dry-run" };
  }

  const tx = getTransporter();
  const info = await tx.sendMail({
    from: config.mailFrom,
    to: config.mailTo,
    replyTo: fromEmail,
    subject: `[Portfolio Contact] ${fromEmail}`,
    text: `From: ${fromEmail}\n\n${content}\n`,
  });

  return { dryRun: false, messageId: info.messageId || null };
}

