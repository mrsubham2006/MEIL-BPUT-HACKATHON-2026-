import React from 'react';
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const GovernanceView: React.FC = () => {
  return (
    <div className="space-y-6 select-none font-sans text-[#202522]">
      {/* Header */}
      <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F6F50] mb-1">
              <Scale className="w-4 h-4 text-[#2E7D5B]" />
              <span>GOVERNANCE & COMPLIANCE HUB (NGRBC PRINCIPLES 1, 7, 9)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#12372A] tracking-tight">
              Corporate Governance
            </h1>
            <p className="text-xs text-[#68716C] mt-1">
              Board oversight, business ethics, cybersecurity, and regulatory filings.
            </p>
          </div>
          <span className="px-3 py-1 bg-[#EDF4EF] text-[#2E7D5B] text-xs font-bold rounded-lg border border-[#DDE3DE]">
            Nil Regulatory Penalties · Clean Assurance
          </span>
        </div>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="corp-card p-4">
          <div className="text-[11px] font-bold text-[#68716C] uppercase">Anti-Bribery Certification</div>
          <div className="text-2xl font-bold text-[#12372A] font-mono mt-1">100%</div>
          <div className="text-[10px] text-[#2E7D5B] font-semibold mt-1">Executive certified</div>
        </div>

        <div className="corp-card p-4">
          <div className="text-[11px] font-bold text-[#68716C] uppercase">Whistleblower Vigil</div>
          <div className="text-2xl font-bold text-[#12372A] font-mono mt-1">0 Pending</div>
          <div className="text-[10px] text-[#2E7D5B] font-semibold mt-1">4 of 4 inquiries disposed</div>
        </div>

        <div className="corp-card p-4">
          <div className="text-[11px] font-bold text-[#68716C] uppercase">Statutory / NGT Fines</div>
          <div className="text-2xl font-bold text-[#2E7D5B] font-mono mt-1">₹ 0 (Nil)</div>
          <div className="text-[10px] text-[#68716C] mt-1">Zero non-compliance fines</div>
        </div>

        <div className="corp-card p-4">
          <div className="text-[11px] font-bold text-[#68716C] uppercase">Cybersecurity Breaches</div>
          <div className="text-2xl font-bold text-[#2E7D5B] font-mono mt-1">0</div>
          <div className="text-[10px] text-[#68716C] mt-1">SCADA & telemetry protected</div>
        </div>
      </div>

      {/* Policies Summary */}
      <div className="corp-card p-6 space-y-4">
        <h2 className="text-sm font-bold text-[#12372A] uppercase tracking-wider pb-3 border-b border-[#DDE3DE]">
          Board Approved Governance Charters
        </h2>

        <div className="space-y-2 text-xs">
          {[
            { name: 'Anti-Bribery & Whistleblower Mechanism', board: 'MEIL Board Approved', audit: 'Annual Internal Audit Review' },
            { name: 'POSH (Prevention of Sexual Harassment) Policy', board: 'MEIL Board Approved', audit: '100% Internal Complaints Committee Ready' },
            { name: 'Cybersecurity & Telemetry Infrastructure Standard', board: 'MEIL Board Approved', audit: 'ISO 27001 Aligned Controls' },
            { name: 'Fair Competition & Vendor Code of Conduct', board: 'MEIL Board Approved', audit: 'Mandatory Tier-1 Supplier Clause' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE] flex items-center justify-between">
              <span className="font-semibold text-[#12372A]">{item.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#1F6F50] font-semibold">{item.board}</span>
                <span className="text-[11px] text-[#68716C]">{item.audit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
