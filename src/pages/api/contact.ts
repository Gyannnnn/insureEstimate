import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const SUBJECT_MAP: Record<string, string> = {
  general: 'General Platform Question',
  feedback: 'Calculator Feedback & Suggestion',
  data_update: 'State Rate Data Update',
  media: 'Media & Press Inquiry',
  privacy: 'Data Privacy Request'
};

export const POST: APIRoute = async ({ request }) => {
  const resendApiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
  const recipientEmail = import.meta.env.CONTACT_RECIPIENT_EMAIL || process.env.CONTACT_RECIPIENT_EMAIL;

  if (!resendApiKey) {
    console.error('Missing RESEND_API_KEY in environment variables.');
    return new Response(
      JSON.stringify({ success: false, error: 'Email service configuration missing RESEND_API_KEY.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!recipientEmail) {
    console.error('Missing CONTACT_RECIPIENT_EMAIL in environment variables.');
    return new Response(
      JSON.stringify({ success: false, error: 'Email service configuration missing recipient email.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const resend = new Resend(resendApiKey);
  try {
    // Strictly load environment variables from process.env or import.meta.env
    const resendApiKey = process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || import.meta.env.CONTACT_RECIPIENT_EMAIL;

    if (!resendApiKey) {
      console.error('Missing RESEND_API_KEY in environment variables.');
      return new Response(
        JSON.stringify({ success: false, error: 'Server email service is not configured properly.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!recipientEmail) {
      console.error('Missing CONTACT_RECIPIENT_EMAIL in environment variables.');
      return new Response(
        JSON.stringify({ success: false, error: 'Server email recipient is not configured properly.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return new Response(
        JSON.stringify({ success: false, error: 'Full name must be at least 2 characters.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!subject || typeof subject !== 'string' || !SUBJECT_MAP[subject]) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please select a valid inquiry category.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return new Response(
        JSON.stringify({ success: false, error: 'Message must be at least 10 characters long.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const subjectLabel = SUBJECT_MAP[subject] || subject;
    const cleanMessage = message.trim();
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      dateStyle: 'full',
      timeStyle: 'short'
    });

    // High-Fidelity HTML Email Template
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New InsureEstimate Contact Inquiry</title>
      <style>
        body { margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #334155; }
        .wrapper { width: 100%; background-color: #f1f5f9; padding: 36px 12px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); }
        .header { background-color: #0f172a; padding: 28px 32px; border-top: 4px solid #10b981; }
        .brand-title { color: #ffffff; font-size: 22px; font-weight: 800; margin: 0; tracking-tight; }
        .brand-accent { color: #10b981; }
        .sub-header { color: #94a3b8; font-size: 12px; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }
        .content { padding: 32px; }
        .badge { display: inline-block; background-color: #ecfdf5; color: #047857; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; border: 1px solid #a7f3d0; margin-bottom: 20px; }
        .info-grid { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        .info-grid td { padding: 10px 14px; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
        .label { font-weight: 700; color: #0f172a; width: 30%; }
        .value { color: #334155; width: 70%; }
        .message-box { background-color: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #006c49; border-radius: 8px; padding: 20px; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap; word-wrap: break-word; }
        .footer { background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center; }
        .footer a { color: #006c49; text-decoration: none; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          
          <!-- Header Banner -->
          <div class="header">
            <h1 class="brand-title">Insure<span class="brand-accent">Estimate</span></h1>
            <div class="sub-header">New Support Inquiry Received</div>
          </div>

          <!-- Content Body -->
          <div class="content">
            <div class="badge">Inquiry Category: ${subjectLabel}</div>

            <table class="info-grid">
              <tr>
                <td class="label">Sender Name</td>
                <td class="value"><strong>${cleanName}</strong></td>
              </tr>
              <tr>
                <td class="label">Reply-To Email</td>
                <td class="value"><a href="mailto:${cleanEmail}" style="color: #006c49; font-weight: 600;">${cleanEmail}</a></td>
              </tr>
              <tr>
                <td class="label">Inquiry Category</td>
                <td class="value">${subjectLabel}</td>
              </tr>
              <tr>
                <td class="label">Timestamp</td>
                <td class="value">${timestamp} EST</td>
              </tr>
            </table>

            <div style="font-weight: 700; font-size: 13px; color: #0f172a; margin-bottom: 8px;">User Message:</div>
            <div class="message-box">${cleanMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
          </div>

          <!-- Footer -->
          <div class="footer">
            Sent automatically via <a href="https://insureestimate.com">InsureEstimate Contact Engine</a>.<br>
            Reply directly to this email to respond to <strong>${cleanName}</strong> (${cleanEmail}).
          </div>

        </div>
      </div>
    </body>
    </html>
    `;

    // Initialize Resend with key from environment variables
    const resend = new Resend(resendApiKey);

    // Send email using Resend SDK
    const resendResponse = await resend.emails.send({
      from: 'InsureEstimate Contact <onboarding@resend.dev>',
      to: [recipientEmail],
      replyTo: cleanEmail,
      subject: `[InsureEstimate] New Inquiry from ${cleanName}: ${subjectLabel}`,
      html: htmlTemplate,
    });

    if (resendResponse.error) {
      console.error('Resend API Error:', resendResponse.error);
      return new Response(
        JSON.stringify({
          success: false,
          error: resendResponse.error.message || 'Failed to dispatch email via provider.'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email dispatched successfully.',
        id: resendResponse.data?.id
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    console.error('Contact API Exception:', err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Internal server error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
