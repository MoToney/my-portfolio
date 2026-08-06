
export type ProjectPreview = {
    name: string;
    slug: string;
    description: string;
    icon: string | null;
    repoUrl: string | null;
    technologies: Technology[];
    categories: Category[];
}

export type ProjectDetail = ProjectPreview & {
    content: string;
    liveUrl: string | null;
    status: ProjectStatus;
}

export type ProjectStatus =
    | "IN_PROGRESS"
    | "COMPLETED"
    | "ON_HOLD";

export type Technology = {
    name: string;
    slug: string;
    icon: string | null;
    badgeTextColor: string;
    badgeBackgroundColor: string;
}

export type Category = {
    name: string;
    slug: string;
}