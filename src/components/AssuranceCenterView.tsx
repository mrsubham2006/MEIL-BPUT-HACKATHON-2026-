import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileCheck2,
  FileText,
  UserCheck,
  Search,
  Filter,
  Check,
  X,
  ExternalLink,
  Eye,
  AlertCircle,
} from 'lucide-react';
import { BRSRCoreKPI, ESGDataRecord, EvidenceDocument, CurrentUserContext } from '../types/esg';

interface AssuranceCenterViewProps {
  brsrCoreKpis: BRSRCoreKPI[];
  records: ESGDataRecord[];
  evidenceDocs: EvidenceDocument[];
  currentUser: CurrentUserContext;
  onUpdateRecordStatus: (id: string, status: string, notes?: string) => void;
}

export const AssuranceCenterView: React.FC<AssuranceCenterViewProps> = ({
  brsrCoreKpis,
  records,
  evidenceDocs,
  currentUser,
  onUpdateRecordStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'evidence' | 'approvals'>('evidence');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  
  // Selected Record for Review & Approval
  const [reviewRecord, setReviewRecord] = useState<ESGDataRecord | null>(null);
  const [correctionReason, setCorrectionReason] = useState('');
  const [actionSuccessToast, setActionSuccessToast] = useState('');

  // Sample mock evidence docs if none passed
  const sampleEvidence: {
    id: string;
    documentName: string;
    project: string;
    metric: string;
    reportingPeriod: string;
    uploadedBy: string;
    verificationStatus: 'Verified' | 'Pending Review' | 'Rejected' | 'Needs Update';
    date: string;
    fileSize: string;
  }[] = [
    {
      id: 'doc-001',
      documentName: 'Polavaram_APEPDCL_Meter_Settlement_Aug2026.pdf',
      project: 'Polavaram Dam Project Site',
      metric: 'Gross Electricity Consumption (Scope 2)',
      reportingPeriod: 'FY 2025-26 Q2',
      uploadedBy: 'Ananya Sharma (Site Coordinator)',
      verificationStatus: 'Verified',
      date: '24 Aug 2026',
      fileSize: '3.4 MB',
    },
    {
      id: 'doc-002',
      documentName: 'Zojila_IOCL_Bulk_Diesel_Receipts_Q2.pdf',
      project: 'Zojila Tunnel Project Phase II',
      metric: 'Stationary Combustion Fuel (Scope 1)',
      reportingPeriod: 'FY 2025-26 Q2',
      uploadedBy: 'Rajesh Nair (Site Engineer)',
      verificationStatus: 'Pending Review',
      date: '18 Sep 2026',
      fileSize: '8.2 MB',
    },
    {
      id: 'doc-003',
      documentName: 'Kaleshwaram_WaterIntake_FlowMeter_Logs.pdf',
      project: 'Kaleshwaram Lift Irrigation Pkg 8',
      metric: 'Surface Water Withdrawal',
      reportingPeriod: 'FY 2025-26 Q2',
      uploadedBy: 'K. Venkatesh (EHS Officer)',
      verificationStatus: 'Verified',
      date: '02 Sep 2026',
      fileSize: '2.1 MB',
    },
    {
      id: 'doc-004',
      documentName: 'CharDham_ISO45001_Safety_Audit_Register.pdf',
      project: 'Char Dham Highway Project Pkg 4',
      metric: 'Workplace Safety & Incident Logs',
      reportingPeriod: 'FY 2025-26 Q2',
      uploadedBy: 'Deepak Joshi (Safety Lead)',
      verificationStatus: 'Verified',
      date: '12 Sep 2026',
      fileSize: '5.6 MB',
    },
    {
      id: 'doc-005',
      documentName: 'SolarWestern_Captive_Inverter_Export_Logs.xlsx',
      project: 'Western Solar 500MW Expansion',
      metric: 'Renewable Power Exported to Grid',
      reportingPeriod: 'FY 2025-26 Q2',
      uploadedBy: 'R. K. Verma (Subsidiary Manager)',
      verificationStatus: 'Verified',
      date: '15 Sep 2026',
      fileSize: '1.8 MB',
    },
    {
      id: 'doc-006',
      documentName: 'Balanagar_HazardousWaste_Disposal_Manifest.pdf',
      project: 'Balanagar Heavy Engineering Unit',
      metric: 'Hazardous Waste Recycled & Sent to TSDF',
      reportingPeriod: 'FY 2025-26 Q2',
      uploadedBy: 'M. S. Rao (Plant Lead)',
      verificationStatus: 'Needs Update',
      date: '20 Sep 2026',
      fileSize: '4.1 MB',
    },
  ];

  const filteredEvidence = sampleEvidence.filter((doc) => {
    const matchesSearch =
      doc.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.metric.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === 'ALL' || doc.verificationStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApproveSubmission = (recordId: string) => {
    onUpdateRecordStatus(recordId, 'Approved', 'Approved following review of attached source evidence.');
    setActionSuccessToast('ESG submission approved and added to certified BRSR compilation.');
    setReviewRecord(null);
    setTimeout(() => setActionSuccessToast(''), 4000);
  };

  const handleRequestCorrection = (recordId: string) => {
    if (!correctionReason.trim()) {
      alert('Please state the specific correction required for the submitter.');
      return;
    }
    onUpdateRecordStatus(recordId, 'Under Review', correctionReason);
    setActionSuccessToast('Correction request sent back to the site coordinator.');
    setCorrectionReason('');
    setReviewRecord(null);
    setTimeout(() => setActionSuccessToast(''), 4000);
  };

  return (
    <div className="space-y-6 select-none font-sans text-[#202522]">
      {/* Top Header */}
      <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F6F50] mb-1">
              <span>EVIDENCE & ASSURANCE CONTROL CENTER</span>
              <span className="text-[#68716C]">·</span>
              <span>ISAE 3000 Standard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#12372A] tracking-tight">
              Evidence Center
            </h1>
            <p className="text-xs text-[#68716C] mt-1">
              Every important ESG number should have a source.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#F7F7F3] p-1 rounded-lg border border-[#DDE3DE]">
            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'evidence'
                  ? 'bg-[#12372A] text-white shadow-xs'
                  : 'text-[#68716C] hover:text-[#12372A]'
              }`}
            >
              Evidence Repository ({sampleEvidence.length})
            </button>
            <button
              onClick={() => setActiveTab('approvals')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'approvals'
                  ? 'bg-[#12372A] text-white shadow-xs'
                  : 'text-[#68716C] hover:text-[#12372A]'
              }`}
            >
              Review Submissions ({records.filter((r) => r.status === 'Submitted' || r.status === 'Under Review').length})
            </button>
          </div>
        </div>
      </div>

      {actionSuccessToast && (
        <div className="p-4 rounded-xl bg-[#EDF4EF] border border-[#2E7D5B] text-xs text-[#12372A] flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-[#2E7D5B] shrink-0" />
          <span className="font-semibold">{actionSuccessToast}</span>
        </div>
      )}

      {/* TAB 1: EVIDENCE REPOSITORY */}
      {activeTab === 'evidence' && (
        <div className="corp-card p-6">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#DDE3DE]">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#68716C] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search documents, projects, metrics..."
                className="w-full bg-[#F7F7F3] border border-[#DDE3DE] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#202522] focus:outline-none focus:border-[#12372A]"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[#68716C]">
                <Filter className="w-3.5 h-3.5" />
                <span>Status:</span>
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-white border border-[#DDE3DE] rounded-lg px-2.5 py-1.5 text-xs text-[#202522] focus:border-[#12372A]"
              >
                <option value="ALL">All Statuses</option>
                <option value="Verified">Verified</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Needs Update">Needs Update</option>
              </select>
            </div>
          </div>

          {/* Evidence Cards / Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="corp-table">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Project Site</th>
                  <th>Metric Linked</th>
                  <th>Period</th>
                  <th>Uploaded By</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvidence.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#1F6F50] shrink-0" />
                        <div>
                          <div className="font-semibold text-[#12372A]">{doc.documentName}</div>
                          <div className="text-[11px] text-[#68716C]">{doc.fileSize} · {doc.date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="font-medium">{doc.project}</td>
                    <td className="text-xs text-[#12372A] font-medium">{doc.metric}</td>
                    <td className="font-mono text-xs">{doc.reportingPeriod}</td>
                    <td className="text-xs text-[#68716C]">{doc.uploadedBy}</td>
                    <td>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          doc.verificationStatus === 'Verified'
                            ? 'bg-[#EDF4EF] text-[#2E7D5B] border-[#DDE3DE]'
                            : doc.verificationStatus === 'Pending Review'
                            ? 'bg-[#FEF9E7] text-[#B8872F] border-[#FAD7A0]'
                            : 'bg-[#FDF2F2] text-[#B94A48] border-[#F5C6CB]'
                        }`}
                      >
                        ● {doc.verificationStatus}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => alert(`Opening ${doc.documentName} in secure audit preview.`)}
                        className="btn-secondary text-xs py-1 px-2.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Evidence</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: REVIEW SUBMISSIONS / APPROVAL SCREEN */}
      {activeTab === 'approvals' && (
        <div className="corp-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE]">
            <div>
              <h2 className="text-sm font-bold text-[#12372A] uppercase tracking-wider">
                Review ESG Submission
              </h2>
              <p className="text-xs text-[#68716C] mt-0.5">
                Audit and sign off on site-level ESG submissions.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#68716C]">
              4 Submissions Awaiting Approval
            </span>
          </div>

          <div className="space-y-3">
            {records.slice(0, 5).map((rec) => (
              <div
                key={rec.id}
                className="p-4 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE] flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#12372A]">{rec.metricName}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white text-[#68716C] border border-[#DDE3DE]">
                      {rec.metricCode}
                    </span>
                  </div>
                  <div className="text-xs text-[#68716C]">
                    Project: <strong className="text-[#202522]">{rec.entityName || 'Polavaram Project'}</strong> · Period: <span className="font-mono">{rec.period}</span>
                  </div>
                  <div className="text-xs">
                    Reported Value: <strong className="text-[#2E7D5B] font-mono">{(rec as any).reportedValue ?? rec.rawValue} {rec.unit}</strong> · Source: <span className="text-[#68716C]">{(rec as any).source || 'Site Environmental Logs'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setReviewRecord(rec)}
                    className="btn-primary text-xs py-1.5 px-3"
                  >
                    Review Submission
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* APPROVAL DIALOG MODAL */}
      {reviewRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-[#DDE3DE] rounded-xl max-w-2xl w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE]">
              <div>
                <h3 className="text-base font-bold text-[#12372A]">
                  Review ESG Submission
                </h3>
                <p className="text-xs text-[#68716C]">
                  Verify data point integrity and primary evidence attachment.
                </p>
              </div>
              <button
                onClick={() => setReviewRecord(null)}
                className="text-[#68716C] hover:text-[#12372A] text-sm p-1"
              >
                ✕
              </button>
            </div>

            {/* Submission Detail Card */}
            <div className="p-4 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE] space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[#68716C]">Submitted By:</span>
                  <div className="font-bold text-[#12372A]">Ananya Sharma (Site Coordinator)</div>
                </div>
                <div>
                  <span className="text-[#68716C]">Project:</span>
                  <div className="font-bold text-[#12372A]">{reviewRecord.entityName || 'Polavaram Dam Project'}</div>
                </div>
                <div>
                  <span className="text-[#68716C]">Reporting Period:</span>
                  <div className="font-semibold text-[#12372A]">{reviewRecord.period}</div>
                </div>
                <div>
                  <span className="text-[#68716C]">Submission Date:</span>
                  <div className="font-semibold text-[#12372A]">{reviewRecord.submittedAt || '2026-09-24'}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#DDE3DE] flex items-center justify-between">
                <div>
                  <span className="text-[#68716C]">Reported Metric:</span>
                  <div className="font-bold text-sm text-[#12372A]">{reviewRecord.metricName}</div>
                </div>
                <div className="text-right">
                  <span className="text-[#68716C]">Value:</span>
                  <div className="font-bold text-base text-[#2E7D5B] font-mono">
                    {(reviewRecord as any).reportedValue ?? reviewRecord.rawValue} {reviewRecord.unit}
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence Verification Notice */}
            <div className="p-3 bg-[#EDF4EF] rounded-lg border border-[#DDE3DE] text-xs text-[#12372A] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#2E7D5B]" />
                <span>Evidence Attached: <strong>Polavaram_APEPDCL_Meter_Settlement_Aug2026.pdf</strong></span>
              </div>
              <button
                type="button"
                onClick={() => alert('Viewing attached PDF')}
                className="text-xs font-semibold text-[#1F6F50] hover:underline"
              >
                Inspect Doc →
              </button>
            </div>

            {/* Auditability Confirmation Note */}
            <div className="p-3 bg-[#FEF9E7] rounded-lg border border-[#FAD7A0] text-[11px] text-[#B8872F] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Audit Notice:</strong> Once approved, changes must follow the correction and reapproval workflow to maintain SEBI audit traceability.
              </span>
            </div>

            {/* Request Correction Input (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-[#202522] mb-1">
                Correction Notes (Required if requesting change)
              </label>
              <input
                type="text"
                value={correctionReason}
                onChange={(e) => setCorrectionReason(e.target.value)}
                placeholder="e.g. Please attach utility payment counterfoil alongside invoice"
                className="w-full bg-white border border-[#DDE3DE] rounded-lg px-3 py-1.5 text-xs text-[#202522] focus:border-[#12372A]"
              />
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#DDE3DE] flex items-center justify-between">
              <button
                onClick={() => handleRequestCorrection(reviewRecord.id)}
                className="btn-danger text-xs"
              >
                Request Correction
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReviewRecord(null)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleApproveSubmission(reviewRecord.id)}
                  className="btn-primary text-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
