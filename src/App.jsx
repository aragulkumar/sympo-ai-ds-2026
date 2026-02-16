import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import FunGames from './components/FunGames';
import Contact from './components/Contact';
import CursorTrail from './components/CursorTrail';
import './styles/global.css';
import './styles/cursor.css';
import './styles/cinematic.css';

function App() {
  return (
    <div className="App">
      <CursorTrail />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Events />
        <FunGames />
        <Contact />
      </main>
    </div>
  );
}


export default App;
