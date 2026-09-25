import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  CheckCircle2,
  Building2,
  ShieldCheck,
  FileSpreadsheet,
  FileCode,
  ArrowRight,
} from 'lucide-react';
import { BRSRCoreKPI, EntityNode } from '../types/esg';

interface ReportsViewProps {
  brsrCoreKpis: BRSRCoreKPI[];
  selectedEntity: EntityNode;
  selectedPeriod: string;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  brsrCoreKpis,
  selectedEntity,
  selectedPeriod,
}) => {
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);

  const handleExportCSV = () => {
    const headers = ['KPI Number', 'Attribute Name', 'Principle', 'MEIL Group Value', 'Status'];
    const rows = brsrCoreKpis.map((k) => [
      k.kpiNumber,
      `"${k.name}"`,
      k.principle,
      `"${k.meilGroupValue}"`,
      k.assuranceStatus,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MEIL_BRSR_Core_${selectedPeriod.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 select-none font-sans text-[#202522]">
      {/* Top Header */}
      <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F6F50] mb-1">
              <FileText className="w-4 h-4 text-[#2E7D5B]" />
              <span>REGULATORY & STAKEHOLDER REPORTING</span>
              <span className="text-[#68716C]">·</span>
              <span>{selectedPeriod}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#12372A] tracking-tight">
              Reports & Exports
            </h1>
            <p className="text-xs text-[#68716C] mt-1">
              Generate board briefing packs, SEBI BRSR filings, and auditor assurance dossiers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="btn-secondary text-xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#1F6F50]" />
              <span>Export CSV Data</span>
            </button>
            <button
              onClick={() => window.print()}
              className="btn-primary text-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Available Report Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="corp-card p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#EDF4EF] text-[#12372A] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-[#2E7D5B]" />
            </div>
            <h3 className="text-base font-bold text-[#12372A] mb-1">SEBI BRSR Core Pack</h3>
            <p className="text-xs text-[#68716C] leading-relaxed">
              Official regulatory submission formatted for statutory disclosure under SEBI Master Circular 2023.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#DDE3DE] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#2E7D5B]">9 KPIs Assured</span>
            <button
              onClick={handleExportCSV}
              className="btn-primary text-xs py-1 px-3"
            >
              Download
            </button>
          </div>
        </div>

        <div className="corp-card p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#EDF4EF] text-[#12372A] flex items-center justify-center mb-4">
              <FileText className="w-5 h-5 text-[#1F6F50]" />
            </div>
            <h3 className="text-base font-bold text-[#12372A] mb-1">Executive Board Briefing</h3>
            <p className="text-xs text-[#68716C] leading-relaxed">
              High-level strategic briefing on group decarbonization, safety zero-fatality records, and CSR impact.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#DDE3DE] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#12372A]">Q2 FY 2025-26</span>
            <button
              onClick={() => window.print()}
              className="btn-primary text-xs py-1 px-3"
            >
              Generate
            </button>
          </div>
        </div>

        <div className="corp-card p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#EDF4EF] text-[#12372A] flex items-center justify-center mb-4">
              <FileCode className="w-5 h-5 text-[#C5A35A]" />
            </div>
            <h3 className="text-base font-bold text-[#12372A] mb-1">Auditor Assurance Dossier</h3>
            <p className="text-xs text-[#68716C] leading-relaxed">
              ISAE 3000 sample files, primary utility bills, meter registers, and calculation formula proofs.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#DDE3DE] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#1F6F50]">3,450+ Docs Linked</span>
            <button
              onClick={() => alert('Compiling evidence package for auditor download.')}
              className="btn-primary text-xs py-1 px-3"
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
