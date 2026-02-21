import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import heisenbyteLogo from '../assets/heisenbyte-logo.png';
import Countdown from './Countdown';
import './Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const formulasRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Molecular structures for Breaking Bad theme
  const moleculeTypes = [
    'benzene', 'phenyl', 'methyl', 'amine',
    'caffeine', 'ephedrine', 'pseudoephedrine', 'pyridine',
    'benzene', 'phenyl', 'benzene', 'amine', // Repeat popular ones
    'caffeine', 'ephedrine', 'benzene', 'pyridine'
  ];

  // Draw molecular structures on canvas
  const drawMolecularStructure = (ctx, type, color, size) => {
    const centerX = size / 2;
    const centerY = size / 2;
    const scale = size / 400; // Scale factor

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 3 * scale;
    ctx.font = `bold ${24 * scale}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    switch (type) {
      case 'benzene':
        // Benzene ring (C6H6)
        const radius = 60 * scale;
        for (let i = 0; i < 6; i++) {
          const angle1 = (Math.PI / 3) * i - Math.PI / 2;
          const angle2 = (Math.PI / 3) * (i + 1) - Math.PI / 2;
          const x1 = centerX + radius * Math.cos(angle1);
          const y1 = centerY + radius * Math.sin(angle1);
          const x2 = centerX + radius * Math.cos(angle2);
          const y2 = centerY + radius * Math.sin(angle2);

          // Draw bond
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();

          // Draw double bonds (inner circle)
          if (i % 2 === 0) {
            const innerRadius = radius * 0.75;
            const ix1 = centerX + innerRadius * Math.cos(angle1);
            const iy1 = centerY + innerRadius * Math.sin(angle1);
            const ix2 = centerX + innerRadius * Math.cos(angle2);
            const iy2 = centerY + innerRadius * Math.sin(angle2);
            ctx.beginPath();
            ctx.moveTo(ix1, iy1);
            ctx.lineTo(ix2, iy2);
            ctx.stroke();
          }
        }
        break;

      case 'phenyl':
        // Phenyl group with substituent
        const r = 50 * scale;
        for (let i = 0; i < 6; i++) {
          const a1 = (Math.PI / 3) * i - Math.PI / 2;
          const a2 = (Math.PI / 3) * (i + 1) - Math.PI / 2;
          ctx.beginPath();
          ctx.moveTo(centerX + r * Math.cos(a1), centerY + r * Math.sin(a1));
          ctx.lineTo(centerX + r * Math.cos(a2), centerY + r * Math.sin(a2));
          ctx.stroke();
        }
        // Add CH3 group
        ctx.fillText('CH₃', centerX, centerY - r - 30 * scale);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - r);
        ctx.lineTo(centerX, centerY - r - 20 * scale);
        ctx.stroke();
        break;

      case 'methyl':
        // Methyl group structure
        ctx.fillText('CH₃', centerX, centerY);
        const bondLen = 40 * scale;
        for (let i = 0; i < 3; i++) {
          const angle = (Math.PI * 2 / 3) * i;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(centerX + bondLen * Math.cos(angle), centerY + bondLen * Math.sin(angle));
          ctx.stroke();
          ctx.fillText('H', centerX + (bondLen + 15 * scale) * Math.cos(angle), centerY + (bondLen + 15 * scale) * Math.sin(angle));
        }
        break;

      case 'amine':
        // Amine group (NH2)
        ctx.fillText('N', centerX, centerY);
        ctx.beginPath();
        ctx.moveTo(centerX - 20 * scale, centerY - 20 * scale);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();
        ctx.fillText('H', centerX - 30 * scale, centerY - 30 * scale);
        ctx.beginPath();
        ctx.moveTo(centerX + 20 * scale, centerY - 20 * scale);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();
        ctx.fillText('H', centerX + 30 * scale, centerY - 30 * scale);
        break;

      case 'caffeine':
        // Simplified caffeine structure (two fused rings)
        // First ring (5-membered)
        const r1 = 40 * scale;
        for (let i = 0; i < 5; i++) {
          const a1 = (Math.PI * 2 / 5) * i;
          const a2 = (Math.PI * 2 / 5) * (i + 1);
          ctx.beginPath();
          ctx.moveTo(centerX + r1 * Math.cos(a1), centerY + r1 * Math.sin(a1));
          ctx.lineTo(centerX + r1 * Math.cos(a2), centerY + r1 * Math.sin(a2));
          ctx.stroke();
        }
        // Second ring (6-membered, attached)
        const r2 = 45 * scale;
        const offsetX = 50 * scale;
        for (let i = 0; i < 6; i++) {
          const a1 = (Math.PI / 3) * i;
          const a2 = (Math.PI / 3) * (i + 1);
          ctx.beginPath();
          ctx.moveTo(centerX + offsetX + r2 * Math.cos(a1), centerY + r2 * Math.sin(a1));
          ctx.lineTo(centerX + offsetX + r2 * Math.cos(a2), centerY + r2 * Math.sin(a2));
          ctx.stroke();
        }
        ctx.fillText('N', centerX, centerY - r1);
        ctx.fillText('O', centerX + offsetX, centerY - r2 - 20 * scale);
        break;

      case 'ephedrine':
        // Simplified ephedrine structure
        const ringR = 45 * scale;
        // Benzene ring
        for (let i = 0; i < 6; i++) {
          const a1 = (Math.PI / 3) * i - Math.PI / 2;
          const a2 = (Math.PI / 3) * (i + 1) - Math.PI / 2;
          ctx.beginPath();
          ctx.moveTo(centerX + ringR * Math.cos(a1), centerY + ringR * Math.sin(a1));
          ctx.lineTo(centerX + ringR * Math.cos(a2), centerY + ringR * Math.sin(a2));
          ctx.stroke();
        }
        // Side chain
        ctx.beginPath();
        ctx.moveTo(centerX + ringR, centerY);
        ctx.lineTo(centerX + ringR + 40 * scale, centerY);
        ctx.stroke();
        ctx.fillText('OH', centerX + ringR + 60 * scale, centerY);
        ctx.fillText('NH', centerX + ringR + 40 * scale, centerY - 30 * scale);
        break;

      case 'pseudoephedrine':
        // Similar to ephedrine but different stereochemistry indicator
        const pR = 45 * scale;
        for (let i = 0; i < 6; i++) {
          const a1 = (Math.PI / 3) * i - Math.PI / 2;
          const a2 = (Math.PI / 3) * (i + 1) - Math.PI / 2;
          ctx.beginPath();
          ctx.moveTo(centerX + pR * Math.cos(a1), centerY + pR * Math.sin(a1));
          ctx.lineTo(centerX + pR * Math.cos(a2), centerY + pR * Math.sin(a2));
          ctx.stroke();
        }
        ctx.fillText('CH₃', centerX, centerY);
        ctx.fillText('NH₂', centerX + pR + 50 * scale, centerY);
        ctx.beginPath();
        ctx.moveTo(centerX + pR, centerY);
        ctx.lineTo(centerX + pR + 35 * scale, centerY);
        ctx.stroke();
        break;

      case 'pyridine':
        // Pyridine ring (6-membered with N)
        const pyR = 50 * scale;
        for (let i = 0; i < 6; i++) {
          const a1 = (Math.PI / 3) * i - Math.PI / 2;
          const a2 = (Math.PI / 3) * (i + 1) - Math.PI / 2;
          ctx.beginPath();
          ctx.moveTo(centerX + pyR * Math.cos(a1), centerY + pyR * Math.sin(a1));
          ctx.lineTo(centerX + pyR * Math.cos(a2), centerY + pyR * Math.sin(a2));
          ctx.stroke();
        }
        ctx.fillText('N', centerX, centerY - pyR);
        break;

      default:
        // Simple bond structure
        ctx.beginPath();
        ctx.moveTo(centerX - 40 * scale, centerY);
        ctx.lineTo(centerX + 40 * scale, centerY);
        ctx.stroke();
        ctx.fillText('C', centerX - 40 * scale, centerY);
        ctx.fillText('C', centerX + 40 * scale, centerY);
    }
  };

  // Create canvas texture for molecular structure
  const createMolecularTexture = (moleculeType, color) => {
    const canvas = document.createElement('canvas');
    const size = 512;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Add subtle glow effect
    ctx.shadowBlur = 15;
    ctx.shadowColor = color;

    // Draw molecular structure
    drawMolecularStructure(ctx, moleculeType, color, size);

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

    // Create chemical formula sprites - MORE formulas
    const formulaCount = window.innerWidth < 768 ? 150 : 250; // Increased to 250
    const formulas = [];

    for (let i = 0; i < formulaCount; i++) {
      const moleculeType = moleculeTypes[Math.floor(Math.random() * moleculeTypes.length)];

      // Randomly choose between green and gray colors
      const isGreen = Math.random() > 0.5;
      const color = isGreen ? '#39ff14' : '#888888'; // Lighter gray
      const opacity = isGreen ? (0.8 + Math.random() * 0.2) : (0.5 + Math.random() * 0.3); // Brighter

      const texture = createMolecularTexture(moleculeType, color);
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

      // Much larger scale for bigger molecules
      const scale = 1.2 + Math.random() * 1.6; // Increased from 0.8-2.0
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

    // Mouse move handler - increased sensitivity
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX - window.innerWidth / 2) / 200; // Increased sensitivity from 500
      mouseRef.current.y = (event.clientY - window.innerHeight / 2) / 200;
    };

    // Touch move handler for mobile - increased sensitivity
    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        mouseRef.current.x = (event.touches[0].clientX - window.innerWidth / 2) / 200; // Increased sensitivity
        mouseRef.current.y = (event.touches[0].clientY - window.innerHeight / 2) / 200;
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
    document.getElementById('technical-events')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div ref={canvasRef} className="hero-canvas"></div>
      <div className="hero-content">
        <p className="hero-college">Jeppiaar Engineering College</p>
        <p className="hero-dept">Department of Artificial Intelligence &amp; Data Science</p>
        <img src={heisenbyteLogo} alt="HEISENBYTE" className="hero-title-image" />
        <p className="hero-subtitle">National Level Technical Symposium 2026</p>
        <p className="hero-tagline">Move your cursor and feel the chemistry.</p>
        <Countdown />
        <p className="hero-event-date">5TH MARCH 2026</p>
        <div className="hero-buttons">
          <button className="btn btn-explore" onClick={scrollToEvents}>
            Explore Events
          </button>
        </div>
        <div className="hero-info">
          <div className="info-item">
            <span className="info-label">Duration</span>
            <span className="info-value">1 Day</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total Events</span>
            <span className="info-value">14 Events</span>
          </div>
          <div className="info-item">
            <span className="info-label">Venue</span>
            <span className="info-value">AI & DS Block</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
