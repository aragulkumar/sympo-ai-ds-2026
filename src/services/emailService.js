/**
 * Service to handle automated registration emails via Resend.
 * Note: Resend API requires a verified domain or uses 'onboarding@resend.dev' for testing.
 */
export const sendInvitationEmail = async (userEmail, userName, eventName) => {
    const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

    if (!RESEND_API_KEY || RESEND_API_KEY === 'your_resend_api_key') {
        console.warn('Resend API Key is missing. Skipping email.');
        return;
    }

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: 'Heisenbyte 2026 <onboarding@resend.dev>',
                to: [userEmail],
                subject: `Invitation for ${eventName} - Heisenbyte 2026`,
                html: `
          <div style="font-family: 'Orbitron', sans-serif; background: #000; color: #fff; padding: 20px; border: 2px solid #39ff14;">
            <h1 style="color: #39ff14; text-align: center;">HEISENBYTE 2026</h1>
            <p>Hey ${userName},</p>
            <p>You have successfully registered for <strong>${eventName}</strong>!</p>
            <p>We are excited to see you experiment with us on <strong>March 5th, 2026</strong> at the AI & DS Block.</p>
            <hr style="border: 1px solid #39ff14;">
            <p style="font-size: 0.8rem; color: #888;">This is an automated invitation. See you there!</p>
          </div>
        `,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to send email');
        }

        console.log('Invitation email sent successfully!');
    } catch (error) {
        console.error('Error sending invitation email:', error);
    }
};
