import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
import ScrollReveal from './components/ui/ScrollReveal';
import { prefersReducedMotion } from './lib/motion';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Smooth scrolling is an enhancement only: reduced-motion users keep native scrolling.
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // In-page links scroll smoothly and respect each section's scroll-margin-top.
      anchors: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

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

        <ScrollReveal enableBlur={false}>
          <FeatureTabs />
        </ScrollReveal>

        <ScrollReveal enableBlur={false}>
          <Workflow />
        </ScrollReveal>

        <ScrollReveal enableBlur={false}>
          <Operations />
        </ScrollReveal>

        <ScrollReveal enableBlur={false}>
          <TrustSection />
        </ScrollReveal>

        <ScrollReveal enableBlur={false}>
          <VideoSection />
        </ScrollReveal>

        <ScrollReveal enableBlur={false}>
          <Faq />
        </ScrollReveal>

        <ScrollReveal enableBlur={false}>
          <AccountForm />
        </ScrollReveal>
      </main>

      <ScrollReveal enableBlur={false}>
        <Footer />
      </ScrollReveal>

      <MobileCtaBar />
    </div>
  );
}
