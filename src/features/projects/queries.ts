import { findAll, findBySlug, findFeatured } from "@/src/features/projects/repository";

export function getProjects() {
    return findAll();
}

export function getProjectBySlug(slug: string)  {
    return findBySlug(slug);
}

export function getFeaturedProjects() {
    return findFeatured();
}