import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  FileSearch,
  CheckCircle,
  ChevronRight,
  ShieldCheck,
  Filter,
  Check,
} from 'lucide-react';
import { CurrentUserContext, ESGDataRecord, AnomalyItem } from '../types/esg';
import { NavTab } from './Sidebar';

interface TaskCenterViewProps {
  currentUser: CurrentUserContext;
  records: ESGDataRecord[];
  anomalies: AnomalyItem[];
  onNavigate: (tab: NavTab) => void;
  onOpenDataCollection: () => void;
}

interface ESGTaskItem {
  id: string;
  title: string;
  category: 'Environment' | 'Social' | 'Governance' | 'Assurance' | 'Anomaly';
  priority: 'High' | 'Medium' | 'Normal';
  dueDate: string;
  project: string;
  assignedRole: string;
  status: 'To Do' | 'In Review' | 'Completed';
  actionType: 'DATA_ENTRY' | 'EVIDENCE_UPLOAD' | 'APPROVAL' | 'ANOMALY_FIX' | 'ASSURANCE_REVIEW';
  description: string;
}

export const TaskCenterView: React.FC<TaskCenterViewProps> = ({
  currentUser,
  records,
  anomalies,
  onNavigate,
  onOpenDataCollection,
}) => {
  const [activeStatusTab, setActiveStatusTab] = useState<'To Do' | 'In Review' | 'Completed'>('To Do');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const [tasks, setTasks] = useState<ESGTaskItem[]>([
    {
      id: 'task-1',
      title: 'Submit Water Consumption Log for Aug 2026',
      category: 'Environment',
      priority: 'High',
      dueDate: '28 Sep 2026',
      project: 'Polavaram Dam Project Site',
      assignedRole: 'Site ESG Coordinator',
      status: 'To Do',
      actionType: 'DATA_ENTRY',
      description: 'Upload municipal intake logbook and meter reading report.',
    },
    {
      id: 'task-2',
      title: 'Review Fuel Spiking Anomaly (+350%)',
      category: 'Anomaly',
      priority: 'High',
      dueDate: '29 Sep 2026',
      project: 'Zojila Tunnel Project Phase II',
      assignedRole: 'Subsidiary Manager',
      status: 'To Do',
      actionType: 'ANOMALY_FIX',
      description: 'Reconcile IOCL bulk diesel receipts against tunneling advance log.',
    },
    {
      id: 'task-3',
      title: 'Verify Scope 2 Electricity Utility Bills',
      category: 'Environment',
      priority: 'Medium',
      dueDate: '30 Sep 2026',
      project: 'Megha Solar 500MW Western Farm',
      assignedRole: 'Project Manager',
      status: 'To Do',
      actionType: 'EVIDENCE_UPLOAD',
      description: 'DISCOM high-tension electricity settlement document verification.',
    },
    {
      id: 'task-4',
      title: 'Sign off on Workplace Safety LTIFR Register',
      category: 'Social',
      priority: 'Medium',
      dueDate: '01 Oct 2026',
      project: 'Kaleshwaram Lift Irrigation Pkg 8',
      assignedRole: 'Project Manager',
      status: 'In Review',
      actionType: 'APPROVAL',
      description: 'Validate zero lost-time incidents against site medical centre register.',
    },
    {
      id: 'task-5',
      title: 'Upload External Calibration Certificate',
      category: 'Governance',
      priority: 'Normal',
      dueDate: '04 Oct 2026',
      project: 'Char Dham Highway Project Pkg 4',
      assignedRole: 'Site Coordinator',
      status: 'Completed',
      actionType: 'EVIDENCE_UPLOAD',
      description: 'NABL accredited calibration certificate for stack ambient sensor.',
    },
  ]);

  const handleAction = (task: ESGTaskItem) => {
    if (task.actionType === 'DATA_ENTRY') {
      onOpenDataCollection();
    } else if (task.actionType === 'ANOMALY_FIX') {
      onNavigate('risks-sdg');
    } else if (task.actionType === 'APPROVAL' || task.actionType === 'EVIDENCE_UPLOAD') {
      onNavigate('assurance');
    } else {
      onNavigate('brsr');
    }
  };

  const handleMarkComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'Completed' } : t))
    );
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesStatus = t.status === activeStatusTab;
    const matchesCategory = filterCategory === 'ALL' || t.category === filterCategory;
    return matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6 select-none font-sans text-[#202522]">
      {/* Top Header */}
      <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F6F50] mb-1">
              <span>WORK TASK CENTER</span>
              <span className="text-[#68716C]">·</span>
              <span>Assigned Scope: {currentUser.assignedEntityName}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#12372A] tracking-tight">
              My Tasks
            </h1>
            <p className="text-xs text-[#68716C] mt-1">
              Action items requiring your input, review, or sign-off for the current quarter.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#F7F7F3] p-1 rounded-lg border border-[#DDE3DE]">
            {(['To Do', 'In Review', 'Completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatusTab(status)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeStatusTab === status
                    ? 'bg-[#12372A] text-white shadow-xs'
                    : 'text-[#68716C] hover:text-[#12372A]'
                }`}
              >
                {status} ({tasks.filter((t) => t.status === status).length})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks Table / Cards */}
      <div className="corp-card p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#DDE3DE]">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#68716C]" />
            <span className="text-xs font-bold text-[#12372A]">Filter by Category:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white border border-[#DDE3DE] rounded-lg px-2.5 py-1 text-xs text-[#202522] focus:border-[#12372A]"
            >
              <option value="ALL">All Categories</option>
              <option value="Environment">Environment</option>
              <option value="Social">Social</option>
              <option value="Governance">Governance</option>
              <option value="Anomaly">Anomaly / Attention</option>
            </select>
          </div>

          <span className="text-xs text-[#68716C]">
            Showing {filteredTasks.length} task(s)
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#68716C]">
              No tasks currently in {activeStatusTab} status.
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-[#F7F7F3] rounded-lg border border-[#DDE3DE] hover:border-[#1F6F50] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        task.priority === 'High'
                          ? 'bg-[#B94A48]'
                          : task.priority === 'Medium'
                          ? 'bg-[#B8872F]'
                          : 'bg-[#2E7D5B]'
                      }`}
                    />
                    <span className="text-xs font-bold text-[#12372A]">{task.title}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-white text-[#68716C] border border-[#DDE3DE]">
                      {task.category}
                    </span>
                  </div>
                  <div className="text-xs text-[#68716C]">
                    Project: <strong className="text-[#202522]">{task.project}</strong> · Due Date: <span className="font-mono text-[#12372A] font-semibold">{task.dueDate}</span>
                  </div>
                  <div className="text-[11px] text-[#68716C]">
                    {task.description}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {task.status !== 'Completed' && (
                    <button
                      onClick={() => handleMarkComplete(task.id)}
                      className="btn-secondary text-xs py-1.5 px-2.5"
                      title="Mark as completed"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(task)}
                    className="btn-primary text-xs py-1.5 px-3"
                  >
                    <span>Take Action</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
