import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const formulasRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Chemical formulas for Breaking Bad theme
  const chemicalFormulas = [
    'CH₃', 'C₆H₅', 'NH₂', 'OH', 'COOH', 'CH₂',
    'C₂H₅', 'NO₂', 'SO₃', 'PO₄', 'NH₃', 'H₂O',
    'C₃H₇', 'CH₃CO', 'C₆H₁₂O₆', 'NaCl', 'HCl',
    'C₈H₁₀N₄O₂', 'C₁₇H₂₁NO₄', 'C₁₀H₁₅N'
  ];

  // Create canvas texture for chemical formula
  const createFormulaTexture = (formula, color) => {
    const canvas = document.createElement('canvas');
    const size = 256;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Set text properties
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw text
    ctx.fillText(formula, size / 2, size / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

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

    // Create chemical formula sprites
    const formulaCount = window.innerWidth < 768 ? 30 : 50;
    const formulas = [];

    for (let i = 0; i < formulaCount; i++) {
      const formula = chemicalFormulas[Math.floor(Math.random() * chemicalFormulas.length)];

      // Randomly choose between green and gray colors
      const isGreen = Math.random() > 0.5;
      const color = isGreen ? '#39ff14' : '#666666';
      const opacity = isGreen ? (0.6 + Math.random() * 0.4) : (0.3 + Math.random() * 0.3);

      const texture = createFormulaTexture(formula, color);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: opacity,
        depthWrite: false
      });

      const sprite = new THREE.Sprite(material);

      // Random position
      sprite.position.x = (Math.random() - 0.5) * 20;
      sprite.position.y = (Math.random() - 0.5) * 20;
      sprite.position.z = (Math.random() - 0.5) * 20;

      // Random scale
      const scale = 0.3 + Math.random() * 0.5;
      sprite.scale.set(scale, scale, scale);

      // Store rotation speed
      sprite.userData = {
        rotationSpeed: (Math.random() - 0.5) * 0.002,
        driftSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.005
        }
      };

      scene.add(sprite);
      formulas.push(sprite);
    }

    formulasRef.current = formulas;

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

      // Animate each formula sprite
      formulas.forEach((sprite) => {
        // Rotate sprite
        sprite.material.rotation += sprite.userData.rotationSpeed;

        // Gentle drift
        sprite.position.x += sprite.userData.driftSpeed.x;
        sprite.position.y += sprite.userData.driftSpeed.y;
        sprite.position.z += sprite.userData.driftSpeed.z;

        // Wrap around boundaries
        if (sprite.position.x > 10) sprite.position.x = -10;
        if (sprite.position.x < -10) sprite.position.x = 10;
        if (sprite.position.y > 10) sprite.position.y = -10;
        if (sprite.position.y < -10) sprite.position.y = 10;
        if (sprite.position.z > 10) sprite.position.z = -10;
        if (sprite.position.z < -10) sprite.position.z = 10;
      });

      // Camera movement based on mouse
      camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (-mouseRef.current.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

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

      // Dispose of all sprites
      formulas.forEach((sprite) => {
        if (sprite.material.map) sprite.material.map.dispose();
        sprite.material.dispose();
      });

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
