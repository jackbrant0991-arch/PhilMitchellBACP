import { useState, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProofBar } from './components/ProofBar';
import { SocialProof } from './components/SocialProof';
import { Syllabus } from './components/Syllabus';
import { SomaticQuiz } from './components/SomaticQuiz';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { JourneyLine } from './components/JourneyLine';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { ApplicationModal } from './components/ApplicationModal';
import { DiscoveryCallModal } from './components/DiscoveryCallModal';

function App() {
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [discoveryModalOpen, setDiscoveryModalOpen] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState<string | undefined>(undefined);

  const openAppModal = useCallback((programme?: string) => {
    setSelectedProgramme(programme);
    setAppModalOpen(true);
  }, []);

  const openDiscoveryModal = useCallback(() => {
    setDiscoveryModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FDFDF8' }}>
      <Analytics />
      {/* Scroll-driven journey indicator (Desktop) */}
      <JourneyLine />

      {/* Fixed header sits above the fold */}
      <Header onApply={() => openAppModal()} />

      <main id="main-content" tabIndex={-1}>
        <section id="hero">
          <Hero
            onApply={() => openAppModal()}
            onDiscovery={() => openDiscoveryModal()}
          />
        </section>

        <section id="proof">
          <ProofBar />
        </section>

        <section id="state-shift">
          <SocialProof />
        </section>

        <Syllabus />

        <SomaticQuiz onApply={(prog) => openAppModal(prog)} />

        <Pricing onApply={(prog) => openAppModal(prog)} />

        <FAQ />
      </main>

      <Footer
        onApply={() => openAppModal()}
        onDiscovery={() => openDiscoveryModal()}
      />

      {/* Bottom bar (Mobile) */}
      <StickyMobileCTA onApply={() => openAppModal()} />

      {/* Global Modals */}
      <ApplicationModal
        isOpen={appModalOpen}
        onClose={() => setAppModalOpen(false)}
        defaultProgramme={selectedProgramme}
      />

      <DiscoveryCallModal
        isOpen={discoveryModalOpen}
        onClose={() => setDiscoveryModalOpen(false)}
      />
    </div>
  );
}

export default App;
