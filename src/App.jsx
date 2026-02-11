import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechnicalEvents from './components/TechnicalEvents';
import NonTechnicalEvents from './components/NonTechnicalEvents';
import Contact from './components/Contact';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechnicalEvents />
        <NonTechnicalEvents />
        <Contact />
      </main>
    </div>
  );
}

export default App;
