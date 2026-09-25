import React, { useState } from 'react';
import {
  Truck,
  ShieldCheck,
  Search,
  FileText,
} from 'lucide-react';
import { SupplierESGProfile } from '../types/esg';
import { SUPPLIERS_LIST } from '../data/mockData';

export const SupplierPortalView: React.FC = () => {
  const [suppliers] = useState<SupplierESGProfile[]>(SUPPLIERS_LIST);
  const [search, setSearch] = useState('');

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.supplierCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 select-none font-sans text-[#202522]">
      {/* Header */}
      <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F6F50] mb-1">
              <Truck className="w-4 h-4 text-[#2E7D5B]" />
              <span>SUPPLIER PORTAL & VALUE CHAIN (SCOPE 3)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#12372A] tracking-tight">
              Supplier Questionnaire & Scope 3
            </h1>
            <p className="text-xs text-[#68716C] mt-1">
              Track supplier code of conduct compliance, embodied carbon declarations, and statutory labour certificates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#68716C] absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search vendor / code..."
                className="bg-[#F7F7F3] border border-[#DDE3DE] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#202522] focus:border-[#12372A]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Supplier Table */}
      <div className="corp-card p-6">
        <h2 className="text-sm font-bold text-[#12372A] uppercase tracking-wider pb-3 border-b border-[#DDE3DE] mb-4">
          Tier-1 Strategic Suppliers
        </h2>

        <div className="overflow-x-auto">
          <table className="corp-table">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Category</th>
                <th>ESG Score</th>
                <th>Embodied Carbon (tCO2e)</th>
                <th>Compliance Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="font-semibold text-[#12372A]">{s.name}</div>
                    <div className="text-[11px] text-[#68716C] font-mono">{s.supplierCode}</div>
                  </td>
                  <td>{s.category}</td>
                  <td className="font-mono font-bold text-[#2E7D5B]">{s.esgScore} / 100</td>
                  <td className="font-mono text-xs">{s.ghgScope3Estimated?.toLocaleString() || '14,200'}</td>
                  <td>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EDF4EF] text-[#2E7D5B] border border-[#DDE3DE]">
                      ● Verified
                    </span>
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
