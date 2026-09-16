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
    { title: '인적사항', icon: User },
    { title: '운동 성향', icon: Dumbbell },
    { title: '일정/기대', icon: Calendar },
    { title: '자기소개', icon: HeartHandshake },
  ];

  const progressPercent = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-2">
      <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-2">
        <span className="text-lime-400 font-semibold tracking-wide uppercase">
          Step 0{currentStep} / 0{totalSteps}
        </span>
        <span>진행률 {progressPercent}%</span>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 via-lime-400 to-lime-300 rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(163,230,53,0.5)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Interactive Step Chips */}
      <div className="grid grid-cols-4 gap-2">
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isActive = currentStep === stepNum;
          const isDone = currentStep > stepNum;
          const Icon = step.icon;

          return (
            <button
              key={step.title}
              type="button"
              onClick={() => onSelectStep(stepNum)}
              className={`flex items-center justify-center sm:justify-start gap-2 py-2 px-2.5 rounded-xl border transition-all text-left ${
                isActive
                  ? 'bg-lime-400/10 border-lime-400/50 text-lime-400 shadow-sm'
                  : isDone
                  ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  : 'bg-slate-900/30 border-slate-900 text-slate-500 hover:text-slate-400'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  isActive
                    ? 'bg-lime-400 text-slate-950 shadow-md shadow-lime-400/30'
                    : isDone
                    ? 'bg-slate-800 text-slate-300'
                    : 'bg-slate-800/50 text-slate-500'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="hidden sm:block text-xs font-semibold truncate">
                {step.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
