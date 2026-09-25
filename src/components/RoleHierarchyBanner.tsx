import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  HardHat,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Layers,
  Lock,
  UserCheck,
} from 'lucide-react';
import { CurrentUserContext } from '../types/esg';

export interface HierarchyRoleSpec {
  id: string;
  roleCode: string;
  roleName: string;
  userName: string;
  userEmail: string;
  scopeType: 'GROUP' | 'SUBSIDIARY' | 'BUSINESS_UNIT' | 'PROJECT' | 'ASSURANCE';
  assignedEntityId: string;
  assignedEntityName: string;
  scopeDescription: string;
  keyAction: string;
  canEdit: boolean;
  canApprove: boolean;
  canAssure: boolean;
}

export const HIERARCHY_TIERS: HierarchyRoleSpec[] = [
  {
    id: 'tier-1',
    roleCode: 'MEIL_ESG_HEAD',
    roleName: 'Corporate ESG Head',
    userName: 'Dr. K. S. Rao',
    userEmail: 'ksrao.esg@meil.in',
    scopeType: 'GROUP',
    assignedEntityId: 'meil-group',
    assignedEntityName: 'MEIL Group Corporate (Consolidated)',
    scopeDescription: 'Sees entire MEIL Group across all 3 subsidiaries, 6 BUs & 20 projects',
    keyAction: 'Group ESG Strategy, BRSR Approval & Board Governance',
    canEdit: true,
    canApprove: true,
    canAssure: false,
  },
  {
    id: 'tier-2',
    roleCode: 'SUBSIDIARY_ESG_MANAGER',
    roleName: 'Subsidiary ESG Manager',
    userName: 'R. K. Verma',
    userEmail: 'rkverma.solar@meil.in',
    scopeType: 'SUBSIDIARY',
    assignedEntityId: 'sub-solar',
    assignedEntityName: 'Megha Solar & Hydro Power Ltd',
    scopeDescription: 'Scoped to Megha Solar & Hydro Power Ltd and its 7 underlying projects',
    keyAction: 'Subsidiary Roll-Up, Verification & Anomaly Review',
    canEdit: true,
    canApprove: true,
    canAssure: false,
  },
  {
    id: 'tier-3',
    roleCode: 'BU_ESG_LEAD',
    roleName: 'Business Unit Lead',
    userName: 'S. N. Reddy',
    userEmail: 'snreddy.lift@meil.in',
    scopeType: 'BUSINESS_UNIT',
    assignedEntityId: 'bu-irrigation',
    assignedEntityName: 'Lift Irrigation & Water BU',
    scopeDescription: 'Scoped to Lift Irrigation & Water BU across 5 project sites',
    keyAction: 'BU Water & Energy Aggregation, Site Follow-ups',
    canEdit: true,
    canApprove: true,
    canAssure: false,
  },
  {
    id: 'tier-4',
    roleCode: 'PROJECT_MANAGER',
    roleName: 'Project Manager',
    userName: 'V. Sundaram',
    userEmail: 'sundaram.polavaram@meil.in',
    scopeType: 'PROJECT',
    assignedEntityId: 'proj-polavaram',
    assignedEntityName: 'Polavaram Dam Project Site',
    scopeDescription: 'Full site control: Polavaram Headworks, Canals & Spillway',
    keyAction: 'Site ESG Oversight, Safety Sign-off, Coordinator Approval',
    canEdit: true,
    canApprove: true,
    canAssure: false,
  },
  {
    id: 'tier-5',
    roleCode: 'PROJECT_ESG_COORDINATOR',
    roleName: 'Site ESG Coordinator',
    userName: 'Ananya Sharma',
    userEmail: 'ananya.site@meil.in',
    scopeType: 'PROJECT',
    assignedEntityId: 'proj-polavaram',
    assignedEntityName: 'Polavaram Dam Project Site',
    scopeDescription: 'Field-level logger at Polavaram Dam Project Site',
    keyAction: 'Direct meter logging, fuel receipts, OCR evidence uploads',
    canEdit: true,
    canApprove: false,
    canAssure: false,
  },
  {
    id: 'tier-6',
    roleCode: 'ASSURANCE_REVIEWER',
    roleName: 'Assurance Auditor (DNV)',
    userName: 'Priya Nambiar',
    userEmail: 'priya.nambiar@dnv.com',
    scopeType: 'ASSURANCE',
    assignedEntityId: 'meil-group',
    assignedEntityName: 'Independent Auditor (ISAE 3000)',
    scopeDescription: 'Read-only access across MEIL with evidence verification dossier',
    keyAction: 'Sample Testing, Evidence Verification, ISAE 3000 Assurance',
    canEdit: false,
    canApprove: false,
    canAssure: true,
  },
];

interface RoleHierarchyBannerProps {
  currentUser: CurrentUserContext;
  onSwitchUser: (user: CurrentUserContext) => void;
  onSelectEntity: (entityId: string) => void;
}

export const RoleHierarchyBanner: React.FC<RoleHierarchyBannerProps> = ({
  currentUser,
  onSwitchUser,
  onSelectEntity,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const activeTier =
    HIERARCHY_TIERS.find(
      (t) =>
        t.roleName.toLowerCase() === currentUser.role.toLowerCase() ||
        t.userName.toLowerCase() === currentUser.name.toLowerCase()
    ) || HIERARCHY_TIERS[0];

  const handleSelectTier = (tier: HierarchyRoleSpec) => {
    onSwitchUser({
      id: `usr-${tier.roleCode.toLowerCase()}`,
      name: tier.userName,
      email: tier.userEmail,
      role: tier.roleName as any,
      assignedEntityId: tier.assignedEntityId,
      assignedEntityName: tier.assignedEntityName,
    });
    if (tier.assignedEntityId) {
      onSelectEntity(tier.assignedEntityId);
    }
  };

  return (
    <div className="bg-white border-b border-[#DDE3DE] text-[#202522] select-none">
      {/* Compact Status Bar */}
      <div className="max-w-[1600px] mx-auto px-6 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-[#12372A]">
            <Layers className="w-4 h-4 text-[#1F6F50]" />
            <span>Active Scope:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#12372A]">{activeTier.roleName}</span>
            <span className="text-[#68716C]">({activeTier.userName})</span>
            <span className="text-[#68716C]">→</span>
            <span className="font-medium text-[#1F6F50] bg-[#EDF4EF] px-2 py-0.5 rounded border border-[#DDE3DE]">
              {currentUser.assignedEntityName || activeTier.assignedEntityName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#12372A] hover:text-[#1F6F50] transition-colors cursor-pointer"
          >
            <span>{isExpanded ? 'Hide Scope Hierarchy' : 'Simulate Workspace Scope'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Hierarchy Flow */}
      {isExpanded && (
        <div className="bg-[#F7F7F3] border-t border-[#DDE3DE] px-6 py-4">
          <div className="max-w-[1600px] mx-auto">
            <div className="text-[11px] font-bold text-[#68716C] uppercase tracking-wider mb-3">
              Scoped Permissions Matrix (Select to Switch Active Workspace)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {HIERARCHY_TIERS.map((tier, idx) => {
                const isSelected = activeTier.id === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => handleSelectTier(tier)}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#EDF4EF] border-[#2E7D5B] shadow-xs'
                        : 'bg-white border-[#DDE3DE] hover:bg-[#FBFDFB]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold font-mono text-[#68716C]">
                          TIER {idx + 1}
                        </span>
                        {isSelected && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#12372A] text-white">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-[#12372A] truncate">
                        {tier.roleName}
                      </div>
                      <div className="text-[11px] text-[#1F6F50] font-medium truncate">
                        {tier.userName}
                      </div>
                      <div className="text-[10px] text-[#68716C] line-clamp-2 mt-1">
                        {tier.assignedEntityName}
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-[#DDE3DE] text-[9px] text-[#68716C] truncate">
                      {tier.canApprove ? '✓ Approver' : tier.canAssure ? '✓ Assurance' : '✓ Logger'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
