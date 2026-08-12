"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import SectionNav from "@/src/components/section-nav"

export function StickyNavigation() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const pageBottom =
                window.innerHeight + currentScrollY >=
                document.documentElement.scrollHeight - 10;

            if (pageBottom) {
                setVisible(true);
            } else if (currentScrollY < lastScrollY) {
                setVisible(true);
            } else if (currentScrollY > lastScrollY) {
                setVisible(false);
            }

            lastScrollY = currentScrollY;
        };

        const handleMouseMove = (event: MouseEvent) => {
            if (event.clientY <= 60) {
                setVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            className={`fixed right-4 top-4 z-50 flex flex-col items-end gap-4 transition-transform duration-300 ${visible
                ? "translate-y-0"
                : "-translate-y-[calc(100%+1rem)]"
                }`}
        >
            <Link
                href="/resume"
                className="flex items-center gap-2"
            >
                View Resume
                <ArrowRight size={16} />
            </Link>    
            <SectionNav />
        </div>
    );
}