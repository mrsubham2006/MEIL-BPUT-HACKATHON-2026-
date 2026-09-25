import React, { useState } from 'react';
import {
  Building2,
  ChevronRight,
  ChevronDown,
  Layers,
  MapPin,
  HardHat,
  Network,
} from 'lucide-react';
import { EntityNode } from '../types/esg';

interface OrganizationViewProps {
  entities: EntityNode[];
  onSelectProject: (projectId: string) => void;
}

export const OrganizationView: React.FC<OrganizationViewProps> = ({
  entities,
  onSelectProject,
}) => {
  const [selectedNode, setSelectedNode] = useState<EntityNode>(
    entities.find((e) => e.id === 'meil-group') || entities[0]
  );

  const subsidiaries = entities.filter((e) => e.type === 'subsidiary');
  const projects = entities.filter((e) => e.type === 'project');

  return (
    <div className="space-y-6 select-none font-sans text-[#202522]">
      {/* Top Header */}
      <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1F6F50] mb-1">
          <Network className="w-4 h-4 text-[#2E7D5B]" />
          <span>ORGANIZATION STRUCTURE & BOUNDARIES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#12372A] tracking-tight">
          Group Hierarchy
        </h1>
        <p className="text-xs text-[#68716C] mt-1">
          MEIL Group multi-tier reporting structure encompassing 3 operating subsidiaries, 6 business units, and 20+ mega infrastructure sites.
        </p>
      </div>

      {/* Hierarchy Tree & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Organization Tree (6 Cols) */}
        <div className="lg:col-span-6 corp-card p-6 space-y-4">
          <h2 className="text-xs font-bold text-[#12372A] uppercase tracking-wider pb-2 border-b border-[#DDE3DE]">
            Enterprise Entity Hierarchy
          </h2>

          {/* Group Node */}
          <div className="space-y-3">
            <button
              onClick={() => setSelectedNode(entities[0])}
              className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                selectedNode.id === 'meil-group'
                  ? 'bg-[#EDF4EF] border-[#2E7D5B] shadow-xs'
                  : 'bg-[#F7F7F3] border-[#DDE3DE]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-[#12372A]" />
                <div>
                  <div className="text-xs font-bold text-[#12372A]">MEIL Group (Consolidated)</div>
                  <div className="text-[11px] text-[#68716C]">Corporate Headquarters · Hyderabad</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[#12372A] border border-[#DDE3DE]">
                Holding Level
              </span>
            </button>

            {/* Subsidiaries */}
            <div className="pl-6 space-y-2 border-l-2 border-[#DDE3DE]">
              {subsidiaries.map((sub) => {
                const isSelected = selectedNode.id === sub.id;
                const subProjects = projects.filter((p) => p.subsidiaryId === sub.id);
                return (
                  <div key={sub.id} className="space-y-2">
                    <button
                      onClick={() => setSelectedNode(sub)}
                      className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#EDF4EF] border-[#2E7D5B] shadow-xs'
                          : 'bg-white border-[#DDE3DE] hover:bg-[#F7F7F3]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#1F6F50]" />
                        <div>
                          <div className="text-xs font-bold text-[#12372A]">{sub.name}</div>
                          <div className="text-[10px] text-[#68716C]">{subProjects.length} operating sites</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-[#1F6F50]">
                        Subsidiary
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Entity Details (6 Cols) */}
        <div className="lg:col-span-6 corp-card p-6 space-y-4">
          <div className="pb-3 border-b border-[#DDE3DE]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#68716C]">
              Entity Information Card
            </span>
            <h3 className="text-lg font-bold text-[#12372A] mt-1">{selectedNode.name}</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
                <span className="text-[10px] text-[#68716C] uppercase font-bold">Type</span>
                <div className="font-semibold text-[#12372A] mt-0.5 capitalize">{selectedNode.type}</div>
              </div>
              <div className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
                <span className="text-[10px] text-[#68716C] uppercase font-bold">State / Location</span>
                <div className="font-semibold text-[#12372A] mt-0.5">{selectedNode.state || 'Hyderabad, Telangana'}</div>
              </div>
            </div>

            <div className="p-3.5 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#68716C]">Reporting Boundary:</span>
                <span className="font-semibold text-[#12372A]">100% Operational Control</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#68716C]">BRSR Applicability:</span>
                <span className="font-bold text-[#2E7D5B]">Mandatory SEBI Core</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#68716C]">Auditor Assignment:</span>
                <span className="font-semibold text-[#12372A]">DNV Business Assurance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
