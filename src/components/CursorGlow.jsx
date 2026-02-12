import { useEffect } from 'react';

const CursorGlow = () => {
    useEffect(() => {
        const handleMouseMove = (e) => {
            // Check if cursor is NOT in hero section
            const target = document.elementFromPoint(e.clientX, e.clientY);
            const inHeroSection = target?.closest('.hero, #hero');

            // Only apply glow effect outside hero section
            if (inHeroSection) {
                // Reset to default background when in hero
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
