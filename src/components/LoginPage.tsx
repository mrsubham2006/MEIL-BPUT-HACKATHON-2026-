import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Building2,
  HardHat,
  CheckCircle2,
  AlertCircle,
  Users,
  ChevronRight,
  ArrowLeft,
  Briefcase,
  Layers,
} from 'lucide-react';
import { SEED_USERS } from '../auth/authEngine';
import { UserProfile } from '../types/auth';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onBackToLanding?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBackToLanding }) => {
  const [selectedUser, setSelectedUser] = useState<UserProfile>(SEED_USERS[1]); // Default: Dr. K. S. Rao (ESG Head)
  const [email, setEmail] = useState(SEED_USERS[1].email);
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectWorkspace = (user: UserProfile) => {
    setSelectedUser(user);
    setEmail(user.email);
    setPassword('••••••••••••');
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          targetUserId: selectedUser.uid,
          roleCode: selectedUser.roleCode,
        }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        onLoginSuccess(data.user);
      } else {
        onLoginSuccess(selectedUser);
      }
    } catch (err) {
      onLoginSuccess(selectedUser);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F3] text-[#202522] flex flex-col justify-between font-sans selection:bg-[#12372A] selection:text-white">
      {/* Top Corporate Strip */}
      <div className="bg-[#12372A] px-6 py-2 text-xs text-white border-b border-[#1F6F50] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wide">MEGHA ENGINEERING & INFRASTRUCTURES LIMITED</span>
          <span className="text-[#68716C]">·</span>
          <span className="text-[#DDE3DE]">Enterprise Sustainability Directorate</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#C5A35A] font-semibold text-[11px]">
            Demo Environment — Sample Data
          </span>
          <span className="text-[#68716C]">|</span>
          <span className="text-[#DDE3DE]">Authorized Access Only</span>
        </div>
      </div>

      {/* Main Login Canvas */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl w-full bg-white border border-[#DDE3DE] rounded-xl shadow-xs overflow-hidden">
          {/* Left Column: Brand Context & Visual */}
          <div className="lg:col-span-5 p-8 flex flex-col justify-between bg-[#12372A] text-white">
            <div>
              {onBackToLanding && (
                <button
                  onClick={onBackToLanding}
                  className="mb-6 inline-flex items-center gap-1.5 text-xs text-[#DDE3DE] hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Public Overview</span>
                </button>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-lg">
                  M
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight leading-tight">
                    MEIL ESG360
                  </h2>
                  <p className="text-xs text-[#DDE3DE]">
                    Enterprise ESG & BRSR Platform
                  </p>
                </div>
              </div>

              <div className="space-y-4 my-8">
                <div className="text-2xl font-bold text-white leading-tight">
                  One Group.<br />
                  <span className="text-[#C5A35A]">One ESG Truth.</span>
                </div>
                <p className="text-xs text-[#DDE3DE] leading-relaxed">
                  Consolidated sustainability data, evidence verification, and SEBI BRSR Core reporting across MEIL Group infrastructure operations.
                </p>
              </div>
            </div>

            {/* Bottom highlights */}
            <div className="pt-6 border-t border-white/10 space-y-2 text-xs text-[#DDE3DE]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A35A]" />
                <span>SEBI BRSR Core Mandated Disclosures</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#C5A35A]" />
                <span>Cryptographic Audit Trail & Lineage</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sign In Form & Workspace Selector */}
          <div className="lg:col-span-7 p-8 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#12372A]">Welcome back.</h3>
                <p className="text-xs text-[#68716C] mt-1">
                  Sign in to continue to your ESG workspace.
                </p>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 rounded-md bg-[#FDF2F2] border border-[#F5C6CB] text-xs text-[#B94A48] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#202522] mb-1">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#68716C] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@meilgroup.com"
                      className="w-full bg-white border border-[#DDE3DE] rounded-lg pl-9 pr-3 py-2 text-xs text-[#202522] focus:outline-none focus:border-[#12372A]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[#202522]">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Please contact the IT Security Desk at sec-ops@meilgroup.com to reset credentials.')}
                      className="text-xs text-[#1F6F50] hover:text-[#12372A] font-semibold cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#68716C] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••••••"
                      className="w-full bg-white border border-[#DDE3DE] rounded-lg pl-9 pr-3 py-2 text-xs text-[#202522] focus:outline-none focus:border-[#12372A]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary justify-center py-2.5 text-sm"
                  >
                    {loading ? (
                      <span>Signing in...</span>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Demo Workspace Selector */}
              <div className="mt-8 pt-6 border-t border-[#DDE3DE]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#12372A] flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#1F6F50]" />
                    <span>Choose Workspace (Demo Simulator)</span>
                  </span>
                  <span className="text-[10px] text-[#68716C]">
                    Simulate scope permissions
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {SEED_USERS.map((u) => {
                    const isSelected = selectedUser.uid === u.uid;
                    return (
                      <button
                        key={u.uid}
                        type="button"
                        onClick={() => handleSelectWorkspace(u)}
                        className={`text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#EDF4EF] border-[#2E7D5B] shadow-xs'
                            : 'bg-white border-[#DDE3DE] hover:bg-[#F7F7F3]'
                        }`}
                      >
                        <div className="text-xs font-bold text-[#12372A] truncate">
                          {u.displayName}
                        </div>
                        <div className="text-[10px] text-[#1F6F50] font-semibold truncate">
                          {u.roleTitle}
                        </div>
                        <div className="text-[10px] text-[#68716C] truncate mt-0.5">
                          {u.organizationScope.scopeLabel}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-[#DDE3DE] flex items-center justify-between text-[11px] text-[#68716C]">
              <span>Authorized enterprise users only</span>
              <span>v2.6 SEBI Compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 py-3 text-center text-xs text-[#68716C] border-t border-[#DDE3DE] bg-white">
        MEIL ESG360 © {new Date().getFullYear()} Megha Engineering & Infrastructures Limited. All rights reserved.
      </div>
    </div>
  );
};
