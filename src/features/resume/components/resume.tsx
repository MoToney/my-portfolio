"use client";

import { cn } from "@/src/lib/utils";

import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type ResumeProps = {
  pageNumber: number;
  dualPage: boolean;
  pageWidth: number;
  numPages?: number;
  onDocumentLoadSuccess: (numPages: number) => void;
};

export default function Resume({
  pageNumber,
  dualPage,
  pageWidth,
  numPages,
  onDocumentLoadSuccess,
}: ResumeProps) {
  const pageHeight = pageWidth * 1.414;

  return (
    <Document
      className="flex w-full"
      file="/resume/resume.pdf"
      onLoadSuccess={({ numPages }) =>
        onDocumentLoadSuccess(numPages)
      }
    >
      <div className="flex w-full min-w-0 gap-4">
        <div
          className={cn(
            "flex min-w-0 flex-1 flex-col items-center",
            dualPage && "border-r border-gray-400"
          )}
        >
          <p>
            Page {pageNumber} of {numPages}
          </p>

          <Page
            pageNumber={pageNumber}
            width={pageWidth}
            height={pageHeight}
          />
        </div>

        {dualPage && pageNumber < (numPages || 0) && (
          <div className="flex min-w-0 flex-1 flex-col items-center">
            <p>
              Page {pageNumber + 1} of {numPages}
            </p>

            <Page
              pageNumber={pageNumber + 1}
              width={pageWidth}
              height={pageHeight}
            />
          </div>
        )}
      </div>
    </Document>
  );
}