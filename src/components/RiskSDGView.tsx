import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  FileText,
  Check,
  X,
  Eye,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { ESGRisk, AnomalyItem } from '../types/esg';
import { ESG_RISKS } from '../data/mockData';

interface RiskSDGViewProps {
  anomalies: AnomalyItem[];
  onResolveAnomaly: (id: string, note: string) => void;
}

export const RiskSDGView: React.FC<RiskSDGViewProps> = ({
  anomalies,
  onResolveAnomaly,
}) => {
  const [activeTab, setActiveTab] = useState<'issues' | 'risks' | 'sdg'>('issues');
  const [activeAnomalyId, setActiveAnomalyId] = useState<string | null>(null);
  const [resolutionNote, setResolutionNote] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const handleResolve = (id: string) => {
    onResolveAnomaly(id, resolutionNote || 'Verified and reconciled with project site engineer');
    setSuccessToast('Item resolved and updated in reporting queue.');
    setActiveAnomalyId(null);
    setResolutionNote('');
    setTimeout(() => setSuccessToast(''), 4000);
  };

  const sampleIssues = [
    {
      id: 'anom-001',
      title: 'Energy consumption is significantly different from previous reporting periods.',
      project: 'Zojila Tunnel Project Phase II',
      metric: 'Stationary Diesel Fuel Consumption',
      currentValue: '142,500 Litres',
      previousValue: '31,200 Litres',
      difference: '+356.7%',
      possibleReason: 'Winter heating generator ramp-up & round-the-clock tunneling drill advance.',
      evidence: 'Zojila_IOCL_Bulk_Diesel_Receipts_Q2.pdf',
      status: 'Needs Attention',
      date: '22 Sep 2026',
    },
    {
      id: 'anom-002',
      title: 'Water consumption reading is lower than historical site baseline.',
      project: 'Polavaram Dam Project Site',
      metric: 'Surface Water Withdrawal (KL)',
      currentValue: '12,400 KL',
      previousValue: '48,600 KL',
      difference: '-74.5%',
      possibleReason: 'Heavy monsoon rainfall decreased municipal water draw; rain catchment utilized.',
      evidence: 'Polavaram_WaterIntake_Logbook_Q2.pdf',
      status: 'Needs Attention',
      date: '19 Sep 2026',
    },
    {
      id: 'anom-003',
      title: 'Missing hazardous waste manifest for scheduled quarterly haulage.',
      project: 'Balanagar Heavy Engineering Unit',
      metric: 'Hazardous Waste Recycled & Sent to TSDF',
      currentValue: '0 MT (Unreported)',
      previousValue: '14.2 MT',
      difference: 'Missing Document',
      possibleReason: 'TSDF vendor invoice delayed by state waste board certification.',
      evidence: 'Pending upload by plant manager',
      status: 'Open',
      date: '23 Sep 2026',
    },
  ];

  return (
    <div className="space-y-6 select-none font-sans text-[#202522]">
      {/* Top Header */}
      <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#B8872F] mb-1">
              <AlertTriangle className="w-4 h-4 text-[#B8872F]" />
              <span>DATA INTEGRITY & ISSUES MANAGEMENT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#12372A] tracking-tight">
              Something needs your attention
            </h1>
            <p className="text-xs text-[#68716C] mt-1">
              Review unusual data points, statistical deviations, and missing documentation before consolidation.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#F7F7F3] p-1 rounded-lg border border-[#DDE3DE]">
            <button
              onClick={() => setActiveTab('issues')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'issues'
                  ? 'bg-[#12372A] text-white shadow-xs'
                  : 'text-[#68716C] hover:text-[#12372A]'
              }`}
            >
              Action Items ({sampleIssues.length})
            </button>
            <button
              onClick={() => setActiveTab('risks')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'risks'
                  ? 'bg-[#12372A] text-white shadow-xs'
                  : 'text-[#68716C] hover:text-[#12372A]'
              }`}
            >
              Risk Register ({ESG_RISKS.length})
            </button>
          </div>
        </div>
      </div>

      {successToast && (
        <div className="p-4 rounded-xl bg-[#EDF4EF] border border-[#2E7D5B] text-xs text-[#12372A] flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#2E7D5B] shrink-0" />
          <span className="font-semibold">{successToast}</span>
        </div>
      )}

      {/* TAB 1: ISSUES NEEDING ATTENTION */}
      {activeTab === 'issues' && (
        <div className="space-y-4">
          {sampleIssues.map((issue) => (
            <div key={issue.id} className="corp-card p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDE3DE]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#B8872F]" />
                  <h3 className="text-sm font-bold text-[#12372A]">
                    {issue.title}
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FEF9E7] text-[#B8872F] border border-[#FAD7A0]">
                  ● {issue.status}
                </span>
              </div>

              {/* Data Grid Comparison */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
                  <span className="text-[10px] text-[#68716C] uppercase font-bold">Project Site</span>
                  <div className="font-semibold text-[#12372A] mt-1">{issue.project}</div>
                </div>

                <div className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
                  <span className="text-[10px] text-[#68716C] uppercase font-bold">Current Value</span>
                  <div className="font-bold text-[#12372A] font-mono mt-1">{issue.currentValue}</div>
                </div>

                <div className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
                  <span className="text-[10px] text-[#68716C] uppercase font-bold">Previous Value</span>
                  <div className="font-mono text-[#68716C] mt-1">{issue.previousValue}</div>
                </div>

                <div className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
                  <span className="text-[10px] text-[#68716C] uppercase font-bold">Difference</span>
                  <div className="font-bold text-[#B94A48] font-mono mt-1">{issue.difference}</div>
                </div>
              </div>

              {/* Reason & Evidence */}
              <div className="p-3.5 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE] space-y-2 text-xs">
                <div>
                  <span className="text-[#68716C] font-semibold">Possible Reason: </span>
                  <span className="text-[#202522]">{issue.possibleReason}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#1F6F50] font-medium pt-1 border-t border-[#DDE3DE]">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Evidence File: <strong>{issue.evidence}</strong></span>
                </div>
              </div>

              {/* Resolution Form if selected */}
              {activeAnomalyId === issue.id ? (
                <div className="p-4 bg-[#EDF4EF] rounded-lg border border-[#DDE3DE] space-y-3 text-xs">
                  <label className="block font-bold text-[#12372A]">
                    State Reason for Accepting or Reconciling Value
                  </label>
                  <input
                    type="text"
                    value={resolutionNote}
                    onChange={(e) => setResolutionNote(e.target.value)}
                    placeholder="e.g. Confirmed site engineer logbook for winter tunneling schedule"
                    className="w-full bg-white border border-[#DDE3DE] rounded-lg px-3 py-1.5 text-xs text-[#202522] focus:border-[#12372A]"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setActiveAnomalyId(null)}
                      className="btn-secondary text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleResolve(issue.id)}
                      className="btn-primary text-xs"
                    >
                      Confirm & Accept
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-[#68716C]">
                    Logged: {issue.date}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Requesting site coordinator correction on ${issue.project}`)}
                      className="btn-danger text-xs py-1"
                    >
                      Request Correction
                    </button>
                    <button
                      onClick={() => setActiveAnomalyId(issue.id)}
                      className="btn-primary text-xs py-1"
                    >
                      Review & Accept
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: RISK REGISTER */}
      {activeTab === 'risks' && (
        <div className="corp-card p-6">
          <div className="pb-3 border-b border-[#DDE3DE] mb-4">
            <h2 className="text-sm font-bold text-[#12372A] uppercase tracking-wider">
              ESG Risk Heatmap & Governance Controls
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="corp-table">
              <thead>
                <tr>
                  <th>Risk Title</th>
                  <th>Category</th>
                  <th>Likelihood</th>
                  <th>Impact</th>
                  <th>Mitigation Strategy</th>
                </tr>
              </thead>
              <tbody>
                {ESG_RISKS.map((risk) => (
                  <tr key={risk.id}>
                    <td>
                      <div className="font-semibold text-[#12372A]">{(risk as any).title || risk.description.split(' - ')[0] || risk.description}</div>
                      <div className="text-[11px] text-[#68716C]">{risk.description}</div>
                    </td>
                    <td>
                      <span className="px-2 py-0.5 rounded bg-[#EDF4EF] text-[#12372A] text-[10px] font-semibold">
                        {risk.category}
                      </span>
                    </td>
                    <td className="font-mono text-xs">{risk.likelihood}</td>
                    <td className="font-mono text-xs font-bold text-[#B8872F]">{risk.impact}</td>
                    <td className="text-xs text-[#202522]">{risk.mitigationPlan}</td>
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
