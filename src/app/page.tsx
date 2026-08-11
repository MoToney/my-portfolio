import Image from "next/image";
import { findAll, findFeatured } from "../features/projects/repository";
import { ProjectDetail, ProjectPreview } from "../features/projects/types";
import FeaturedProjects from "../features/projects/components/featured-projects";
import ContactForm from "@/src/features/contact/components/contact-form";
import AboutSection from "../features/about/about-section";

import ResumeViewer from "../features/resume/components/resume-viewer";
import ProjectCarousel from "../features/projects/components/project-carousel";


export default async function Home() {    
    const p: ProjectDetail[] = await findAll();

    

    return (
    <main className="container mx-auto px-4 py-12 space-y-16">
      <AboutSection />
      <ProjectCarousel projects={p} />
      <div className="border-t pt-12">
        <ContactForm />
      </div>
    </main>
  );
}
