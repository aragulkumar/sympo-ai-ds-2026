import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import FunGames from './components/FunGames';
import Contact from './components/Contact';
import Coordinators from './components/Coordinators';
import CursorTrail from './components/CursorTrail';
import EventDetails from './components/EventDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './styles/global.css';
import './styles/cursor.css';
import './styles/cinematic.css';

const LandingPage = () => (
  <>
    <Hero />
    <About />
    <Events />
    <FunGames />
    <Coordinators />
    <Contact />
  </>
);

function App() {
  return (
    <Router>
      <div className="App">
        <CursorTrail />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
