import React from 'react';
import {
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  UserCheck,
  CheckCircle2,
  ChevronDown,
  Layers,
  Search,
  HelpCircle,
  Bell,
  Globe,
  Home,
  ChevronRight,
} from 'lucide-react';
import { CurrentUserContext, EntityNode } from '../types/esg';
import { HIERARCHY_TIERS, HierarchyRoleSpec } from './RoleHierarchyBanner';

interface HeaderProps {
  currentUser: CurrentUserContext;
  onSwitchUser: (user: CurrentUserContext) => void;
  selectedPeriod: string;
  onSelectPeriod: (period: string) => void;
  selectedEntityId: string;
  onSelectEntity: (entityId: string) => void;
  entities: EntityNode[];
  onOpenCopilot: () => void;
  anomaliesCount: number;
  onOpenSearch: () => void;
  onOpenHelp: () => void;
  onGoToLanding: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onSwitchUser,
  selectedPeriod,
  onSelectPeriod,
  selectedEntityId,
  onSelectEntity,
  entities,
  onOpenCopilot,
  anomaliesCount,
  onOpenSearch,
  onOpenHelp,
  onGoToLanding,
}) => {
  const [showRoleModal, setShowRoleModal] = React.useState(false);
  const [showNotificationDrawer, setShowNotificationDrawer] = React.useState(false);

  const periods = [
    'FY 2025-26 Q2',
    'FY 2025-26 Q1',
    'FY 2024-25 Annual',
    'FY 2024-25 Q4',
    'FY 2023-24 Annual',
  ];

  // Scoped Entity Filtering based on Current User's Assigned Entity and Role
  const getFilteredEntities = () => {
    const roleLower = currentUser.role.toLowerCase();
    const assignedId = currentUser.assignedEntityId;

    if (
      roleLower.includes('head') ||
      roleLower.includes('admin') ||
      roleLower.includes('corporate') ||
      roleLower.includes('management') ||
      assignedId === 'meil-group' ||
      !assignedId
    ) {
      return entities;
    }

    if (roleLower.includes('subsidiary')) {
      return entities.filter(
        (e) =>
          e.id === assignedId ||
          e.subsidiaryId === assignedId ||
          e.parentId === assignedId
      );
    }

    if (roleLower.includes('business unit') || roleLower.includes('bu')) {
      return entities.filter(
        (e) =>
          e.id === assignedId ||
          e.businessUnitId === assignedId ||
          e.parentId === assignedId
      );
    }

    return entities.filter((e) => e.id === assignedId);
  };

  const allowedEntities = getFilteredEntities();
  const currentEntity = entities.find((e) => e.id === selectedEntityId) || allowedEntities[0] || entities[0];

  const handleSelectRoleTier = (tier: HierarchyRoleSpec) => {
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
    setShowRoleModal(false);
  };

  // Build breadcrumbs for active entity
  const getBreadcrumbs = () => {
    const crumbs = [{ label: 'MEIL Group', id: 'meil-group' }];
    if (currentEntity && currentEntity.id !== 'meil-group') {
      if (currentEntity.subsidiaryId) {
        const sub = entities.find((e) => e.id === currentEntity.subsidiaryId);
        if (sub) crumbs.push({ label: sub.name, id: sub.id });
      }
      crumbs.push({ label: currentEntity.name, id: currentEntity.id });
    }
    return crumbs;
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#DDE3DE] text-[#202522] select-none shadow-xs">
      {/* Top Corporate Strip */}
      <div className="bg-[#12372A] px-6 py-1.5 text-xs text-white border-b border-[#1F6F50] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wide">MEGHA ENGINEERING & INFRASTRUCTURES LIMITED</span>
          <span className="text-[#68716C]">·</span>
          <span className="text-[#DDE3DE]">Enterprise ESG & BRSR Reporting Platform</span>
          <span className="text-[#68716C]">·</span>
          <span className="text-[#C5A35A] font-semibold text-[11px] bg-[#12372A] px-2 py-0.5 rounded border border-[#C5A35A]/40">
            SEBI BRSR Core Aligned
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-[#DDE3DE]">
          <span className="text-[11px] text-[#C5A35A]">Demo Environment — Sample Data</span>
          <span className="text-[#68716C]">|</span>
          <button
            onClick={onGoToLanding}
            className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#C5A35A]" />
            <span>Public Portal</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="flex items-center justify-between px-6 py-2.5">
        {/* Left: Brand Wordmark & Breadcrumb */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#12372A] flex items-center justify-center font-bold text-white text-base shadow-xs">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-[#12372A]">
                  MEIL ESG360
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#EDF4EF] text-[#12372A] font-semibold border border-[#DDE3DE]">
                  {selectedPeriod}
                </span>
              </div>
            </div>
          </div>

          {/* Breadcrumb Trail */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#68716C] pl-4 border-l border-[#DDE3DE]">
            <Home className="w-3.5 h-3.5 text-[#68716C]" />
            {getBreadcrumbs().map((crumb, idx) => (
              <React.Fragment key={crumb.id + idx}>
                <ChevronRight className="w-3 h-3 text-[#68716C]" />
                <button
                  onClick={() => onSelectEntity(crumb.id)}
                  className={`hover:text-[#12372A] transition-colors cursor-pointer truncate max-w-[140px] ${
                    idx === getBreadcrumbs().length - 1 ? 'text-[#12372A] font-bold' : 'text-[#68716C]'
                  }`}
                >
                  {crumb.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Center: Global Search & Scope Selectors */}
        <div className="flex items-center gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-3 bg-[#F7F7F3] hover:bg-[#EDF4EF] border border-[#DDE3DE] text-[#68716C] hover:text-[#202522] text-xs rounded-lg px-3.5 py-1.5 transition-colors cursor-pointer w-48 sm:w-64"
          >
            <Search className="w-3.5 h-3.5 text-[#68716C]" />
            <span className="truncate">Search ESG data, projects, reports...</span>
            <kbd className="hidden sm:inline text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-[#DDE3DE] text-[#68716C] ml-auto">
              Ctrl K
            </kbd>
          </button>

          {/* Entity Scope Selector */}
          <div className="relative flex items-center">
            <Building2 className="w-4 h-4 text-[#68716C] absolute left-3 pointer-events-none" />
            <select
              value={selectedEntityId}
              onChange={(e) => onSelectEntity(e.target.value)}
              className="bg-white border border-[#DDE3DE] text-[#202522] text-xs rounded-lg pl-9 pr-8 py-1.5 appearance-none hover:border-[#1F6F50] focus:outline-none focus:border-[#12372A] transition-colors w-56 truncate cursor-pointer font-semibold"
            >
              {allowedEntities.some((e) => e.type === 'group') && (
                <option value="meil-group">MEIL Group (Consolidated)</option>
              )}

              {allowedEntities.some((e) => e.type === 'subsidiary') && (
                <optgroup label="Subsidiaries">
                  {allowedEntities
                    .filter((e) => e.type === 'subsidiary')
                    .map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                </optgroup>
              )}

              {allowedEntities.some((e) => e.type === 'business_unit') && (
                <optgroup label="Business Units">
                  {allowedEntities
                    .filter((e) => e.type === 'business_unit')
                    .map((bu) => (
                      <option key={bu.id} value={bu.id}>
                        {bu.name}
                      </option>
                    ))}
                </optgroup>
              )}

              {allowedEntities.some((e) => e.type === 'project') && (
                <optgroup label="Infrastructure Projects">
                  {allowedEntities
                    .filter((e) => e.type === 'project')
                    .map((proj) => (
                      <option key={proj.id} value={proj.id}>
                        {proj.name} ({proj.state})
                      </option>
                    ))}
                </optgroup>
              )}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#68716C] absolute right-2.5 pointer-events-none" />
          </div>

          {/* Period Selector */}
          <div className="relative hidden md:flex items-center">
            <Calendar className="w-4 h-4 text-[#68716C] absolute left-3 pointer-events-none" />
            <select
              value={selectedPeriod}
              onChange={(e) => onSelectPeriod(e.target.value)}
              className="bg-white border border-[#DDE3DE] text-[#202522] text-xs rounded-lg pl-9 pr-8 py-1.5 appearance-none hover:border-[#1F6F50] focus:outline-none focus:border-[#12372A] transition-colors cursor-pointer font-semibold"
            >
              {periods.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#68716C] absolute right-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Right: Actions, Help & User Context */}
        <div className="flex items-center gap-2.5">
          {/* Help Button */}
          <button
            onClick={onOpenHelp}
            className="p-2 rounded-lg bg-[#F7F7F3] hover:bg-[#EDF4EF] text-[#68716C] hover:text-[#12372A] transition-colors cursor-pointer border border-[#DDE3DE]"
            title="Help & Guidelines"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationDrawer(!showNotificationDrawer)}
              className="p-2 rounded-lg bg-[#F7F7F3] hover:bg-[#EDF4EF] text-[#68716C] hover:text-[#12372A] transition-colors cursor-pointer border border-[#DDE3DE] relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {anomaliesCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#B94A48]" />
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotificationDrawer && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-[#DDE3DE] rounded-xl shadow-lg p-4 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#DDE3DE] mb-3">
                  <span className="text-xs font-bold text-[#12372A]">Actionable Alerts</span>
                  <span className="text-[10px] text-[#2E7D5B] font-semibold">3 Unread</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#F7F7F3] border border-[#DDE3DE]">
                    <div className="font-semibold text-[#12372A]">Water Data Due in 2 Days</div>
                    <div className="text-[11px] text-[#68716C] mt-0.5">Polavaram Dam Project Q2 log pending.</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#F7F7F3] border border-[#DDE3DE]">
                    <div className="font-semibold text-[#B8872F]">Fuel Spiking Anomaly Detected</div>
                    <div className="text-[11px] text-[#68716C] mt-0.5">+350% diesel variance needs review.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI ESG Copilot Trigger */}
          <button
            onClick={onOpenCopilot}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#12372A] hover:bg-[#1F6F50] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A35A]" />
            <span className="hidden sm:inline">ESG Copilot</span>
          </button>

          {/* Role / Workspace Switcher Pill */}
          <button
            onClick={() => setShowRoleModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white hover:bg-[#F7F7F3] border border-[#DDE3DE] text-xs text-[#202522] transition-colors cursor-pointer group"
            title="Switch Workspace Profile"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#2E7D5B]" />
            <div className="text-left hidden sm:block">
              <div className="font-semibold leading-tight text-[#12372A]">{currentUser.name}</div>
              <div className="text-[10px] text-[#68716C] font-medium">{currentUser.role}</div>
            </div>
            <UserCheck className="w-4 h-4 text-[#68716C] group-hover:text-[#12372A] transition-colors" />
          </button>
        </div>
      </div>

      {/* Role / Workspace Switcher Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-[#DDE3DE] rounded-xl max-w-2xl w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#DDE3DE]">
              <div>
                <h3 className="text-base font-bold text-[#12372A] flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#1F6F50]" />
                  <span>Choose Workspace Scope</span>
                </h3>
                <p className="text-xs text-[#68716C] mt-0.5">
                  Select a role and organization scope to simulate permissions in this demo.
                </p>
              </div>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-[#68716C] hover:text-[#12372A] text-sm p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-2 max-h-[440px] overflow-y-auto pr-1">
              {HIERARCHY_TIERS.map((tier, idx) => {
                const isCurrent =
                  currentUser.role.toLowerCase() === tier.roleName.toLowerCase() ||
                  currentUser.name.toLowerCase() === tier.userName.toLowerCase();

                return (
                  <button
                    key={tier.id}
                    onClick={() => handleSelectRoleTier(tier)}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex items-start justify-between cursor-pointer ${
                      isCurrent
                        ? 'bg-[#EDF4EF] border-[#2E7D5B] shadow-xs'
                        : 'bg-white border-[#DDE3DE] hover:bg-[#F7F7F3]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-[#68716C]">
                          TIER {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-[#12372A] uppercase">
                          {tier.roleName}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#12372A] text-white font-bold">
                            ACTIVE
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-semibold text-[#1F6F50]">
                        {tier.userName} ({tier.userEmail})
                      </div>

                      <div className="text-[11px] text-[#68716C]">
                        <span className="font-semibold text-[#202522]">Scope: </span>
                        {tier.scopeDescription}
                      </div>

                      <div className="text-[10px] text-[#68716C]">
                        <span className="font-semibold text-[#202522]">Key Duty: </span>
                        {tier.keyAction}
                      </div>
                    </div>

                    <div className="shrink-0 ml-3 mt-1">
                      {isCurrent ? (
                        <CheckCircle2 className="w-5 h-5 text-[#2E7D5B]" />
                      ) : (
                        <span className="text-xs text-[#12372A] font-semibold px-2.5 py-1 rounded bg-[#F7F7F3] border border-[#DDE3DE] hover:bg-[#EDF4EF]">
                          Select
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 pt-3 border-t border-[#DDE3DE] flex justify-between items-center text-xs text-[#68716C]">
              <span>RBAC & Scope Boundary Enforcement Active</span>
              <button
                onClick={() => setShowRoleModal(false)}
                className="btn-secondary text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
