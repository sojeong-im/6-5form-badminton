import type { FC } from 'react';
import { Activity, RotateCcw, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  onReset: () => void;
  isAutoSaved: boolean;
}

export const Navbar: FC<NavbarProps> = ({ onReset, isAutoSaved }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-lime-400 to-emerald-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-lime-500/20">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-white text-base sm:text-lg">
                NETWORK <span className="text-lime-400 font-bold">3기</span>
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-lime-400/10 text-lime-400 border border-lime-400/30 rounded-full">
                신규 모집
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">스포츠 & 액티비티 네트워크 지원 폼</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAutoSaved && (
            <span className="flex items-center gap-1 text-[12px] text-slate-400 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" />
              <span className="hidden sm:inline">자동 임시저장</span>
            </span>
          )}
          <button
            onClick={onReset}
            title="폼 내용 초기화"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1.5 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">초기화</span>
          </button>
        </div>
      </div>
    </header>
  );
};
