import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ProductsPage from './pages/ProductsPage';
import AboutUs from './pages/AboutUs';
import Treatment from './pages/Treatment';

import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      if (location.hash) {
        const element = document.getElementById(location.hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo(0, 0);
      }
    }, 100);
  }, [location]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/treatment" element={<Treatment />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
      <ChatBot />
    </>
  );
}


export default App;
