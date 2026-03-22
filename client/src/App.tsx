import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Donate from './pages/Donate';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    primary: { main: '#d4a843' },       // Anjio gold
    secondary: { main: '#2c1a0e' },     // Anjio deep brown
    background: {
      default: '#fffbf5',               // warm off-white page bg
      paper: '#fff',
    },
    text: {
      primary: '#1a0a00',               // rich dark brown for headings
      secondary: '#5a3e28',             // warm brown for body text
    },
  },
  typography: {
    fontFamily: "'Nunito', 'Lora', Georgia, serif",
  },
  shape: {
    borderRadius: 10,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Donate />} /> {/* swap with <Contact /> when ready */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;