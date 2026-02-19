/**
 * Sends a registration confirmation email via the Netlify serverless proxy.
 * - On Netlify (production): calls /.netlify/functions/send-email → Resend API
 * - On local dev (Vite): skips silently (Netlify functions don't run on localhost:5173)
 *   → Run `netlify dev` instead of `npm run dev` to test emails locally.
 */
export const sendInvitationEmail = async (userEmail, userName, eventName) => {
    // Skip on local Vite dev server — Netlify functions aren't available there
    const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocalDev) {
        console.log(`[Email skipped - local dev] Would send to ${userEmail} for ${eventName}`);
        console.log('Run `netlify dev` instead of `npm run dev` to test emails locally.');
        return;
    }

    try {
        const response = await fetch('/.netlify/functions/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to: userEmail, name: userName, eventName }),
        });

        // Safely parse response — body may be empty on errors
        let data = {};
        const text = await response.text();
        if (text) {
            try { data = JSON.parse(text); } catch { data = { raw: text }; }
        }

        if (!response.ok) {
            console.error(`[Email] Failed (${response.status}):`, data);
        } else {
            console.log(`[Email] Sent to ${userEmail} for ${eventName}`, data);
        }
    } catch (err) {
        // Non-blocking — registration is already saved
        console.error('[Email] Network error:', err.message);
    }
};
