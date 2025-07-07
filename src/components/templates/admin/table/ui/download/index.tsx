"use client";

import Button from "@/components/reusable/buttons";
import { HiDocumentDownload } from "react-icons/hi";
import { useReports } from "../../../context";
import html2pdf from "html2pdf.js";

export default function DownloadReports() {
  const { tableRef } = useReports();

  const handleDownload = () => {
    if (!tableRef.current) return;
    html2pdf().from(tableRef.current).save("table.pdf");
  };

  return (
    <Button
      onClick={handleDownload}
      title="Exporter en PDF"
      className="!bg-red-400 !h-[37px] hover:!bg-red-500 !gap-0 md:!gap-2"
      icon={<HiDocumentDownload />}
    >
      <span className="hidden md:inline">Exporter en PDF</span>
    </Button>
  );
}
