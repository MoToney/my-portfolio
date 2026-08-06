import { ProjectStatus } from "./generated/client";
import {db} from "../src/lib/db";



async function main() {
  
    const categories = [
  {
    name: "Algorithms",
    slug: "algorithms",
  },
  {
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
  },
  {
    name: "Backend",
    slug: "backend",
  },
  {
    name: "Cloud",
    slug: "cloud",
  },
  {
    name: "Data Science",
    slug: "data-science",
  },
  {
    name: "Full Stack",
    slug: "full-stack",
  },
  {
    name: "Machine Learning",
    slug: "machine-learning",
  },
  {
    name: "Systems Programming",
    slug: "systems-programming",
  },
  {
    name: "Web Development",
    slug: "web-development",
  },
  ];

  for (const category of categories) {
  await db.category.upsert({
    where: {
      slug: category.slug,
    },
    update: {
      name: category.name,
    },
    create: category,
  });
  }

  const technologies = [
    {
      name: "Angular",
      slug: "angular",
      badgeBackgroundColor: "#DD0031",
    },
    {
      name: "AWS S3",
      slug: "aws-s3",
      badgeBackgroundColor: "#FF9900",
    },
    {
      name: "Azure",
      slug: "azure",
      badgeBackgroundColor: "#0078D4",
    },
    {
      name: "Docker",
      slug: "docker",
      badgeBackgroundColor: "#2496ED",
    },
    {
      name: "Inngest",
      slug: "inngest",
      badgeBackgroundColor: "#000000",
    },
    {
      name: "Java",
      slug: "java",
      badgeBackgroundColor: "#007396",
    },
    {
      name: "JUnit",
      slug: "junit",
      badgeBackgroundColor: "#25A162",
    },
    {
      name: "Modal",
      slug: "modal",
      badgeBackgroundColor: "#000000",
    },
    {
      name: "Next.js",
      slug: "nextjs",
      badgeBackgroundColor: "#000000",
    },
    {
      name: "NumPy",
      slug: "numpy",
      badgeBackgroundColor: "#013243",
    },
    {
      name: "Pandas",
      slug: "pandas",
      badgeBackgroundColor: "#150458",
    },
    {
      name: "PostgreSQL",
      slug: "postgresql",
      badgeBackgroundColor: "#336791",
    },
    {
      name: "Prisma",
      slug: "prisma",
      badgeBackgroundColor: "#2D3748",
    },
    {
      name: "Python",
      slug: "python",
      badgeBackgroundColor: "#3776AB",
      badgeTextColor: "#FFD43B",
    },
    {
      name: "Pytest",
      slug: "pytest",
      badgeBackgroundColor: "#0A9EDC",
    },
    {
      name: "Scikit-learn",
      slug: "scikit-learn",
      badgeBackgroundColor: "#F7931E",
    },
    {
      name: "Spring Boot",
      slug: "spring-boot",
      badgeBackgroundColor: "#6DB33F",
    },
    {
      name: "Supabase",
      slug: "supabase",
      badgeBackgroundColor: "#3ECF8E",
    },
    {
      name: "Thymeleaf",
      slug: "thymeleaf",
      badgeBackgroundColor: "#005F0F",
    },
    {
      name: "TypeScript",
      slug: "typescript",
      badgeBackgroundColor: "#3178C6",
    },
    {
      name: "Vercel",
      slug: "vercel",
      badgeBackgroundColor: "#000000",
    },
    {
      name: "XGBoost",
      slug: "xgboost",
      badgeBackgroundColor: "#006400",
    },
  ];
  

  for (const technology of technologies) {
  await db.technology.upsert({
    where: {
      slug: technology.slug,
    },
    update: {
      name: technology.name,
      badgeBackgroundColor: technology.badgeBackgroundColor,
      badgeTextColor: technology.badgeTextColor || "#FFFFFF",
    },
    create: technology,
  });
  }


  const projects = [
  {
    name: "Delivery Routing Program",
    slug: "delivery-routing-program",
    description:
      "Route optimization system using graph algorithms and domain-driven design.",
    content:
      "A Python application that optimizes package delivery routes using Dijkstra's algorithm and custom heuristics based on distance, traffic, and delivery windows. The application separates spreadsheet ingestion from business logic using domain-driven design and includes an event-driven simulation engine with CLI reporting and comprehensive pytest coverage.",
    repoUrl: "https://github.com/MoToney/package_delivery_app",
    status: ProjectStatus.COMPLETED,
    featured: true,
    categories: [
      "algorithms",
      "backend",
    ],
    technologies: [
      "python",
      "pytest",
    ],
  },
  {
    name: "Grade Predictor AI Model",
    slug: "grade-predictor-ai-model",
    description:
      "Machine learning model for predicting student performance.",
    content:
      "A regression-based machine learning project that predicts student success using Scikit-learn and XGBoost. The project processes a Kaggle dataset, performs feature engineering and hyperparameter tuning, visualizes results, and supports multiple ML algorithms for comparison.",
    repoUrl: "https://github.com/MoToney/grade_predictor_model",
    status: ProjectStatus.COMPLETED,
    featured: true,
    categories: [
      "machine-learning",
      "data-science",
    ],
    technologies: [
      "python",
      "scikit-learn",
      "xgboost",
      "numpy",
      "pandas",
    ],
  },
  {
    name: "Hotel Reservation Web Application",
    slug: "hotel-reservation-web-application",
    description:
      "Full-stack Spring Boot and Angular hotel reservation platform.",
    content:
      "Enhanced a production hotel reservation system built with Spring Boot and Angular by fixing API issues, rebuilding UI components, implementing internationalization, containerizing the application with Docker, and deploying to Azure through an automated CI/CD pipeline.",
    repoUrl: "https://github.com/MoToney/hotel_reservation_app",
    status: ProjectStatus.COMPLETED,
    categories: [
      "full-stack",
      "web-development",
    ],
    technologies: [
      "java",
      "spring-boot",
      "angular",
      "docker",
      "azure",
    ],
  },
  {
    name: "Inventory Management Application",
    slug: "inventory-management-application",
    description:
      "Inventory management system built with Spring Boot and Thymeleaf.",
    content:
      "A full-stack inventory management application featuring a REST API with validation, pagination, filtering, ORM integration, a Thymeleaf frontend, and unit tests validating business logic.",
    repoUrl: "https://github.com/MoToney/inventory_management",
    status: ProjectStatus.COMPLETED,
    categories: [
      "full-stack",
      "backend",
    ],
    technologies: [
      "java",
      "spring-boot",
      "thymeleaf",
    ],
  },
  {
    name: "Prototype of Text Editor",
    slug: "prototype-of-text-editor",
    description:
      "Prototype text editor implementing a Piece Tree editing engine.",
    content:
      "A prototype text editor implementing a Piece Tree (Piece Table + Red-Black Tree) for efficient editing of large documents. Includes extensive JUnit testing covering many editing edge cases while the rendering layer remains under development.",
    repoUrl: "https://github.com/MoToney/text_editor",
    status: ProjectStatus.COMPLETED,
    featured: true,
    categories: [
      "systems-programming",
      "algorithms",
    ],
    technologies: [
      "java",
      "junit",
    ],
  },
  {
    name: "AI Podcast Clipper",
    slug: "ai-podcast-clipper",
    description:
      "Cloud-based AI platform for generating podcast video clips.",
    content:
      "Enhanced a distributed AI video clipping platform built with Next.js and Python. Added YouTube ingestion, asynchronous processing with Inngest, GPU-powered transcription on Modal, persistent storage using AWS S3 and Supabase PostgreSQL, and deployed the application using Vercel and Modal while resolving distributed infrastructure issues.",
    repoUrl: "https://github.com/MoToney/DARK-PHOENIX",
    status: ProjectStatus.COMPLETED,
    featured: true,
    categories: [
      "artificial-intelligence",
      "cloud",
      "full-stack",
    ],
    technologies: [
      "nextjs",
      "typescript",
      "python",
      "prisma",
      "postgresql",
      "supabase",
      "aws-s3",
      "inngest",
      "modal",
      "vercel",
    ],
  },
];

for (const project of projects) {
  await db.project.upsert({
    where: {
      slug: project.slug,
    },
    update: {
      name: project.name,
      description: project.description,
      content: project.content,
      repoUrl: project.repoUrl,
      status: project.status,
      featured: project.featured ?? false,
      categories: {
        set: project.categories.map((slug) => ({
          slug,
        })),
      },
      technologies: {
        set: project.technologies.map((slug) => ({
          slug,
        })),
      },
    },
    create: {
      name: project.name,
      slug: project.slug,
      description: project.description,
      content: project.content,
      repoUrl: project.repoUrl,
      status: project.status,
      featured: project.featured ?? false,
      categories: {
        connect: project.categories.map((slug) => ({
          slug,
        })),
      },
      technologies: {
        connect: project.technologies.map((slug) => ({
          slug,
        })),
      },
    },
  });
} 

} 

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });