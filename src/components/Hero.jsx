import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particles
    const particleCount = window.innerWidth < 768 ? 1000 : 2000; // Reduce for mobile
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      color: 0x39ff14,
      size: 0.1,
      transparent: true,
      opacity: 0.8
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse move handler
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX - window.innerWidth / 2) / 500;
      mouseRef.current.y = (event.clientY - window.innerHeight / 2) / 500;
    };

    // Touch move handler for mobile
    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        mouseRef.current.x = (event.touches[0].clientX - window.innerWidth / 2) / 500;
        mouseRef.current.y = (event.touches[0].clientY - window.innerHeight / 2) / 500;
      }
    };

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      particles.rotation.x += mouseRef.current.y * 0.01;
      particles.rotation.y += mouseRef.current.x * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current && renderer.domElement) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const scrollToEvents = () => {
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div ref={canvasRef} className="hero-canvas"></div>
      <div className="hero-content">
        <div className="hero-logo">
          <span className="logo-he">He</span>
          <span className="logo-number">15</span>
        </div>
        <h1 className="hero-title">HEISENBYTE</h1>
        <p className="hero-subtitle">National Level Technical Symposium 2026</p>
        <p className="hero-tagline">Move your cursor and feel the chemistry.</p>
        <div className="hero-buttons">
          <button className="btn" onClick={scrollToEvents}>
            Explore Events
          </button>
          <button className="btn btn-secondary">
            Register Now
          </button>
        </div>
        <div className="hero-info">
          <div className="info-item">
            <span className="info-label">Date</span>
            <span className="info-value">Coming Soon</span>
          </div>
          <div className="info-item">
            <span className="info-label">Venue</span>
            <span className="info-value">Your College</span>
          </div>
          <div className="info-item">
            <span className="info-label">Theme</span>
            <span className="info-value">Breaking Bad</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
