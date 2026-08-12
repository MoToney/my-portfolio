import { ProjectDetail } from "../types";
import ProjectDetailCard from "./project-detail-card";

export default function ProjectDisplay({
    projects,
}: {
    projects: ProjectDetail[];
}) {
    return (
        <section className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold mb-4">Projects</h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <div
                        key={project.slug}
                        className={
                            projects.length % 2 === 1 &&
                            index === projects.length - 1
                                ? "col-span-2 flex justify-center"
                                : ""
                        }
                    >
                        <ProjectDetailCard project={project} />
                    </div>
                ))}
            </div>        
        </section>
    );
}