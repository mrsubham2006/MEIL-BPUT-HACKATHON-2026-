import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Building2,
  ArrowRight,
  ArrowLeft,
  Leaf,
  Users,
  Scale,
  Check,
  Search,
  Filter,
} from 'lucide-react';
import { EntityNode, MetricDefinition, CurrentUserContext } from '../types/esg';

interface DataCollectionViewProps {
  entities: EntityNode[];
  metrics: MetricDefinition[];
  currentUser: CurrentUserContext;
  onRecordCreated: (newRecord: any) => void;
  onOpenCopilot: () => void;
}

export const DataCollectionView: React.FC<DataCollectionViewProps> = ({
  entities,
  metrics,
  currentUser,
  onRecordCreated,
  onOpenCopilot,
}) => {
  const [viewMode, setViewMode] = useState<'entry' | 'dashboard'>('entry');
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State (Step 1-5)
  const [selectedEntityId, setSelectedEntityId] = useState('proj-polavaram');
  const [selectedPeriod, setSelectedPeriod] = useState('FY 2025-26 Q2');
  const [selectedPillar, setSelectedPillar] = useState<'Environment' | 'Social' | 'Governance'>('Environment');
  const [selectedMetricCode, setSelectedMetricCode] = useState('ENV-ENG-001');
  const [metricValue, setMetricValue] = useState<string>('125400');
  const [unit, setUnit] = useState<string>('KL');
  const [sourceType, setSourceType] = useState('Monthly Environmental Report');
  const [sourceDetail, setSourceDetail] = useState('Municipal water meter logbook & raw water intake meter readings');
  const [evidenceFileName, setEvidenceFileName] = useState('Polavaram_WaterIntake_Logbook_Q2.pdf');
  const [evidenceFileSize, setEvidenceFileSize] = useState('3.4 MB');
  const [notes, setNotes] = useState('Reconciled against state irrigation department metering system');
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState('');

  // Dashboard filter state
  const [dashboardTab, setDashboardTab] = useState<'Environment' | 'Social' | 'Governance'>('Environment');
  const [searchFilter, setSearchFilter] = useState('');

  const projects = entities.filter((e) => e.type === 'project');
  const selectedProject = entities.find((e) => e.id === selectedEntityId) || projects[0] || entities[0];
  const selectedMetric = metrics.find((m) => m.code === selectedMetricCode) || metrics[0];

  // Calculate missing required fields
  const getRequiredRemaining = () => {
    let count = 0;
    if (!selectedEntityId) count++;
    if (!selectedMetricCode) count++;
    if (!metricValue) count++;
    if (!sourceType) count++;
    if (!evidenceFileName) count++;
    return count;
  };

  const handleNextStep = () => {
    if (currentStep < 5) setCurrentStep((prev) => (prev + 1) as any);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as any);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord = {
      entityId: selectedEntityId,
      entityName: selectedProject.name,
      metricCode: selectedMetric.code,
      metricName: selectedMetric.name,
      period: selectedPeriod,
      reportedValue: parseFloat(metricValue) || 0,
      unit: selectedMetric.unit || unit,
      source: sourceType,
      evidenceFile: evidenceFileName,
      notes: notes,
      status: 'Submitted',
      submittedBy: currentUser.name,
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };

    onRecordCreated(newRecord);
    setSubmitSuccessMsg('ESG Data record successfully submitted for project manager and assurance review.');
    setTimeout(() => {
      setSubmitSuccessMsg('');
      setCurrentStep(1);
      setViewMode('dashboard');
    }, 2500);
  };

  return (
    <div className="space-y-6 select-none font-sans text-[#202522]">
      {/* Top Header */}
      <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F6F50] mb-1">
              <span>ESG DATA REPOSITORY</span>
              <span className="text-[#68716C]">·</span>
              <span>{selectedPeriod}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#12372A] tracking-tight">
              ESG Data Management
            </h1>
            <p className="text-xs text-[#68716C] mt-1">
              Track and manage ESG information across your assigned scope with supporting evidence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-[#F7F7F3] p-1 rounded-lg border border-[#DDE3DE]">
              <button
                onClick={() => setViewMode('entry')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'entry'
                    ? 'bg-[#12372A] text-white shadow-xs'
                    : 'text-[#68716C] hover:text-[#12372A]'
                }`}
              >
                + Add ESG Data (Step-by-Step)
              </button>
              <button
                onClick={() => setViewMode('dashboard')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'dashboard'
                    ? 'bg-[#12372A] text-white shadow-xs'
                    : 'text-[#68716C] hover:text-[#12372A]'
                }`}
              >
                Data Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {submitSuccessMsg && (
        <div className="p-4 rounded-xl bg-[#EDF4EF] border border-[#2E7D5B] text-xs text-[#12372A] flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#2E7D5B] shrink-0" />
          <span className="font-semibold">{submitSuccessMsg}</span>
        </div>
      )}

      {/* VIEW MODE 1: STEP-BY-STEP DATA ENTRY */}
      {viewMode === 'entry' && (
        <div className="corp-card p-6">
          {/* Step Progress Bar */}
          <div className="pb-6 border-b border-[#DDE3DE]">
            <div className="flex items-center justify-between text-xs font-bold text-[#68716C] mb-3">
              <span>STEP {currentStep} OF 5</span>
              <span className="text-[11px] font-semibold text-[#B8872F]">
                {getRequiredRemaining() > 0 ? `${getRequiredRemaining()} required field(s) remaining` : 'All required fields completed'}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 text-xs">
              {[
                { step: 1, label: 'Basic Information' },
                { step: 2, label: 'Enter ESG Value' },
                { step: 3, label: 'Source' },
                { step: 4, label: 'Evidence' },
                { step: 5, label: 'Review & Submit' },
              ].map((s) => (
                <div key={s.step} className="space-y-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      currentStep >= s.step ? 'bg-[#12372A]' : 'bg-[#DDE3DE]'
                    }`}
                  />
                  <div
                    className={`text-[11px] font-semibold truncate ${
                      currentStep === s.step
                        ? 'text-[#12372A]'
                        : currentStep > s.step
                        ? 'text-[#2E7D5B]'
                        : 'text-[#68716C]'
                    }`}
                  >
                    {s.step}. {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 max-w-2xl mx-auto space-y-6">
            {/* STEP 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#12372A]">STEP 1: Basic Information</h3>
                  <p className="text-xs text-[#68716C]">Select reporting project, period and ESG pillar.</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Project Site
                    </label>
                    <select
                      value={selectedEntityId}
                      onChange={(e) => setSelectedEntityId(e.target.value)}
                      className="w-full bg-white border border-[#DDE3DE] rounded-lg px-3 py-2 text-xs text-[#202522] focus:border-[#12372A]"
                    >
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.state})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#202522] mb-1">
                        Reporting Period
                      </label>
                      <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="w-full bg-white border border-[#DDE3DE] rounded-lg px-3 py-2 text-xs text-[#202522] focus:border-[#12372A]"
                      >
                        <option value="FY 2025-26 Q2">FY 2025-26 Q2</option>
                        <option value="FY 2025-26 Q1">FY 2025-26 Q1</option>
                        <option value="FY 2024-25 Annual">FY 2024-25 Annual</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#202522] mb-1">
                        ESG Pillar
                      </label>
                      <select
                        value={selectedPillar}
                        onChange={(e) => setSelectedPillar(e.target.value as any)}
                        className="w-full bg-white border border-[#DDE3DE] rounded-lg px-3 py-2 text-xs text-[#202522] focus:border-[#12372A]"
                      >
                        <option value="Environment">Environment (Pillar 6)</option>
                        <option value="Social">Social & Safety (Pillar 3)</option>
                        <option value="Governance">Governance (Pillars 1, 2, 7, 8, 9)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Enter ESG Value */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#12372A]">STEP 2: Enter ESG Value</h3>
                  <p className="text-xs text-[#68716C]">Choose the specific metric and input the recorded value.</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Metric Name
                    </label>
                    <select
                      value={selectedMetricCode}
                      onChange={(e) => {
                        setSelectedMetricCode(e.target.value);
                        const m = metrics.find((met) => met.code === e.target.value);
                        if (m?.unit) setUnit(m.unit);
                      }}
                      className="w-full bg-white border border-[#DDE3DE] rounded-lg px-3 py-2 text-xs text-[#202522] focus:border-[#12372A]"
                    >
                      {metrics
                        .filter((m) => m.pillar === selectedPillar)
                        .map((m) => (
                          <option key={m.code} value={m.code}>
                            [{m.code}] {m.name} ({m.unit})
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-[#202522] mb-1">
                        Value Recorded
                      </label>
                      <input
                        type="number"
                        value={metricValue}
                        onChange={(e) => setMetricValue(e.target.value)}
                        placeholder="e.g. 125400"
                        className="w-full bg-white border border-[#DDE3DE] rounded-lg px-3 py-2 text-xs text-[#202522] font-mono font-bold focus:border-[#12372A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#202522] mb-1">
                        Unit
                      </label>
                      <input
                        type="text"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-full bg-[#F7F7F3] border border-[#DDE3DE] rounded-lg px-3 py-2 text-xs text-[#202522] font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Source */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#12372A]">STEP 3: Source</h3>
                  <p className="text-xs text-[#68716C]">Define where the data originates from.</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Source Type
                    </label>
                    <select
                      value={sourceType}
                      onChange={(e) => setSourceType(e.target.value)}
                      className="w-full bg-white border border-[#DDE3DE] rounded-lg px-3 py-2 text-xs text-[#202522] focus:border-[#12372A]"
                    >
                      <option value="Monthly Environmental Report">Monthly Environmental Report</option>
                      <option value="DISCOM Electricity Bill">DISCOM Electricity Bill</option>
                      <option value="IOCL Fuel Delivery Receipt">IOCL Fuel Delivery Receipt</option>
                      <option value="Water Meter Logbook">Water Meter Logbook</option>
                      <option value="ISO 45001 Safety Register">ISO 45001 Safety Register</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#202522] mb-1">
                      Source Description / Register Reference
                    </label>
                    <textarea
                      rows={3}
                      value={sourceDetail}
                      onChange={(e) => setSourceDetail(e.target.value)}
                      className="w-full bg-white border border-[#DDE3DE] rounded-lg p-2.5 text-xs text-[#202522] focus:border-[#12372A]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Evidence */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#12372A]">STEP 4: Evidence</h3>
                  <p className="text-xs text-[#68716C]">Attach supporting invoice, logbook or calibration certificate.</p>
                </div>

                <div className="border-2 border-dashed border-[#DDE3DE] rounded-xl p-6 text-center bg-[#F7F7F3]">
                  <Upload className="w-8 h-8 text-[#1F6F50] mx-auto mb-2" />
                  <div className="text-xs font-bold text-[#12372A]">
                    {evidenceFileName || 'Click or drag file to upload'}
                  </div>
                  <div className="text-[11px] text-[#68716C] mt-1">
                    PDF, PNG, JPG, or XLSX up to 25 MB
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => setEvidenceFileName(`Site_Evidence_${Date.now()}.pdf`)}
                      className="btn-secondary text-xs py-1"
                    >
                      Choose File
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202522] mb-1">
                    Notes for Approver / Auditor
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Verified by site environmental engineer"
                    className="w-full bg-white border border-[#DDE3DE] rounded-lg px-3 py-2 text-xs text-[#202522] focus:border-[#12372A]"
                  />
                </div>
              </div>
            )}

            {/* STEP 5: Review & Submit */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#12372A]">STEP 5: Review & Submit</h3>
                  <p className="text-xs text-[#68716C]">Confirm all details before submitting for governance sign-off.</p>
                </div>

                <div className="p-4 bg-[#F7F7F3] rounded-xl border border-[#DDE3DE] space-y-3 text-xs">
                  <div className="flex justify-between pb-2 border-b border-[#DDE3DE]">
                    <span className="text-[#68716C]">Project:</span>
                    <span className="font-bold text-[#12372A]">{selectedProject.name}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#DDE3DE]">
                    <span className="text-[#68716C]">Period:</span>
                    <span className="font-semibold text-[#12372A]">{selectedPeriod}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#DDE3DE]">
                    <span className="text-[#68716C]">Metric:</span>
                    <span className="font-bold text-[#12372A]">{selectedMetric.name}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#DDE3DE]">
                    <span className="text-[#68716C]">Reported Value:</span>
                    <span className="font-bold text-[#2E7D5B] text-sm font-mono">
                      {metricValue} {unit}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#DDE3DE]">
                    <span className="text-[#68716C]">Source:</span>
                    <span className="text-[#202522]">{sourceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#68716C]">Evidence File:</span>
                    <span className="font-semibold text-[#1F6F50]">{evidenceFileName}</span>
                  </div>
                </div>

                <div className="p-3 bg-[#EDF4EF] rounded-lg border border-[#DDE3DE] text-[11px] text-[#12372A]">
                  ℹ Once submitted, this data point will be locked for project manager approval and added to the audit lineage.
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="pt-4 border-t border-[#DDE3DE] flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="btn-secondary"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => alert('Draft saved successfully.')}
                  className="btn-secondary"
                >
                  Save Draft
                </button>

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn-primary"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-primary bg-[#2E7D5B] hover:bg-[#1F6F50]"
                  >
                    <Check className="w-4 h-4" />
                    <span>Submit for Review</span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}

      {/* VIEW MODE 2: ESG DATA DASHBOARD */}
      {viewMode === 'dashboard' && (
        <div className="space-y-6">
          {/* Tabs: Environment / Social / Governance */}
          <div className="corp-card p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDE3DE]">
              <div className="flex items-center gap-2">
                {(['Environment', 'Social', 'Governance'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setDashboardTab(tab)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      dashboardTab === tab
                        ? 'bg-[#12372A] text-white'
                        : 'bg-[#F7F7F3] text-[#68716C] hover:text-[#12372A]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#68716C] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Filter metrics..."
                    className="bg-[#F7F7F3] border border-[#DDE3DE] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#202522] focus:outline-none focus:border-[#12372A]"
                  />
                </div>
              </div>
            </div>

            {/* Metric Overview Cards for Selected Tab */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
              <div className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
                <div className="text-[10px] text-[#68716C] font-bold uppercase">Reported Metrics</div>
                <div className="text-xl font-bold text-[#12372A] font-mono mt-0.5">
                  {metrics.filter((m) => m.pillar === dashboardTab).length}
                </div>
              </div>
              <div className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
                <div className="text-[10px] text-[#68716C] font-bold uppercase">Data Completeness</div>
                <div className="text-xl font-bold text-[#2E7D5B] font-mono mt-0.5">94.2%</div>
              </div>
              <div className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
                <div className="text-[10px] text-[#68716C] font-bold uppercase">Evidence Verified</div>
                <div className="text-xl font-bold text-[#1F6F50] font-mono mt-0.5">88.5%</div>
              </div>
              <div className="p-3 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE]">
                <div className="text-[10px] text-[#68716C] font-bold uppercase">Assurance Path</div>
                <div className="text-xs font-bold text-[#12372A] mt-1 truncate">SEBI Core Aligned</div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="corp-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Metric Name</th>
                    <th>Category</th>
                    <th>Unit</th>
                    <th>Collection Frequency</th>
                    <th>Assurance Requirement</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics
                    .filter(
                      (m) =>
                        m.pillar === dashboardTab &&
                        (m.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          m.code.toLowerCase().includes(searchFilter.toLowerCase()))
                    )
                    .map((m) => (
                      <tr key={m.code}>
                        <td className="font-mono text-xs font-bold text-[#12372A]">{m.code}</td>
                        <td className="font-semibold text-[#12372A]">{m.name}</td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-[#EDF4EF] text-[#12372A] text-[10px] font-semibold border border-[#DDE3DE]">
                            {m.category}
                          </span>
                        </td>
                        <td className="font-mono text-xs">{m.unit}</td>
                        <td className="text-xs text-[#68716C]">Quarterly</td>
                        <td>
                          <span className="text-[10px] font-bold text-[#2E7D5B]">
                            ✓ BRSR Mandatory
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
