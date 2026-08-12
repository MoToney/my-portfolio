import { findAll } from "../features/projects/repository";
import { ProjectDetail } from "../features/projects/types";
import ContactForm from "@/src/features/contact/components/contact-form";
import AboutSection from "../features/about/about-section";
import ProjectCarousel from "../features/projects/components/project-carousel";
import { StickyNavigation } from "../components/sticky-navigation";
import { Toaster } from "../components/ui/sonner";


export default async function Home() {
  const projects: ProjectDetail[] = await findAll();
  return (
    <>
      <header className="relative flex items-center justify-center">
        <span className="text-5xl font-bold text-[#D3BC8D] [-webkit-text-stroke:2px_black]">
          Maurice Toney
        </span>        
        <StickyNavigation />
      </header>

      <main className="container mx-auto px-4 py-12 space-y-16">
        <AboutSection />
        <ProjectCarousel projects={projects} />
        <ContactForm />
        <Toaster/>
        
      </main>
    </>
  );
}
