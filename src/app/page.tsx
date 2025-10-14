/**
 * Home page component.
 *
 * Renders the main landing page of the application.
 *
 * @returns The main content of the home page wrapped in a <main> element.
 */

import About from "./_components/About/About";
import BenefitsSection from "./_components/Benefits/BenefitsSection";
import CriteriaSection from "./_components/Criteria/CriteriaSection";
import Hero from "./_components/Hero/Hero";
import Navbar from "./_components/Navbar/Navbar";
import ProgramDetailsSection from "./_components/ProgramDetails/ProgramDetailsSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <ProgramDetailsSection />
      <BenefitsSection />
      <CriteriaSection />
    </main>
  );
}
