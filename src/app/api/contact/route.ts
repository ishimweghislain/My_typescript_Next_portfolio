import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: 'Invalid request payload.' },
        { status: 400 }
      );
    }

    const { name, email, subject, message, _honey } = body;

    // Bot honeypot check - silent discard for bots
    if (_honey) {
      return NextResponse.json({ ok: true, message: 'Message received.' });
    }

    // Validate required fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      );
    }

    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Message content is required.' },
        { status: 400 }
      );
    }

    // SMTP credentials from env (with configured fallbacks)
    const host = process.env.MAIL_HOST || 'smtp.gmail.com';
    const port = Number(process.env.MAIL_PORT) || 587;
    const user = process.env.MAIL_USERNAME || 'apps@programage.com';
    const pass = process.env.MAIL_PASSWORD || 'wmnxdffulyjbptvs';
    const fromName = process.env.MAIL_FROM_NAME || 'LoanMS Support Team - Fullstack';
    const fromAddress = process.env.MAIL_FROM_ADDRESS || 'apps@programage.com';
    const toAddress = process.env.MAIL_TO_ADDRESS || 'ishimweghislain82@gmail.com';

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: false, // TLS on port 587
      auth: { user, pass },
    });

    const mailSubject = subject?.trim() || 'Portfolio Project Inquiry';
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    // 1. Send notification email to Ghislain
    await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to: toAddress,
      replyTo: `"${trimmedName}" <${trimmedEmail}>`,
      subject: `[Portfolio Inquiry] ${mailSubject} — ${trimmedName}`,
      text: `You have received a new message from your portfolio website.\n\nFrom: ${trimmedName} (${trimmedEmail})\nSubject: ${mailSubject}\n\nMessage:\n${trimmedMessage}\n\nSent at: ${new Date().toISOString()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #DADDE4; border-radius: 12px; background: #FFFFFF; color: #16181F;">
          <div style="border-bottom: 2px solid #B6FF2E; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="margin: 0; font-size: 20px; color: #16181F;">New Portfolio Message</h2>
            <p style="margin: 4px 0 0; font-size: 13px; color: #5A6070;">Received from your personal portfolio contact form</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #5A6070; width: 100px;"><strong>Sender:</strong></td>
              <td style="padding: 8px 0; color: #16181F;">${trimmedName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #5A6070;"><strong>Email:</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${trimmedEmail}" style="color: #3B6000; text-decoration: underline;">${trimmedEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #5A6070;"><strong>Subject:</strong></td>
              <td style="padding: 8px 0; color: #16181F;">${mailSubject}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #5A6070;"><strong>Date:</strong></td>
              <td style="padding: 8px 0; color: #5A6070;">${new Date().toLocaleString()}</td>
            </tr>
          </table>

          <div style="background: #F5F6F8; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
            <p style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #5A6070;"><strong>Message:</strong></p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #16181F; white-space: pre-wrap;">${trimmedMessage}</p>
          </div>

          <div style="border-top: 1px solid #DADDE4; padding-top: 12px; font-size: 12px; color: #5A6070;">
            Click <strong>Reply</strong> to respond directly to ${trimmedName} (${trimmedEmail}).
          </div>
        </div>
      `,
    });

    // 2. Send automatic confirmation receipt to sender
    await transporter.sendMail({
      from: `"Ishimwe Ghislain" <${fromAddress}>`,
      to: trimmedEmail,
      subject: `Message received — Ishimwe Ghislain`,
      text: `Hello ${trimmedName},\n\nThank you for reaching out through my portfolio website. I have received your message regarding "${mailSubject}" and will get back to you within 24 hours.\n\nSummary of your message:\n${trimmedMessage}\n\nBest regards,\nIshimwe Ghislain\nFull Stack Developer & Project Manager\nKamonyi, Rwanda\nhttps://ghislain.dev`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #DADDE4; border-radius: 12px; background: #FFFFFF; color: #16181F;">
          <div style="border-bottom: 2px solid #B6FF2E; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="margin: 0; font-size: 20px; color: #16181F;">Message Received</h2>
            <p style="margin: 4px 0 0; font-size: 13px; color: #5A6070;">Confirmation from Ishimwe Ghislain</p>
          </div>

          <p style="font-size: 15px; line-height: 1.6; color: #16181F; margin-bottom: 16px;">
            Hello <strong>${trimmedName}</strong>,
          </p>

          <p style="font-size: 14px; line-height: 1.6; color: #16181F; margin-bottom: 20px;">
            Thank you for reaching out through my portfolio website. I have received your message regarding <strong>&quot;${mailSubject}&quot;</strong> and will review it and get back to you within 24 hours.
          </p>

          <div style="background: #F5F6F8; border-radius: 8px; padding: 16px; margin-bottom: 24px; border-left: 3px solid #B6FF2E;">
            <p style="margin: 0 0 6px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #5A6070;"><strong>Your Message:</strong></p>
            <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #16181F; white-space: pre-wrap;">${trimmedMessage}</p>
          </div>

          <div style="border-top: 1px solid #DADDE4; padding-top: 16px; font-size: 13px; line-height: 1.5; color: #5A6070;">
            <p style="margin: 0 0 4px; font-weight: 600; color: #16181F;">Ishimwe Ghislain</p>
            <p style="margin: 0 0 4px; color: #3B6000;">Full Stack Developer &amp; Project Manager</p>
            <p style="margin: 0; color: #5A6070;">Kamonyi, Rwanda • CAT (UTC+2)</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      ok: true,
      message:
        'Your message has been sent successfully, and a confirmation receipt has been delivered to your email.',
    });
  } catch (err: unknown) {
    console.error('Contact API SMTP send error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown server error';
    return NextResponse.json(
      {
        error: 'Failed to deliver message via SMTP.',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
