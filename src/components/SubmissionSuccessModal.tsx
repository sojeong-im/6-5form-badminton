import { type FC } from 'react';
import type { FormData } from '../types';
import { CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

interface SuccessModalProps {
  data: FormData;
  onReset: () => void;
}

export const SubmissionSuccessModal: FC<SuccessModalProps> = ({ data, onReset }) => {
  const receiptNumber = `NET3-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-sky-100 text-center">
        {/* Top Graphic Icon */}
        <div className="inline-flex p-3.5 rounded-full bg-emerald-100 text-emerald-600 mb-3 shadow-sm animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-[11px] font-bold border border-sky-100 mb-2">
          <Sparkles className="w-3 h-3 text-sky-500" />
          <span>네트워크 3기 지원 접수</span>
        </div>

        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          지원이 완료되었습니다!
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          남겨주신 연락처로 확인 후 빠르게 안내해 드릴게요.
        </p>

        {/* Receipt Info Card */}
        <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-4 text-xs space-y-2 text-left my-5 shadow-xs">
          <div className="flex justify-between text-slate-400 pb-2 border-b border-slate-200 font-mono text-[11px]">
            <span>접수 번호</span>
            <span className="font-bold text-sky-700">{receiptNumber}</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span className="text-slate-400">지원자</span>
            <span className="font-bold text-slate-900">{data.name} ({data.gender} / {data.age}세)</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span className="text-slate-400">소속</span>
            <span className="font-medium">{data.university} {data.major}</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span className="text-slate-400">연락처</span>
            <span className="font-mono text-slate-800">{data.phone}</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span className="text-slate-400">희망 종목</span>
            <span className="font-semibold text-emerald-700">{data.sports.join(', ') || '전체'}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#0284c7] to-[#081d47] hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-sky-900/10"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          처음 화면으로 돌아가기
        </button>
      </div>
    </div>
  );
};

