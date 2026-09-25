import React, { useState } from 'react';
import {
  GitFork,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Building2,
  HardHat,
  Calculator,
  UserCheck,
  Award,
  Layers,
  Check,
} from 'lucide-react';
import { BRSR_CORE_KPIS } from '../data/mockData';

export const DataLineageView: React.FC = () => {
  const [selectedKpiId, setSelectedKpiId] = useState<string>('CORE-P6-03');
  const [selectedStep, setSelectedStep] = useState<number>(1);

  const selectedKpi =
    BRSR_CORE_KPIS.find((k) => k.id === selectedKpiId) || BRSR_CORE_KPIS[2];

  // 11-Step Vertical Lineage Chain
  const lineageSteps = [
    {
      step: 1,
      name: 'BRSR KPI',
      label: 'Core Indicator 3: Gross Scope 1 & 2 GHG Emissions',
      scope: 'SEBI Mandatory Principle 6',
      details: {
        Regulation: 'SEBI Master Circular 2023/122',
        KPI: 'Core 3 (Emissions & Energy Intensity)',
        Assurance: 'Mandatory Reasonable Assurance for Top Listed Entities',
      },
    },
    {
      step: 2,
      name: 'Calculated Value',
      label: '318,450 tCO2e (Consolidated MEIL Group)',
      scope: 'Automated Emission Factor Calculation',
      details: {
        'Scope 1 Direct': '184,200 tCO2e (Fuel Combustion & Mobile Equipment)',
        'Scope 2 Indirect': '134,250 tCO2e (CEA CO2 Grid Baseline Database v20)',
        Formula: '∑(Diesel Litres × 2.68 kg/L) + ∑(Grid kWh × 0.716 kg/kWh)',
      },
    },
    {
      step: 3,
      name: 'MEIL Group',
      label: 'Megha Engineering & Infrastructures Limited (Consolidated HQ)',
      scope: 'Corporate Governance Directorate',
      details: {
        HQ: 'Hyderabad, Telangana',
        'Consolidated Revenue': 'Infrastructure & Energy EPC',
        Signatory: 'Dr. K. S. Rao (Head of ESG & Corporate Governance)',
      },
    },
    {
      step: 4,
      name: 'Subsidiary',
      label: 'Megha Solar & Hydro Power Ltd (Contributing 112,400 tCO2e)',
      scope: 'Principal Operating Subsidiary',
      details: {
        'Subsidiary Code': 'MEIL-SHP',
        Manager: 'R. K. Verma',
        'Total Active Sites': '7 Mega Solar & Hydro Projects',
      },
    },
    {
      step: 5,
      name: 'Business Unit',
      label: 'Lift Irrigation & Strategic Water BU',
      scope: 'Operational Division',
      details: {
        Lead: 'S. N. Reddy',
        Scope: 'Hydraulic Pumping Stations & Water Tunnels',
      },
    },
    {
      step: 6,
      name: 'Project',
      label: 'Polavaram Dam Project Site (Andhra Pradesh)',
      scope: 'National Strategic Mega Project',
      details: {
        'Project Manager': 'V. Sundaram',
        Workforce: '4,850 Active On-Site Personnel',
        Location: 'East & West Godavari Districts, AP',
      },
    },
    {
      step: 7,
      name: 'Raw ESG Data',
      label: '125,400 KL Water Intake & 28,450 Litres HSD Diesel',
      scope: 'Site Meter Log Entries',
      details: {
        'Collection Period': 'FY 2025-26 Q2',
        Timestamp: '2026-09-24 09:30:15 IST',
        'Logged By': 'Ananya Sharma (Site ESG Coordinator)',
      },
    },
    {
      step: 8,
      name: 'Source Document',
      label: 'APEPDCL Grid Invoices & IOCL Bulk HSD Delivery Challans',
      scope: 'Primary External Documentation',
      details: {
        'Invoice Numbers': 'IOCL-BKG-2026-8891 / APEPDCL-HT-0491',
        Vendor: 'Indian Oil Corporation Ltd / APEPDCL',
      },
    },
    {
      step: 9,
      name: 'Evidence',
      label: 'Polavaram_APEPDCL_Meter_Settlement_Aug2026.pdf',
      scope: 'OCR Verified Primary File (3.4 MB)',
      details: {
        Checksum: 'sha256: 7f8a92b1c4e9081a2f4c99e128b7654a',
        'OCR Extraction': '99.4% Match with Field Logbook Entry',
      },
    },
    {
      step: 10,
      name: 'Reviewer',
      label: 'V. Sundaram (Project Manager) & R. K. Verma (Sub Manager)',
      scope: 'Multi-Tier Operational Approvals',
      details: {
        'Site Review': 'Verified against physical flowmeter records',
        'Subsidiary Sign-Off': 'Cross-checked with financial cost accounting registers',
      },
    },
    {
      step: 11,
      name: 'Approval',
      label: 'DNV Business Assurance India — ISAE 3000 Assurance Sign-Off',
      scope: 'Independent External Assurance Clean Statement',
      details: {
        Auditor: 'Priya Nambiar (Lead ESG Assurance Auditor, DNV)',
        Certificate: 'ISAE 3000 / AA1000AS Clean Reasonable Assurance Opinion',
        'Audit Date': '24 September 2026',
      },
    },
  ];

  const activeStepData = lineageSteps.find((s) => s.step === selectedStep) || lineageSteps[0];

  return (
    <div className="space-y-6 select-none font-sans text-[#202522]">
      {/* Top Header */}
      <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F6F50] mb-1">
              <GitFork className="w-4 h-4 text-[#2E7D5B]" />
              <span>DATA TRACEABILITY & RECONCILIATION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#12372A] tracking-tight">
              Where did this number come from?
            </h1>
            <p className="text-xs text-[#68716C] mt-1">
              End-to-end cryptographic audit trail from physical site invoices to final board-approved BRSR disclosures.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#68716C]">Select Indicator:</span>
            <select
              value={selectedKpiId}
              onChange={(e) => setSelectedKpiId(e.target.value)}
              className="bg-[#F7F7F3] border border-[#DDE3DE] rounded-lg px-3 py-1.5 text-xs text-[#202522] font-semibold focus:border-[#12372A]"
            >
              {BRSR_CORE_KPIS.map((kpi) => (
                <option key={kpi.id} value={kpi.id}>
                  {kpi.kpiNumber}: {kpi.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Vertical Lineage Visual & Step Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 11-Step Vertical Lineage (7 Cols) */}
        <div className="lg:col-span-7 corp-card p-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE] mb-4">
            <h2 className="text-xs font-bold text-[#12372A] uppercase tracking-wider">
              11-Tier Assurance Lineage Chain
            </h2>
            <span className="text-[11px] text-[#2E7D5B] font-semibold">
              Click node to inspect metadata
            </span>
          </div>

          <div className="space-y-2 relative">
            {lineageSteps.map((node, idx) => {
              const isSelected = selectedStep === node.step;
              return (
                <div key={node.step} className="relative">
                  {/* Vertical Thin Green Line */}
                  {idx < lineageSteps.length - 1 && (
                    <div className="absolute left-4 top-8 bottom-0 w-[2px] bg-[#1F6F50]/30 z-0" />
                  )}

                  <button
                    onClick={() => setSelectedStep(node.step)}
                    className={`w-full relative z-10 text-left p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#EDF4EF] border-[#2E7D5B] shadow-xs'
                        : 'bg-white border-[#DDE3DE] hover:bg-[#F7F7F3]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                          isSelected
                            ? 'bg-[#12372A] text-white'
                            : 'bg-[#F7F7F3] text-[#68716C] border border-[#DDE3DE]'
                        }`}
                      >
                        {node.step}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-[#12372A] flex items-center gap-2">
                          <span>{node.name}</span>
                          <span className="text-[10px] font-normal text-[#68716C]">
                            ({node.scope})
                          </span>
                        </div>
                        <div className="text-[11px] text-[#68716C] truncate max-w-md">
                          {node.label}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      {node.step === 11 ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#12372A] text-white">
                          ISAE 3000
                        </span>
                      ) : (
                        <Check className="w-4 h-4 text-[#2E7D5B]" />
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Node Inspector & Cryptographic Verification Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="corp-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE]">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#68716C]">
                  TIER {activeStepData.step} OF 11
                </span>
                <h3 className="text-base font-bold text-[#12372A]">
                  {activeStepData.name}
                </h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#EDF4EF] text-[#2E7D5B] border border-[#DDE3DE]">
                Verified
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
                <span className="text-[10px] text-[#68716C] uppercase font-bold">Node Summary</span>
                <div className="font-semibold text-[#12372A] mt-1">{activeStepData.label}</div>
                <div className="text-[11px] text-[#68716C] mt-0.5">{activeStepData.scope}</div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-[#68716C] uppercase font-bold">Metadata Properties</span>
                {Object.entries(activeStepData.details).map(([key, val]) => (
                  <div
                    key={key}
                    className="p-2.5 rounded-lg bg-white border border-[#DDE3DE] flex flex-col justify-between"
                  >
                    <span className="text-[10px] text-[#68716C]">{key}</span>
                    <span className="font-semibold text-[#12372A] mt-0.5">{val}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#EDF4EF] rounded-lg border border-[#DDE3DE] text-[11px] text-[#12372A]">
                ✓ Cryptographic hash registered in MEIL immutable ledger: <code className="text-[#1F6F50] font-mono">0x4f8e...92ab</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
