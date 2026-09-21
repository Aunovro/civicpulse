import { createContext, useContext, useState } from 'react';

type Report = {
  id: number;
  title: string;
  description: string;
  date: string;
  resolved: boolean;
};

const ReportsContext = createContext<any>(null);

export function ReportsProvider({ children }: any) {
  const [reports, setReports] = useState<Report[]>([]);

  function addReport(title: string, description: string, date: string) {
    const newReport = {
      id: Date.now(),
      title,
      description,
      date,
      resolved: false,
    };

    setReports((current) => [...current, newReport]);
  }

  function toggleResolved(id: number) {
    setReports((current) =>
      current.map((report) =>
        report.id === id
          ? { ...report, resolved: !report.resolved }
          : report
      )
    );
  }

  return (
    <ReportsContext.Provider value={{ reports, addReport, toggleResolved }}>
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  return useContext(ReportsContext);
}