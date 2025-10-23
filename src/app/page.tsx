import Footer from "@/components/Landingpage/Footer/Footer";
import About from "../components/Landingpage/About/About";
import BenefitsSection from "../components/Landingpage/Benefits/BenefitsSection";
import CriteriaSection from "../components/Landingpage/Criteria/CriteriaSection";
import Hero from "../components/Landingpage/Hero/Hero";
import Navbar from "../components/Landingpage/Navbar/Navbar";
import ProgramDetailsSection from "../components/Landingpage/ProgramDetails/ProgramDetailsSection";
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <ProgramDetailsSection />
      <BenefitsSection />
      <CriteriaSection />
      <Footer />
    </main>
  );
}
