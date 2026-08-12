import { Resend } from "resend";

const TO_EMAIL = "zurinilotica@gmail.com";
const FROM_EMAIL = "Zuri Nilotica Website <website@zurinilotica.com>";

const MAX_LENGTHS = {
  name: 120,
  email: 254,
  message: 5000,
};

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
  !email.includes("..") &&
  email.length <= MAX_LENGTHS.email;

const trimField = (value) => (typeof value === "string" ? value.trim() : "");

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { ok: false, message: "Method not allowed." });
  }

  if ((event.body || "").length > 12000) {
    return jsonResponse(413, { ok: false, message: "Your message is too long. Please shorten it and try again." });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { ok: false, message: "Invalid request." });
  }

  const honeypot = trimField(payload.website);
  if (honeypot) {
    return jsonResponse(200, { ok: true, message: "Message sent." });
  }

  const name = trimField(payload.name);
  const email = trimField(payload.email);
  const message = trimField(payload.message);

  if (!name || !email || !message) {
    return jsonResponse(400, { ok: false, message: "Please complete all required fields." });
  }

  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    message.length > MAX_LENGTHS.message
  ) {
    return jsonResponse(413, { ok: false, message: "Your message is too long. Please shorten it and try again." });
  }

  if (!isValidEmail(email)) {
    return jsonResponse(400, { ok: false, message: "Please enter a valid email address." });
  }

  if (!process.env.RESEND_API_KEY) {
    return jsonResponse(500, { ok: false, message: "Email service is not configured yet." });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br>");
  const subjectName = name.replace(/[\r\n]+/g, " ").slice(0, MAX_LENGTHS.name);

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #171713; line-height: 1.6; max-width: 640px;">
      <h2 style="margin: 0 0 16px; color: #171713;">New website message</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${safeName}</p>
      <p style="margin: 0 0 24px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #a97845;">${safeEmail}</a></p>
      <div style="padding: 20px; background: #fffaf1; border: 1px solid #efe5cf; border-radius: 14px;">
        <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
        <p style="margin: 0;">${safeMessage}</p>
      </div>
    </div>
  `;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New website message from ${subjectName}`,
      replyTo: email,
      html,
      text,
    });

    if (error) {
      console.error("Contact form email failed", error);
      return jsonResponse(502, { ok: false, message: "Failed to send message. Please try again later." });
    }

    return jsonResponse(200, { ok: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact form email failed", error);
    return jsonResponse(502, { ok: false, message: "Failed to send message. Please try again later." });
  }
}
