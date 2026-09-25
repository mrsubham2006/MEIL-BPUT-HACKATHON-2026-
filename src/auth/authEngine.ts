import { AppRoleCode, RoleDefinition, UserProfile, HierarchyScopeType } from '../types/auth';
import { EntityNode } from '../types/esg';

export const SYSTEM_PERMISSIONS = {
  // Authentication & Profile
  AUTH_LOGIN: 'auth.login',
  AUTH_MFA: 'auth.mfa',
  
  // User Management
  USER_READ: 'user.read',
  USER_CREATE: 'user.create',
  USER_UPDATE: 'user.update',
  USER_SUSPEND: 'user.suspend',
  USER_DELETE: 'user.delete',
  
  // Roles & Security Configuration
  ROLE_READ: 'role.read',
  ROLE_ASSIGN: 'role.assign',
  ADMIN_SETTINGS: 'admin.settings',
  ADMIN_AUDIT: 'admin.audit',
  
  // Organization Hierarchy
  ORG_READ: 'organization.read',
  ORG_MANAGE: 'organization.manage',
  
  // Projects
  PROJECT_READ: 'project.read',
  PROJECT_MANAGE: 'project.manage',
  
  // ESG Operational Data
  ESG_READ: 'esg.read',
  ESG_CREATE: 'esg.create',
  ESG_UPDATE: 'esg.update',
  ESG_SUBMIT: 'esg.submit',
  ESG_REVIEW: 'esg.review',
  ESG_APPROVE: 'esg.approve',
  
  // Evidence & Documents
  EVIDENCE_READ: 'evidence.read',
  EVIDENCE_UPLOAD: 'evidence.upload',
  EVIDENCE_VERIFY: 'evidence.verify',
  
  // BRSR & BRSR Core
  BRSR_READ: 'brsr.read',
  BRSR_MANAGE: 'brsr.manage',
  BRSR_APPROVE: 'brsr.approve',
  BRSR_CORE_READ: 'brsr_core.read',
  BRSR_CORE_APPROVE: 'brsr_core.approve',
  
  // Assurance Workspace
  ASSURANCE_READ: 'assurance.read',
  ASSURANCE_REVIEW: 'assurance.review',
  ASSURANCE_SIGN_OFF: 'assurance.sign_off',
  
  // Reports
  REPORT_READ: 'report.read',
  REPORT_GENERATE: 'report.generate',
  REPORT_PUBLISH: 'report.publish',
  
  // Suppliers / Value Chain
  SUPPLIER_PORTAL: 'supplier.portal',
  SUPPLIER_MANAGE: 'supplier.manage',
};

export const ROLE_DEFINITIONS: Record<AppRoleCode, RoleDefinition> = {
  MEIL_SYSTEM_ADMIN: {
    code: 'MEIL_SYSTEM_ADMIN',
    title: 'MEIL System Admin',
    scopeType: 'GROUP',
    mainResponsibility: 'Users, roles, configuration & security policies',
    description: 'Technical platform administrator overseeing enterprise accounts, security rules, RBAC mappings, and audit logging.',
    permissions: [
      SYSTEM_PERMISSIONS.USER_READ,
      SYSTEM_PERMISSIONS.USER_CREATE,
      SYSTEM_PERMISSIONS.USER_UPDATE,
      SYSTEM_PERMISSIONS.USER_SUSPEND,
      SYSTEM_PERMISSIONS.ROLE_READ,
      SYSTEM_PERMISSIONS.ROLE_ASSIGN,
      SYSTEM_PERMISSIONS.ADMIN_SETTINGS,
      SYSTEM_PERMISSIONS.ADMIN_AUDIT,
      SYSTEM_PERMISSIONS.ORG_READ,
      SYSTEM_PERMISSIONS.ORG_MANAGE,
      SYSTEM_PERMISSIONS.PROJECT_READ,
      SYSTEM_PERMISSIONS.REPORT_READ,
    ],
    isSystemRole: true,
  },
  MEIL_GROUP_ESG_HEAD: {
    code: 'MEIL_GROUP_ESG_HEAD',
    title: 'MEIL ESG Head',
    scopeType: 'GROUP',
    mainResponsibility: 'Overall ESG + final review (sees entire MEIL)',
    description: 'Executive sustainability leader with consolidated visibility across all 3 subsidiaries, 6 BUs, 20 projects, and final sign-off authority on BRSR reports.',
    permissions: [
      SYSTEM_PERMISSIONS.ORG_READ,
      SYSTEM_PERMISSIONS.PROJECT_READ,
      SYSTEM_PERMISSIONS.ESG_READ,
      SYSTEM_PERMISSIONS.ESG_REVIEW,
      SYSTEM_PERMISSIONS.ESG_APPROVE,
      SYSTEM_PERMISSIONS.EVIDENCE_READ,
      SYSTEM_PERMISSIONS.EVIDENCE_VERIFY,
      SYSTEM_PERMISSIONS.BRSR_READ,
      SYSTEM_PERMISSIONS.BRSR_MANAGE,
      SYSTEM_PERMISSIONS.BRSR_APPROVE,
      SYSTEM_PERMISSIONS.BRSR_CORE_READ,
      SYSTEM_PERMISSIONS.BRSR_CORE_APPROVE,
      SYSTEM_PERMISSIONS.ASSURANCE_READ,
      SYSTEM_PERMISSIONS.REPORT_READ,
      SYSTEM_PERMISSIONS.REPORT_GENERATE,
      SYSTEM_PERMISSIONS.REPORT_PUBLISH,
      SYSTEM_PERMISSIONS.ADMIN_AUDIT,
    ],
    isSystemRole: true,
  },
  CORPORATE_BRSR_MANAGER: {
    code: 'CORPORATE_BRSR_MANAGER',
    title: 'Corporate BRSR Manager',
    scopeType: 'GROUP',
    mainResponsibility: 'BRSR / BRSR Core mapping & compliance checks',
    description: 'Corporate sustainability specialist responsible for SEBI master circular alignment, BRSR core calculation formulas, and missing disclosure audits.',
    permissions: [
      SYSTEM_PERMISSIONS.ORG_READ,
      SYSTEM_PERMISSIONS.PROJECT_READ,
      SYSTEM_PERMISSIONS.ESG_READ,
      SYSTEM_PERMISSIONS.ESG_REVIEW,
      SYSTEM_PERMISSIONS.EVIDENCE_READ,
      SYSTEM_PERMISSIONS.BRSR_READ,
      SYSTEM_PERMISSIONS.BRSR_MANAGE,
      SYSTEM_PERMISSIONS.BRSR_CORE_READ,
      SYSTEM_PERMISSIONS.REPORT_READ,
      SYSTEM_PERMISSIONS.REPORT_GENERATE,
    ],
    isSystemRole: true,
  },
  SUBSIDIARY_ESG_MANAGER: {
    code: 'SUBSIDIARY_ESG_MANAGER',
    title: 'Subsidiary ESG Manager',
    scopeType: 'SUBSIDIARY',
    mainResponsibility: 'Consolidation & review (sees assigned subsidiary)',
    description: 'Regional sustainability manager overseeing all business units and construction projects within their assigned MEIL subsidiary.',
    permissions: [
      SYSTEM_PERMISSIONS.ORG_READ,
      SYSTEM_PERMISSIONS.PROJECT_READ,
      SYSTEM_PERMISSIONS.ESG_READ,
      SYSTEM_PERMISSIONS.ESG_REVIEW,
      SYSTEM_PERMISSIONS.ESG_APPROVE,
      SYSTEM_PERMISSIONS.EVIDENCE_READ,
      SYSTEM_PERMISSIONS.EVIDENCE_VERIFY,
      SYSTEM_PERMISSIONS.BRSR_READ,
      SYSTEM_PERMISSIONS.BRSR_CORE_READ,
      SYSTEM_PERMISSIONS.REPORT_READ,
    ],
    isSystemRole: true,
  },
  BUSINESS_UNIT_MANAGER: {
    code: 'BUSINESS_UNIT_MANAGER',
    title: 'Business Unit Manager',
    scopeType: 'BUSINESS_UNIT',
    mainResponsibility: 'BU-level review & roll-up (sees assigned BU)',
    description: 'Operational business unit lead responsible for data quality, verification, and anomaly investigations for projects under the BU.',
    permissions: [
      SYSTEM_PERMISSIONS.ORG_READ,
      SYSTEM_PERMISSIONS.PROJECT_READ,
      SYSTEM_PERMISSIONS.ESG_READ,
      SYSTEM_PERMISSIONS.ESG_REVIEW,
      SYSTEM_PERMISSIONS.EVIDENCE_READ,
      SYSTEM_PERMISSIONS.REPORT_READ,
    ],
    isSystemRole: true,
  },
  PROJECT_MANAGER: {
    code: 'PROJECT_MANAGER',
    title: 'Project Manager',
    scopeType: 'PROJECT',
    mainResponsibility: 'Project approval & site verification (sees assigned project)',
    description: 'Site project leader verifying meter logbooks, bowser diesel delivery slips, worker safety muster, and approving site ESG submissions.',
    permissions: [
      SYSTEM_PERMISSIONS.PROJECT_READ,
      SYSTEM_PERMISSIONS.ESG_READ,
      SYSTEM_PERMISSIONS.ESG_REVIEW,
      SYSTEM_PERMISSIONS.ESG_APPROVE,
      SYSTEM_PERMISSIONS.EVIDENCE_READ,
      SYSTEM_PERMISSIONS.EVIDENCE_UPLOAD,
      SYSTEM_PERMISSIONS.REPORT_READ,
    ],
    isSystemRole: true,
  },
  PROJECT_ESG_COORDINATOR: {
    code: 'PROJECT_ESG_COORDINATOR',
    title: 'Project ESG Coordinator',
    scopeType: 'PROJECT',
    mainResponsibility: 'Data collection & evidence upload (submits ESG data)',
    description: 'Field officer logging electricity bills, fuel readings, water logs, safety incident forms, and uploading supporting PDFs for the assigned project.',
    permissions: [
      SYSTEM_PERMISSIONS.PROJECT_READ,
      SYSTEM_PERMISSIONS.ESG_READ,
      SYSTEM_PERMISSIONS.ESG_CREATE,
      SYSTEM_PERMISSIONS.ESG_UPDATE,
      SYSTEM_PERMISSIONS.ESG_SUBMIT,
      SYSTEM_PERMISSIONS.EVIDENCE_READ,
      SYSTEM_PERMISSIONS.EVIDENCE_UPLOAD,
    ],
    isSystemRole: true,
  },
  ASSURANCE_REVIEWER: {
    code: 'ASSURANCE_REVIEWER',
    title: 'Assurance Reviewer',
    scopeType: 'ASSIGNED_KPIS',
    mainResponsibility: 'Evidence & assurance verification (only assigned BRSR/BRSR Core data + evidence)',
    description: 'Independent external auditor (e.g. DNV / EY) verifying evidence chain, sampling utility bills, requesting clarifications, and issuing assurance opinions.',
    permissions: [
      SYSTEM_PERMISSIONS.BRSR_READ,
      SYSTEM_PERMISSIONS.BRSR_CORE_READ,
      SYSTEM_PERMISSIONS.EVIDENCE_READ,
      SYSTEM_PERMISSIONS.ASSURANCE_READ,
      SYSTEM_PERMISSIONS.ASSURANCE_REVIEW,
      SYSTEM_PERMISSIONS.ASSURANCE_SIGN_OFF,
      SYSTEM_PERMISSIONS.REPORT_READ,
    ],
    isSystemRole: true,
  },
  SUPPLIER_ESG_USER: {
    code: 'SUPPLIER_ESG_USER',
    title: 'Supplier ESG User',
    scopeType: 'SUPPLIER',
    mainResponsibility: 'Value chain emissions submission & certifications',
    description: 'Tier-1 vendor logging Scope 3 emissions, ISO certifications, and labour compliance.',
    permissions: [
      SYSTEM_PERMISSIONS.SUPPLIER_PORTAL,
      SYSTEM_PERMISSIONS.EVIDENCE_UPLOAD,
    ],
    isSystemRole: true,
  },
  MEIL_MANAGEMENT_VIEWER: {
    code: 'MEIL_MANAGEMENT_VIEWER',
    title: 'MEIL Management Viewer',
    scopeType: 'GROUP',
    mainResponsibility: 'Executive dashboard & approved report viewing',
    description: 'Board of directors and executive leadership read-only access to published ESG KPIs.',
    permissions: [
      SYSTEM_PERMISSIONS.ORG_READ,
      SYSTEM_PERMISSIONS.PROJECT_READ,
      SYSTEM_PERMISSIONS.ESG_READ,
      SYSTEM_PERMISSIONS.BRSR_READ,
      SYSTEM_PERMISSIONS.BRSR_CORE_READ,
      SYSTEM_PERMISSIONS.REPORT_READ,
    ],
    isSystemRole: false,
  },
};

// Seed Users for all 8 Hierarchy Roles with realistic MEIL Profiles
export const SEED_USERS: UserProfile[] = [
  {
    uid: 'usr-admin-01',
    email: 'admin.sec@meil.in',
    displayName: 'P. N. Reddy',
    roleCode: 'MEIL_SYSTEM_ADMIN',
    roleTitle: 'MEIL System Administrator',
    department: 'Enterprise Information Security & Governance',
    tenantId: 'meil',
    status: 'ACTIVE',
    emailVerified: true,
    mfaEnabled: true,
    organizationScope: {
      scopeType: 'GROUP',
      entityId: 'meil-group',
      scopeLabel: 'Entire MEIL Group Corporate',
    },
    permissions: ROLE_DEFINITIONS.MEIL_SYSTEM_ADMIN.permissions,
    lastLoginAt: '2026-09-24 21:40',
    lastLoginIp: '10.24.8.1',
    createdAt: '2025-01-10',
  },
  {
    uid: 'usr-esghead-01',
    email: 'ksrao.esg@meil.in',
    displayName: 'Dr. K. S. Rao',
    roleCode: 'MEIL_GROUP_ESG_HEAD',
    roleTitle: 'MEIL ESG Head',
    department: 'Corporate Sustainability Directorate',
    tenantId: 'meil',
    status: 'ACTIVE',
    emailVerified: true,
    mfaEnabled: true,
    organizationScope: {
      scopeType: 'GROUP',
      entityId: 'meil-group',
      scopeLabel: 'Entire MEIL Group (All Subsidiaries & 20 Sites)',
    },
    permissions: ROLE_DEFINITIONS.MEIL_GROUP_ESG_HEAD.permissions,
    lastLoginAt: '2026-09-24 22:05',
    lastLoginIp: '10.24.12.80',
    createdAt: '2025-01-15',
  },
  {
    uid: 'usr-brsr-01',
    email: 'vikram.compliance@meil.in',
    displayName: 'Vikramaditya V.',
    roleCode: 'CORPORATE_BRSR_MANAGER',
    roleTitle: 'Corporate BRSR Manager',
    department: 'Corporate Regulatory & BRSR Compliance',
    tenantId: 'meil',
    status: 'ACTIVE',
    emailVerified: true,
    mfaEnabled: true,
    organizationScope: {
      scopeType: 'GROUP',
      entityId: 'meil-group',
      scopeLabel: 'Group Level BRSR / BRSR Core',
    },
    permissions: ROLE_DEFINITIONS.CORPORATE_BRSR_MANAGER.permissions,
    lastLoginAt: '2026-09-24 19:15',
    lastLoginIp: '10.24.14.33',
    createdAt: '2025-02-01',
  },
  {
    uid: 'usr-submgr-01',
    email: 'rkverma.solar@meil.in',
    displayName: 'R. K. Verma',
    roleCode: 'SUBSIDIARY_ESG_MANAGER',
    roleTitle: 'Subsidiary ESG Manager (Solar & Hydro)',
    department: 'Renewable Power & Hydro EPC',
    tenantId: 'meil',
    status: 'ACTIVE',
    emailVerified: true,
    mfaEnabled: false,
    organizationScope: {
      scopeType: 'SUBSIDIARY',
      subsidiaryId: 'sub-solar-hydro',
      scopeLabel: 'Megha Solar & Hydro Power Ltd (Assigned Subsidiary Only)',
    },
    permissions: ROLE_DEFINITIONS.SUBSIDIARY_ESG_MANAGER.permissions,
    lastLoginAt: '2026-09-24 18:30',
    lastLoginIp: '10.28.4.12',
    createdAt: '2025-02-15',
  },
  {
    uid: 'usr-bumgr-01',
    email: 'praveen.bumgr@meil.in',
    displayName: 'Praveen K. Chary',
    roleCode: 'BUSINESS_UNIT_MANAGER',
    roleTitle: 'Business Unit Manager (Hydro & Lift BU)',
    department: 'Lift Irrigation Engineering',
    tenantId: 'meil',
    status: 'ACTIVE',
    emailVerified: true,
    mfaEnabled: false,
    organizationScope: {
      scopeType: 'BUSINESS_UNIT',
      subsidiaryId: 'sub-solar-hydro',
      businessUnitId: 'bu-hydro-irrigation',
      scopeLabel: 'Hydro & Lift Irrigation BU (Assigned BU Only)',
    },
    permissions: ROLE_DEFINITIONS.BUSINESS_UNIT_MANAGER.permissions,
    lastLoginAt: '2026-09-24 17:00',
    lastLoginIp: '10.28.18.5',
    createdAt: '2025-03-01',
  },
  {
    uid: 'usr-projmgr-01',
    email: 'rajesh.nair@meil.in',
    displayName: 'Col. Rajesh Nair',
    roleCode: 'PROJECT_MANAGER',
    roleTitle: 'Project Manager (Polavaram Dam)',
    department: 'Field Project Operations',
    tenantId: 'meil',
    status: 'ACTIVE',
    emailVerified: true,
    mfaEnabled: false,
    organizationScope: {
      scopeType: 'PROJECT',
      subsidiaryId: 'sub-solar-hydro',
      businessUnitId: 'bu-hydro-irrigation',
      projectId: 'proj-polavaram',
      scopeLabel: 'Polavaram Headworks & Hydro Project (Assigned Project Only)',
    },
    permissions: ROLE_DEFINITIONS.PROJECT_MANAGER.permissions,
    lastLoginAt: '2026-09-24 20:10',
    lastLoginIp: '10.35.10.4',
    createdAt: '2025-03-10',
  },
  {
    uid: 'usr-coord-01',
    email: 'sreenivasan.esg@meil.in',
    displayName: 'M. Sreenivasan',
    roleCode: 'PROJECT_ESG_COORDINATOR',
    roleTitle: 'Project ESG Coordinator (Polavaram Dam)',
    department: 'Site HSE & Sustainability',
    tenantId: 'meil',
    status: 'ACTIVE',
    emailVerified: true,
    mfaEnabled: false,
    organizationScope: {
      scopeType: 'PROJECT',
      subsidiaryId: 'sub-solar-hydro',
      businessUnitId: 'bu-hydro-irrigation',
      projectId: 'proj-polavaram',
      scopeLabel: 'Polavaram Headworks & Hydro Project (Data Contributor)',
    },
    permissions: ROLE_DEFINITIONS.PROJECT_ESG_COORDINATOR.permissions,
    lastLoginAt: '2026-09-24 21:50',
    lastLoginIp: '10.35.10.82',
    createdAt: '2025-03-15',
  },
  {
    uid: 'usr-assuror-01',
    email: 'dnv.lead.auditor@dnv.com',
    displayName: 'Sunil Mehta, FCA (DNV Lead Assuror)',
    roleCode: 'ASSURANCE_REVIEWER',
    roleTitle: 'Independent Assurance Reviewer',
    department: 'Independent Assurance Body (DNV / ISAE 3000)',
    tenantId: 'meil',
    status: 'ACTIVE',
    emailVerified: true,
    mfaEnabled: true,
    organizationScope: {
      scopeType: 'ASSIGNED_KPIS',
      assignedKpiIds: ['CORE-P6-01', 'CORE-P6-02', 'CORE-P6-03', 'CORE-P6-04', 'CORE-P6-05', 'CORE-P6-06', 'CORE-P3-01', 'CORE-P3-02', 'CORE-P8-01'],
      scopeLabel: 'SEBI BRSR Core 9 KPIs & Verified Evidence Dossiers',
    },
    permissions: ROLE_DEFINITIONS.ASSURANCE_REVIEWER.permissions,
    lastLoginAt: '2026-09-24 16:45',
    lastLoginIp: '192.168.100.55',
    createdAt: '2025-04-01',
  },
  {
    uid: 'usr-supplier-01',
    email: 'esg@deccansteel.com',
    displayName: 'T. R. Murthy (Deccan Steel)',
    roleCode: 'SUPPLIER_ESG_USER',
    roleTitle: 'Supplier ESG User',
    department: 'Deccan Steel & Heavy Forgings Ltd',
    tenantId: 'meil',
    status: 'ACTIVE',
    emailVerified: true,
    mfaEnabled: false,
    organizationScope: {
      scopeType: 'SUPPLIER',
      supplierId: 'sup-01',
      scopeLabel: 'Supplier ID: SUP-01 (Deccan Steel)',
    },
    permissions: ROLE_DEFINITIONS.SUPPLIER_ESG_USER.permissions,
    lastLoginAt: '2026-09-24 11:20',
    lastLoginIp: '182.72.14.99',
    createdAt: '2025-04-10',
  },
];

/**
 * Authorization Checker: Determines if a given user can perform an action on a target entity.
 */
export function authorizeAccess(
  user: UserProfile,
  requiredPermission: string,
  targetEntity?: EntityNode | { entityId?: string; subsidiaryId?: string; businessUnitId?: string; projectId?: string; kpiId?: string }
): { allowed: boolean; reason?: string } {
  // 1. Account status check
  if (user.status !== 'ACTIVE') {
    return { allowed: false, reason: `Account is ${user.status}. Contact MEIL administrator.` };
  }

  // 2. Permission check
  if (!user.permissions.includes(requiredPermission)) {
    return { allowed: false, reason: `Missing required permission '${requiredPermission}' for role ${user.roleTitle}.` };
  }

  // 3. Organization scope check
  const scope = user.organizationScope;

  // If user has GROUP scope, they can access everything in the MEIL tenant
  if (scope.scopeType === 'GROUP') {
    return { allowed: true };
  }

  // If user has ASSIGNED_KPIS scope (Assurance Reviewer)
  if (scope.scopeType === 'ASSIGNED_KPIS') {
    if (requiredPermission.startsWith('esg.create') || requiredPermission.startsWith('esg.submit') || requiredPermission.startsWith('user.')) {
      return { allowed: false, reason: 'Assurance Reviewer is restricted to read-only assurance analysis.' };
    }
    return { allowed: true };
  }

  if (!targetEntity) {
    return { allowed: true };
  }

  // If user has SUBSIDIARY scope
  if (scope.scopeType === 'SUBSIDIARY') {
    const targetSubId = (targetEntity as any).subsidiaryId || (targetEntity as any).id;
    if (targetSubId && targetSubId !== scope.subsidiaryId && (targetEntity as any).type !== 'group') {
      return {
        allowed: false,
        reason: `Cross-subsidiary boundary violation: User is restricted to '${scope.scopeLabel}'.`,
      };
    }
    return { allowed: true };
  }

  // If user has BUSINESS_UNIT scope
  if (scope.scopeType === 'BUSINESS_UNIT') {
    const targetBuId = (targetEntity as any).businessUnitId || (targetEntity as any).id;
    if (targetBuId && targetBuId !== scope.businessUnitId) {
      return {
        allowed: false,
        reason: `Cross-business-unit boundary violation: User is restricted to '${scope.scopeLabel}'.`,
      };
    }
    return { allowed: true };
  }

  // If user has PROJECT scope
  if (scope.scopeType === 'PROJECT') {
    const targetProjId = (targetEntity as any).projectId || (targetEntity as any).id;
    if (targetProjId && targetProjId !== scope.projectId) {
      return {
        allowed: false,
        reason: `Cross-project boundary violation: User is restricted to '${scope.scopeLabel}'.`,
      };
    }
    return { allowed: true };
  }

  return { allowed: true };
}
