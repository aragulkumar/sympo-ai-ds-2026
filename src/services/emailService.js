/**
 * Sends a registration confirmation email via the Netlify serverless proxy.
 * The Netlify function at /.netlify/functions/send-email handles the Resend API call,
 * bypassing the browser CORS restriction.
 */
export const sendInvitationEmail = async (userEmail, userName, eventName) => {
    try {
        const response = await fetch('/.netlify/functions/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to: userEmail, name: userName, eventName }),
        });

        if (!response.ok) {
            const err = await response.json();
            console.error('[Email] Failed:', err);
        } else {
            console.log(`[Email] Sent to ${userEmail} for ${eventName}`);
        }
    } catch (err) {
        // Non-blocking — registration already saved, just log the error
        console.error('[Email] Network error:', err.message);
    }
};
