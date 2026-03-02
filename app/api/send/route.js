import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    // 🔹 Base styles (Updated to Obsidian & Gold aesthetic)
    const containerStart = `
      <div style="font-family: sans-serif; background:#0a0a0a; padding:30px; color: #ffffff;">
        <div style="max-width:600px; margin:auto; background:#171717; border-radius:12px; overflow:hidden; border: 1px solid #ca8a04;">
          <div style="background: linear-gradient(to right, #fbbf24, #ca8a04); padding:20px; text-align:center;">
            <h1 style="margin:0; font-size:22px; color: #000000;">Ethan Bwibo</h1>
            <p style="margin:0; font-size:14px; color: #000000; font-weight: bold;">Software Developer & Data Analyst</p>
          </div>
          <div style="padding:25px;">
    `;

    const containerEnd = `
          </div>
          <div style="background:#0a0a0a; padding:15px; text-align:center; font-size:13px; color:#a3a3a3; border-top: 1px solid #262626;">
            <p>Connect with me:</p>
            <a href="https://www.linkedin.com/in/ethan-bwibo/" style="margin:0 8px; color:#fbbf24; text-decoration:none;">LinkedIn</a> |
            <a href="https://github.com/ethanbwibo-Strath" style="margin:0 8px; color:#fbbf24; text-decoration:none;">GitHub</a>
          </div>
        </div>
      </div>
    `;

    // 1. Send notification email to YOU
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>', // Keep as is if using free tier
      to: 'enbwibo@gmail.com',
      reply_to: email,
      subject: `📩 New Message: ${subject}`,
      html: `
        ${containerStart}
          <h2 style="color:#fbbf24; font-size:20px;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin:20px 0; padding:15px; background:#262626; border-radius:6px; border-left: 4px solid #fbbf24;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        ${containerEnd}
      `,
    });

    // 2. Send Auto-reply to SENDER
    await resend.emails.send({
      from: 'Ethan Bwibo <onboarding@resend.dev>',
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        ${containerStart}
          <h2 style="color:#fbbf24; font-size:20px;">Hi ${name}, thanks for reaching out!</h2>
          <p>I’ve received your message and will get back to you as soon as possible.</p>
          <hr style="border: 0; border-top: 1px solid #262626; margin: 20px 0;">
          <h4 style="color: #a3a3a3;">Your Message:</h4>
          <p><strong>Subject:</strong> ${subject}</p>
          <p style="font-style: italic; color: #d4d4d4;">"${message}"</p>
          <br>
          <p>Best regards,<br><strong>Ethan Bwibo</strong></p>
        ${containerEnd}
      `,
    });

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}