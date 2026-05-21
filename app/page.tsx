/**
 * @file app/page.tsx
 * @description Main marketing index page (Landing Page).
 * Integrates all section views (Hero, Problem, Features, How it Works, Testimonials, Pricing, CTA)
 * into a single unified page flow.
 */

import CTA from '../components/landing/cta';
import Features from '../components/landing/Features';
import Footer from '../components/landing/footer';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/How-it-works';
import Navbar from '../components/landing/Navbar';
import Pricing from '../components/landing/pricing';
import Problem from '../components/landing/Problem';
// import SocialProof from './landing/social-proof';
import Testimonials from '../components/landing/testimonials';

/**
 * Marketing Landing Page Component.
 * Assembles modular visual panels to form the homepage layout.
 */
export default function Home() {
  return (
    <main className="min-h-screen text-gray-900 dark:text-gray-100 overflow-x-hidden scroll-smooth">
      {/* 1. Sticky Navigation Bar */}
      <Navbar />

      {/* 2. Visual Hero Panel */}
      <Hero />

      {/* 3. Problem/Pain Point analysis section */}
      <Problem />

      {/* 4. Core product features catalog */}
      <Features />

      {/* 5. How-It-Works interactive timeline */}
      <HowItWorks />

      {/* 6. Social proof trust indicators (commented out until active telemetry) */}
      {/* <SocialProof /> */}

      {/* 7. Client/Principal testimonials slider */}
      <Testimonials />

      {/* 8. Pricing packages breakdown */}
      <Pricing />

      {/* 9. Final Call-to-Action conversion panel */}
      <CTA />

      {/* 10. Multi-column sitemap footer */}
      <Footer />
    </main>
  );
}

