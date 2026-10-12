import React, { useEffect } from 'react';
import { ContactSection } from '../components/ContactSection';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ContactSection />
    </div>
  );
};
