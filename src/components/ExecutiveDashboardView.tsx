import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calendar,
  Layers,
  ArrowRight,
  Leaf,
  Users,
  Scale,
  Award,
} from 'lucide-react';
import { EntityNode, ESGDataRecord, BRSRCoreKPI, AnomalyItem } from '../types/esg';
import { NavTab } from './Sidebar';

interface ExecutiveDashboardViewProps {
  entities: EntityNode[];
  brsrCoreKpis: BRSRCoreKPI[];
  records: ESGDataRecord[];
  anomalies: AnomalyItem[];
  selectedPeriod: string;
  onNavigate: (tab: NavTab) => void;
  onOpenCopilot: () => void;
}

export const ExecutiveDashboardView: React.FC<ExecutiveDashboardViewProps> = ({
  entities,
  brsrCoreKpis,
  records,
  anomalies,
  selectedPeriod,
  onNavigate,
  onOpenCopilot,
}) => {
  return (
    <div className="space-y-6 select-none font-sans text-[#202522]">
      {/* Top Header */}
      <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F6F50] mb-1">
              <span>BOARD & EXECUTIVE BRIEFING</span>
              <span className="text-[#68716C]">·</span>
              <span className="text-[#68716C]">{selectedPeriod}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#12372A] tracking-tight">
              Executive ESG Briefing
            </h1>
            <p className="text-xs text-[#68716C] mt-1">
              Consolidated readiness, core ESG metrics, and key risk indicators for board oversight.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('brsr')}
              className="btn-primary"
            >
              <span>View BRSR Disclosures</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Big Question Card: "Are we ready to report?" */}
        <div className="mt-6 p-4 rounded-xl bg-[#EDF4EF] border border-[#2E7D5B] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#12372A] text-white flex items-center justify-center font-bold text-sm shrink-0">
              ✓
            </div>
            <div>
              <div className="text-xs font-bold text-[#12372A]">
                Reporting Readiness: ON TRACK (82% Ready for Board Review)
              </div>
              <div className="text-[11px] text-[#68716C] mt-0.5">
                8 of 9 SEBI BRSR Core indicators assured by DNV; remaining 1 indicator under final data reconciliation.
              </div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs font-bold px-3 py-1 rounded bg-white text-[#12372A] border border-[#DDE3DE]">
              Q2 Filing Deadline: 15 Oct 2026
            </span>
          </div>
        </div>
      </div>

      {/* 4 Executive Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="corp-card p-4">
          <div className="text-[11px] font-bold text-[#68716C] uppercase">BRSR Core Readiness</div>
          <div className="text-2xl font-bold text-[#12372A] font-mono mt-1">8 / 9 KPIs</div>
          <div className="text-[10px] text-[#2E7D5B] font-semibold mt-1">89% Assured by DNV</div>
        </div>

        <div className="corp-card p-4">
          <div className="text-[11px] font-bold text-[#68716C] uppercase">Workforce Safety (LTIFR)</div>
          <div className="text-2xl font-bold text-[#2E7D5B] font-mono mt-1">0.14</div>
          <div className="text-[10px] text-[#68716C] mt-1">0 Fatalities across 22.4M hrs</div>
        </div>

        <div className="corp-card p-4">
          <div className="text-[11px] font-bold text-[#68716C] uppercase">GHG Intensity vs Baseline</div>
          <div className="text-2xl font-bold text-[#1F6F50] font-mono mt-1">-3.8%</div>
          <div className="text-[10px] text-[#2E7D5B] font-semibold mt-1">Decarbonization progress</div>
        </div>

        <div className="corp-card p-4">
          <div className="text-[11px] font-bold text-[#68716C] uppercase">Open Action Items</div>
          <div className="text-2xl font-bold text-[#B8872F] font-mono mt-1">03</div>
          <div className="text-[10px] text-[#68716C] mt-1">Fuel & water reconciliations</div>
        </div>
      </div>

      {/* Pillars Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="corp-card p-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#DDE3DE] text-xs font-bold text-[#12372A] uppercase">
            <Leaf className="w-4 h-4 text-[#2E7D5B]" />
            <span>Environment Pillar</span>
          </div>
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#68716C]">Gross GHG (Scope 1+2):</span>
              <span className="font-bold text-[#12372A] font-mono">318,450 tCO2e</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#68716C]">Water Circularity:</span>
              <span className="font-bold text-[#2E7D5B] font-mono">33.1%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#68716C]">Captive Clean Energy:</span>
              <span className="font-bold text-[#12372A] font-mono">245M kWh</span>
            </div>
          </div>
        </div>

        <div className="corp-card p-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#DDE3DE] text-xs font-bold text-[#12372A] uppercase">
            <Users className="w-4 h-4 text-[#1F6F50]" />
            <span>Social & Safety Pillar</span>
          </div>
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#68716C]">LTIFR Rate:</span>
              <span className="font-bold text-[#2E7D5B] font-mono">0.14 per 1M hrs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#68716C]">CSR Spent:</span>
              <span className="font-bold text-[#12372A] font-mono">₹ 42.80 Cr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#68716C]">Fair Wage Compliance:</span>
              <span className="font-bold text-[#2E7D5B] font-mono">100% Statutory</span>
            </div>
          </div>
        </div>

        <div className="corp-card p-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#DDE3DE] text-xs font-bold text-[#12372A] uppercase">
            <Scale className="w-4 h-4 text-[#12372A]" />
            <span>Governance Pillar</span>
          </div>
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#68716C]">Anti-Corruption Training:</span>
              <span className="font-bold text-[#2E7D5B] font-mono">100% Certified</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#68716C]">Independent Assurance:</span>
              <span className="font-bold text-[#12372A]">ISAE 3000 Clean</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#68716C]">Whistleblower Inquiries:</span>
              <span className="font-bold text-[#12372A] font-mono">0 Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
