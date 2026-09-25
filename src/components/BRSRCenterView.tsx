import React, { useState } from 'react';
import {
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Download,
  FileText,
  ChevronDown,
  Layers,
  Check,
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BRSRCoreKPI, EntityNode } from '../types/esg';

interface BRSRCenterViewProps {
  brsrCoreKpis: BRSRCoreKPI[];
  onOpenCopilot: () => void;
  onNavigateToLineage: () => void;
  selectedEntity?: EntityNode;
  selectedPeriod?: string;
}

export const BRSRCenterView: React.FC<BRSRCenterViewProps> = ({
  brsrCoreKpis,
  onOpenCopilot,
  onNavigateToLineage,
  selectedEntity,
  selectedPeriod = 'FY 2025-26 Q2',
}) => {
  const [activeSection, setActiveSection] = useState<'core' | 'sec-a' | 'sec-b' | 'sec-c'>('core');
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const sections = [
    { id: 'core', label: 'BRSR Core (9 Mandatory Assurance KPIs)', count: '8/9 Ready' },
    { id: 'sec-a', label: 'Section A: General Disclosures', count: '100% Complete' },
    { id: 'sec-b', label: 'Section B: Management & Process Disclosures', count: '96.5% Complete' },
    { id: 'sec-c', label: 'Section C: Principle-Wise Performance (P1-P9)', count: '93.8% Complete' },
  ];

  // PDF Export Engine using jsPDF and jspdf-autotable
  const generateBrsrPdf = (mode: 'full' | 'core' | 'active' = 'full') => {
    try {
      setIsExportingPdf(true);
      setShowExportMenu(false);

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const entityName = selectedEntity?.name || 'MEIL Group Corporate (Consolidated)';
      const periodName = selectedPeriod;
      const forestGreen: [number, number, number] = [18, 55, 42]; // #12372A
      const darkText: [number, number, number] = [32, 37, 34]; // #202522
      const mutedText: [number, number, number] = [104, 113, 108]; // #68716C

      // Top Forest Green Accent Bar
      doc.setFillColor(forestGreen[0], forestGreen[1], forestGreen[2]);
      doc.rect(0, 0, 210, 8, 'F');

      // Monogram
      doc.setFillColor(forestGreen[0], forestGreen[1], forestGreen[2]);
      doc.roundedRect(14, 14, 14, 14, 2, 2, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('M', 18.5, 24);

      // Title & Tagline
      doc.setTextColor(darkText[0], darkText[1], darkText[2]);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('MEGHA ENGINEERING & INFRASTRUCTURES LIMITED', 32, 19);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
      doc.text('MEIL ESG360 · One Group. One ESG Truth. · SEBI BRSR Reporting Pack', 32, 24);

      doc.setFontSize(8);
      doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
      doc.text('SEBI Master Circular: SEBI/HO/CFD/CFD-SEC-2/P/CIR/2023/122 · ISAE 3000 Aligned', 32, 28);

      // Metadata Info Box
      doc.setFillColor(247, 247, 243);
      doc.setDrawColor(221, 227, 222);
      doc.roundedRect(14, 33, 182, 22, 2, 2, 'FD');

      doc.setFontSize(8);
      doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
      doc.text('REPORTING ENTITY', 18, 39);
      doc.text('REPORTING PERIOD', 85, 39);
      doc.text('DOCUMENT REF ID', 145, 39);

      doc.setFontSize(9);
      doc.setTextColor(darkText[0], darkText[1], darkText[2]);
      doc.setFont('helvetica', 'bold');
      doc.text(entityName.length > 32 ? entityName.substring(0, 32) + '...' : entityName, 18, 45);
      doc.text(periodName, 85, 45);
      doc.text(`MEIL-BRSR-2026-Q2`, 145, 45);

      let currentY = 64;

      // BRSR Core Table
      doc.setFontSize(10.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
      doc.text('1. SEBI BRSR Core 9 Mandatory Assurance Attributes Matrix', 14, currentY);

      const tableBody = brsrCoreKpis.map((kpi) => [
        kpi.kpiNumber,
        `${kpi.name}\n${kpi.description}`,
        kpi.principle,
        kpi.meilGroupValue,
        `${kpi.collectedCount}/${kpi.totalRequiredCount} sites`,
        `${kpi.evidenceCount} docs`,
        kpi.assuranceStatus,
      ]);

      autoTable(doc, {
        startY: currentY + 3,
        head: [
          ['KPI #', 'BRSR Core Attribute Name & Scope', 'NGRBC', 'MEIL Consolidated Value', 'Coverage', 'Evidence', 'Assurance Status'],
        ],
        body: tableBody,
        theme: 'grid',
        headStyles: {
          fillColor: [18, 55, 42],
          textColor: 255,
          fontSize: 7.5,
          fontStyle: 'bold',
          halign: 'left',
        },
        bodyStyles: {
          fontSize: 7.5,
          textColor: [32, 37, 34],
          cellPadding: 2,
        },
        columnStyles: {
          0: { cellWidth: 14, fontStyle: 'bold', textColor: [31, 111, 80], halign: 'center' },
          1: { cellWidth: 60 },
          2: { cellWidth: 16, halign: 'center', fontStyle: 'bold' },
          3: { cellWidth: 32, fontStyle: 'bold' },
          4: { cellWidth: 20, halign: 'center' },
          5: { cellWidth: 18, halign: 'center' },
          6: { cellWidth: 22, fontStyle: 'bold', textColor: [18, 55, 42] },
        },
        alternateRowStyles: {
          fillColor: [247, 247, 243],
        },
        margin: { left: 14, right: 14 },
      });

      const totalPages = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setDrawColor(221, 227, 222);
        doc.line(14, 285, 196, 285);
        doc.setFontSize(7);
        doc.setTextColor(104, 113, 108);
        doc.text('MEIL ESG360 · Megha Engineering & Infrastructures Limited · Confidential Regulatory Disclosure', 14, 289);
        doc.text(`Page ${i} of ${totalPages}`, 185, 289);
      }

      const fileName = `MEIL_BRSR_Disclosures_Summary_${periodName.replace(/\s+/g, '_')}.pdf`;
      doc.save(fileName);

      setDownloadSuccessToast(`Successfully downloaded: ${fileName}`);
      setTimeout(() => setDownloadSuccessToast(null), 4000);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      alert('Unable to generate PDF report.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="space-y-6 select-none font-sans text-[#202522]">
      {/* Toast Notification */}
      {downloadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#12372A] border border-[#2E7D5B] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#2E7D5B] shrink-0" />
          <div className="text-xs font-semibold">{downloadSuccessToast}</div>
          <button
            onClick={() => setDownloadSuccessToast(null)}
            className="text-white hover:text-[#DDE3DE] text-xs ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Header */}
      <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F6F50] mb-1">
              <ShieldCheck className="w-4 h-4 text-[#2E7D5B]" />
              <span>SEBI BUSINESS RESPONSIBILITY & SUSTAINABILITY REPORTING</span>
              <span>·</span>
              <span className="text-[#68716C]">{selectedPeriod}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#12372A] tracking-tight">
              BRSR Reporting
            </h1>
            <p className="text-xs text-[#68716C] mt-1">
              Consolidated NGRBC Principles 1–9 disclosures and SEBI BRSR Core 9 attributes assurance matrix.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => generateBrsrPdf('full')}
              disabled={isExportingPdf}
              className="btn-primary"
            >
              {isExportingPdf ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download BRSR Summary (PDF)</span>
                </>
              )}
            </button>

            <button
              onClick={onNavigateToLineage}
              className="btn-secondary"
            >
              <span>Trace Lineage</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Top Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-5 border-t border-[#DDE3DE]">
          <div className="p-3.5 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
            <div className="text-[11px] text-[#68716C] font-semibold uppercase">BRSR Readiness</div>
            <div className="text-2xl font-bold text-[#12372A] font-mono mt-0.5">82%</div>
            <div className="text-[10px] text-[#2E7D5B] mt-1 font-medium">On track for board review</div>
          </div>

          <div className="p-3.5 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
            <div className="text-[11px] text-[#68716C] font-semibold uppercase">Data Completeness</div>
            <div className="text-2xl font-bold text-[#12372A] font-mono mt-0.5">91%</div>
            <div className="text-[10px] text-[#68716C] mt-1">18 of 22 projects logged</div>
          </div>

          <div className="p-3.5 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
            <div className="text-[11px] text-[#68716C] font-semibold uppercase">Evidence Coverage</div>
            <div className="text-2xl font-bold text-[#1F6F50] font-mono mt-0.5">78%</div>
            <div className="text-[10px] text-[#68716C] mt-1">Primary utility invoices attached</div>
          </div>

          <div className="p-3.5 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
            <div className="text-[11px] text-[#68716C] font-semibold uppercase">Pending Reviews</div>
            <div className="text-2xl font-bold text-[#B8872F] font-mono mt-0.5">14</div>
            <div className="text-[10px] text-[#68716C] mt-1">Awaiting manager sign-off</div>
          </div>
        </div>
      </div>

      {/* Sections Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#DDE3DE] pb-2">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSection === sec.id
                ? 'bg-[#12372A] text-white shadow-xs'
                : 'bg-white text-[#68716C] hover:text-[#12372A] border border-[#DDE3DE]'
            }`}
          >
            <span>{sec.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                activeSection === sec.id ? 'bg-[#1F6F50] text-white' : 'bg-[#EDF4EF] text-[#12372A]'
              }`}
            >
              {sec.count}
            </span>
          </button>
        ))}
      </div>

      {/* SECTION: BRSR Core (9 Mandatory Assurance KPIs) */}
      {activeSection === 'core' && (
        <div className="corp-card p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDE3DE]">
            <div>
              <h3 className="text-sm font-bold text-[#12372A] uppercase tracking-wider">
                SEBI BRSR Core 9 Mandatory Assurance Attributes Matrix
              </h3>
              <p className="text-xs text-[#68716C] mt-0.5">
                Values consolidated across MEIL Group with supporting primary evidence status.
              </p>
            </div>
            <span className="text-xs font-bold text-[#2E7D5B] bg-[#EDF4EF] px-2.5 py-1 rounded border border-[#DDE3DE]">
              Assurance Readiness: 94.2%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="corp-table">
              <thead>
                <tr>
                  <th>KPI #</th>
                  <th>BRSR Core Attribute Name</th>
                  <th>NGRBC</th>
                  <th>MEIL Consolidated Value</th>
                  <th>Data Collection</th>
                  <th>Evidence Linked</th>
                  <th>Assurance Status</th>
                </tr>
              </thead>
              <tbody>
                {brsrCoreKpis.map((kpi) => (
                  <tr key={kpi.id}>
                    <td className="font-mono text-[#1F6F50] font-bold">{kpi.kpiNumber}</td>
                    <td>
                      <div className="font-semibold text-[#12372A]">{kpi.name}</div>
                      <div className="text-[11px] text-[#68716C]">{kpi.description}</div>
                    </td>
                    <td>
                      <span className="px-2 py-0.5 rounded bg-[#F7F7F3] text-[#202522] text-[10px] font-bold border border-[#DDE3DE]">
                        {kpi.principle}
                      </span>
                    </td>
                    <td className="font-mono font-bold text-[#12372A] tabular-nums">
                      {kpi.meilGroupValue}
                    </td>
                    <td className="tabular-nums">
                      <span className="text-[#2E7D5B] font-semibold">{kpi.collectedCount} / {kpi.totalRequiredCount}</span> sites
                    </td>
                    <td className="tabular-nums">
                      <span className="text-[#1F6F50] font-semibold">{kpi.evidenceCount} / {kpi.totalRequiredCount}</span> docs
                    </td>
                    <td>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          kpi.assuranceStatus === 'Assured'
                            ? 'bg-[#EDF4EF] text-[#2E7D5B] border-[#DDE3DE]'
                            : kpi.assuranceStatus === 'Assurance Ready'
                            ? 'bg-[#EDF4EF] text-[#1F6F50] border-[#DDE3DE]'
                            : 'bg-[#FEF9E7] text-[#B8872F] border-[#FAD7A0]'
                        }`}
                      >
                        ● {kpi.assuranceStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION A: General Corporate Disclosures */}
      {activeSection === 'sec-a' && (
        <div className="corp-card p-6 space-y-4">
          <div className="pb-3 border-b border-[#DDE3DE]">
            <h3 className="text-sm font-bold text-[#12372A] uppercase tracking-wider">
              Section A: General Corporate & Operational Details
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE] space-y-2">
              <span className="text-[10px] text-[#1F6F50] font-bold uppercase tracking-wider">
                I. Details of Listed Entity
              </span>
              <div className="space-y-1.5 text-[#202522]">
                <p>• Corporate Identity: <strong>Megha Engineering & Infrastructures Limited</strong></p>
                <p>• Registered Office: <strong>S-2, Technocrat Industrial Estate, Balanagar, Hyderabad 500037</strong></p>
                <p>• Reporting Period: <strong>FY 2025-26</strong></p>
                <p>• Boundary: <strong>Consolidated Standalone + 3 Subsidiaries</strong></p>
              </div>
            </div>

            <div className="p-4 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE] space-y-2">
              <span className="text-[10px] text-[#1F6F50] font-bold uppercase tracking-wider">
                II. Operations & Workforce
              </span>
              <div className="space-y-1.5 text-[#202522]">
                <p>• Primary NIC Codes: <strong>4210 (Civil engineering), 4220 (Utility projects), 3510 (Electric power)</strong></p>
                <p>• Core Sectors: <strong>Lift Irrigation, Hydro Power, Solar PV, Oil & Gas EPC, City Gas, Tunnels</strong></p>
                <p>• Active Personnel: <strong>48,200+ Personnel across 20+ nationwide projects</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION B: Management & Process Policies */}
      {activeSection === 'sec-b' && (
        <div className="corp-card p-6 space-y-4">
          <div className="pb-3 border-b border-[#DDE3DE]">
            <h3 className="text-sm font-bold text-[#12372A] uppercase tracking-wider">
              Section B: Management and Process Disclosures (NGRBC Principles 1–9)
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { p: 'P1', name: 'Business Ethics, Anti-Corruption & Whistleblower Policy', status: 'Approved by Board · 100% Certified' },
              { p: 'P2', name: 'Sustainable Engineering & Resource Optimization Charter', status: 'Approved by Board · ISO 9001/14001 Aligned' },
              { p: 'P3', name: 'Employee Well-Being, Diversity & Occupational Health & Safety', status: 'Approved by Board · ISO 45001 Certified' },
              { p: 'P4', name: 'Stakeholder Engagement & Grievance Redressal Framework', status: 'Approved by Board · Active Channels' },
              { p: 'P5', name: 'Human Rights & Fair Labour Practices Charter', status: 'Approved by Board · Zero Tolerance' },
              { p: 'P6', name: 'Environmental Protection, Decarbonization & Water Policy', status: 'Approved by Board · Net Zero Roadmap' },
              { p: 'P7', name: 'Responsible Public Policy Advocacy Charter', status: 'Approved by Board · Transparent Filings' },
              { p: 'P8', name: 'Corporate Social Responsibility (CSR) Impact Policy', status: 'Approved by Board · Section 135 Mandate Met' },
              { p: 'P9', name: 'Customer Quality Assurance & Grievance Matrix', status: 'Approved by Board · 99.2% Client SLA' },
            ].map((item) => (
              <div key={item.p} className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-[#12372A] font-mono">[{item.p}]</span>
                  <span className="text-[#202522] font-semibold">{item.name}</span>
                </div>
                <span className="text-[11px] text-[#68716C]">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION C: Principle-Wise Performance */}
      {activeSection === 'sec-c' && (
        <div className="corp-card p-6 space-y-4">
          <div className="pb-3 border-b border-[#DDE3DE]">
            <h3 className="text-sm font-bold text-[#12372A] uppercase tracking-wider">
              Section C: Principle-Wise Performance Highlights
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
              <span className="font-bold text-[#12372A] flex items-center gap-1.5">
                <span className="text-[#2E7D5B]">🌱</span>
                <span>Principle 6 (Environment)</span>
              </span>
              <p className="text-[11px] text-[#68716C] mt-2 leading-relaxed">
                4.89M GJ energy consumed, 318k tCO2e GHG, 33.1% water circularity, 82.4% C&D muck recycled into embankments.
              </p>
              <div className="mt-3 text-[#2E7D5B] font-semibold text-[10px] bg-[#EDF4EF] p-1.5 rounded border border-[#DDE3DE]">
                ✓ All 6 Core Indicators Verified & Assured
              </div>
            </div>

            <div className="p-4 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
              <span className="font-bold text-[#12372A] flex items-center gap-1.5">
                <span className="text-[#1F6F50]">👥</span>
                <span>Principle 3 (Workforce Well-Being)</span>
              </span>
              <p className="text-[11px] text-[#68716C] mt-2 leading-relaxed">
                Zero fatalities across 22.45M safe hours, LTIFR 0.14, 100% fair statutory wages with EPF/ESIC coverage.
              </p>
              <div className="mt-3 text-[#1F6F50] font-semibold text-[10px] bg-[#EDF4EF] p-1.5 rounded border border-[#DDE3DE]">
                ✓ Assured by Independent Auditor (ISAE 3000)
              </div>
            </div>

            <div className="p-4 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
              <span className="font-bold text-[#12372A] flex items-center gap-1.5">
                <span className="text-[#C5A35A]">◈</span>
                <span>Principle 8 (Inclusive Growth)</span>
              </span>
              <p className="text-[11px] text-[#68716C] mt-2 leading-relaxed">
                ₹ 42.8 Cr CSR execution, 142 RO water plants, 4,200 technicians skilled in rural infrastructure clusters.
              </p>
              <div className="mt-3 text-[#12372A] font-semibold text-[10px] bg-[#EDF4EF] p-1.5 rounded border border-[#DDE3DE]">
                ✓ 100% Mandate Audited & Certified
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
