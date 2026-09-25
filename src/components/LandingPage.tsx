import React, { useState } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  Building2,
  HardHat,
  CheckCircle2,
  Leaf,
  Users,
  Scale,
  FileCheck2,
  GitFork,
  FileSpreadsheet,
  FileSearch,
  Lock,
  BarChart3,
  Flame,
  Droplets,
  Zap,
  Globe,
  HelpCircle,
  X,
  ChevronRight,
  Building,
  Sun,
  Moon,
  Database,
  Check,
  Award,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LandingPageProps {
  onAccessPlatform: () => void;
  onExploreHowItWorks: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onAccessPlatform,
  onExploreHowItWorks,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [activeVisualNode, setActiveVisualNode] = useState<
    'group' | 'subsidiaries' | 'bus' | 'projects' | 'data' | 'validation' | 'brsr'
  >('group');

  // Modal dialog states
  const [activeModal, setActiveModal] = useState<
    'about' | 'framework' | 'security' | 'contact' | 'pillar-env' | 'pillar-soc' | 'pillar-gov' | null
  >(null);

  const visualNodes = [
    {
      id: 'group' as const,
      step: '01',
      title: 'MEIL GROUP',
      subtitle: 'Corporate Enterprise Level',
      metric: 'Consolidated BRSR Core: 91% Ready',
      desc: 'Aggregates group-wide ESG disclosures across 3 subsidiaries, 6 business units, and 20+ mega infrastructure projects.',
    },
    {
      id: 'subsidiaries' as const,
      step: '02',
      title: 'SUBSIDIARIES',
      subtitle: 'Energy, Hydro & Infra Entities',
      metric: '3 Major Operating Entities',
      desc: 'Megha Solar & Hydro Power Ltd, MEIL Infra Projects Ltd, and Megha Hydro & Water Tech.',
    },
    {
      id: 'bus' as const,
      step: '03',
      title: 'BUSINESS UNITS',
      subtitle: 'Operational Divisions',
      metric: '6 Specialised BUs',
      desc: 'Lift Irrigation, Solar Utility, Tunneling, Highways, City Gas Distribution, and Water Treatment.',
    },
    {
      id: 'projects' as const,
      step: '04',
      title: 'PROJECT SITES',
      subtitle: 'Site Execution Level',
      metric: '20+ Active Projects',
      desc: 'Polavaram Dam, Kaleshwaram Lift, Char Dham Road, Zojila Tunnel, and Western Solar Farm.',
    },
    {
      id: 'data' as const,
      step: '05',
      title: 'ESG DATA & EVIDENCE',
      subtitle: 'Primary Invoices & Meter Logs',
      metric: '3,450+ Verified Evidence Files',
      desc: 'OCR-extracted utility bills, fuel telemetry receipts, water meter logbooks, continuous ambient sensors & safety logbooks.',
    },
    {
      id: 'validation' as const,
      step: '06',
      title: 'VALIDATION & AUDIT',
      subtitle: 'Automated Integrity Check',
      metric: 'Statistical Anomaly Gateways',
      desc: 'Multi-tier verification workflow ensuring data completeness, outlier detection, and evidence correlation.',
    },
    {
      id: 'brsr' as const,
      step: '07',
      title: 'BRSR / BRSR CORE',
      subtitle: 'SEBI Mandatory Reporting',
      metric: '9 Core Attributes Assurance-Ready',
      desc: 'End-to-end trace from site invoices to final ISAE 3000 assurance sign-off by external auditors.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F3] text-[#202522] flex flex-col font-sans selection:bg-[#12372A] selection:text-white">
      {/* Top Corporate Strip */}
      <div className="bg-[#12372A] text-white px-6 py-2 text-xs border-b border-[#1F6F50] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wide text-white">MEGHA ENGINEERING & INFRASTRUCTURES LIMITED</span>
          <span className="text-[#68716C]">·</span>
          <span className="text-[#DDE3DE]">Enterprise Sustainability & Governance</span>
          <span className="text-[#68716C]">·</span>
          <span className="text-[#C5A35A] font-semibold text-[11px] bg-[#12372A] px-2 py-0.5 rounded border border-[#C5A35A]/40">
            SEBI BRSR Core Aligned
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-[#DDE3DE]">
          <span className="hidden sm:inline text-[11px] text-[#C5A35A]">
            Demo Environment — Sample Data
          </span>
          <span className="hidden md:inline text-[#68716C]">|</span>
          <span className="text-white font-medium">ISAE 3000 Clean Assurance Standard</span>
        </div>
      </div>

      {/* Public Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#DDE3DE] shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Wordmark */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-[#12372A] flex items-center justify-center font-bold text-white text-lg shadow-sm">
              M
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-[#12372A] leading-none">
                MEIL ESG360
              </div>
              <div className="text-[11px] font-medium text-[#68716C] mt-1">
                Enterprise ESG & BRSR Platform
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#68716C]">
            <button
              onClick={() => {
                const el = document.getElementById('platform-overview');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#12372A] transition-colors cursor-pointer"
            >
              Platform
            </button>
            <button
              onClick={() => setActiveModal('framework')}
              className="hover:text-[#12372A] transition-colors cursor-pointer"
            >
              ESG Framework
            </button>
            <button
              onClick={() => setActiveModal('framework')}
              className="hover:text-[#12372A] transition-colors cursor-pointer"
            >
              BRSR
            </button>
            <button
              onClick={onExploreHowItWorks}
              className="hover:text-[#12372A] transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => setActiveModal('about')}
              className="hover:text-[#12372A] transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline text-xs font-semibold text-[#68716C]">
              Authorized Access
            </span>
            <button
              onClick={onAccessPlatform}
              className="btn-primary"
            >
              <span>Access ESG360</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-16 lg:py-24 border-b border-[#DDE3DE] bg-gradient-to-b from-white to-[#F7F7F3]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Typography & CTAs */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EDF4EF] border border-[#DDE3DE] text-[#12372A] text-xs font-semibold tracking-wide uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D5B]" />
                  <span>MEIL ESG360 · ENTERPRISE ESG & BRSR PLATFORM</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#12372A] leading-[1.1]">
                  One Group.<br />
                  <span className="text-[#1F6F50]">One ESG Truth.</span>
                </h1>

                <p className="text-base sm:text-lg text-[#68716C] max-w-xl leading-relaxed">
                  Connect project-level ESG data, evidence, validation and reporting into one trusted enterprise platform.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={onAccessPlatform}
                    className="btn-primary px-6 py-3 text-sm shadow-sm"
                  >
                    <span>Access ESG360</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onExploreHowItWorks}
                    className="btn-secondary px-6 py-3 text-sm"
                  >
                    <span>Explore Platform</span>
                  </button>
                </div>

                {/* Subtitle assurance note */}
                <div className="pt-4 border-t border-[#DDE3DE] flex items-center gap-6 text-xs text-[#68716C]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D5B]" />
                    <span>SEBI Top 1,000 Mandated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D5B]" />
                    <span>ISAE 3000 Traceability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D5B]" />
                    <span>20+ Mega Project Sites</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Enterprise Hierarchy Visualization */}
              <div className="lg:col-span-6">
                <div className="bg-white border border-[#DDE3DE] rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-[#DDE3DE]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#2E7D5B]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#12372A]">
                        Enterprise Reporting Architecture
                      </span>
                    </div>
                    <span className="text-[11px] text-[#C5A35A] font-semibold bg-[#F7F7F3] px-2 py-0.5 rounded border border-[#DDE3DE]">
                      Click node to inspect
                    </span>
                  </div>

                  {/* Connected Linear Node Flow */}
                  <div className="mt-5 space-y-2">
                    {visualNodes.map((node, idx) => {
                      const isActive = activeVisualNode === node.id;
                      return (
                        <div key={node.id} className="relative">
                          {/* Connecting Line */}
                          {idx < visualNodes.length - 1 && (
                            <div className="absolute left-6 top-10 bottom-0 w-[2px] bg-[#DDE3DE] z-0" />
                          )}

                          <button
                            onClick={() => setActiveVisualNode(node.id)}
                            className={`w-full relative z-10 text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                              isActive
                                ? 'bg-[#EDF4EF] border-[#2E7D5B] shadow-xs'
                                : 'bg-white border-[#DDE3DE] hover:bg-[#F7F7F3]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                  isActive
                                    ? 'bg-[#12372A] text-white'
                                    : 'bg-[#F7F7F3] text-[#68716C] border border-[#DDE3DE]'
                                }`}
                              >
                                {node.step}
                              </span>
                              <div>
                                <div className="text-xs font-bold text-[#12372A] flex items-center gap-2">
                                  <span>{node.title}</span>
                                  {node.id === 'brsr' && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#C5A35A]/20 text-[#8F7027] border border-[#C5A35A]/40">
                                      SEBI CORE
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-[#68716C]">{node.subtitle}</div>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span
                                className={`text-[11px] font-semibold ${
                                  isActive ? 'text-[#2E7D5B]' : 'text-[#68716C]'
                                }`}
                              >
                                {node.metric}
                              </span>
                            </div>
                          </button>

                          {/* Expanded Detail Box for Active Node */}
                          {isActive && (
                            <div className="ml-10 mt-1 mb-2 p-3 bg-white rounded-lg border border-[#DDE3DE] text-xs text-[#68716C] shadow-xs">
                              <p className="leading-relaxed">{node.desc}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: From Project Data to Board-Ready Reporting */}
        <section id="how-it-works" className="py-20 bg-white border-b border-[#DDE3DE]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="text-xs font-bold tracking-wider text-[#2E7D5B] uppercase mb-2">
                END-TO-END ASSURANCE WORKFLOW
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#12372A]">
                From Project Data to Board-Ready Reporting
              </h2>
              <p className="text-sm text-[#68716C] mt-3">
                Complex ESG reporting made simple, traceable, and audit-ready for every tier of the organization.
              </p>
            </div>

            {/* 4 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 01 COLLECT */}
              <div className="corp-card hover:border-[#1F6F50] transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#EDF4EF] text-[#12372A] font-bold text-sm flex items-center justify-center mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-[#12372A] mb-1">COLLECT</h3>
                <p className="text-xs text-[#68716C] leading-relaxed">
                  Capture ESG data from projects and business units with structured digital forms and utility integration.
                </p>
                <div className="mt-4 pt-3 border-t border-[#EEF2EE] text-[11px] text-[#2E7D5B] font-semibold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Site Meter & Utility Logging</span>
                </div>
              </div>

              {/* 02 VALIDATE */}
              <div className="corp-card hover:border-[#1F6F50] transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#EDF4EF] text-[#12372A] font-bold text-sm flex items-center justify-center mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-[#12372A] mb-1">VALIDATE</h3>
                <p className="text-xs text-[#68716C] leading-relaxed">
                  Identify missing, inconsistent and unusual data through automated statistical outlier checks.
                </p>
                <div className="mt-4 pt-3 border-t border-[#EEF2EE] text-[11px] text-[#2E7D5B] font-semibold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Threshold Anomaly Alerts</span>
                </div>
              </div>

              {/* 03 VERIFY */}
              <div className="corp-card hover:border-[#1F6F50] transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#EDF4EF] text-[#12372A] font-bold text-sm flex items-center justify-center mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-[#12372A] mb-1">VERIFY</h3>
                <p className="text-xs text-[#68716C] leading-relaxed">
                  Connect every important value with supporting primary evidence, invoices, and calibration certificates.
                </p>
                <div className="mt-4 pt-3 border-t border-[#EEF2EE] text-[11px] text-[#2E7D5B] font-semibold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>OCR Invoices & Evidence Vault</span>
                </div>
              </div>

              {/* 04 REPORT */}
              <div className="corp-card hover:border-[#1F6F50] transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#EDF4EF] text-[#12372A] font-bold text-sm flex items-center justify-center mb-4">
                  04
                </div>
                <h3 className="text-base font-bold text-[#12372A] mb-1">REPORT</h3>
                <p className="text-xs text-[#68716C] leading-relaxed">
                  Consolidate data into BRSR and management reporting with complete ISAE 3000 assurance readiness.
                </p>
                <div className="mt-4 pt-3 border-t border-[#EEF2EE] text-[11px] text-[#2E7D5B] font-semibold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>SEBI Core & Board Formats</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Built for Enterprise ESG (3 Pillars) */}
        <section id="platform-overview" className="py-20 bg-[#F7F7F3] border-b border-[#DDE3DE]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="text-xs font-bold tracking-wider text-[#2E7D5B] uppercase mb-2">
                COMPREHENSIVE GOVERNANCE
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#12372A]">
                Built for Enterprise ESG
              </h2>
              <p className="text-sm text-[#68716C] mt-3">
                Tailored for heavy infrastructure, energy, hydro, tunneling, and engineering operations.
              </p>
            </div>

            {/* 3 Large Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* ENVIRONMENT */}
              <div className="corp-card p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#EDF4EF] flex items-center justify-center mb-5 text-[#2E7D5B]">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#12372A] mb-2">ENVIRONMENT</h3>
                  <p className="text-xs text-[#68716C] leading-relaxed mb-6">
                    Full accounting of direct and indirect environmental impact across nationwide project sites.
                  </p>

                  <div className="space-y-2.5">
                    {[
                      { name: 'Energy', detail: 'Grid power, diesel generators & captive solar' },
                      { name: 'Emissions', detail: 'GHG Scope 1, Scope 2, and value chain Scope 3' },
                      { name: 'Water', detail: 'Withdrawal, consumption & recycled discharge' },
                      { name: 'Waste', detail: 'Hazardous, non-hazardous & muck recycling' },
                      { name: 'Biodiversity', detail: 'EIA compliance, tree plantation & restoration' },
                    ].map((item) => (
                      <div key={item.name} className="p-2.5 rounded-md bg-[#F7F7F3] border border-[#DDE3DE]">
                        <div className="text-xs font-bold text-[#12372A]">{item.name}</div>
                        <div className="text-[11px] text-[#68716C]">{item.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DDE3DE] flex items-center justify-between text-xs">
                  <span className="text-[#68716C]">BRSR Core Indicators</span>
                  <span className="font-bold text-[#2E7D5B]">6 Mandatory KPIs</span>
                </div>
              </div>

              {/* SOCIAL */}
              <div className="corp-card p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#EDF4EF] flex items-center justify-center mb-5 text-[#1F6F50]">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#12372A] mb-2">SOCIAL</h3>
                  <p className="text-xs text-[#68716C] leading-relaxed mb-6">
                    Occupational health, workforce safety, statutory wages, and community impact.
                  </p>

                  <div className="space-y-2.5">
                    {[
                      { name: 'Workforce', detail: '48,200+ employees & contractual personnel' },
                      { name: 'Health & Safety', detail: 'LTIFR tracking, incident logbooks & zero fatality target' },
                      { name: 'Human Rights', detail: 'Child & forced labor zero tolerance verification' },
                      { name: 'Community', detail: 'CSR projects, water treatment plants & local hiring' },
                      { name: 'Training', detail: 'Safety induction, technical upskilling & POSH workshops' },
                    ].map((item) => (
                      <div key={item.name} className="p-2.5 rounded-md bg-[#F7F7F3] border border-[#DDE3DE]">
                        <div className="text-xs font-bold text-[#12372A]">{item.name}</div>
                        <div className="text-[11px] text-[#68716C]">{item.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DDE3DE] flex items-center justify-between text-xs">
                  <span className="text-[#68716C]">Safety Standard</span>
                  <span className="font-bold text-[#1F6F50]">ISO 45001 Certified</span>
                </div>
              </div>

              {/* GOVERNANCE */}
              <div className="corp-card p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#EDF4EF] flex items-center justify-center mb-5 text-[#12372A]">
                    <Scale className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#12372A] mb-2">GOVERNANCE</h3>
                  <p className="text-xs text-[#68716C] leading-relaxed mb-6">
                    Board oversight, anti-corruption policies, vendor code of conduct, and internal controls.
                  </p>

                  <div className="space-y-2.5">
                    {[
                      { name: 'Ethics', detail: '100% executive anti-corruption certification' },
                      { name: 'Compliance', detail: 'SEBI, PCB, MoEFCC & statutory filings' },
                      { name: 'Risk', detail: 'Climate physical & transition risk matrix' },
                      { name: 'Board Governance', detail: 'ESG Committee oversight & charter compliance' },
                      { name: 'Whistleblower', detail: 'Confidential reporting mechanism & vigil officer' },
                    ].map((item) => (
                      <div key={item.name} className="p-2.5 rounded-md bg-[#F7F7F3] border border-[#DDE3DE]">
                        <div className="text-xs font-bold text-[#12372A]">{item.name}</div>
                        <div className="text-[11px] text-[#68716C]">{item.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DDE3DE] flex items-center justify-between text-xs">
                  <span className="text-[#68716C]">Assurance Readiness</span>
                  <span className="font-bold text-[#12372A]">Clean Audit Opinion</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-16 bg-[#12372A] text-white">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <div className="text-xs font-semibold text-[#C5A35A] uppercase tracking-wider">
                AUTHORIZED CORPORATE ACCESS
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Access the MEIL ESG360 Workspace
              </h2>
              <p className="text-xs text-[#DDE3DE] max-w-xl">
                Log in with your enterprise credentials to manage tasks, verify evidence, review project submissions, and compile BRSR reports.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onAccessPlatform}
                className="btn-primary bg-[#C5A35A] hover:bg-[#B8872F] text-[#12372A] font-bold px-6 py-3 text-sm border-none shadow-md"
              >
                <span>Access ESG360</span>
                <ArrowRight className="w-4 h-4 text-[#12372A]" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Official Footer */}
      <footer className="bg-white border-t border-[#DDE3DE] py-10 text-xs text-[#68716C]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded bg-[#12372A] text-white flex items-center justify-center font-bold text-xs">
              M
            </div>
            <div>
              <span className="font-bold text-[#12372A]">MEGHA ENGINEERING & INFRASTRUCTURES LIMITED</span>
              <p className="text-[11px] text-[#68716C]">S-2, Technocrat Industrial Estate, Balanagar, Hyderabad, Telangana 500037</p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <div>MEIL ESG360 Enterprise ESG & BRSR Reporting Platform</div>
            <div className="text-[11px] text-[#C5A35A] font-semibold mt-0.5">
              Demo Environment — Sample Data
            </div>
          </div>
        </div>
      </footer>

      {/* Contextual Modal for Framework / About */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-[#DDE3DE] rounded-xl max-w-xl w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DE]">
              <h3 className="text-base font-bold text-[#12372A]">
                {activeModal === 'framework'
                  ? 'SEBI BRSR & ESG Framework'
                  : activeModal === 'about'
                  ? 'About MEIL ESG360'
                  : 'Platform Security & Assurance'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-[#68716C] hover:text-[#12372A] text-sm p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 text-xs text-[#202522] space-y-3 leading-relaxed">
              <p>
                <strong>MEIL ESG360</strong> connects project-level ESG data, evidence, validation, and reporting into one trusted enterprise platform.
              </p>
              <p>
                Structured around the 9 National Guidelines on Responsible Business Conduct (NGRBC) principles mandated by SEBI for top 1,000 listed entities.
              </p>
              <div className="p-3 bg-[#EDF4EF] rounded-lg border border-[#DDE3DE] text-[#12372A] font-medium">
                Designed for Corporate Management, ESG Directorate, Project Managers, Site Coordinators, and Independent Assurance Auditors.
              </div>
            </div>

            <div className="pt-3 border-t border-[#DDE3DE] flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="btn-secondary text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
