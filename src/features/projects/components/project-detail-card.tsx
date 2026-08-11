import { Button } from "@/src/components/ui/button";
import { ProjectDetail, ProjectPreview } from "@/src/features/projects/types";
import { ArrowUpRightIcon, ChevronRightIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/src/components/ui/card"
import TechBadge from "@/src/features/projects/components/tech-badge";
import MoreTooltip from "@/src/components/more-tooltip";
import { ProjectStatus } from "@/prisma/generated/enums";
import { CheckCircle2, LoaderCircle } from "lucide-react";

export default function ProjectDetailCard({ project }: { project: ProjectDetail }) {

    const visibleTechnologies = project.technologies.slice(0, 4);
    const remainingTechnologies = project.technologies.slice(4);
    const remainingTechnologiesCount = remainingTechnologies.length;
    const remainingTechnologiesNames = remainingTechnologies.map(tech => tech.name);

    return (
        <Card className="mx-auto w-full max-w-md">

            <CardHeader>
                <div className="flex gap-4 ">
                    <CardTitle className="flex text-lg ">
                        {project.name}

                    </CardTitle>
                    {project.status === ProjectStatus.COMPLETED ? (
                        <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle2 className="size-3" />
                            <span className="text-sm">Completed</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-blue-600">
                            <LoaderCircle className="size-3" />
                            <span className="text-sm">In Progress</span>
                        </div>
                    )}
                </div>


                <CardDescription>
                    <div className="flex flex-wrap items-center gap-1">
                        {visibleTechnologies.map((tech) => (
                            <span key={tech.slug} className="mr-1">
                                <TechBadge technology={tech} />
                            </span>
                        ))}

                        {remainingTechnologiesCount > 0 && (
                            <MoreTooltip
                                count={remainingTechnologiesCount}
                                items={remainingTechnologiesNames}
                            />
                        )}
                    </div>

                </CardDescription>
            </CardHeader>

            <CardContent>
                <p>
                    {project.content}
                </p>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button variant="default" size="default" asChild>
                    <a href={project.repoUrl ?? "#"} target="_blank" rel="noopener noreferrer">
                        View Repository
                        <ArrowUpRightIcon data-icon="inline-end" />
                    </a>
                </Button>
            </CardFooter>

        </Card>
    )
}


