import CTA from './landing/cta';
import Features from './landing/Features';
import Footer from './landing/footer';
import Hero from './landing/Hero';
import HowItWorks from './landing/How-it-works';
import Navbar from './landing/Navbar';
import Pricing from './landing/pricing';
import Problem from './landing/Problem';
// import SocialProof from './landing/social-proof';
import Testimonials from './landing/testimonials';

export default function Home() {
  return (
    <main className="min-h-screen text-gray-900 dark:text-gray-100 overflow-x-hidden scroll-smooth">
      {/* ---NAV--- */}
      <Navbar />
      {/* ---HERO--- */}
      <Hero />
      {/* ---PROBLEM--- */}
      <Problem />
      {/* ---FEATURES--- */}
      <Features />
      {/* ---HOW IT WORKS--- */}
      <HowItWorks />
      {/* ----Social proof banner---- */}
      {/* <SocialProof /> */}
      {/* ---Testimonials--- */}
      <Testimonials />
      {/* ---Pricing--- */}
      <Pricing />
      {/* ---CTA--- */}
      <CTA />
      {/* ---Footer--- */}
      <Footer />
    </main>
  );
}
