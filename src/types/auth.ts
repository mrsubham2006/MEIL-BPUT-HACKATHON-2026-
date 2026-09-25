export type HierarchyScopeType = 'GROUP' | 'SUBSIDIARY' | 'BUSINESS_UNIT' | 'PROJECT' | 'ASSIGNED_KPIS' | 'SUPPLIER';

export type UserAccountStatus = 'ACTIVE' | 'PENDING' | 'SUSPENDED' | 'DISABLED' | 'INVITED';

export type AppRoleCode =
  | 'MEIL_SYSTEM_ADMIN'
  | 'MEIL_GROUP_ESG_HEAD'
  | 'CORPORATE_BRSR_MANAGER'
  | 'SUBSIDIARY_ESG_MANAGER'
  | 'BUSINESS_UNIT_MANAGER'
  | 'PROJECT_MANAGER'
  | 'PROJECT_ESG_COORDINATOR'
  | 'ASSURANCE_REVIEWER'
  | 'SUPPLIER_ESG_USER'
  | 'MEIL_MANAGEMENT_VIEWER';

export interface UserOrganizationScope {
  scopeType: HierarchyScopeType;
  entityId?: string; // 'meil-group' for Group
  subsidiaryId?: string; // e.g. 'sub-solar-hydro'
  businessUnitId?: string; // e.g. 'bu-hydro-irrigation'
  projectId?: string; // e.g. 'proj-polavaram'
  assignedKpiIds?: string[]; // for Assurance Reviewer
  supplierId?: string;
  scopeLabel: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  roleCode: AppRoleCode;
  roleTitle: string;
  department: string;
  tenantId: 'meil';
  status: UserAccountStatus;
  emailVerified: boolean;
  mfaEnabled: boolean;
  organizationScope: UserOrganizationScope;
  permissions: string[];
  lastLoginAt: string;
  lastLoginIp: string;
  createdAt: string;
}

export interface RoleDefinition {
  code: AppRoleCode;
  title: string;
  scopeType: HierarchyScopeType;
  mainResponsibility: string;
  description: string;
  permissions: string[];
  isSystemRole: boolean;
}

export interface SecurityAuditEvent {
  id: string;
  timestamp: string;
  userId: string;
  userEmail: string;
  userName: string;
  roleCode: string;
  eventType: 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'LOGOUT' | 'ROLE_CHANGED' | 'SCOPE_CHANGED' | 'USER_SUSPENDED' | 'USER_INVITED' | 'PASSWORD_RESET' | 'ACCESS_DENIED';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  details: string;
  ipAddress: string;
  userAgent?: string;
}
