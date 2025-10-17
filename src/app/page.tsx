
import Footer from "@/components/Landing page/Footer/Footer";
import About from "../components/Landing page/About/About";
import CriteriaSection from "../components/Landing page/Criteria/CriteriaSection";
import Hero from "../components/Landing page/Hero/Hero";
import Navbar from "../components/Landing page/Navbar/Navbar";
import ProgramDetailsSection from "../components/Landing page/ProgramDetails/ProgramDetailsSection";
import BenefitsSection from "@/components/Landing page/Benefits/BenefitsSection";
import ContactUs from "@/components/Landing page/ContactUs/ContactUs";

export default function Home() {
  return (
    <main id="#home">
      <Navbar/>
      <Hero/>
      <About/>
      <ProgramDetailsSection/>
      <BenefitsSection/>
      <CriteriaSection/>
      <ContactUs/>
      <Footer/>
    </main>
  );
}
