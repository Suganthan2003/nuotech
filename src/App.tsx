import React, { useState, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer, StickySocialBar, BackToTopButton, ScrollToTop } from '@/components/common';
import { CalculatorModal } from '@/components/modals';
import { IntroSplash } from '@/components/sections';

// Lazy-loaded pages for optimized Level 5 code splitting
const HomePage = lazy(() => import('@/pages/Home'));
const AboutPage = lazy(() => import('@/pages/About'));
const ProductsPage = lazy(() => import('@/pages/Products'));
const CareerPage = lazy(() => import('@/pages/Career'));
const ContactPage = lazy(() => import('@/pages/Contact'));
const SectorDetailPage = lazy(() => import('@/pages/SectorDetail'));

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
          <Suspense fallback={<div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', color: '#0B63CE' }}>Loading SMARToi...</div>}>
            <Routes>
              <Route path="/" element={<HomePage openQuoteModalWithSolution={openQuoteModalWithSolution} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/product" element={<ProductsPage openQuoteModalWithSolution={openQuoteModalWithSolution} />} />
              <Route path="/products" element={<ProductsPage openQuoteModalWithSolution={openQuoteModalWithSolution} />} />
              <Route path="/career" element={<CareerPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/solution/:sectorId" element={<SectorDetailPage openQuoteModalWithSolution={openQuoteModalWithSolution} />} />
              <Route path="/solutions/:sectorId" element={<SectorDetailPage openQuoteModalWithSolution={openQuoteModalWithSolution} />} />
              <Route path="/sectors/:sectorId" element={<SectorDetailPage openQuoteModalWithSolution={openQuoteModalWithSolution} />} />
              {/* Fallback route */}
              <Route path="*" element={<HomePage openQuoteModalWithSolution={openQuoteModalWithSolution} />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <BackToTopButton />
        <StickySocialBar />

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
