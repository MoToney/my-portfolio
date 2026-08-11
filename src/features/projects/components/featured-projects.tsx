import Link from "next/link";

import ProjectPreviewCard from "@/src/features/projects/components/project-preview-card";
import { Button } from "@/src/components/ui/button";
import { ProjectPreview } from "../types";

export default function FeaturedProjects({
    projects,
}: {
    projects: ProjectPreview[];
}) {
    return (
        <section className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold mb-4">Projects</h2>

                <Button asChild size="lg">
                    <Link href="/projects">
                        View All Projects
                    </Link>
                </Button>
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
                        <ProjectPreviewCard project={project} />
                    </div>
                ))}
            </div>
        </section>
    );
}