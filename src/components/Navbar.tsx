import type { FC } from 'react';
import { RotateCcw, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  onReset: () => void;
  isAutoSaved: boolean;
  activeTab: 'photos' | 'apply';
  onTabChange: (tab: 'photos' | 'apply') => void;
}

export const Navbar: FC<NavbarProps> = ({ onReset, isAutoSaved, activeTab, onTabChange }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-court-border bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onTabChange('apply')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#74c407] to-[#99ea11] flex items-center justify-center text-xl shadow-md shadow-lime-500/25 border-2 border-white">
            🏸
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black tracking-tight text-[#0d3278] text-lg leading-none">
                네트워크
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#74c407]/15 text-[#457a03] border border-[#74c407]/30 rounded-full">
                3기 모집중
              </span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
              배드민턴 · 탁구 · 족구 크루
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {isAutoSaved && activeTab === 'apply' && (
            <span className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full animate-fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>작성중 저장됨</span>
            </span>
          )}
          {activeTab === 'apply' && (
            <button
              onClick={onReset}
              title="폼 내용 초기화"
              className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 border border-transparent transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">새로작성</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
