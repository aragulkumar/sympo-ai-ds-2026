import { useEffect } from 'react';

const CursorGlow = () => {
    useEffect(() => {
        const handleMouseMove = (e) => {
            document.body.style.background =
                `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, 
         rgba(57, 255, 20, 0.06), 
         #071a0f 30%, 
         #000000 70%)`;
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return null; // This component doesn't render anything
};

export default CursorGlow;
