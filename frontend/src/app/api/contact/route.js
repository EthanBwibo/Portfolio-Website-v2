import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const styles = {
  container: 'font-family:Arial,sans-serif;background:#f5f5f5;padding:30px;',
  card: 'max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.12);',
  header: 'background:linear-gradient(135deg,#FFD700 0%,#FFA500 100%);color:#0a0a0a;padding:28px;text-align:center;',
  body: 'padding:28px;color:#333333;font-size:15px;line-height:1.6;',
  footer: 'background:#f9fafb;padding:16px;text-align:center;font-size:13px;color:#888;border-top:1px solid #eee;',
  quote: 'background:#fffbea;border-left:4px solid #FFD700;padding:16px;border-radius:0 8px 8px 0;margin:16px 0;',
};

function buildHtml({ heading, body, subtext }) {
  return `
    <div style="${styles.container}">
      <div style="${styles.card}">
        <div style="${styles.header}">
          <h1 style="margin:0;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Ethan Bwibo</h1>
          <p style="margin:4px 0 0;font-size:13px;opacity:0.75;">Software Developer &amp; Data Analyst</p>
        </div>
        <div style="${styles.body}">
          <h2 style="color:#B8860B;margin-top:0;font-size:18px;">${heading}</h2>
          ${body}
          ${subtext ? `<p style="font-size:13px;color:#888;margin-top:20px;">${subtext}</p>` : ''}
        </div>
        <div style="${styles.footer}">
          <a href="https://www.linkedin.com/in/ethan-bwibo/" style="color:#B8860B;text-decoration:none;margin:0 8px;">LinkedIn</a> ·
          <a href="https://github.com/EthanBwibo" style="color:#B8860B;text-decoration:none;margin:0 8px;">GitHub</a>
        </div>
      </div>
    </div>
  `;
}

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const notificationHtml = buildHtml({
      heading: 'New Portfolio Message',
      body: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#B8860B;">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="${styles.quote}">${message.replace(/\n/g, '<br>')}</div>
      `,
      subtext: 'This message was sent from your portfolio contact form.',
    });

    const autoReplyHtml = buildHtml({
      heading: `Hi ${name}, thanks for reaching out!`,
      body: `
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="${styles.quote}">${message.replace(/\n/g, '<br>')}</div>
        <p>Best regards,<br><strong>Ethan Bwibo</strong></p>
      `,
      subtext: null,
    });

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['enbwibo@gmail.com'],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: notificationHtml,
    });

    await resend.emails.send({
      from: 'Ethan Bwibo <onboarding@resend.dev>',
      to: [email],
      subject: `Thanks for reaching out, ${name}!`,
      html: autoReplyHtml,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
