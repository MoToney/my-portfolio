"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import ProjectDetailCard from "./project-detail-card";
import { ProjectDetail } from "@/src/features/projects/types";

export default function ProjectCarousel({
    projects,
}: {
    projects: ProjectDetail[];
}) {
    const [page, setPage] = useState(0);
    console.log("rendering page:", page);

    const projectsPerPage = 4;
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const startIndex = page * projectsPerPage;

    const visibleProjects = projects.slice(
        startIndex,
        startIndex + projectsPerPage
    );

    const previous = () => {
        setPage((page) => page - 1);
    };

    const next = () => {
        console.time("next");

        setPage((page) => page + 1);

        console.timeEnd("next");
    };

    return (
        <section id="projects">
        <h2 className="text-3xl font-bold mb-4">Projects</h2>
        <div className="mt-4 text-center text-sm text-muted-foreground">
                {startIndex + 1}–{Math.min(startIndex + 4, projects.length)} of{" "}
                {projects.length} projects
        </div>

        <div className="flex w-full items-center gap-4">
            <Button
                variant="default"
                size="icon"
                onClick={previous}
                disabled={page === 0}
            >
                <ChevronLeftIcon className="size-5" />
            </Button>

            <div className="min-w-0 flex-1">
                <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-4">
                    {visibleProjects[0] && (
                        <ProjectDetailCard project={visibleProjects[0]} />
                    )}

                    {visibleProjects[1] && (
                        <ProjectDetailCard project={visibleProjects[1]} />
                    )}

                    {visibleProjects[2] && (
                        <ProjectDetailCard project={visibleProjects[2]} />
                    )}

                    {visibleProjects[3] && (
                        <ProjectDetailCard project={visibleProjects[3]} />
                    )}
                </div>
            </div>

            <Button
                variant="default"
                size="icon"
                onClick={next}
                disabled={page >= totalPages - 1}
            >
                <ChevronRightIcon className="size-5" />
            </Button>
        </div>
        </section>
    );
}







