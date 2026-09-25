import React, { useState, useEffect } from 'react';
import {
  Search,
  HardHat,
  FileSpreadsheet,
  ShieldCheck,
  Leaf,
  Users,
  ArrowRight,
  X,
} from 'lucide-react';
import { EntityNode, MetricDefinition, ESGDataRecord, BRSRCoreKPI } from '../types/esg';
import { NavTab } from './Sidebar';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  entities: EntityNode[];
  metrics: MetricDefinition[];
  records: ESGDataRecord[];
  brsrCoreKpis: BRSRCoreKPI[];
  onNavigate: (tab: NavTab) => void;
  onSelectProject: (projectId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  entities,
  metrics,
  records,
  brsrCoreKpis,
  onNavigate,
  onSelectProject,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const term = searchTerm.toLowerCase().trim();

  const matchedProjects = entities.filter(
    (e) =>
      e.type === 'project' &&
      (e.name.toLowerCase().includes(term) ||
        e.state.toLowerCase().includes(term) ||
        e.industryCategory.toLowerCase().includes(term))
  ).slice(0, 4);

  const matchedMetrics = metrics.filter(
    (m) =>
      m.name.toLowerCase().includes(term) ||
      m.code.toLowerCase().includes(term) ||
      m.category.toLowerCase().includes(term)
  ).slice(0, 4);

  const matchedBrsr = brsrCoreKpis.filter(
    (k) =>
      k.name.toLowerCase().includes(term) ||
      k.principle.toLowerCase().includes(term) ||
      k.kpiNumber.toLowerCase().includes(term) ||
      k.attribute.toLowerCase().includes(term)
  ).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-20 p-4 backdrop-blur-xs select-none font-sans text-[#202522]">
      <div className="bg-white border border-[#DDE3DE] rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#DDE3DE] flex items-center gap-3 bg-[#F7F7F3]">
          <Search className="w-5 h-5 text-[#1F6F50] shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search ESG data, projects, reports..."
            className="w-full bg-transparent text-xs text-[#202522] placeholder-[#68716C] focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#68716C] hover:text-[#12372A] text-xs p-1 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[#68716C] hover:text-[#12372A] p-1 rounded transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[420px] overflow-y-auto p-4 space-y-4 bg-white">
          {!searchTerm ? (
            <div className="space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#68716C]">
                Suggested Quick Searches
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setSearchTerm('Polavaram')}
                  className="p-2.5 rounded-lg bg-[#F7F7F3] border border-[#DDE3DE] hover:border-[#1F6F50] text-left text-[#202522] transition-all cursor-pointer flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <HardHat className="w-4 h-4 text-[#1F6F50]" />
                    <span className="font-semibold">Polavaram Dam Project</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#68716C]" />
                </button>

                <button
                  onClick={() => setSearchTerm('Scope 1')}
                  className="p-2.5 rounded-lg bg-[#F7F7F3] border border-[#DDE3DE] hover:border-[#1F6F50] text-left text-[#202522] transition-all cursor-pointer flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-[#2E7D5B]" />
                    <span className="font-semibold">Scope 1 GHG Emissions</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#68716C]" />
                </button>

                <button
                  onClick={() => setSearchTerm('Water')}
                  className="p-2.5 rounded-lg bg-[#F7F7F3] border border-[#DDE3DE] hover:border-[#1F6F50] text-left text-[#202522] transition-all cursor-pointer flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-[#1F6F50]" />
                    <span className="font-semibold">Water Withdrawal</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#68716C]" />
                </button>

                <button
                  onClick={() => setSearchTerm('LTIFR')}
                  className="p-2.5 rounded-lg bg-[#F7F7F3] border border-[#DDE3DE] hover:border-[#1F6F50] text-left text-[#202522] transition-all cursor-pointer flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#B8872F]" />
                    <span className="font-semibold">Workplace Safety & LTIFR</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#68716C]" />
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Matched Projects */}
              {matchedProjects.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#68716C] flex items-center gap-1.5">
                    <HardHat className="w-3.5 h-3.5 text-[#1F6F50]" />
                    <span>Projects</span>
                  </div>
                  {matchedProjects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectProject(p.id);
                        onNavigate('projects');
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-lg bg-[#F7F7F3] hover:bg-[#EDF4EF] border border-[#DDE3DE] text-left transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#12372A]">{p.name}</div>
                        <div className="text-[11px] text-[#68716C]">
                          {p.state} · {p.industryCategory}
                        </div>
                      </div>
                      <span className="text-xs text-[#1F6F50] font-semibold flex items-center gap-1">
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Matched Metrics */}
              {matchedMetrics.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#68716C] flex items-center gap-1.5">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-[#2E7D5B]" />
                    <span>ESG Metrics</span>
                  </div>
                  {matchedMetrics.map((m) => (
                    <button
                      key={m.code}
                      onClick={() => {
                        if (m.pillar === 'Environmental') onNavigate('environmental');
                        else if (m.pillar === 'Social') onNavigate('social-safety');
                        else onNavigate('governance');
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-lg bg-[#F7F7F3] hover:bg-[#EDF4EF] border border-[#DDE3DE] text-left transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#12372A] flex items-center gap-2">
                          <span>{m.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white text-[#68716C] border border-[#DDE3DE]">
                            {m.code}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#68716C]">
                          Pillar: {m.pillar} ({m.category}) · Unit: {m.unit}
                        </div>
                      </div>
                      <span className="text-xs text-[#1F6F50] font-semibold flex items-center gap-1">
                        <span>Explore Metric</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Matched BRSR KPIs */}
              {matchedBrsr.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#68716C] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#12372A]" />
                    <span>BRSR Core Disclosures</span>
                  </div>
                  {matchedBrsr.map((k) => (
                    <button
                      key={k.id}
                      onClick={() => {
                        onNavigate('brsr');
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-lg bg-[#F7F7F3] hover:bg-[#EDF4EF] border border-[#DDE3DE] text-left transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#12372A]">{k.name}</div>
                        <div className="text-[11px] text-[#68716C]">
                          {k.kpiNumber} · {k.principle} · Value: {k.meilGroupValue}
                        </div>
                      </div>
                      <span className="text-xs text-[#1F6F50] font-semibold flex items-center gap-1">
                        <span>BRSR Sheet</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {matchedProjects.length === 0 && matchedMetrics.length === 0 && matchedBrsr.length === 0 && (
                <div className="py-8 text-center text-xs text-[#68716C]">
                  No direct results found for &ldquo;{searchTerm}&rdquo;.
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F7F7F3] border-t border-[#DDE3DE] text-[11px] text-[#68716C] flex items-center justify-between">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white text-[#202522] font-mono border border-[#DDE3DE]">ESC</kbd> to exit</span>
          <span className="text-[#1F6F50] font-semibold">MEIL Fast Search Index Active</span>
        </div>
      </div>
    </div>
  );
};
