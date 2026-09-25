import React, { useState } from 'react';
import {
  HardHat,
  MapPin,
  ShieldCheck,
  Zap,
  Droplets,
  Flame,
  FileCheck,
  AlertTriangle,
  Search,
  CheckCircle,
  X,
  FileText,
  Activity,
  ArrowRight,
  Leaf,
  Users,
} from 'lucide-react';
import { EntityNode, ESGDataRecord, AnomalyItem, EvidenceDocument } from '../types/esg';

interface ProjectIntelligenceViewProps {
  projects: EntityNode[];
  records: ESGDataRecord[];
  anomalies: AnomalyItem[];
  evidenceDocs: EvidenceDocument[];
  selectedProjectId?: string;
  onClearSelectedProject?: () => void;
  onNavigateToEvidence?: () => void;
}

export const ProjectIntelligenceView: React.FC<ProjectIntelligenceViewProps> = ({
  projects,
  records,
  anomalies,
  evidenceDocs,
  selectedProjectId,
  onClearSelectedProject,
  onNavigateToEvidence,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubFilter, setSelectedSubFilter] = useState('all');
  const [activeProject, setActiveProject] = useState<EntityNode>(
    (selectedProjectId && projects.find((p) => p.id === selectedProjectId)) || projects[0]
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'safety' | 'evidence'>('overview');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSub =
      selectedSubFilter === 'all' || p.subsidiaryId === selectedSubFilter;
    return matchesSearch && matchesSub;
  });

  return (
    <div className="space-y-6 select-none font-sans text-[#202522]">
      {/* Top Header */}
      <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F6F50] mb-1">
              <HardHat className="w-4 h-4 text-[#2E7D5B]" />
              <span>PROJECT CONTROL CENTER</span>
              <span className="text-[#68716C]">·</span>
              <span>20+ Nationwide Sites</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#12372A] tracking-tight">
              Project Intelligence
            </h1>
            <p className="text-xs text-[#68716C] mt-1">
              Field-level ESG monitoring, occupational safety, resource metrics, and primary evidence verification.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#68716C] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, state..."
                className="bg-[#F7F7F3] border border-[#DDE3DE] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#202522] focus:border-[#12372A]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: Left Projects Selector (4 Cols) + Right Active Project Control View (8 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Project Selector List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-[#12372A] uppercase tracking-wider mb-2">
            Active Infrastructure Projects ({filteredProjects.length})
          </div>

          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {filteredProjects.map((p) => {
              const isSelected = activeProject.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveProject(p)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#EDF4EF] border-[#2E7D5B] shadow-xs'
                      : 'bg-white border-[#DDE3DE] hover:bg-[#F7F7F3]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#12372A] truncate">
                      {p.name}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white text-[#2E7D5B] border border-[#DDE3DE]">
                      Active
                    </span>
                  </div>
                  <div className="text-[11px] text-[#68716C] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#68716C]" />
                    <span>{p.location}, {p.state}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-[#DDE3DE] flex items-center justify-between text-[10px] text-[#68716C]">
                    <span>Category: {p.industryCategory}</span>
                    <span className="text-[#12372A] font-bold font-mono">92% Logged</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Project Control Panel */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Project Header Card */}
          <div className="corp-card p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DDE3DE]">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-[#12372A]">{activeProject.name}</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EDF4EF] text-[#2E7D5B] border border-[#DDE3DE]">
                    Active Site
                  </span>
                </div>
                <p className="text-xs text-[#68716C] mt-0.5 flex items-center gap-2">
                  <span>Location: <strong>{activeProject.location}, {activeProject.state}</strong></span>
                  <span>·</span>
                  <span>Category: <strong>{activeProject.industryCategory}</strong></span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F7F7F3] text-[#12372A] border border-[#DDE3DE]">
                  PM: {activeProject.projectManager || 'V. Sundaram'}
                </span>
              </div>
            </div>

            {/* 6 Key Project KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              <div className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
                <div className="text-[10px] text-[#68716C] uppercase font-bold">ESG Completion</div>
                <div className="text-xl font-bold text-[#2E7D5B] font-mono mt-0.5">94.5%</div>
                <div className="text-[10px] text-[#68716C] mt-0.5">14 of 15 metrics logged</div>
              </div>

              <div className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
                <div className="text-[10px] text-[#68716C] uppercase font-bold">Safety (LTIFR)</div>
                <div className="text-xl font-bold text-[#12372A] font-mono mt-0.5">0.00</div>
                <div className="text-[10px] text-[#2E7D5B] font-semibold mt-0.5">0 Fatalities (Target Met)</div>
              </div>

              <div className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
                <div className="text-[10px] text-[#68716C] uppercase font-bold">Scope 1 Fuel</div>
                <div className="text-xl font-bold text-[#12372A] font-mono mt-0.5">28.4k L</div>
                <div className="text-[10px] text-[#68716C] mt-0.5">HSD Diesel Consumption</div>
              </div>

              <div className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
                <div className="text-[10px] text-[#68716C] uppercase font-bold">Water Withdrawal</div>
                <div className="text-xl font-bold text-[#12372A] font-mono mt-0.5">125,400 KL</div>
                <div className="text-[10px] text-[#68716C] mt-0.5">Surface Godavari intake</div>
              </div>

              <div className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
                <div className="text-[10px] text-[#68716C] uppercase font-bold">Evidence Attached</div>
                <div className="text-xl font-bold text-[#1F6F50] font-mono mt-0.5">12 Docs</div>
                <div className="text-[10px] text-[#2E7D5B] font-semibold mt-0.5">100% Verified</div>
              </div>

              <div className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
                <div className="text-[10px] text-[#68716C] uppercase font-bold">Open Issues</div>
                <div className="text-xl font-bold text-[#B8872F] font-mono mt-0.5">01</div>
                <div className="text-[10px] text-[#68716C] mt-0.5">Log reconciliation</div>
              </div>
            </div>
          </div>

          {/* Sub-Tabs: Recent Submissions / Environmental / Safety */}
          <div className="corp-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE]">
              <div className="flex items-center gap-2">
                {(['overview', 'submissions', 'safety', 'evidence'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all cursor-pointer ${
                      activeTab === tab
                        ? 'bg-[#12372A] text-white'
                        : 'bg-[#F7F7F3] text-[#68716C] hover:text-[#12372A]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Overview / Submissions table */}
            <div className="overflow-x-auto">
              <table className="corp-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Reported Value</th>
                    <th>Reporting Period</th>
                    <th>Source Document</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-semibold text-[#12372A]">Water Intake (Raw Water)</td>
                    <td className="font-mono font-bold text-[#2E7D5B]">125,400 KL</td>
                    <td className="font-mono text-xs">FY 2025-26 Q2</td>
                    <td className="text-xs text-[#68716C]">Flowmeter Logbook & Meter Bill</td>
                    <td>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EDF4EF] text-[#2E7D5B] border border-[#DDE3DE]">
                        ● Verified
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="font-semibold text-[#12372A]">Grid Electricity (HT Line)</td>
                    <td className="font-mono font-bold text-[#12372A]">184,200 kWh</td>
                    <td className="font-mono text-xs">FY 2025-26 Q2</td>
                    <td className="text-xs text-[#68716C]">APEPDCL Monthly Invoice</td>
                    <td>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EDF4EF] text-[#2E7D5B] border border-[#DDE3DE]">
                        ● Verified
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="font-semibold text-[#12372A]">Heavy Equipment Diesel</td>
                    <td className="font-mono font-bold text-[#12372A]">28,450 Litres</td>
                    <td className="font-mono text-xs">FY 2025-26 Q2</td>
                    <td className="text-xs text-[#68716C]">IOCL Bulk Delivery Challans</td>
                    <td>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FEF9E7] text-[#B8872F] border border-[#FAD7A0]">
                        ● In Review
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
