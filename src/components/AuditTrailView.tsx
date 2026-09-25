import React, { useState } from 'react';
import {
  History,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Clock,
  Filter,
} from 'lucide-react';
import { AuditLogEntry } from '../types/esg';

interface AuditTrailViewProps {
  auditLogs: AuditLogEntry[];
}

export const AuditTrailView: React.FC<AuditTrailViewProps> = ({ auditLogs }) => {
  const [search, setSearch] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.entityName.toLowerCase().includes(search.toLowerCase()) ||
      log.metricName.toLowerCase().includes(search.toLowerCase()) ||
      log.userName.toLowerCase().includes(search.toLowerCase()) ||
      log.reason.toLowerCase().includes(search.toLowerCase());
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-400">CRYPTOGRAPHIC AUDIT TRAIL & IMMUTABILITY LOG</div>
            <h2 className="text-xl font-bold text-white mt-1">
              MEIL Enterprise Governance & Mutation Audit
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Permanent immutable historical record of every data submission, calculation adjustment, meter replacement, approval sign-off, and assurance opinion.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search user, site, or metric..."
                className="bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500 w-52"
              />
            </div>

            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">All Actions</option>
              <option value="CREATE">CREATE</option>
              <option value="UPDATE">UPDATE</option>
              <option value="APPROVE">APPROVE</option>
              <option value="ASSURE">ASSURE</option>
              <option value="REJECT">REJECT</option>
            </select>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">User & Role</th>
                <th className="py-2.5 px-3">Entity & Project</th>
                <th className="py-2.5 px-3">Metric Affected</th>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Old → New Value</th>
                <th className="py-2.5 px-3">Justification & Evidence</th>
                <th className="py-2.5 px-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-3 px-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-white">{log.userName}</div>
                    <div className="text-[10px] text-slate-400">{log.userRole}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-white font-medium">{log.entityName}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-emerald-400 font-medium">{log.metricName}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        log.action === 'APPROVE' || log.action === 'ASSURE'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-900'
                          : log.action === 'CREATE'
                          ? 'bg-blue-950 text-blue-300 border-blue-900'
                          : log.action === 'UPDATE'
                          ? 'bg-amber-950 text-amber-300 border-amber-900'
                          : 'bg-red-950 text-red-300 border-red-900'
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px]">
                    {log.oldValue ? (
                      <span>
                        <span className="text-slate-400">{log.oldValue}</span>
                        <span className="text-slate-400 mx-1">→</span>
                        <span className="text-white font-bold">{log.newValue}</span>
                      </span>
                    ) : (
                      <span className="text-white font-bold">{log.newValue}</span>
                    )}
                  </td>
                  <td className="py-3 px-3 max-w-xs text-slate-300 text-[11px]">
                    <div>{log.reason}</div>
                    {log.evidenceRef && log.evidenceRef !== 'N/A' && (
                      <div className="text-[10px] text-blue-400 mt-0.5">Ref: {log.evidenceRef}</div>
                    )}
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-400">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
