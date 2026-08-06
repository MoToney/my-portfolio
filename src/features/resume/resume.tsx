
import { pdfjs } from 'react-pdf';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Button } from '@/src/components/ui/button';
import { PaginationNext, PaginationPrevious } from '@/src/components/ui/pagination';
import { Checkbox } from '@/src/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel } from '@/src/components/ui/field';



pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();
export default function Resume() {


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


    return (
  <div className="container mx-auto px-4 py-12">
    <div className="flex flex-col items-center gap-4 mb-6">
      <div className="flex gap-4">
        <PaginationPrevious
          onClick={prevPage}
          disabled={pageNumber <= 1}
        />

        <PaginationNext
          onClick={nextPage}
          disabled={pageNumber >= (numPages || 0)}
        />

        <FieldGroup className="w-56">
          <Field orientation="horizontal">
            <Checkbox
              checked={dualPage}
              onCheckedChange={setDualPage}
            />
            <FieldLabel>Dual-View</FieldLabel>
          </Field>
        </FieldGroup>
      </div>
    </div>

    <div className="flex flex-col items-center gap-4">

    <Document
        file="/resume/resume.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
>          
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <p>Page {pageNumber} of {numPages}</p>
                <Page pageNumber={pageNumber} />
            </div>
            
            {dualPage && pageNumber < (numPages || 0) && (
            <div className="flex flex-col items-center">
                <p>Page {pageNumber + 1} of {numPages}</p>
                <Page pageNumber={pageNumber + 1} />
            </div>
            )}
        </div>
    </Document>
    </div>
  </div>
);}