import React from 'react';
import { SolutionsHeroSlider } from '../components/SolutionsHeroSlider';
import { SolutionCardsGrid } from '../components/SolutionCardsGrid';
import { ProductsSection } from '../components/ProductsSection';
import { ClientReviewsSection } from '../components/ClientReviewsSection';

interface ProductsPageProps {
  openQuoteModalWithSolution: (solutionTitle: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ openQuoteModalWithSolution }) => {
  return (
    <div style={{ paddingTop: '0px', background: '#050911', color: '#FFFFFF' }}>
      {/* 1. Hero Section Slider (Dilum Sanjaya Concept) */}
      <SolutionsHeroSlider openQuoteModalWithSolution={openQuoteModalWithSolution} />

      {/* 2. Infinite Marquee Carousel: 6 Solution Cards by Sector with Interactive Hover Overlay */}
      <SolutionCardsGrid openQuoteModalWithSolution={openQuoteModalWithSolution} />

      {/* 3. Products & Hardware Catalog */}
      <div id="products-catalog">
        <ProductsSection openQuoteModalWithSolution={openQuoteModalWithSolution} />
      </div>

      {/* 4. Tamil Nadu Client Ratings & Reviews Section (Matching Mockup) */}
      <ClientReviewsSection />
    </div>
  );
};
