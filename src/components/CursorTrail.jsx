import { useEffect, useState } from 'react';
import './CursorTrail.css';

const CursorTrail = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        let particleId = 0;

        const handleMouseMove = (e) => {
            const newParticle = {
                id: particleId++,
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 20 + 10,
            };

            setParticles((prev) => [...prev, newParticle]);

            // Remove particle after animation
            setTimeout(() => {
                setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
            }, 1000);
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
                    className="cursor-particle"
                    style={{
                        left: `${particle.x}px`,
                        top: `${particle.y}px`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                    }}
                />
            ))}
        </div>
    );
};

export default CursorTrail;
