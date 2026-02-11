# 🧪 Heisenbyte 2026

> **Breaking Bad Themed National Level Technical Symposium**

A stunning, mobile-first event website built with React + Vite, featuring interactive 3D particle effects and a Breaking Bad inspired design.

![Heisenbyte Logo](https://img.shields.io/badge/He-15-39ff14?style=for-the-badge&logo=atom&logoColor=39ff14)

## 🎨 Features

- **Interactive 3D Particle System** - Mouse/touch-responsive Three.js particle background
- **Breaking Bad Theme** - Neon green (#39ff14) chemistry-inspired design
- **Mobile-First Responsive** - Optimized for all devices
- **Smooth Animations** - Staggered fade-ins, glowing effects, and transitions
- **Technical & Non-Technical Events** - 12+ event categories
- **Fast Performance** - Vite-powered with optimized particle counts

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit **http://localhost:5173/** to see the website.

## 📂 Project Structure

```
heisenbyte-website/
├── src/
│   ├── components/
│   │   ├── Hero.jsx           # 3D particle hero section
│   │   ├── Navbar.jsx         # Responsive navigation
│   │   ├── About.jsx          # Event information
│   │   ├── TechnicalEvents.jsx
│   │   ├── NonTechnicalEvents.jsx
│   │   └── Contact.jsx
│   ├── styles/
│   │   └── global.css         # Breaking Bad design system
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json
```

## 🎯 Tech Stack

- **React 18** - UI library
- **Vite 7** - Build tool & dev server
- **Three.js** - 3D graphics
- **Vanilla CSS** - Styling with CSS variables

## 🎨 Design System

### Colors
- Primary: `#39ff14` (Neon Green)
- Secondary: `#FFD700` (Yellow)
- Background: `#000000` (Black)
- Cards: `#1a1a1a` (Dark Gray)

### Breaking Bad Elements
- Periodic table logo: **He₁₅** (Heisenbyte)
- Chemistry-themed event names
- Glowing neon effects
- Molecular particle system

## 📱 Mobile Optimization

- Reduced particle count on mobile (1000 vs 2000)
- Touch-responsive particle interactions
- Hamburger menu navigation
- Fluid typography with `clamp()`
- Optimized for 3G networks

## 🎪 Events

### Technical Events
- Code Cook 💻
- Web Heist 🌐
- AI Lab 🤖
- Circuit Break ⚡
- Data Meth 📊
- Cyber Defense 🔒

### Non-Technical Events
- Pixel Perfect 📸
- Design Lab 🎨
- Game Theory 🎮
- Brain Freeze 🧠
- Pitch Perfect 💼
- Treasure Hunt 🗺️

## 🔧 Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Scripts
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📦 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by Breaking Bad TV series
- Three.js for 3D particle effects
- Vite for blazing-fast development

---

**Built with ⚗️ by the Heisenbyte Team**

*"Chemistry is the study of change"* - Walter White
