

import { pdfjs } from 'react-pdf';
import { useEffect, useRef, useState } from "react";
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { PaginationNext, PaginationPrevious } from '@/src/components/ui/pagination';
import { Checkbox } from '@/src/components/ui/checkbox';
import Link from 'next/link';
import { ArrowLeft, House } from 'lucide-react';
import { Label } from '@/src/components/ui/label';
import { cn } from '@/src/lib/utils'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function Resume() {
  console.log("Resume rendered");


  const pageContainerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {

    const element = pageContainerRef.current;


    if (!element) return;

    const updateWidth = () => {
      setPageWidth(element.clientWidth);
      setPageHeight(element.clientHeight);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);


  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [dualPage, setDualPage] = useState<boolean>(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function changePage(offset: number): void {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function nextPage(): void {
    changePage(1);
  }

  function prevPage(): void {
    changePage(-1);
  }

  const heightBasedWidth = pageHeight * 0.707;

  return (

    <div
      className="container mx-auto flex h-screen flex-col px-4  border-2 border-black-900"
      ref={pageContainerRef}>

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

          <div className="flex items-center gap-2 ">
            <Checkbox
              className="h-5 w-5 border-2 border-black"
              checked={dualPage}
              onCheckedChange={setDualPage}
            />
            <Label className="whitespace-nowrap">Dual-View</Label>
          </div>
        </div>

      </div>

      <div
        className="flex w-full flex-col items-center  border-2 border-mist-500"

      >


        <Document
          className="flex w-full"
          file="/resume/resume.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >

          <div
            className=" flex w-full min-w-0 gap-4"
          >

            {/* Page One */}
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
                width={heightBasedWidth * 1}

              />
            </div>

            {/* Page Two */}
            {dualPage && pageNumber < (numPages || 0) && (
              <div className="flex flex-1 flex-col items-center">
                <p>
                  Page {pageNumber + 1} of {numPages}
                </p>
                <Page
                  pageNumber={pageNumber + 1}
                  width={heightBasedWidth * 1} />
              </div>
            )}
          </div>
        </Document>
      </div>

    </div>
  );
}