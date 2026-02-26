import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Messages from './pages/Messages';
import Contact from './pages/Contact';
import FloralDecoration from './components/FloralDecoration';
import FallingHearts from './components/FallingHearts';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative overflow-x-hidden">
        <FloralDecoration />
        <FallingHearts />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
