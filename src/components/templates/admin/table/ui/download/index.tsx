"use client";

import { HiDocumentDownload } from "react-icons/hi";
import { useReports } from "../../../context";
import { useCallback } from "react";

export default function DownloadReports() {
  const { tableRef } = useReports();

  const handleDownload = useCallback(async () => {
    if (!tableRef.current) return;

    // Dynamically import html2pdf ONLY on the client
    const html2pdf = (await import("html2pdf.js")).default;

    html2pdf()
      .from(tableRef.current)
      .set({
        margin: 1,
        filename: "reports.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .save();
  }, [tableRef]);

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
    >
      <HiDocumentDownload />
      Télécharger PDF
    </button>
  );
}
