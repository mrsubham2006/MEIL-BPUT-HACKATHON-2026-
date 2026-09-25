import React from 'react';
import {
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Zap,
  Droplets,
  Flame,
  HardHat,
  Users,
  Award,
  ArrowRight,
  GitFork,
  FileSpreadsheet,
  FileCheck2,
  Sparkles,
  Leaf,
  Scale,
  Clock,
  AlertTriangle,
  Check,
} from 'lucide-react';
import { EntityNode, ESGDataRecord, BRSRCoreKPI, AnomalyItem } from '../types/esg';
import { NavTab } from './Sidebar';

interface CommandCenterViewProps {
  selectedEntity: EntityNode;
  selectedPeriod: string;
  records: ESGDataRecord[];
  anomalies: AnomalyItem[];
  brsrCoreKpis: BRSRCoreKPI[];
  onNavigate: (tab: NavTab) => void;
  onSelectProject: (projectId: string) => void;
  onOpenCopilot: () => void;
}

export const CommandCenterView: React.FC<CommandCenterViewProps> = ({
  selectedEntity,
  selectedPeriod,
  records,
  anomalies,
  brsrCoreKpis,
  onNavigate,
  onSelectProject,
  onOpenCopilot,
}) => {
  const readyKpisCount = brsrCoreKpis.filter(
    (k) => k.assuranceStatus === 'Assurance Ready' || k.assuranceStatus === 'Assured'
  ).length;

  const openAnomaliesCount = anomalies.filter((a) => a.status === 'Open' || a.status === 'Investigating').length;

  return (
    <div className="space-y-6 select-none font-sans text-[#202522]">
      {/* 1. TOP GREETING & CONTEXT HEADER */}
      <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F6F50] mb-1">
              <span>MEIL ESG COMMAND CENTER</span>
              <span className="text-[#68716C]">·</span>
              <span className="text-[#68716C]">{selectedEntity.name}</span>
              <span className="text-[#68716C]">·</span>
              <span className="text-[#68716C]">{selectedPeriod}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#12372A] tracking-tight">
              Good morning, Dr. K. S. Rao
            </h1>
            <p className="text-xs text-[#68716C] mt-1">
              Here is what needs your attention today across MEIL Group sustainability operations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('data-collection')}
              className="btn-primary"
            >
              <span>Add ESG Data</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('brsr')}
              className="btn-secondary"
            >
              <FileCheck2 className="w-4 h-4 text-[#1F6F50]" />
              <span>BRSR Reporting</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. FIVE CORE QUESTIONS - TOP 4 COMPACT METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: MY TASKS */}
        <div
          onClick={() => onNavigate('tasks')}
          className="corp-card p-4 hover:border-[#1F6F50] transition-colors cursor-pointer"
        >
          <div className="text-[11px] font-bold text-[#68716C] uppercase tracking-wider">
            MY TASKS
          </div>
          <div className="text-2xl font-bold text-[#12372A] mt-1 tabular-nums font-mono">
            12
          </div>
          <div className="text-[11px] text-[#2E7D5B] mt-1 font-medium flex items-center gap-1">
            <span>5 Priority actions assigned</span>
          </div>
        </div>

        {/* CARD 2: PENDING DATA */}
        <div
          onClick={() => onNavigate('data-collection')}
          className="corp-card p-4 hover:border-[#1F6F50] transition-colors cursor-pointer"
        >
          <div className="text-[11px] font-bold text-[#68716C] uppercase tracking-wider">
            PENDING DATA
          </div>
          <div className="text-2xl font-bold text-[#12372A] mt-1 tabular-nums font-mono">
            07
          </div>
          <div className="text-[11px] text-[#68716C] mt-1 font-medium">
            Project site logs awaiting entry
          </div>
        </div>

        {/* CARD 3: PENDING REVIEWS */}
        <div
          onClick={() => onNavigate('assurance')}
          className="corp-card p-4 hover:border-[#1F6F50] transition-colors cursor-pointer"
        >
          <div className="text-[11px] font-bold text-[#68716C] uppercase tracking-wider">
            PENDING REVIEWS
          </div>
          <div className="text-2xl font-bold text-[#12372A] mt-1 tabular-nums font-mono">
            04
          </div>
          <div className="text-[11px] text-[#B8872F] mt-1 font-medium">
            Evidence dossiers awaiting sign-off
          </div>
        </div>

        {/* CARD 4: DEADLINES */}
        <div className="corp-card p-4">
          <div className="text-[11px] font-bold text-[#68716C] uppercase tracking-wider">
            DEADLINES
          </div>
          <div className="text-2xl font-bold text-[#12372A] mt-1 tabular-nums font-mono">
            03
          </div>
          <div className="text-[11px] text-[#B94A48] mt-1 font-medium">
            Q2 disclosure cut-off in 6 days
          </div>
        </div>
      </div>

      {/* 3. YOUR PROGRESS (3 PROGRESS METERS) */}
      <div className="corp-card p-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE] mb-5">
          <h2 className="text-sm font-bold text-[#12372A] uppercase tracking-wider">
            Your Progress
          </h2>
          <span className="text-xs text-[#68716C]">
            Target: 100% Assurance Ready by Q2 Close
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ESG DATA */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-[#12372A]">ESG DATA</span>
              <span className="font-bold text-[#2E7D5B]">82% Complete</span>
            </div>
            <div className="w-full bg-[#EDF4EF] rounded-full h-2">
              <div className="bg-[#2E7D5B] h-2 rounded-full" style={{ width: '82%' }} />
            </div>
            <div className="text-[11px] text-[#68716C] mt-1.5">
              18 of 22 infrastructure sites reported
            </div>
          </div>

          {/* EVIDENCE */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-[#12372A]">EVIDENCE</span>
              <span className="font-bold text-[#1F6F50]">76% Verified</span>
            </div>
            <div className="w-full bg-[#EDF4EF] rounded-full h-2">
              <div className="bg-[#1F6F50] h-2 rounded-full" style={{ width: '76%' }} />
            </div>
            <div className="text-[11px] text-[#68716C] mt-1.5">
              3,450+ utility bills & telemetry logs attached
            </div>
          </div>

          {/* BRSR CORE */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-[#12372A]">BRSR CORE</span>
              <span className="font-bold text-[#C5A35A]">68% Ready</span>
            </div>
            <div className="w-full bg-[#EDF4EF] rounded-full h-2">
              <div className="bg-[#C5A35A] h-2 rounded-full" style={{ width: '68%' }} />
            </div>
            <div className="text-[11px] text-[#68716C] mt-1.5">
              8 of 9 SEBI core attributes ready for auditor
            </div>
          </div>
        </div>
      </div>

      {/* 4. ACTION REQUIRED TABLE */}
      <div className="corp-card p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#DDE3DE]">
          <div>
            <h2 className="text-sm font-bold text-[#12372A] uppercase tracking-wider">
              ACTION REQUIRED
            </h2>
            <p className="text-xs text-[#68716C] mt-0.5">
              Items blocking quarterly consolidation and independent audit.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#EDF4EF] text-[#12372A] border border-[#DDE3DE]">
            4 Critical Actions
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="corp-table">
            <thead>
              <tr>
                <th>Issue</th>
                <th>Project / Entity</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="font-semibold text-[#12372A]">Missing Water Consumption Data</div>
                  <div className="text-[11px] text-[#68716C]">Q2 Logbook & Municipal Invoice pending</div>
                </td>
                <td className="font-medium">MEIL Infra Project Alpha (Polavaram)</td>
                <td className="font-mono text-xs text-[#B94A48] font-semibold">28 Sep 2026</td>
                <td>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FDF2F2] text-[#B94A48] border border-[#F5C6CB]">
                    ● Pending Data
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => onNavigate('data-collection')}
                    className="btn-primary text-xs py-1 px-3"
                  >
                    Update Data
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="font-semibold text-[#12372A]">Diesel Fuel Invoice Spiking (+350%)</div>
                  <div className="text-[11px] text-[#68716C]">Exceeds historical baseline threshold</div>
                </td>
                <td className="font-medium">Zojila Tunnel Project Phase II</td>
                <td className="font-mono text-xs text-[#B8872F] font-semibold">29 Sep 2026</td>
                <td>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FEF9E7] text-[#B8872F] border border-[#FAD7A0]">
                    ● Needs Attention
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => onNavigate('risks-sdg')}
                    className="btn-secondary text-xs py-1 px-3"
                  >
                    Review Anomaly
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="font-semibold text-[#12372A]">Scope 2 Electricity Meter Calibration</div>
                  <div className="text-[11px] text-[#68716C]">External calibration certificate upload required</div>
                </td>
                <td className="font-medium">Megha Solar 500MW Western Farm</td>
                <td className="font-mono text-xs text-[#202522]">30 Sep 2026</td>
                <td>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EDF4EF] text-[#1F6F50] border border-[#DDE3DE]">
                    ● In Review
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => onNavigate('assurance')}
                    className="btn-secondary text-xs py-1 px-3"
                  >
                    View Evidence
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="font-semibold text-[#12372A]">Workplace Safety LTIFR Sign-off</div>
                  <div className="text-[11px] text-[#68716C]">Project Manager safety validation required</div>
                </td>
                <td className="font-medium">Kaleshwaram Lift Irrigation Pkg 8</td>
                <td className="font-mono text-xs text-[#202522]">01 Oct 2026</td>
                <td>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EDF4EF] text-[#2E7D5B] border border-[#DDE3DE]">
                    ● Ready for Sign-off
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => onNavigate('assurance')}
                    className="btn-primary text-xs py-1 px-3"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. GROUP ESG OVERVIEW (3 CLEAN SECTIONS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ENVIRONMENT */}
        <div className="corp-card p-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE]">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-[#2E7D5B]" />
              <h3 className="text-xs font-bold text-[#12372A] uppercase">Environment</h3>
            </div>
            <button
              onClick={() => onNavigate('environmental')}
              className="text-[11px] font-semibold text-[#1F6F50] hover:text-[#12372A]"
            >
              Explore →
            </button>
          </div>
          <div className="mt-4 space-y-3">
            <div>
              <div className="text-[11px] text-[#68716C]">Gross GHG (Scope 1 + 2)</div>
              <div className="text-lg font-bold text-[#12372A] tabular-nums font-mono">
                318,450 <span className="text-xs text-[#68716C]">tCO2e</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#68716C]">Water Circularity & Treatment</div>
              <div className="text-lg font-bold text-[#2E7D5B] tabular-nums font-mono">
                33.1% <span className="text-xs text-[#68716C]">recycled on-site</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#68716C]">Captive Solar Generation</div>
              <div className="text-lg font-bold text-[#12372A] tabular-nums font-mono">
                245 <span className="text-xs text-[#68716C]">Million kWh</span>
              </div>
            </div>
          </div>
        </div>

        {/* SOCIAL */}
        <div className="corp-card p-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#1F6F50]" />
              <h3 className="text-xs font-bold text-[#12372A] uppercase">Social & Safety</h3>
            </div>
            <button
              onClick={() => onNavigate('social-safety')}
              className="text-[11px] font-semibold text-[#1F6F50] hover:text-[#12372A]"
            >
              Explore →
            </button>
          </div>
          <div className="mt-4 space-y-3">
            <div>
              <div className="text-[11px] text-[#68716C]">Lost Time Injury Frequency (LTIFR)</div>
              <div className="text-lg font-bold text-[#2E7D5B] tabular-nums font-mono">
                0.14 <span className="text-xs text-[#68716C]">per 1M man-hours</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#68716C]">Workplace Fatalities</div>
              <div className="text-lg font-bold text-[#12372A] tabular-nums font-mono">
                0 <span className="text-xs text-[#2E7D5B] font-semibold">(Zero Vision Target)</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#68716C]">CSR Spend Executed</div>
              <div className="text-lg font-bold text-[#12372A] tabular-nums font-mono">
                ₹ 42.80 <span className="text-xs text-[#68716C]">Crores</span>
              </div>
            </div>
          </div>
        </div>

        {/* GOVERNANCE */}
        <div className="corp-card p-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE]">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#12372A]" />
              <h3 className="text-xs font-bold text-[#12372A] uppercase">Governance</h3>
            </div>
            <button
              onClick={() => onNavigate('governance')}
              className="text-[11px] font-semibold text-[#1F6F50] hover:text-[#12372A]"
            >
              Explore →
            </button>
          </div>
          <div className="mt-4 space-y-3">
            <div>
              <div className="text-[11px] text-[#68716C]">Ethics & Anti-Corruption Training</div>
              <div className="text-lg font-bold text-[#12372A] tabular-nums font-mono">
                100% <span className="text-xs text-[#68716C]">executive certified</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#68716C]">Independent Assurance Opinion</div>
              <div className="text-lg font-bold text-[#2E7D5B] tabular-nums">
                ISAE 3000 <span className="text-xs text-[#68716C]">Clean Opinion</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#68716C]">POSH & Grievance Redressal</div>
              <div className="text-lg font-bold text-[#12372A] tabular-nums font-mono">
                100% <span className="text-xs text-[#68716C]">disposed within SLA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. SUBSIDIARY REPORTING STATUS TABLE */}
      <div className="corp-card p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#DDE3DE]">
          <div>
            <h2 className="text-sm font-bold text-[#12372A] uppercase tracking-wider">
              Subsidiary Reporting Status
            </h2>
            <p className="text-xs text-[#68716C] mt-0.5">
              Consolidated reporting roll-up across MEIL Group principal operating companies.
            </p>
          </div>
          <button
            onClick={() => onNavigate('organization')}
            className="text-xs font-semibold text-[#1F6F50] hover:text-[#12372A]"
          >
            View Hierarchy →
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="corp-table">
            <thead>
              <tr>
                <th>Subsidiary</th>
                <th>Projects</th>
                <th>Data Completion</th>
                <th>Evidence</th>
                <th>BRSR Readiness</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold text-[#12372A]">Megha Solar & Hydro Power Ltd</td>
                <td className="font-mono">7 / 7 sites</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#2E7D5B] font-mono">94.2%</span>
                    <div className="w-16 bg-[#EDF4EF] rounded-full h-1.5">
                      <div className="bg-[#2E7D5B] h-1.5 rounded-full" style={{ width: '94%' }} />
                    </div>
                  </div>
                </td>
                <td className="font-mono text-[#1F6F50] font-semibold">91.0%</td>
                <td className="font-bold text-[#12372A] font-mono">92.0%</td>
                <td>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EDF4EF] text-[#2E7D5B] border border-[#DDE3DE]">
                    ● Assured
                  </span>
                </td>
              </tr>

              <tr>
                <td className="font-bold text-[#12372A]">MEIL Infra Projects Ltd</td>
                <td className="font-mono">8 / 9 sites</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1F6F50] font-mono">86.5%</span>
                    <div className="w-16 bg-[#EDF4EF] rounded-full h-1.5">
                      <div className="bg-[#1F6F50] h-1.5 rounded-full" style={{ width: '86%' }} />
                    </div>
                  </div>
                </td>
                <td className="font-mono text-[#1F6F50] font-semibold">82.4%</td>
                <td className="font-bold text-[#12372A] font-mono">84.0%</td>
                <td>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EDF4EF] text-[#1F6F50] border border-[#DDE3DE]">
                    ● Review
                  </span>
                </td>
              </tr>

              <tr>
                <td className="font-bold text-[#12372A]">Megha Hydro & Water Tech</td>
                <td className="font-mono">5 / 6 sites</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#B8872F] font-mono">79.0%</span>
                    <div className="w-16 bg-[#EDF4EF] rounded-full h-1.5">
                      <div className="bg-[#B8872F] h-1.5 rounded-full" style={{ width: '79%' }} />
                    </div>
                  </div>
                </td>
                <td className="font-mono text-[#68716C] font-semibold">74.0%</td>
                <td className="font-bold text-[#12372A] font-mono">78.5%</td>
                <td>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FEF9E7] text-[#B8872F] border border-[#FAD7A0]">
                    ● Action Required
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
