/**
 * Netlify Serverless Function: send-email
 * Proxies Resend API calls from the browser to avoid CORS restrictions.
 * Endpoint: /.netlify/functions/send-email
 */
exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Resend API key not configured' }) };
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
        from: 'HeisenByte 2026 <noreply@jec.edu.in>',
        to: [to],
        subject: `Registration Confirmed – ${eventName} | HeisenByte 2026`,
        html: `
            <div style="font-family: Arial, sans-serif; background:#000; color:#fff; padding:32px; max-width:600px; margin:auto; border:1px solid #39ff14; border-radius:12px;">
                <h1 style="color:#39ff14; font-size:1.5rem; margin-bottom:8px;">✅ Registration Confirmed!</h1>
                <p style="color:#ccc;">Hi <strong>${name}</strong>,</p>
                <p style="color:#ccc;">You have successfully registered for <strong style="color:#39ff14;">${eventName}</strong> at <strong>HeisenByte 2026</strong>.</p>
                <p style="color:#ccc;">Please arrive at the venue 15 minutes before your event starts. Carry your college ID card.</p>
                <hr style="border-color:#39ff14; opacity:0.3; margin:24px 0;" />
                <p style="color:#555; font-size:0.85rem;">HeisenByte 2026 &bull; JEC AI&DS Department &bull; jec.aids.dept@gmail.com</p>
            </div>
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

        const data = await response.json();

        if (!response.ok) {
            console.error('Resend error:', data);
            return { statusCode: response.status, body: JSON.stringify({ error: data }) };
        }

        return { statusCode: 200, body: JSON.stringify({ success: true, id: data.id }) };
    } catch (err) {
        console.error('Function error:', err);
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
};
