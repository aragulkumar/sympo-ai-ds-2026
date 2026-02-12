import { useEffect } from 'react';

const CursorGlow = () => {
    useEffect(() => {
        const handleMouseMove = (e) => {
            // Check if cursor is in hero section OR navbar
            const target = document.elementFromPoint(e.clientX, e.clientY);
            const inHeroSection = target?.closest('.hero, #hero');
            const inNavbar = target?.closest('.navbar, nav');

            // Only apply glow effect outside hero and navbar
            if (inHeroSection || inNavbar) {
                // Reset to default background when in hero or navbar
                document.body.style.background = 'radial-gradient(circle at center, #071a0f 0%, #000000 70%)';
            } else {
                // Apply green glow in other sections
                document.body.style.background =
                    `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, 
           rgba(57, 255, 20, 0.06), 
           #071a0f 30%, 
           #000000 70%)`;
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return null; // This component doesn't render anything
};

export default CursorGlow;
