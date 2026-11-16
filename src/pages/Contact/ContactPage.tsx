import React, { useEffect } from 'react';
import { ContactSection } from '@/components/sections';

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

export default ContactPage;
