/**
 * Netlify Serverless Function: send-email
 * Proxies Resend API calls from the browser to avoid CORS restrictions.
 * Endpoint: /.netlify/functions/send-email
 *
 * SENDER DOMAIN NOTE:
 * - Currently using onboarding@resend.dev (works without domain verification)
 * - To use your own domain (e.g. heisenbyte.jecaids.in), verify it in Resend dashboard
 *   → https://resend.com/domains → Add domain → Follow DNS instructions
 *   Then replace the `from` field below with: 'HeisenByte 2026 <noreply@jecaids.in>'
 */
exports.handler = async (event) => {
    // Handle preflight CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' },
            body: '',
        };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
        console.error('RESEND_API_KEY not set in Netlify environment variables');
        return { statusCode: 200, body: JSON.stringify({ error: 'Email service not configured' }) };
    }

    let body;
    try {
        body = JSON.parse(event.body);
    } catch {
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
    }

    const { to, name, eventName } = body;
    if (!to || !name || !eventName) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields: to, name, eventName' }) };
    }

    const emailPayload = {
        // Using Resend's shared sender — works without domain verification
        // Switch to your own domain once verified in Resend dashboard
        from: 'HeisenByte 2026 <noreply@updates.jecaids.in>',
        to: [to],
        subject: `Registration Confirmed – ${eventName} | HeisenByte 2026`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Registration Confirmed</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Arial',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #39ff14;border-radius:16px;overflow:hidden;max-width:600px;">
          
          <!-- Header Strip -->
          <tr>
            <td style="background:linear-gradient(90deg,#39ff14,#00ff88);height:6px;"></td>
          </tr>

          <!-- Logo / Title -->
          <tr>
            <td align="center" style="padding:32px 32px 16px;">
              <h1 style="margin:0;font-size:28px;color:#39ff14;letter-spacing:4px;font-weight:900;">HEISENBYTE</h1>
              <p style="margin:4px 0 0;color:#bbb;font-size:11px;letter-spacing:3px;">2026 &middot; JEC AI&amp;DS DEPARTMENT</p>
            </td>
          </tr>

          <!-- Logo Image -->
          <tr>
            <td align="center" style="padding:8px 32px;">
              <img src="https://heisenbyte.jecaids.in/heisenbyte-logo.png" alt="HeisenByte" width="70" height="70" style="border-radius:50%;border:2px solid #39ff14;background:#000;padding:4px;" />
            </td>
          </tr>

          <!-- Main Message -->
          <tr>
            <td align="center" style="padding:16px 40px 8px;">
              <h2 style="margin:0;color:#fff;font-size:20px;letter-spacing:2px;">REGISTRATION CONFIRMED</h2>
              <p style="color:#ddd;margin:12px 0 0;font-size:15px;line-height:1.6;">
                Hi <strong style="color:#fff;">${name}</strong>, you're officially registered for
              </p>
              <p style="margin:8px 0 0;font-size:22px;font-weight:bold;color:#39ff14;letter-spacing:1px;">${eventName}</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:24px 40px;">
              <div style="border-top:1px solid #222;"></div>
            </td>
          </tr>

          <!-- Event Info -->
          <tr>
            <td style="padding:0 40px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px;background:#0d0d0d;border:1px solid #1a1a1a;border-radius:8px;">
                    <p style="margin:0 0 6px;color:#39ff14;font-size:10px;letter-spacing:2px;">📅 EVENT DAY</p>
                    <p style="margin:0;color:#fff;font-size:14px;"><strong>5th March 2026</strong></p>
                  </td>
                </tr>
                <tr><td style="height:10px;"></td></tr>
                <tr>
                  <td style="padding:10px;background:#0d0d0d;border:1px solid #1a1a1a;border-radius:8px;">
                    <p style="margin:0 0 6px;color:#39ff14;font-size:10px;letter-spacing:2px;">📍 VENUE</p>
                    <p style="margin:0;color:#fff;font-size:14px;">Jeppiaar Engineering College, AI &amp; DS Dept — Event Block</p>
                  </td>
                </tr>
                <tr><td style="height:10px;"></td></tr>
                <tr>
                  <td style="padding:10px;background:#0d0d0d;border:1px solid #1a1a1a;border-radius:8px;">
                    <p style="margin:0 0 6px;color:#39ff14;font-size:10px;letter-spacing:2px;">📌 REMINDER</p>
                    <p style="margin:0;color:#ddd;font-size:13px;">Carry your college ID card. Arrive 15 minutes before your event starts.</p>
                  </td>
                </tr>
                <tr><td style="height:10px;"></td></tr>
                <tr>
                  <td style="padding:10px;background:#0d2208;border:1px solid rgba(37,211,102,0.3);border-radius:8px;">
                    <p style="margin:0 0 6px;color:#25D366;font-size:10px;letter-spacing:2px;">💬 WHATSAPP</p>
                    <p style="margin:0;color:#ddd;font-size:13px;">Our event members will contact you through <strong style="color:#25D366;">WhatsApp</strong> with further details.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0d0d0d;padding:20px 40px;border-top:1px solid #1a1a1a;">
              <p style="margin:0;color:#aaa;font-size:11px;text-align:center;">
                HeisenByte 2026 &bull; JEC AI&amp;DS Department<br/>
                <a href="mailto:jec.aids.dept@gmail.com" style="color:#39ff14;text-decoration:none;">jec.aids.dept@gmail.com</a>
                &bull;
                <a href="https://heisenbyte.jecaids.in" style="color:#39ff14;text-decoration:none;">heisenbyte.jecaids.in</a>
              </p>
            </td>
          </tr>

          <!-- Bottom Strip -->
          <tr>
            <td style="background:linear-gradient(90deg,#39ff14,#00ff88);height:3px;"></td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
    };

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailPayload),
        });

        const text = await response.text();
        let data = {};
        try { data = JSON.parse(text); } catch { data = { raw: text }; }

        if (!response.ok) {
            console.error('Resend API error:', response.status, data);
            // Always return 200 to browser so registration isn't affected
            return {
                statusCode: 200,
                body: JSON.stringify({ error: `Resend error ${response.status}`, detail: data }),
            };
        }

        console.log('Email sent successfully:', data.id);
        return { statusCode: 200, body: JSON.stringify({ success: true, id: data.id }) };

    } catch (err) {
        console.error('Function error:', err);
        return { statusCode: 200, body: JSON.stringify({ error: err.message }) };
    }
};
