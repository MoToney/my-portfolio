import { db } from "@/src/lib/db";
import type { ProjectDetail, ProjectPreview } from "@/src/features/projects/types";


const technologySelect = {
  name: true,
  slug: true,
  icon: true,
  badgeTextColor: true,
  badgeBackgroundColor: true,
} as const;

const categorySelect = {
  name: true,
  slug: true,
} as const;

const projectPreviewSelect = {
  name: true,
  slug: true,
  description: true,
  icon: true,
  repoUrl: true,
  technologies: {
    select: technologySelect,
  },
  categories: {
    select: categorySelect,
  },
} as const;

const projectDetailSelect = {
  ...projectPreviewSelect,
  content: true,
  liveUrl: true,
  status: true,
} as const;

export function findAll(): Promise<ProjectDetail[]> {
    return db.project.findMany({
        select: projectDetailSelect,
    });
}

export function findBySlug(slug: string): Promise<ProjectDetail | null> {
    return db.project.findUnique({
        where: { slug },
        select: projectDetailSelect,
    });
}

export function findFeatured(): Promise<ProjectPreview[]> {
    return db.project.findMany({
        where: { featured: true },
        select: projectPreviewSelect,
    });
}


        