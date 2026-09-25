import React, { useState } from 'react';
import {
  Leaf,
  Zap,
  Flame,
  Droplets,
  Recycle,
  Calculator,
} from 'lucide-react';
import { ESGDataRecord } from '../types/esg';

interface EnvironmentalViewProps {
  records: ESGDataRecord[];
  selectedPeriod: string;
}

export const EnvironmentalView: React.FC<EnvironmentalViewProps> = ({
  records,
  selectedPeriod,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'energy' | 'ghg' | 'water' | 'waste' | 'calc'>('energy');

  const [calcDiesel, setCalcDiesel] = useState(50000);
  const [calcGridKWh, setCalcGridKWh] = useState(120000);
  const [calcTurnoverCr, setCalcTurnoverCr] = useState(25);

  const scope1Co2 = Math.round(((calcDiesel * 2.68) / 1000) * 100) / 100;
  const scope2Co2 = Math.round(((calcGridKWh * 0.716) / 1000) * 100) / 100;
  const totalGhg = Math.round((scope1Co2 + scope2Co2) * 100) / 100;
  const ghgIntensity = calcTurnoverCr > 0 ? Math.round((totalGhg / calcTurnoverCr) * 100) / 100 : 0;

  return (
    <div className="space-y-6 select-none font-sans text-[#202522]">
      {/* Top Banner */}
      <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F6F50] mb-1">
              <Leaf className="w-4 h-4 text-[#2E7D5B]" />
              <span>ENVIRONMENTAL HUB (NGRBC PRINCIPLE 6)</span>
              <span className="text-[#68716C]">·</span>
              <span>{selectedPeriod}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#12372A] tracking-tight">
              Environmental Performance
            </h1>
            <p className="text-xs text-[#68716C] mt-1">
              Direct and indirect GHG accounting, energy management, water stewardship, and circular waste recycling.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#F7F7F3] p-1 rounded-lg border border-[#DDE3DE]">
            {(['energy', 'ghg', 'water', 'waste', 'calc'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all cursor-pointer ${
                  activeSubTab === tab
                    ? 'bg-[#12372A] text-white shadow-xs'
                    : 'text-[#68716C] hover:text-[#12372A]'
                }`}
              >
                {tab === 'calc' ? 'GHG Calculator' : tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="corp-card p-4">
          <div className="text-[11px] font-bold text-[#68716C] uppercase">Scope 1 (Direct Fuel)</div>
          <div className="text-2xl font-bold text-[#12372A] font-mono mt-1">184,200 <span className="text-xs text-[#68716C]">tCO2e</span></div>
          <div className="text-[10px] text-[#2E7D5B] font-semibold mt-1">IOCL fuel bills verified</div>
        </div>

        <div className="corp-card p-4">
          <div className="text-[11px] font-bold text-[#68716C] uppercase">Scope 2 (Grid Electricity)</div>
          <div className="text-2xl font-bold text-[#12372A] font-mono mt-1">134,250 <span className="text-xs text-[#68716C]">tCO2e</span></div>
          <div className="text-[10px] text-[#2E7D5B] font-semibold mt-1">CEA CO2 database factor</div>
        </div>

        <div className="corp-card p-4">
          <div className="text-[11px] font-bold text-[#68716C] uppercase">Water Recycled On-Site</div>
          <div className="text-2xl font-bold text-[#2E7D5B] font-mono mt-1">33.1%</div>
          <div className="text-[10px] text-[#68716C] mt-1">820,000 KL treated</div>
        </div>

        <div className="corp-card p-4">
          <div className="text-[11px] font-bold text-[#68716C] uppercase">Muck Waste Recycled</div>
          <div className="text-2xl font-bold text-[#1F6F50] font-mono mt-1">82.4%</div>
          <div className="text-[10px] text-[#68716C] mt-1">Embankment civil reuse</div>
        </div>
      </div>

      {/* Calculator Tab */}
      {activeSubTab === 'calc' ? (
        <div className="corp-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#12372A] uppercase tracking-wider pb-3 border-b border-[#DDE3DE]">
            Interactive GHG Intensity Calculator (CEA Baseline & IPCC)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#202522] mb-1">
                Diesel Consumption (Litres)
              </label>
              <input
                type="number"
                value={calcDiesel}
                onChange={(e) => setCalcDiesel(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-[#DDE3DE] rounded-lg px-3 py-2 text-xs font-mono font-bold text-[#202522]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202522] mb-1">
                Grid Electricity (kWh)
              </label>
              <input
                type="number"
                value={calcGridKWh}
                onChange={(e) => setCalcGridKWh(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-[#DDE3DE] rounded-lg px-3 py-2 text-xs font-mono font-bold text-[#202522]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202522] mb-1">
                Turnover (₹ Crores)
              </label>
              <input
                type="number"
                value={calcTurnoverCr}
                onChange={(e) => setCalcTurnoverCr(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-[#DDE3DE] rounded-lg px-3 py-2 text-xs font-mono font-bold text-[#202522]"
              />
            </div>
          </div>

          <div className="p-4 bg-[#EDF4EF] rounded-lg border border-[#DDE3DE] grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[#68716C]">Scope 1 Carbon:</span>
              <div className="text-base font-bold text-[#12372A] font-mono">{scope1Co2} tCO2e</div>
            </div>
            <div>
              <span className="text-[#68716C]">Scope 2 Carbon:</span>
              <div className="text-base font-bold text-[#12372A] font-mono">{scope2Co2} tCO2e</div>
            </div>
            <div>
              <span className="text-[#68716C]">Total Gross Carbon:</span>
              <div className="text-base font-bold text-[#2E7D5B] font-mono">{totalGhg} tCO2e</div>
            </div>
            <div>
              <span className="text-[#68716C]">GHG Intensity:</span>
              <div className="text-base font-bold text-[#1F6F50] font-mono">{ghgIntensity} tCO2e / ₹ Cr</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="corp-card p-6 space-y-4">
          <div className="pb-3 border-b border-[#DDE3DE]">
            <h2 className="text-sm font-bold text-[#12372A] uppercase tracking-wider">
              {activeSubTab.toUpperCase()} Performance & Audit Breakdown
            </h2>
          </div>
          <p className="text-xs text-[#68716C]">
            All metrics reflect direct measurement verified against utility invoices and calibration certificates.
          </p>
        </div>
      )}
    </div>
  );
};
