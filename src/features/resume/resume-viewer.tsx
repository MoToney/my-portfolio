"use client";

import dynamic from "next/dynamic";

const Resume = dynamic(() => import("@/src/features/resume/resume"), {
  ssr: false,
});

export default function ResumeViewer() {
  return <Resume />;
}