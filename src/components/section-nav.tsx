"use client";

import { useEffect, useState } from "react";

const sections = [
    { id: "about", label: "About Me" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact Me" },
];

export default function SectionNav() {
    const [activeSection, setActiveSection] = useState("about");

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.innerHeight * 0.35;

            let currentSection = sections[0].id;

            for (const section of sections) {
                const element = document.getElementById(section.id);

                if (!element) continue;

                const { top } = element.getBoundingClientRect();

                if (top <= offset) {
                    currentSection = section.id;
                }
            }

            setActiveSection(currentSection);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
        });
    };

    return (
        <nav>
            <div className="flex flex-col items-end gap-4">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`text-right transition-all ${activeSection === section.id
                                ? "font-bold"
                                : "font-normal opacity-60 hover:opacity-100"
                            }`}
                    >
                        {section.label}
                    </button>
                ))}
            </div>
        </nav>
    );
}