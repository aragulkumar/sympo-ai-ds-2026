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

            // Create particles more frequently for smooth continuous trail
            const now = Date.now();
            if (now - lastTime < 20) return; // Create particle every 20ms for smooth trail
            lastTime = now;

            const newParticle = {
                id: particleId++,
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 15 + 15, // Smaller particles (15-30px)
                speedX: (Math.random() - 0.5) * 1,
                speedY: -Math.random() * 1 - 0.3,
            };

            setParticles((prev) => [...prev, newParticle]);

            // Remove particle after animation
            setTimeout(() => {
                setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
            }, 2000);
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
