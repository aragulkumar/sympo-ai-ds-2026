import { useEffect, useState } from 'react';
import './CursorTrail.css';

const CursorTrail = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        let particleId = 0;

        const handleMouseMove = (e) => {
            // Check if cursor is in event sections
            const target = document.elementFromPoint(e.clientX, e.clientY);
            const inEventSection = target?.closest('.events-section');

            // Only create particles in event sections
            if (!inEventSection) return;

            const newParticle = {
                id: particleId++,
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 40 + 30, // Larger for gas effect
                speedX: (Math.random() - 0.5) * 2,
                speedY: -Math.random() * 2 - 1, // Float upward like gas
            };

            setParticles((prev) => [...prev, newParticle]);

            // Remove particle after animation
            setTimeout(() => {
                setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
            }, 2000); // Longer duration for gas effect
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
