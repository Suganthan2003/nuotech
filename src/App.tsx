import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CalculatorModal } from './components/CalculatorModal';
import { ScrollToTop } from './components/ScrollToTop';
import { IntroSplash } from './components/IntroSplash';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { CareerPage } from './pages/CareerPage';
import { ContactPage } from './pages/ContactPage';
import { SectorDetailPage } from './pages/SectorDetailPage';

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [selectedSolutionForQuote, setSelectedSolutionForQuote] = useState<string | undefined>(undefined);

  const openQuoteModalWithSolution = (solutionTitle?: string) => {
    setSelectedSolutionForQuote(solutionTitle);
    setQuoteModalOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      
      {/* 10-Second Animated Letter Intro Splash */}
      {showIntro && (
        <IntroSplash onComplete={() => setShowIntro(false)} />
      )}

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Full-Width Top Navbar (Appears when intro finishes / skipped) */}
        {!showIntro && (
          <Navbar 
            openQuoteModal={() => openQuoteModalWithSolution()} 
          />
        )}

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage openQuoteModalWithSolution={openQuoteModalWithSolution} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/product" element={<ProductsPage openQuoteModalWithSolution={openQuoteModalWithSolution} />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/solution/:sectorId" element={<SectorDetailPage openQuoteModalWithSolution={openQuoteModalWithSolution} />} />
            <Route path="/solutions/:sectorId" element={<SectorDetailPage openQuoteModalWithSolution={openQuoteModalWithSolution} />} />
            {/* Fallback route */}
            <Route path="*" element={<HomePage openQuoteModalWithSolution={openQuoteModalWithSolution} />} />
          </Routes>
        </main>

        <Footer />

        <CalculatorModal 
          isOpen={quoteModalOpen} 
          onClose={() => setQuoteModalOpen(false)} 
          preSelectedSolution={selectedSolutionForQuote}
        />
      </div>
    </Router>
  );
};

export default App;
