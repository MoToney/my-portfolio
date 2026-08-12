"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";
import { PaginationNext, PaginationPrevious, } from "@/src/components/ui/pagination";


const Resume = dynamic(() => import("./resume"), {
  ssr: false,
});

export default function ResumeViewer() {
  const pageContainerRef = useRef<HTMLDivElement>(null);

  const [pageWidth, setPageWidth] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [dualPage, setDualPage] = useState(false);

  useEffect(() => {
    const element = pageContainerRef.current;

    if (!element) return;

    const updateSize = () => {
      setPageWidth(element.clientWidth);
      setPageHeight(element.clientHeight);
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  function changePage(offset: number) {
    setPageNumber((prev) => prev + offset);
  }

  function nextPage() {
    changePage(1);
  }

  function prevPage() {
    changePage(-1);
  }

  const heightBasedWidth = pageHeight * 0.707;

  return (
    <div
      ref={pageContainerRef}
      className="container mx-auto flex h-screen flex-col border-2 border-black px-4"
    >
      <div className="relative flex w-full items-center justify-center">
        <div className="absolute left-0 flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xl transition-colors hover:text-blue-500 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Home
          </Link>
        </div>

        <div className="flex w-56 items-center gap-2">
          <PaginationPrevious
            onClick={prevPage}
            disabled={pageNumber <= 1}
          />

          <PaginationNext
            onClick={nextPage}
            disabled={pageNumber >= (numPages || 0)}
          />

          <div className="flex items-center gap-2">
            <Checkbox
              className="h-5 w-5 border-2 border-black"
              checked={dualPage}
              onCheckedChange={(checked) =>
                setDualPage(checked === true)
              }
            />

            <Label className="whitespace-nowrap">
              Dual-View
            </Label>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center border-2 border-mist-500">
        <Resume
          pageNumber={pageNumber}
          dualPage={dualPage}
          pageWidth={heightBasedWidth}
          numPages={numPages}
          onDocumentLoadSuccess={setNumPages}
        />
      </div>
    </div>
  );
}