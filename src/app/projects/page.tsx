import ProjectDisplay from "@/src/features/projects/components/project-display";
import { findAll } from "@/src/features/projects/repository";
import { ProjectDetail } from "@/src/features/projects/types";

export default async function ProjectsPage() {
    const projects: ProjectDetail[] = await findAll();
    return (
        <>
        <section>
            <h1> Projects </h1>
            <p>
                Here are some of the projects I have worked on:
            </p>
        </section>
        <ProjectDisplay projects={projects}/> 
        </>
    )
}