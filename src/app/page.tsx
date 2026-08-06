import Image from "next/image";
import { findFeatured } from "../features/projects/repository";
import { ProjectPreview } from "../features/projects/types";
import FeaturedProjects from "../components/featured-projects";
import ContactForm from "@/src/components/contact-form";
import AboutSection from "../features/about/about-section";

import ResumeViewer from "../features/resume/resume-viewer";


export default async function Home() {
    const projects: ProjectPreview[] = await findFeatured();

    

    return (
    <main className="container mx-auto px-4 py-12 space-y-16">
      <AboutSection />
      <FeaturedProjects projects={projects} />

      <ResumeViewer />
      <div className="border-t pt-12">
        <ContactForm />
      </div>
    </main>
  );
}
