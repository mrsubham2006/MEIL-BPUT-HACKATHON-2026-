import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { RoleHierarchyBanner } from './components/RoleHierarchyBanner';
import { CommandCenterView } from './components/CommandCenterView';
import { ExecutiveDashboardView } from './components/ExecutiveDashboardView';
import { TaskCenterView } from './components/TaskCenterView';
import { OrganizationView } from './components/OrganizationView';
import { ProjectIntelligenceView } from './components/ProjectIntelligenceView';
import { EnvironmentalView } from './components/EnvironmentalView';
import { SocialSafetyView } from './components/SocialSafetyView';
import { GovernanceView } from './components/GovernanceView';
import { DataCollectionView } from './components/DataCollectionView';
import { DataLineageView } from './components/DataLineageView';
import { BRSRCenterView } from './components/BRSRCenterView';
import { AssuranceCenterView } from './components/AssuranceCenterView';
import { SupplierPortalView } from './components/SupplierPortalView';
import { RiskSDGView } from './components/RiskSDGView';
import { ReportsView } from './components/ReportsView';
import { AuditTrailView } from './components/AuditTrailView';
import { CopilotModal } from './components/CopilotModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { HelpModal } from './components/HelpModal';
import { OnboardingModal } from './components/OnboardingModal';

import {
  CurrentUserContext,
  EntityNode,
  MetricDefinition,
  ESGDataRecord,
  AnomalyItem,
  EvidenceDocument,
  BRSRCoreKPI,
  AuditLogEntry,
} from './types/esg';

import {
  INITIAL_USER,
  ENTITY_HIERARCHY,
  ESG_METRIC_DEFINITIONS,
  INITIAL_DATA_RECORDS,
  INITIAL_ANOMALIES,
  INITIAL_EVIDENCE_DOCS,
  BRSR_CORE_KPIS,
  INITIAL_AUDIT_LOGS,
} from './data/mockData';

export function App() {
  // App Navigation Mode: 'landing' | 'login' | 'app'
  const [viewMode, setViewMode] = useState<'landing' | 'login' | 'app'>('landing');

  // Authenticated Global State
  const [currentUser, setCurrentUser] = useState<CurrentUserContext>(INITIAL_USER);
  const [selectedEntityId, setSelectedEntityId] = useState<string>('meil-group');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('FY 2025-26 Q2');
  const [activeTab, setActiveTab] = useState<NavTab>('command-center');
  const [selectedProjectIdForModal, setSelectedProjectIdForModal] = useState<string | undefined>(undefined);

  // Modals
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Master Data
  const [entities, setEntities] = useState<EntityNode[]>(ENTITY_HIERARCHY);
  const [metrics, setMetrics] = useState<MetricDefinition[]>(ESG_METRIC_DEFINITIONS);
  const [records, setRecords] = useState<ESGDataRecord[]>(INITIAL_DATA_RECORDS);
  const [anomalies, setAnomalies] = useState<AnomalyItem[]>(INITIAL_ANOMALIES);
  const [evidenceDocs, setEvidenceDocs] = useState<EvidenceDocument[]>(INITIAL_EVIDENCE_DOCS);
  const [brsrCoreKpis, setBrsrCoreKpis] = useState<BRSRCoreKPI[]>(BRSR_CORE_KPIS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  // Global keyboard listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetch live backend data
  useEffect(() => {
    async function loadBackendData() {
      try {
        const [hierRes, metRes, recRes, anomRes, evidRes, brsrRes, audRes] = await Promise.all([
          fetch('/api/hierarchy').then((r) => r.json()).catch(() => null),
          fetch('/api/metrics').then((r) => r.json()).catch(() => null),
          fetch('/api/records').then((r) => r.json()).catch(() => null),
          fetch('/api/anomalies').then((r) => r.json()).catch(() => null),
          fetch('/api/evidence').then((r) => r.json()).catch(() => null),
          fetch('/api/brsr/core').then((r) => r.json()).catch(() => null),
          fetch('/api/audit-logs').then((r) => r.json()).catch(() => null),
        ]);

        if (hierRes?.data) setEntities(hierRes.data);
        if (metRes?.data) setMetrics(metRes.data);
        if (recRes?.data) setRecords(recRes.data);
        if (anomRes?.data) setAnomalies(anomRes.data);
        if (evidRes?.data) setEvidenceDocs(evidRes.data);
        if (brsrRes?.data) setBrsrCoreKpis(brsrRes.data);
        if (audRes?.data) setAuditLogs(audRes.data);
      } catch (e) {
        console.warn('Backend sync used initial seed fallback');
      }
    }
    loadBackendData();
  }, []);

  // Role Switcher / Login Success handler
  const handleLoginSuccess = (user: any) => {
    const updatedUser: CurrentUserContext = {
      id: user.uid || `usr-${Date.now()}`,
      name: user.displayName || user.name,
      email: user.email,
      role: (user.roleTitle || user.role) as any,
      assignedEntityId: user.organizationScope?.scopeId || user.assignedEntityId || 'meil-group',
      assignedEntityName: user.organizationScope?.scopeLabel || user.assignedEntityName || 'MEIL Group Corporate',
    };

    setCurrentUser(updatedUser);
    if (updatedUser.assignedEntityId) {
      setSelectedEntityId(updatedUser.assignedEntityId);
    }

    // Role-tailored default active view
    const roleLower = updatedUser.role.toLowerCase();
    if (roleLower.includes('coordinator')) {
      setActiveTab('data-collection');
    } else if (roleLower.includes('assurance') || roleLower.includes('auditor')) {
      setActiveTab('assurance');
    } else if (roleLower.includes('project manager')) {
      setActiveTab('projects');
    } else if (roleLower.includes('supplier')) {
      setActiveTab('suppliers');
    } else {
      setActiveTab('command-center');
    }

    setViewMode('app');
    setIsOnboardingOpen(true);
  };

  const handleSwitchUser = (newUser: CurrentUserContext) => {
    setCurrentUser(newUser);
    const roleLower = newUser.role.toLowerCase();
    if (roleLower.includes('coordinator')) {
      setActiveTab('data-collection');
    } else if (roleLower.includes('assurance') || roleLower.includes('auditor')) {
      setActiveTab('assurance');
    } else if (roleLower.includes('project manager')) {
      setActiveTab('projects');
    } else if (roleLower.includes('supplier')) {
      setActiveTab('suppliers');
    }
  };

  const currentEntity = entities.find((e) => e.id === selectedEntityId) || entities[0];
  const activeProjects = entities.filter((e) => e.type === 'project');

  // Handle Record Creation
  const handleRecordCreated = async (newRecData: any) => {
    try {
      const res = await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecData),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setRecords((prev) => [data.data, ...prev]);
        const [anomRes, audRes] = await Promise.all([
          fetch('/api/anomalies').then((r) => r.json()).catch(() => null),
          fetch('/api/audit-logs').then((r) => r.json()).catch(() => null),
        ]);
        if (anomRes?.data) setAnomalies(anomRes.data);
        if (audRes?.data) setAuditLogs(audRes.data);
      }
    } catch (err) {
      const localRec = {
        id: `rec-${Date.now()}`,
        version: 1,
        status: 'Submitted',
        submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        ...newRecData,
      };
      setRecords((prev) => [localRec, ...prev]);
    }
  };

  // Handle Record Status Updates
  const handleUpdateRecordStatus = async (recordId: string, status: string, notes?: string) => {
    try {
      const res = await fetch(`/api/records/${recordId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          approvedBy: currentUser.name,
          userRole: currentUser.role,
          rejectionReason: notes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setRecords((prev) =>
          prev.map((r) => (r.id === recordId ? { ...r, status: status as any } : r))
        );
        const audRes = await fetch('/api/audit-logs').then((r) => r.json()).catch(() => null);
        if (audRes?.data) setAuditLogs(audRes.data);
      }
    } catch (err) {
      setRecords((prev) =>
        prev.map((r) => (r.id === recordId ? { ...r, status: status as any } : r))
      );
    }
  };

  // Handle Anomaly Resolution
  const handleResolveAnomaly = async (anomalyId: string, note: string) => {
    try {
      const res = await fetch(`/api/anomalies/${anomalyId}/resolve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'Resolved',
          resolutionNote: note,
          resolvedBy: currentUser.name,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAnomalies((prev) =>
          prev.map((a) => (a.id === anomalyId ? { ...a, status: 'Resolved', resolutionNote: note } : a))
        );
      }
    } catch (err) {
      setAnomalies((prev) =>
        prev.map((a) => (a.id === anomalyId ? { ...a, status: 'Resolved', resolutionNote: note } : a))
      );
    }
  };

  const handleSelectProjectFromAnywhere = (projectId: string) => {
    setSelectedProjectIdForModal(projectId);
    setActiveTab('projects');
  };

  const openAnomaliesCount = anomalies.filter((a) => a.status === 'Open' || a.status === 'Investigating').length;
  const pendingApprovalsCount = records.filter((r) => r.status === 'Submitted' || r.status === 'Under Review').length;

  // Render View Modes: 'landing' | 'login' | 'app'
  if (viewMode === 'landing') {
    return (
      <LandingPage
        onAccessPlatform={() => setViewMode('login')}
        onExploreHowItWorks={() => {
          const el = document.getElementById('how-it-works');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    );
  }

  if (viewMode === 'login') {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={() => setViewMode('landing')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F3] text-[#202522] flex flex-col font-sans selection:bg-[#12372A] selection:text-white">
      {/* Global Header */}
      <Header
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        selectedPeriod={selectedPeriod}
        onSelectPeriod={setSelectedPeriod}
        selectedEntityId={selectedEntityId}
        onSelectEntity={setSelectedEntityId}
        entities={entities}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        anomaliesCount={openAnomaliesCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onGoToLanding={() => setViewMode('landing')}
      />

      {/* Role Hierarchy Visual Tree & Scoping Banner */}
      <RoleHierarchyBanner
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        onSelectEntity={setSelectedEntityId}
      />

      {/* Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Dynamic Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          anomaliesCount={openAnomaliesCount}
          pendingApprovalsCount={pendingApprovalsCount}
          currentUser={currentUser}
          onOpenHelp={() => setIsHelpOpen(true)}
          onGoToLanding={() => setViewMode('landing')}
          onLogout={() => setViewMode('login')}
        />

        {/* Dynamic Main Viewport Canvas */}
        <main className="flex-1 p-6 overflow-y-auto max-w-[1600px] w-full">
          {activeTab === 'command-center' && (
            <CommandCenterView
              selectedEntity={currentEntity}
              selectedPeriod={selectedPeriod}
              records={records}
              anomalies={anomalies}
              brsrCoreKpis={brsrCoreKpis}
              onNavigate={setActiveTab}
              onSelectProject={handleSelectProjectFromAnywhere}
              onOpenCopilot={() => setIsCopilotOpen(true)}
            />
          )}

          {activeTab === 'executive-dashboard' && (
            <ExecutiveDashboardView
              entities={entities}
              brsrCoreKpis={brsrCoreKpis}
              records={records}
              anomalies={anomalies}
              selectedPeriod={selectedPeriod}
              onNavigate={setActiveTab}
              onOpenCopilot={() => setIsCopilotOpen(true)}
            />
          )}

          {activeTab === 'tasks' && (
            <TaskCenterView
              currentUser={currentUser}
              records={records}
              anomalies={anomalies}
              onNavigate={setActiveTab}
              onOpenDataCollection={() => setActiveTab('data-collection')}
            />
          )}

          {activeTab === 'organization' && (
            <OrganizationView
              entities={entities}
              onSelectProject={handleSelectProjectFromAnywhere}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectIntelligenceView
              projects={activeProjects}
              records={records}
              anomalies={anomalies}
              evidenceDocs={evidenceDocs}
              selectedProjectId={selectedProjectIdForModal}
              onClearSelectedProject={() => setSelectedProjectIdForModal(undefined)}
              onNavigateToEvidence={() => setActiveTab('assurance')}
            />
          )}

          {activeTab === 'environmental' && (
            <EnvironmentalView
              records={records}
              selectedPeriod={selectedPeriod}
            />
          )}

          {activeTab === 'social-safety' && <SocialSafetyView />}

          {activeTab === 'governance' && <GovernanceView />}

          {activeTab === 'data-collection' && (
            <DataCollectionView
              entities={entities}
              metrics={metrics}
              currentUser={currentUser}
              onRecordCreated={handleRecordCreated}
              onOpenCopilot={() => setIsCopilotOpen(true)}
            />
          )}

          {activeTab === 'lineage' && <DataLineageView />}

          {activeTab === 'brsr' && (
            <BRSRCenterView
              brsrCoreKpis={brsrCoreKpis}
              onOpenCopilot={() => setIsCopilotOpen(true)}
              onNavigateToLineage={() => setActiveTab('lineage')}
              selectedEntity={currentEntity}
              selectedPeriod={selectedPeriod}
            />
          )}

          {activeTab === 'assurance' && (
            <AssuranceCenterView
              brsrCoreKpis={brsrCoreKpis}
              records={records}
              evidenceDocs={evidenceDocs}
              currentUser={currentUser}
              onUpdateRecordStatus={handleUpdateRecordStatus}
            />
          )}

          {activeTab === 'suppliers' && <SupplierPortalView />}

          {activeTab === 'risks-sdg' && (
            <RiskSDGView
              anomalies={anomalies}
              onResolveAnomaly={handleResolveAnomaly}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsView
              brsrCoreKpis={brsrCoreKpis}
              selectedEntity={currentEntity}
              selectedPeriod={selectedPeriod}
            />
          )}

          {activeTab === 'audit-trail' && <AuditTrailView auditLogs={auditLogs} />}
        </main>
      </div>

      {/* Global Search Modal (Ctrl + K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        entities={entities}
        metrics={metrics}
        records={records}
        brsrCoreKpis={brsrCoreKpis}
        onNavigate={setActiveTab}
        onSelectProject={handleSelectProjectFromAnywhere}
      />

      {/* Contextual Help Modal */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* First-time / Role Switch Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        currentUser={currentUser}
        onClose={() => setIsOnboardingOpen(false)}
      />

      {/* Gemini AI Copilot Floating Drawer */}
      <CopilotModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        currentUser={currentUser}
        selectedEntity={currentEntity}
        selectedPeriod={selectedPeriod}
      />
    </div>
  );
}

export default App;
