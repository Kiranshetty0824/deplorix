import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import FYPSection from "@/components/FYPSection";
import WorkflowSection from "@/components/WorkflowSection";
import InternshipSection from "@/components/InternshipSection";
import ProjectsSection from "@/components/ProjectsSection";
import UpcomingProjectsSection from "@/components/UpcomingProjectsSection";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FYPSection />
      <WorkflowSection />
      <InternshipSection />
      <ProjectsSection />
      <UpcomingProjectsSection />
      <ContactSection />
      <CTASection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
