import React, { useState } from 'react';
import {
  HardHat,
  Users,
  Award,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import { CSR_PROJECTS } from '../data/mockData';

export const SocialSafetyView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'safety' | 'diversity' | 'csr'>('safety');

  return (
    <div className="space-y-6 select-none font-sans text-[#202522]">
      {/* Top Header */}
      <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F6F50] mb-1">
              <Users className="w-4 h-4 text-[#2E7D5B]" />
              <span>SOCIAL & WORKFORCE HUB (NGRBC PRINCIPLES 3, 5, 8)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#12372A] tracking-tight">
              Safety & Social Performance
            </h1>
            <p className="text-xs text-[#68716C] mt-1">
              Workplace safety, fair labour practices, workforce upskilling, and community development.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#F7F7F3] p-1 rounded-lg border border-[#DDE3DE]">
            {[
              { id: 'safety', label: 'Workforce Safety' },
              { id: 'diversity', label: 'Diversity & Inclusion' },
              { id: 'csr', label: 'CSR Community Impact' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#12372A] text-white shadow-xs'
                    : 'text-[#68716C] hover:text-[#12372A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="corp-card p-4">
          <div className="text-[11px] font-bold text-[#68716C] uppercase">Workplace Fatalities</div>
          <div className="text-2xl font-bold text-[#2E7D5B] font-mono mt-1">0</div>
          <div className="text-[10px] text-[#2E7D5B] font-semibold mt-1">Zero Harm Target Achieved</div>
        </div>

        <div className="corp-card p-4">
          <div className="text-[11px] font-bold text-[#68716C] uppercase">LTIFR (Safe Hours)</div>
          <div className="text-2xl font-bold text-[#12372A] font-mono mt-1">0.14</div>
          <div className="text-[10px] text-[#68716C] mt-1">22.45M safe hours logged</div>
        </div>

        <div className="corp-card p-4">
          <div className="text-[11px] font-bold text-[#68716C] uppercase">Total Workforce</div>
          <div className="text-2xl font-bold text-[#12372A] font-mono mt-1">48,200+</div>
          <div className="text-[10px] text-[#68716C] mt-1">100% statutory benefits</div>
        </div>

        <div className="corp-card p-4">
          <div className="text-[11px] font-bold text-[#68716C] uppercase">CSR Execution</div>
          <div className="text-2xl font-bold text-[#12372A] font-mono mt-1">₹ 42.8 Cr</div>
          <div className="text-[10px] text-[#2E7D5B] font-semibold mt-1">142 RO water plants installed</div>
        </div>
      </div>

      {/* CSR Projects Table */}
      {activeTab === 'csr' && (
        <div className="corp-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#12372A] uppercase tracking-wider pb-3 border-b border-[#DDE3DE]">
            Corporate Social Responsibility (Section 135 Compliant Projects)
          </h2>

          <div className="overflow-x-auto">
            <table className="corp-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Location</th>
                  <th>Focus Area</th>
                  <th>Spend (₹ Cr)</th>
                  <th>Beneficiaries</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {CSR_PROJECTS.map((proj) => (
                  <tr key={proj.id}>
                    <td className="font-semibold text-[#12372A]">{proj.title}</td>
                    <td>{proj.location}</td>
                    <td>
                      <span className="px-2 py-0.5 rounded bg-[#EDF4EF] text-[#12372A] text-[10px] font-semibold">
                        {proj.programCategory}
                      </span>
                    </td>
                    <td className="font-mono font-bold text-[#12372A]">₹ {(proj.investmentLakhs / 100).toFixed(2)} Cr</td>
                    <td className="font-mono text-xs">{proj.beneficiariesCount}</td>
                    <td>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EDF4EF] text-[#2E7D5B]">
                        ● Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
