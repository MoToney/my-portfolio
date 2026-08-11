import { Button } from "@/src/components/ui/button";
import { ProjectPreview } from "@/src/features/projects/types";
import { ArrowUpRightIcon, ChevronRightIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/src/components/ui/card"
import TechBadge from "@/src/features/projects/components/tech-badge";
import MoreTooltip from "@/src/components/more-tooltip";

export default function ProjectPreviewCard({ project }: { project: ProjectPreview }) {

    const visibleTechnologies = project.technologies.slice(0, 3);
    const remainingTechnologies = project.technologies.slice(3);
    const remainingTechnologiesCount = remainingTechnologies.length;
    const remainingTechnologiesNames = remainingTechnologies.map(tech => tech.name);

  return (
    <Card className="mx-auto w-full max-w-md">

      <CardHeader>
        <CardTitle>{project.name}</CardTitle>

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
        
        <CardDescription>
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex-col gap-2">
        <Button variant="default" size="default" asChild>
            <a href={ project.repoUrl ?? "#" } target="_blank" rel="noopener noreferrer">
                View Repository
                <ArrowUpRightIcon data-icon="inline-end" />
            </a>
        </Button>
      </CardFooter>
      
    </Card>
  )
}


