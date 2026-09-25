import React from 'react';
import {
  LayoutDashboard,
  Network,
  HardHat,
  Leaf,
  Users,
  Scale,
  FileSpreadsheet,
  GitFork,
  FileCheck,
  ShieldCheck,
  Truck,
  AlertTriangle,
  FileText,
  History,
  Send,
  FileSearch,
  CheckSquare,
  HelpCircle,
  LogOut,
  Globe,
  Bell,
  CheckCircle,
} from 'lucide-react';
import { CurrentUserContext } from '../types/esg';

export type NavTab =
  | 'command-center'
  | 'executive-dashboard'
  | 'tasks'
  | 'organization'
  | 'projects'
  | 'environmental'
  | 'social-safety'
  | 'governance'
  | 'data-collection'
  | 'lineage'
  | 'brsr'
  | 'assurance'
  | 'suppliers'
  | 'risks-sdg'
  | 'reports'
  | 'audit-trail';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  anomaliesCount: number;
  pendingApprovalsCount: number;
  currentUser?: CurrentUserContext;
  onOpenHelp: () => void;
  onGoToLanding: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  anomaliesCount,
  pendingApprovalsCount,
  currentUser,
  onOpenHelp,
  onGoToLanding,
  onLogout,
}) => {
  const roleLower = currentUser?.role.toLowerCase() || '';
  const isCoordinator = roleLower.includes('coordinator');
  const isProjectManager = roleLower.includes('project manager');
  const isSubsidiaryManager = roleLower.includes('subsidiary');
  const isBuManager = roleLower.includes('business unit') || roleLower.includes('bu');
  const isAssuranceReviewer = roleLower.includes('assurance') || roleLower.includes('auditor');
  const isSupplier = roleLower.includes('supplier');
  const isManagement = roleLower.includes('management') || roleLower.includes('director') || roleLower.includes('board');
  const isCorporateHead = roleLower.includes('head') || roleLower.includes('corporate') || roleLower.includes('admin') || (!isCoordinator && !isProjectManager && !isSubsidiaryManager && !isBuManager && !isAssuranceReviewer && !isSupplier && !isManagement);

  // Role-filtered Navigation Items matching the corporate spec
  const allNavItems: {
    id: NavTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
    section?: string;
    allowedRoles: ('ALL' | 'COORDINATOR' | 'PM' | 'SUBSIDIARY' | 'BU' | 'CORPORATE' | 'ASSURANCE' | 'SUPPLIER' | 'MANAGEMENT')[];
  }[] = [
    // 1. DASHBOARD
    {
      id: 'command-center',
      label: isManagement ? 'Overview' : isCoordinator ? 'My Work Desk' : isProjectManager ? 'Project Health' : 'Dashboard',
      icon: LayoutDashboard,
      section: 'WORKSPACE',
      allowedRoles: ['ALL'],
    },
    {
      id: 'executive-dashboard',
      label: 'Executive Briefing',
      icon: LayoutDashboard,
      allowedRoles: ['MANAGEMENT', 'CORPORATE'],
    },
    {
      id: 'tasks',
      label: 'My Tasks',
      icon: CheckSquare,
      badge: isCoordinator ? 5 : 3,
      allowedRoles: ['COORDINATOR', 'PM', 'SUBSIDIARY', 'BU', 'CORPORATE'],
    },

    // 2. ESG DATA & EVIDENCE
    {
      id: 'data-collection',
      label: isCoordinator ? 'Add ESG Data' : 'ESG Data',
      icon: isCoordinator ? Send : FileSpreadsheet,
      section: 'ESG DATA & EVIDENCE',
      allowedRoles: ['COORDINATOR', 'PM', 'SUBSIDIARY', 'BU', 'CORPORATE'],
    },
    {
      id: 'assurance',
      label: isAssuranceReviewer ? 'Assigned Reviews' : 'Evidence',
      icon: isAssuranceReviewer ? FileSearch : ShieldCheck,
      badge: pendingApprovalsCount,
      allowedRoles: ['COORDINATOR', 'PM', 'SUBSIDIARY', 'BU', 'CORPORATE', 'ASSURANCE'],
    },
    {
      id: 'lineage',
      label: 'Data Lineage',
      icon: GitFork,
      allowedRoles: ['CORPORATE', 'SUBSIDIARY', 'BU', 'PM', 'ASSURANCE'],
    },

    // 3. PROJECTS & HIERARCHY
    {
      id: 'projects',
      label: isProjectManager ? 'Project Alpha Site' : 'Projects',
      icon: HardHat,
      section: 'OPERATIONS',
      allowedRoles: ['CORPORATE', 'SUBSIDIARY', 'BU', 'PM'],
    },
    {
      id: 'organization',
      label: 'Group Hierarchy',
      icon: Network,
      allowedRoles: ['CORPORATE', 'SUBSIDIARY', 'BU'],
    },

    // 4. ESG PILLARS
    {
      id: 'environmental',
      label: 'Environment',
      icon: Leaf,
      section: 'ESG PILLARS',
      allowedRoles: ['CORPORATE', 'SUBSIDIARY', 'BU', 'PM', 'MANAGEMENT'],
    },
    {
      id: 'social-safety',
      label: 'Social & Safety',
      icon: Users,
      allowedRoles: ['CORPORATE', 'SUBSIDIARY', 'BU', 'PM', 'MANAGEMENT'],
    },
    {
      id: 'governance',
      label: 'Governance',
      icon: Scale,
      allowedRoles: ['CORPORATE', 'SUBSIDIARY', 'BU', 'MANAGEMENT'],
    },

    // 5. REPORTING & BRSR
    {
      id: 'brsr',
      label: 'BRSR Reporting',
      icon: FileCheck,
      section: 'REPORTING & COMPLIANCE',
      allowedRoles: ['CORPORATE', 'SUBSIDIARY', 'MANAGEMENT', 'ASSURANCE'],
    },
    {
      id: 'risks-sdg',
      label: 'Issues & Attention',
      icon: AlertTriangle,
      badge: anomaliesCount,
      allowedRoles: ['CORPORATE', 'SUBSIDIARY', 'BU', 'PM', 'MANAGEMENT'],
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      allowedRoles: ['CORPORATE', 'SUBSIDIARY', 'BU', 'PM', 'MANAGEMENT'],
    },
    {
      id: 'audit-trail',
      label: 'Audit Trail',
      icon: History,
      allowedRoles: ['CORPORATE', 'ASSURANCE'],
    },

    // 6. VALUE CHAIN
    {
      id: 'suppliers',
      label: isSupplier ? 'Supplier Questionnaire' : 'Value Chain & Scope 3',
      icon: Truck,
      section: isSupplier ? 'SUPPLIER PORTAL' : undefined,
      allowedRoles: ['CORPORATE', 'SUBSIDIARY', 'SUPPLIER'],
    },
  ];

  // Filter based on user role
  const filteredNavItems = allNavItems.filter((item) => {
    if (item.allowedRoles.includes('ALL')) return true;
    if (isCorporateHead && item.allowedRoles.includes('CORPORATE')) return true;
    if (isSubsidiaryManager && item.allowedRoles.includes('SUBSIDIARY')) return true;
    if (isBuManager && item.allowedRoles.includes('BU')) return true;
    if (isProjectManager && item.allowedRoles.includes('PM')) return true;
    if (isCoordinator && item.allowedRoles.includes('COORDINATOR')) return true;
    if (isAssuranceReviewer && item.allowedRoles.includes('ASSURANCE')) return true;
    if (isSupplier && item.allowedRoles.includes('SUPPLIER')) return true;
    if (isManagement && item.allowedRoles.includes('MANAGEMENT')) return true;
    return false;
  });

  return (
    <aside className="w-60 bg-[#12372A] border-r border-[#1F6F50] flex flex-col shrink-0 min-h-[calc(100vh-76px)] select-none text-white">
      {/* Navigation Items List */}
      <div className="p-3 space-y-1 flex-1 overflow-y-auto">
        {filteredNavItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const showSectionHeader =
            item.section &&
            (index === 0 || filteredNavItems[index - 1].section !== item.section);

          return (
            <div key={item.id}>
              {showSectionHeader && (
                <div className="px-3 pb-1 pt-3 text-[10px] font-bold tracking-wider text-[#DDE3DE]/60 uppercase">
                  {item.section}
                </div>
              )}
              <button
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1F6F50] text-white shadow-xs'
                    : 'text-[#DDE3DE] hover:bg-[#1A4D3B] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-white' : 'text-[#DDE3DE]/70'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                      isActive
                        ? 'bg-[#12372A] text-white'
                        : 'bg-[#C5A35A]/20 text-[#C5A35A] border border-[#C5A35A]/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer Utilities */}
      <div className="p-3 border-t border-[#1F6F50] space-y-1 text-xs">
        <button
          onClick={onOpenHelp}
          className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[#DDE3DE] hover:text-white hover:bg-[#1A4D3B] transition-colors cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-[#DDE3DE]/70" />
          <span>Help & Guidelines</span>
        </button>

        <button
          onClick={onGoToLanding}
          className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[#DDE3DE] hover:text-white hover:bg-[#1A4D3B] transition-colors cursor-pointer"
        >
          <Globe className="w-4 h-4 text-[#C5A35A]" />
          <span>Public Portal</span>
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[#F5C6CB] hover:text-white hover:bg-[#B94A48]/20 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
