"use client";

import { createContext, useContext, useRef, useState } from "react";
import { Report } from "@/types/reports";

type ReportsContextType = {
  reports: Report[] | null;
  setReports: React.Dispatch<React.SetStateAction<Report[] | null>>;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  tableRef: React.RefObject<HTMLDivElement | null>;
};

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export const ReportsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [reports, setReports] = useState<Report[] | null>(null);
  const [refresh, setRefresh] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  return (
    <ReportsContext.Provider
      value={{ reports, setReports, refresh, setRefresh, tableRef }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error("useReports must be used within a ReportsProvider");
  }
  return context;
};
