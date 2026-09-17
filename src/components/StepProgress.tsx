import type { FC } from 'react';
import { User, Dumbbell, Calendar, HeartHandshake } from 'lucide-react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  onSelectStep: (step: number) => void;
}

export const StepProgress: FC<StepProgressProps> = ({
  currentStep,
  totalSteps,
  onSelectStep,
}) => {
  const steps = [
    { title: '인적사항', icon: User, emoji: '👤' },
    { title: '운동 성향', icon: Dumbbell, emoji: '🏸' },
    { title: '일정/기대', icon: Calendar, emoji: '🗓️' },
    { title: '자기소개', icon: HeartHandshake, emoji: '💌' },
  ];

  const progressPercent = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto pt-2 pb-4">
      <div className="flex items-center justify-between text-xs font-bold mb-2">
        <span className="text-[#0d3278] tracking-wide">
          지원서 단계 <span className="text-[#74c407]">Step {currentStep}</span> / {totalSteps}
        </span>
        <span className="text-slate-500">{progressPercent}% 완료</span>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden mb-4 p-0.5 border border-slate-200">
        <div
          className="h-full bg-gradient-to-r from-[#74c407] to-[#88d900] rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${Math.max(progressPercent, 10)}%` }}
        />
      </div>

      {/* Interactive Step Chips */}
      <div className="grid grid-cols-4 gap-2">
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isActive = currentStep === stepNum;
          const isDone = currentStep > stepNum;

          return (
            <button
              key={step.title}
              type="button"
              onClick={() => onSelectStep(stepNum)}
              className={`flex items-center justify-center sm:justify-start gap-2 py-2.5 px-3 rounded-2xl border-2 transition-all text-left ${
                isActive
                  ? 'bg-white border-[#74c407] text-[#0d3278] shadow-md shadow-lime-500/15 ring-2 ring-lime-400/20'
                  : isDone
                  ? 'bg-lime-50/70 border-lime-200 text-slate-700 hover:bg-lime-100/50'
                  : 'bg-white/60 border-slate-200 text-slate-400 hover:text-slate-600'
              }`}
            >
              <span className="text-base shrink-0">{step.emoji}</span>
              <span className="hidden sm:block text-xs font-bold truncate">
                {step.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
