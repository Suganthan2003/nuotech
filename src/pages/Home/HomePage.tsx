import React from 'react';
import { Hero, AboutUsSection, ProcessSection, SolutionsSection, CtaBannerSection } from '@/components/sections';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  openQuoteModalWithSolution: (solutionTitle?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ openQuoteModalWithSolution }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Hero 
        openQuoteModal={() => openQuoteModalWithSolution()} 
        scrollToSection={(id) => {
          if (id === 'solutions') navigate('/product');
          else if (id === 'about') navigate('/about');
          else if (id === 'contact') navigate('/contact');
        }} 
      />

      {/* About Us Section directly after Hero */}
      <AboutUsSection />

      {/* 07-Step Ascending Real Staircase Process directly after About Us */}
      <ProcessSection />

      <SolutionsSection openQuoteModalWithSolution={openQuoteModalWithSolution} />

      {/* Home CTA Banner (Matching target 3D polygonal light design) */}
      <CtaBannerSection 
        openQuoteModal={() => openQuoteModalWithSolution()}
        onContactClick={() => navigate('/contact')}
      />
    </div>
  );
};

export default HomePage;
