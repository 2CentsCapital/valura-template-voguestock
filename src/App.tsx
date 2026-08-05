import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureTabs from './components/FeatureTabs';
import Operations from './components/Operations';
import Workflow from './components/Workflow';
import AccountForm from './components/AccountForm';
import Faq from './components/Faq';
import Footer from './components/Footer';
import TrustSection from './components/TrustSection';
import VideoSection from './components/VideoSection';
import ScrollReveal from './components/ui/ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Reset scroll restoration to manual so the browser does not jump on reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Scroll to the very top of the page
    window.scrollTo(0, 0);

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Synchronize Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateFn = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateFn);
      lenis.destroy();
    };
  }, []);
  return (
    <div className="bg-white text-brand-dark flex flex-col">
      {/* Header Navigation */}
      <Header />

      {/* Main Content Layout */}
      <main className="flex-grow pt-20">
        {/* Hero Section with stats bar */}
        <Hero />

        {/* Trust badges — SEBI, IFSCA, NSDL, GIFT City */}
        <ScrollReveal baseRotation={0} baseOpacity={0.2} blurStrength={3}>
          <TrustSection />
        </ScrollReveal>

        {/* Feature Tabs section */}
        <ScrollReveal baseRotation={0} baseOpacity={0.2} blurStrength={3}>
          <FeatureTabs />
        </ScrollReveal>

        {/* Bento grid and stats count banner */}
        <ScrollReveal baseRotation={0} baseOpacity={0.2} blurStrength={3}>
          <Operations />
        </ScrollReveal>

        {/* Workflow charts and details */}
        <ScrollReveal baseRotation={0} baseOpacity={0.2} blurStrength={3}>
          <Workflow />
        </ScrollReveal>

        {/* Video Demo Section */}
        <ScrollReveal baseRotation={0} baseOpacity={0.2} blurStrength={3}>
          <VideoSection />
        </ScrollReveal>

        {/* Lead capture open account form */}
        <ScrollReveal baseRotation={0} baseOpacity={0.2} blurStrength={3}>
          <AccountForm />
        </ScrollReveal>

        {/* Frequently Asked Questions */}
        <ScrollReveal baseRotation={0} baseOpacity={0.2} blurStrength={3}>
          <Faq />
        </ScrollReveal>
      </main>

      {/* Footer block */}
      <ScrollReveal baseRotation={0} baseOpacity={0.2} blurStrength={3}>
        <Footer />
      </ScrollReveal>
    </div>
  );
}
