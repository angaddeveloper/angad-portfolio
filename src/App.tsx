import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import InteractiveBackground from './components/InteractiveBackground';
import Loader from './components/Loader';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  // Smooth scroll routing between sections
  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'contact') {
      setContactOpen(true);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main 
      className="relative min-h-screen bg-[#0A0118] text-[#D7E2EA]"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. Initial wordmark entry sequence */}
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {/* 2. Core application layout */}
      {loaded && (
        <>
          {/* Custom cursors, particles trace & following glowing spot */}
          <InteractiveBackground />

          {/* Persistent brand header navigation bar */}
          <Navbar onNavClick={handleNavClick} />

          {/* Standard viewport layout parts */}
          <HeroSection onContactClick={() => setContactOpen(true)} onNavClick={handleNavClick} />
          <MarqueeSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />

          {/* Secure uplink interactive message dialog */}
          <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

          {/* Gorgeous premium animated responsive footer with interactive widgets */}
          <Footer onNavClick={handleNavClick} />
        </>
      )}
    </main>
  );
}
