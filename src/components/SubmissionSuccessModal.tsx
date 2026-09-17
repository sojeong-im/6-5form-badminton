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
    // Fire festive confetti
    const count = 250;
    const defaults = {
      origin: { y: 0.6 },
      colors: ['#74c407', '#88d900', '#0d3278', '#ffcc00', '#ff5722']
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white border-2 border-court-border w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Top green aura */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-lime-200/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        {/* Icon & Title */}
        <div className="text-center space-y-3 mb-6 relative">
          <div className="inline-flex p-4 rounded-3xl bg-gradient-to-tr from-[#74c407] to-[#88d900] text-[#081d47] shadow-lg shadow-lime-500/30 border-2 border-white">
            <Trophy className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-black text-[#0d3278] tracking-tight">
            지원서 접수가 완료되었습니다! 🎉
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            네트워크 3기에 지원해 주셔서 감사합니다.<br />
            서류 검토 후 작성해주신 번호로 순차적으로 연락드릴게요!
          </p>
        </div>

        {/* Digital Receipt Card */}
        <div className="bg-lime-50/70 border-2 border-lime-200/80 rounded-2xl p-5 mb-6 text-xs space-y-3 relative">
          <div className="flex items-center justify-between border-b border-lime-200 pb-3">
            <span className="font-bold flex items-center gap-1.5 text-[#0d3278]">
              <Sparkles className="w-4 h-4 text-[#74c407]" />
              네트워크 3기 디지털 지원증
            </span>
            <span className="font-mono font-bold text-slate-500">{receiptNumber}</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between py-1 text-slate-700">
              <span className="text-slate-500 font-medium">지원자</span>
              <span className="font-bold text-slate-900">{data.name} ({data.gender}/{data.age}세)</span>
            </div>
            <div className="flex justify-between py-1 text-slate-700">
              <span className="text-slate-500 font-medium">소속</span>
              <span className="font-bold text-slate-900">{data.university} {data.major} ({data.academicStatus})</span>
            </div>
            <div className="flex justify-between py-1 text-slate-700">
              <span className="text-slate-500 font-medium">연락처</span>
              <span className="font-mono font-bold text-slate-900">{data.phone}</span>
            </div>
            <div className="flex justify-between py-1 text-slate-700">
              <span className="text-slate-500 font-medium">관심 종목</span>
              <span className="text-[#457a03] font-bold">{data.sports.join(', ') || '전 종목'}</span>
            </div>
            <div className="flex justify-between py-1 text-slate-700">
              <span className="text-slate-500 font-medium">참여 요일</span>
              <span className="font-bold text-slate-900">{data.availableDays.join(', ')}</span>
            </div>
            <div className="flex justify-between py-1 text-slate-700 border-t border-lime-200 pt-2">
              <span className="text-slate-500 font-medium">접수 일시</span>
              <span className="text-slate-500">{submitDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            새 지원서 작성
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-[#0d3278] hover:bg-[#081d47] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4" />
            지원증 보관 (인쇄)
          </button>
        </div>
      </div>
    </div>
  );
};
