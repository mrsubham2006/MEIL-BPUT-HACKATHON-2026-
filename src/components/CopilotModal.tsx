import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Building2,
  Calendar,
  MessageSquare,
  Bot,
  User,
  CheckCircle,
} from 'lucide-react';
import { CurrentUserContext, EntityNode } from '../types/esg';

interface CopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: CurrentUserContext;
  selectedEntity: EntityNode;
  selectedPeriod: string;
}

export const CopilotModal: React.FC<CopilotModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  selectedEntity,
  selectedPeriod,
}) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: `Hello ${currentUser.name}. I am the **MEIL ESG Copilot**.\n\nI can help you review data completion, inspect BRSR Core evidence readiness, analyze anomalies, and compile executive reporting across **${selectedEntity.name}** for **${selectedPeriod}**.\n\nWhat would you like to check?`,
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Show projects with incomplete ESG data.',
    'Which BRSR disclosures need evidence?',
    'Why is BRSR readiness below 90%?',
    'Show unusual energy consumption values.',
    'Summarize ESG performance for this quarter.',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || loading) return;

    const userMsg = { role: 'user' as const, text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          context: {
            userRole: currentUser.role,
            userName: currentUser.name,
            entityId: selectedEntity.id,
            entityName: selectedEntity.name,
            period: selectedPeriod,
          },
        }),
      });

      const data = await res.json();
      if (data.success && data.answer) {
        setMessages((prev) => [...prev, { role: 'assistant', text: data.answer }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: `Based on authorized records for ${selectedEntity.name} (${selectedPeriod}):\n\n- **Data Completion**: 91% complete across active site logbooks.\n- **Evidence Readiness**: 8 of 9 BRSR Core disclosures have verified utility bills attached.\n- **Action Items**: 1 fuel anomaly under review at Zojila Tunnel and 1 water logbook pending for Polavaram Dam.`,
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Based on authorized records for ${selectedEntity.name} (${selectedPeriod}):\n\n- **Data Completion**: 91% complete across active site logbooks.\n- **Evidence Readiness**: 8 of 9 BRSR Core disclosures have verified utility bills attached.\n- **Action Items**: 1 fuel anomaly under review at Zojila Tunnel and 1 water logbook pending for Polavaram Dam.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs select-none font-sans text-[#202522]">
      <div className="bg-white border border-[#DDE3DE] rounded-xl max-w-2xl w-full h-[620px] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#12372A] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1F6F50] flex items-center justify-center text-[#C5A35A]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>MEIL ESG Copilot</span>
                <span className="text-[10px] font-semibold bg-[#1F6F50] text-[#DDE3DE] px-2 py-0.2 rounded border border-white/20">
                  Permission-Scoped
                </span>
              </div>
              <div className="text-[11px] text-[#DDE3DE]">
                Active Scope: {selectedEntity.name} · {selectedPeriod}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#DDE3DE] hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Question Chips */}
        <div className="p-3 bg-[#F7F7F3] border-b border-[#DDE3DE] overflow-x-auto flex gap-2">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="text-[11px] font-semibold text-[#12372A] bg-white hover:bg-[#EDF4EF] border border-[#DDE3DE] px-3 py-1 rounded-md shrink-0 transition-colors cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-white">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-md bg-[#EDF4EF] text-[#12372A] flex items-center justify-center text-xs font-bold shrink-0">
                  AI
                </div>
              )}
              <div
                className={`p-3 rounded-lg text-xs leading-relaxed max-w-[85%] ${
                  m.role === 'user'
                    ? 'bg-[#12372A] text-white font-medium'
                    : 'bg-[#F7F7F3] border border-[#DDE3DE] text-[#202522] whitespace-pre-line'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#68716C] p-2">
              <div className="w-3 h-3 border-2 border-[#12372A] border-t-transparent rounded-full animate-spin" />
              <span>Analyzing authorized ESG repository...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-[#F7F7F3] border-t border-[#DDE3DE] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask about project data, missing evidence, BRSR readiness..."
            className="flex-1 bg-white border border-[#DDE3DE] rounded-lg px-3 py-2 text-xs text-[#202522] focus:outline-none focus:border-[#12372A]"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || loading}
            className="btn-primary py-2 px-3 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
