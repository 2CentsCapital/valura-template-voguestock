import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureTabs from './components/FeatureTabs';
import Workflow from './components/Workflow';
import Operations from './components/Operations';
import TrustSection from './components/TrustSection';
import VideoSection from './components/VideoSection';
import Faq from './components/Faq';
import AccountForm from './components/AccountForm';
import Footer from './components/Footer';
import MobileCtaBar from './components/MobileCtaBar';
import { useMotionPaused, usePrefersReducedMotion } from './lib/motion';
import { startReveals } from './lib/reveal';

export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const motionPaused = useMotionPaused();

  // One-shot entrance reveals for every visitor (runs after the sections have mounted).
  useEffect(() => startReveals(), []);

  // Smooth scrolling is the one effect switched off under reduced motion; it also stops while animations are paused.
  useEffect(() => {
    if (reducedMotion || motionPaused) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // In-page links scroll smoothly and respect each section's scroll-margin-top.
      anchors: true,
      autoRaf: true,
    });
    return () => lenis.destroy();
  }, [reducedMotion, motionPaused]);

  // Section order follows the live landing: hero and stats, invest, why, how, trust, demo, FAQ, open, footer.
  return (
    <div className="flex min-h-screen flex-col bg-brand-night pb-[76px] text-brand-dark sm:pb-0">
      <a
        href="#main"
        className="sr-only rounded-xl bg-brand-dark px-4 py-3 font-sans font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" tabIndex={-1} className="flex-grow bg-white pt-20 focus:outline-none">
        <Hero />
        <FeatureTabs />
        <Workflow />
        <Operations />
        <TrustSection />
        <VideoSection />
        <Faq />
        <AccountForm />
      </main>

      <Footer />

      <MobileCtaBar />
    </div>
  );
}
