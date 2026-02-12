import { useEffect, useState } from 'react';
import './CursorTrail.css';

const CursorTrail = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        let particleId = 0;
        let lastTime = Date.now();

        const handleMouseMove = (e) => {
            // Check if cursor is in event sections
            const target = document.elementFromPoint(e.clientX, e.clientY);
            const inEventSection = target?.closest('.events-section');

            // Only create particles in event sections
            if (!inEventSection) return;

            // Throttle particle creation for milder effect
            const now = Date.now();
            if (now - lastTime < 50) return; // Create particle every 50ms max
            lastTime = now;

            const newParticle = {
                id: particleId++,
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 30 + 20, // Smaller, milder particles
                speedX: (Math.random() - 0.5) * 1.5, // Slower, gentler movement
                speedY: -Math.random() * 1.5 - 0.5, // Gentle upward drift
            };

            setParticles((prev) => [...prev, newParticle]);

            // Remove particle after animation
            setTimeout(() => {
                setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
            }, 3000); // Longer, slower fade
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="cursor-trail-container">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="cursor-particle gas-particle"
                    style={{
                        left: `${particle.x}px`,
                        top: `${particle.y}px`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        '--speed-x': particle.speedX,
                        '--speed-y': particle.speedY,
                    }}
                />
            ))}
        </div>
    );
};

export default CursorTrail;
