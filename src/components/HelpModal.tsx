import React, { useState } from 'react';
import {
  HelpCircle,
  X,
  BookOpen,
  ShieldCheck,
  Leaf,
  Users,
  Scale,
  GitFork,
  CheckCircle2,
} from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [activeTopic, setActiveTopic] = useState<string>('brsr-core');

  if (!isOpen) return null;

  const topics = [
    {
      id: 'brsr-core',
      title: 'What is SEBI BRSR Core?',
      category: 'Regulatory',
      summary: 'Mandatory subset of 9 ESG indicators requiring reasonable external assurance.',
      content:
        'BRSR Core consists of 9 key ESG attributes identified by SEBI (Securities and Exchange Board of India) for listed corporate groups in India. It includes Scope 1 & 2 GHG emissions, water consumption intensity per rupee of turnover, renewable energy percentage, hazardous waste recovery, lost time injury frequency (LTIFR), POSH compliance, and female employee gross wages.',
    },
    {
      id: 'ghg-scopes',
      title: 'Scope 1 vs Scope 2 vs Scope 3 GHG',
      category: 'Methodology',
      summary: 'Direct fuels vs purchased electricity vs value chain emissions.',
      content:
        'Scope 1 refers to direct emissions from company-owned or controlled sources (e.g. diesel consumed in excavators, generator sets, and boilers). Scope 2 refers to indirect emissions from the generation of purchased electricity (DISCOM grid power). Scope 3 covers upstream and downstream supply chain activities such as raw materials (cement, steel) and logistics.',
    },
    {
      id: 'isae-3000',
      title: 'ISAE 3000 & Reasonable Assurance',
      category: 'Audit & Assurance',
      summary: 'The global standard used by audit firms (DNV, EY, PwC) to certify ESG data.',
      content:
        'ISAE 3000 (Revised) is an international standard issued by the IAASB for non-financial assurance engagements. In MEIL ESG360, external reviewers verify sample invoices, utility meter logs, and calculation methodologies to issue an Independent Assurance Statement for the Annual BRSR Report.',
    },
    {
      id: 'hierarchy-rollup',
      title: 'How does Hierarchy Roll-up work?',
      category: 'Architecture',
      summary: 'Aggregates 20+ project sites → 6 BUs → 3 Subsidiaries → MEIL Group.',
      content:
        'MEIL ESG360 enforces a strict bottom-up data model. Data is recorded at the project level, reviewed by the Project Manager, consolidated by the Subsidiary ESG Manager, and ultimately presented as board-ready BRSR metrics at the MEIL Group Corporate level.',
    },
  ];

  const currentTopic = topics.find((t) => t.id === activeTopic) || topics[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs select-none font-sans text-[#202522]">
      <div className="bg-white border border-[#DDE3DE] rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#12372A] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#C5A35A]" />
            <div>
              <h3 className="text-base font-bold text-white">
                MEIL ESG Knowledge Base & Regulatory Guidelines
              </h3>
              <p className="text-[11px] text-[#DDE3DE]">
                SEBI BRSR Core, ISAE 3000 Assurance, and Organizational Scoping
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#DDE3DE] hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body: Sidebar + Main Viewer */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white">
          {/* Topics List */}
          <div className="w-full md:w-64 border-r border-[#DDE3DE] bg-[#F7F7F3] p-3 space-y-1.5 overflow-y-auto">
            <div className="text-[10px] font-bold text-[#68716C] uppercase px-2 mb-2">
              Topics
            </div>
            {topics.map((t) => {
              const isSelected = activeTopic === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTopic(t.id)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#EDF4EF] border-[#2E7D5B] shadow-xs'
                      : 'bg-white border-[#DDE3DE] hover:bg-[#FBFDFB]'
                  }`}
                >
                  <div className="text-xs font-bold text-[#12372A]">{t.title}</div>
                  <div className="text-[10px] text-[#1F6F50] font-semibold mt-0.5">{t.category}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed Content */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <div className="pb-3 border-b border-[#DDE3DE]">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EDF4EF] text-[#1F6F50] border border-[#DDE3DE]">
                {currentTopic.category}
              </span>
              <h2 className="text-xl font-bold text-[#12372A] mt-2">
                {currentTopic.title}
              </h2>
              <p className="text-xs text-[#68716C] mt-1">
                {currentTopic.summary}
              </p>
            </div>

            <div className="text-xs text-[#202522] leading-relaxed space-y-3">
              <p>{currentTopic.content}</p>
            </div>

            <div className="p-3 bg-[#EDF4EF] rounded-lg border border-[#DDE3DE] text-xs text-[#12372A]">
              ℹ For further technical support, contact the MEIL Sustainability Directorate at <strong>esg.support@meil.in</strong>.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F7F7F3] border-t border-[#DDE3DE] flex justify-end">
          <button
            onClick={onClose}
            className="btn-secondary text-xs"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
