export type ESGPillar = 'Environmental' | 'Social' | 'Governance';

export type UserRole =
  | 'MEIL Super Administrator'
  | 'MEIL ESG Head'
  | 'Corporate Sustainability Team'
  | 'Corporate Compliance Team'
  | 'Corporate Finance Reviewer'
  | 'Subsidiary ESG Head'
  | 'Subsidiary ESG Manager'
  | 'Project Manager'
  | 'Project ESG Coordinator'
  | 'Project Safety Officer'
  | 'Internal Auditor'
  | 'External Assurance Provider'
  | 'Supplier ESG User';

export type HierarchyLevel = 'group' | 'subsidiary' | 'business_unit' | 'project' | 'site';

export interface EntityNode {
  id: string;
  code: string;
  name: string;
  legalName?: string;
  type: HierarchyLevel;
  parentId: string | null;
  subsidiaryId?: string;
  businessUnitId?: string;
  location: string;
  state: string;
  country: string;
  industryCategory: string;
  reportingBoundary: 'Included' | 'Excluded' | 'Proportional';
  ownershipPct: number;
  projectManager?: string;
  esgCoordinator?: string;
  status: 'Active' | 'Under Construction' | 'Operational' | 'Maintenance';
  startDate?: string;
  completionDate?: string;
}

export type MetricCategory =
  | 'Energy'
  | 'GHG Emissions'
  | 'Water Stewardship'
  | 'Waste & Circularity'
  | 'Environmental Compliance'
  | 'Workforce Safety'
  | 'Employees & Diversity'
  | 'Training & Development'
  | 'Human Rights'
  | 'Community & CSR'
  | 'Board & Governance'
  | 'Ethics & Anti-Corruption'
  | 'Whistleblower'
  | 'Regulatory Compliance'
  | 'Cybersecurity & Privacy';

export type MetricType = 'absolute_sum' | 'intensity_ratio' | 'percentage' | 'count' | 'boolean' | 'monetary';

export interface MetricDefinition {
  code: string;
  name: string;
  pillar: ESGPillar;
  category: MetricCategory;
  subcategory: string;
  unit: string;
  frequency: 'Monthly' | 'Quarterly' | 'Annual';
  metricType: MetricType;
  definition: string;
  calculationMethod: string;
  emissionFactor?: number;
  factorUnit?: string;
  factorSource?: string;
  isMandatory: boolean;
  brsrSection: 'Section A' | 'Section B' | 'Section C' | 'None';
  brsrPrinciple?: 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7' | 'P8' | 'P9';
  brsrCoreKpiId?: string;
  ngrbcPrinciples: string[];
  sdgGoals: number[];
  evidenceRequired: boolean;
  approvalRequired: boolean;
}

export type RecordStatus = 'Draft' | 'Submitted' | 'Under Review' | 'Verified' | 'Approved' | 'Assurance Ready' | 'Assured' | 'Rejected';

export interface ESGDataRecord {
  id: string;
  entityId: string; // Project ID or Sub/Group ID
  entityName: string;
  entityType: HierarchyLevel;
  subsidiaryId: string;
  businessUnitId: string;
  metricCode: string;
  metricName: string;
  pillar: ESGPillar;
  category: MetricCategory;
  period: string; // e.g., 'FY 2025-26 Q1', 'FY 2025-26 Q2', 'FY 2025-26 Annual'
  rawValue: number;
  unit: string;
  calculatedValue?: number;
  calculatedUnit?: string;
  status: RecordStatus;
  evidenceDocumentIds: string[];
  submittedBy: string;
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  assuredBy?: string;
  assuredAt?: string;
  rejectionReason?: string;
  anomalyFlag?: boolean;
  anomalyId?: string;
  version: number;
  previousValue?: number;
  changeReason?: string;
}

export interface AnomalyItem {
  id: string;
  entityId: string;
  entityName: string;
  metricCode: string;
  metricName: string;
  period: string;
  currentValue: number;
  historicalAverage: number;
  expectedRange: [number, number];
  deviationPct: number;
  unit: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Investigating' | 'Explained' | 'Resolved' | 'Accepted';
  detectedAt: string;
  assignedTo: string;
  rootCauseAnalysis?: string;
  resolutionNote?: string;
  aiExplanation?: string;
}

export interface EvidenceDocument {
  id: string;
  name: string;
  fileType: string;
  fileSize: string;
  uploadedAt: string;
  uploadedBy: string;
  entityId: string;
  entityName: string;
  category: MetricCategory;
  period: string;
  metricCodes: string[];
  confidenceScore: number;
  status: 'Unverified' | 'AI_Extracted' | 'Verified' | 'Audited' | 'Rejected';
  extractedData?: Record<string, any>;
  sha256Hash: string;
  verifiedBy?: string;
  verificationNotes?: string;
}

export interface BRSRCoreKPI {
  id: string;
  kpiNumber: string;
  name: string;
  attribute: string;
  principle: 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7' | 'P8' | 'P9';
  unit: string;
  meilGroupValue: number | string;
  collectedCount: number;
  totalRequiredCount: number;
  evidenceCount: number;
  validationPct: number;
  assuranceStatus: 'Not Ready' | 'Evidence Pending' | 'Under Review' | 'Clarification Required' | 'Assurance Ready' | 'Assured';
  assuranceProviderNotes?: string;
  description: string;
}

export interface CSRProject {
  id: string;
  title: string;
  location: string;
  state: string;
  investmentLakhs: number;
  beneficiariesCount: number;
  programCategory: string;
  sdgGoals: number[];
  ngrbcPrinciple: string;
  startDate: string;
  status: 'Ongoing' | 'Completed' | 'Planning';
  targetOutcome: string;
  actualOutcome: string;
  evidenceDocId?: string;
}

export interface ESGRisk {
  id: string;
  category: 'Environmental' | 'Workforce Safety' | 'Human Rights' | 'Regulatory Compliance' | 'Supplier' | 'Governance';
  entityId: string;
  entityName: string;
  description: string;
  likelihood: 1 | 2 | 3 | 4 | 5; // 1-5 scale
  impact: 1 | 2 | 3 | 4 | 5; // 1-5 scale
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  owner: string;
  mitigationPlan: string;
  deadline: string;
  status: 'Open' | 'Mitigating' | 'Under Review' | 'Closed';
}

export interface SupplierESGProfile {
  id: string;
  supplierCode: string;
  name: string;
  category: 'Civil Contractors' | 'Steel & Cement' | 'Heavy Equipment' | 'Solar PV & Inverters' | 'Transport & Logistics';
  location: string;
  esgScore: number;
  tier: 'Tier 1' | 'Tier 2';
  energySubmitted: boolean;
  ghgScope3Estimated: number; // tCO2e
  safetyCertifications: string[];
  iso14001: boolean;
  iso45001: boolean;
  childLaborPolicy: boolean;
  humanRightsAuditPassed: boolean;
  lastAuditDate: string;
  status: 'Compliant' | 'Pending Review' | 'Non-Compliant';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userName: string;
  userRole: UserRole;
  entityName: string;
  metricName: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'APPROVE' | 'REJECT' | 'EXTRACT' | 'ASSURE';
  oldValue?: string | number;
  newValue?: string | number;
  reason: string;
  evidenceRef?: string;
  ipAddress: string;
}

export interface CurrentUserContext {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  assignedEntityId?: string; // If restricted to specific project/subsidiary
  assignedEntityName?: string;
}
