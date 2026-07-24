import { ProjectStatus } from "./generated/client";
import {db} from "../src/lib/db";

async function main() {
    const proj1 = await db.project.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: "Project 1",
            slug: "project-1",
            description: "Description for Project 1",
            content: "Content for Project 1",
            categories: {
                create: [
                    { name: "Category 1", slug: "category-1" },
                ]
            },
            technologies: {
                create: [
                    { name: "Technology 1", slug: "technology-1" },
                ]
            },
            status: ProjectStatus.COMPLETED,
        }
    });
    console.log({ proj1 });
}

main()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    })