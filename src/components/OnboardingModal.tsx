import React from 'react';
import {
  ShieldCheck,
  Building2,
  HardHat,
  ArrowRight,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { CurrentUserContext } from '../types/esg';

interface OnboardingModalProps {
  isOpen: boolean;
  currentUser: CurrentUserContext;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  currentUser,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs select-none font-sans text-[#202522]">
      <div className="bg-white border border-[#DDE3DE] rounded-xl max-w-xl w-full p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#DDE3DE]">
          <div className="h-10 w-10 rounded-lg bg-[#12372A] flex items-center justify-center font-bold text-white text-lg">
            M
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#1F6F50] uppercase tracking-wider">
              AUTHENTICATION SUCCESSFUL
            </div>
            <h2 className="text-lg font-bold text-[#12372A]">Welcome to MEIL ESG360</h2>
          </div>
        </div>

        {/* Role & Scope Context Cards */}
        <div className="mt-5 space-y-3">
          <div className="bg-[#F7F7F3] p-4 rounded-lg border border-[#DDE3DE]">
            <div className="text-[11px] text-[#68716C]">Your Verified Workspace</div>
            <div className="text-sm font-bold text-[#12372A] mt-0.5">{currentUser.role}</div>
            <div className="text-xs text-[#1F6F50] font-semibold">{currentUser.name} ({currentUser.email})</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F7F7F3] p-3.5 rounded-lg border border-[#DDE3DE]">
              <div className="text-[10px] text-[#68716C] uppercase font-bold">Assigned Scope</div>
              <div className="text-xs font-bold text-[#12372A] mt-1 truncate">
                {currentUser.assignedEntityName || 'MEIL Group Corporate'}
              </div>
            </div>

            <div className="bg-[#F7F7F3] p-3.5 rounded-lg border border-[#DDE3DE]">
              <div className="text-[10px] text-[#68716C] uppercase font-bold">Reporting Access</div>
              <div className="text-xs font-bold text-[#2E7D5B] mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Active & Auditable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-6 pt-4 border-t border-[#DDE3DE] flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary"
          >
            <span>Enter ESG Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
