/**
 * Service to handle automated registration emails via Resend.
 * NOTE: Resend API blocks direct browser calls (CORS policy).
 * Email sending is currently disabled. To enable it, proxy through a
 * backend serverless function (e.g. Netlify / Vercel / Firebase Function).
 */
export const sendInvitationEmail = async (userEmail, userName, eventName) => {
    // Silently skip — Resend cannot be called from a browser due to CORS restriction.
    // Re-enable this when a backend proxy is set up.
    console.log(`[Email skipped - CORS] Would send to ${userEmail} for ${eventName}`);
    return;
};

