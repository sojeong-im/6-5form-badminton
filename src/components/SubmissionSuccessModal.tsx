import { type FC } from 'react';
import type { FormData } from '../types';
import { CheckCircle2, RotateCcw } from 'lucide-react';

interface SuccessModalProps {
  data: FormData;
  onReset: () => void;
}

export const SubmissionSuccessModal: FC<SuccessModalProps> = ({ data, onReset }) => {
  const receiptNumber = `NET3-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 sm:p-7 shadow-xl border border-slate-200">
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-600 mb-1">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            지원이 완료되었습니다
          </h2>
          <p className="text-xs text-slate-500">
            작성해주신 연락처로 확인 후 순차적으로 안내드리겠습니다.
          </p>
        </div>

        {/* Receipt Info */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs space-y-2.5 mb-6">
          <div className="flex justify-between text-slate-500 pb-2 border-b border-slate-200 font-mono">
            <span>접수 번호</span>
            <span className="font-semibold text-slate-800">{receiptNumber}</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span className="text-slate-500">이름</span>
            <span className="font-semibold">{data.name} ({data.gender} / {data.age}세)</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span className="text-slate-500">소속</span>
            <span>{data.university} {data.major}</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span className="text-slate-500">연락처</span>
            <span className="font-mono">{data.phone}</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span className="text-slate-500">관심 종목</span>
            <span>{data.sports.join(', ') || '전체'}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          처음 화면으로 돌아가기
        </button>
      </div>
    </div>
  );
};
