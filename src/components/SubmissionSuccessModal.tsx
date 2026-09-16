import { useEffect, type FC } from 'react';
import type { FormData } from '../types';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, Download, RefreshCw } from 'lucide-react';

interface SuccessModalProps {
  data: FormData;
  onReset: () => void;
}

export const SubmissionSuccessModal: FC<SuccessModalProps> = ({ data, onReset }) => {
  useEffect(() => {
    // Fire confetti
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#a3e635', '#22c55e', '#38bdf8', '#fbbf24', '#ffffff']
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  const receiptNumber = `NET3-${Math.floor(100000 + Math.random() * 900000)}`;
  const submitDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-lime-400/40 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(163,230,53,0.15)] relative overflow-hidden">
        {/* Glowing aura */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        {/* Icon & Title */}
        <div className="text-center space-y-3 mb-6 relative">
          <div className="inline-flex p-3.5 rounded-2xl bg-gradient-to-tr from-lime-400 to-emerald-400 text-slate-950 shadow-lg shadow-lime-400/30">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            지원서 접수가 완료되었습니다! 🎉
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            네트워크 3기에 관심 가져주셔서 진심으로 감사드립니다.<br />
            서류 검토 후 입력해주신 번호로 순차적으로 연락드리겠습니다.
          </p>
        </div>

        {/* Digital Receipt Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 mb-6 font-mono text-xs space-y-3 relative">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <span className="text-slate-400 font-sans font-bold flex items-center gap-1.5 text-lime-400">
              <Sparkles className="w-3.5 h-3.5" />
              네트워크 3기 디지털 지원증
            </span>
            <span className="text-slate-400">{receiptNumber}</span>
          </div>

          <div className="space-y-2 font-sans">
            <div className="flex justify-between py-1 text-slate-300">
              <span className="text-slate-500">지원자</span>
              <span className="font-semibold">{data.name} ({data.gender}/{data.age}세)</span>
            </div>
            <div className="flex justify-between py-1 text-slate-300">
              <span className="text-slate-500">소속</span>
              <span>{data.university} {data.major} ({data.academicStatus})</span>
            </div>
            <div className="flex justify-between py-1 text-slate-300">
              <span className="text-slate-500">연락처</span>
              <span>{data.phone}</span>
            </div>
            <div className="flex justify-between py-1 text-slate-300">
              <span className="text-slate-500">관심 종목</span>
              <span className="text-lime-400 font-semibold">{data.sports.join(', ') || '전 종목'}</span>
            </div>
            <div className="flex justify-between py-1 text-slate-300">
              <span className="text-slate-500">참여 요일</span>
              <span>{data.availableDays.join(', ')}</span>
            </div>
            <div className="flex justify-between py-1 text-slate-300 border-t border-slate-800/60 pt-2">
              <span className="text-slate-500">접수 일시</span>
              <span className="text-slate-400">{submitDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition"
          >
            <RefreshCw className="w-4 h-4" />
            새 지원서 작성
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex-1 py-3 px-4 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            지원증 보관 (인쇄)
          </button>
        </div>
      </div>
    </div>
  );
};
