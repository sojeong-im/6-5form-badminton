import { useState, useEffect } from 'react';
import { type FormData, INITIAL_DATA } from './types';
import { Navbar } from './components/Navbar';
import { StepProgress } from './components/StepProgress';
import { Step1BasicInfo } from './components/Step1BasicInfo';
import { Step2SportsProfile } from './components/Step2SportsProfile';
import { Step3ScheduleExpectations } from './components/Step3ScheduleExpectations';
import { Step4SelfIntro } from './components/Step4SelfIntro';
import { SubmissionSuccessModal } from './components/SubmissionSuccessModal';
import { ChevronLeft, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'NETWORK_FORM_DRAFT_V1';

export function App() {
  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DATA;
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isAutoSaved, setIsAutoSaved] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto save to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      setIsAutoSaved(true);
      const timer = setTimeout(() => setIsAutoSaved(false), 2000);
      return () => clearTimeout(timer);
    } catch (e) {
      console.error(e);
    }
  }, [formData]);

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setValidationError(null);
  };

  const handleReset = () => {
    if (window.confirm('작성 중인 내용을 모두 초기화하시겠습니까?')) {
      localStorage.removeItem(STORAGE_KEY);
      setFormData(INITIAL_DATA);
      setCurrentStep(1);
      setValidationError(null);
      setIsSubmitted(false);
    }
  };

  // Validation per step
  const validateCurrentStep = (step: number): boolean => {
    if (step === 1) {
      if (!formData.name.trim()) {
        setValidationError('이름을 입력해주세요.');
        return false;
      }
      if (!formData.gender) {
        setValidationError('성별을 선택해주세요.');
        return false;
      }
      if (!formData.age.trim()) {
        setValidationError('나이를 입력해주세요.');
        return false;
      }
      if (!formData.university.trim()) {
        setValidationError('학교명을 입력해주세요.');
        return false;
      }
      if (!formData.major.trim()) {
        setValidationError('전공을 입력해주세요.');
        return false;
      }
      if (!formData.residence.trim()) {
        setValidationError('거주 지역을 입력해주세요.');
        return false;
      }
      if (!formData.phone.trim() || formData.phone.length < 11) {
        setValidationError('올바른 연락처(전화번호)를 입력해주세요.');
        return false;
      }
    } else if (step === 2) {
      if (formData.sports.length === 0) {
        setValidationError('관심 있는 종목을 최소 1개 이상 선택해주세요.');
        return false;
      }
      if (!formData.exerciseFrequency) {
        setValidationError('평소 운동 빈도를 선택해주세요.');
        return false;
      }
    } else if (step === 3) {
      if (formData.availableDays.length === 0) {
        setValidationError('참여 가능한 요일을 최소 1개 이상 선택해주세요.');
        return false;
      }
      if (formData.availableTimes.length === 0) {
        setValidationError('참여 가능한 시간대를 최소 1개 이상 선택해주세요.');
        return false;
      }
      if (formData.expectations.length === 0) {
        setValidationError('기대하는 점을 최소 1개 이상 선택해주세요.');
        return false;
      }
    } else if (step === 4) {
      if (!formData.introduction.trim() || formData.introduction.trim().length < 10) {
        setValidationError('본인 소개를 최소 10자 이상 간단히 적어주세요.');
        return false;
      }
    }
    setValidationError(null);
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrev = () => {
    setValidationError(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectStep = (step: number) => {
    // Only allow jumping backwards or next if validated
    if (step < currentStep) {
      setValidationError(null);
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === currentStep + 1) {
      handleNext();
    }
  };

  const handleSubmit = () => {
    if (!validateCurrentStep(4)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-lime-400 selection:text-slate-950 relative overflow-hidden">
      {/* Background Sport Neon Accents */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <Navbar onReset={handleReset} isAutoSaved={isAutoSaved} />

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 pb-24 pt-2">
        {/* Banner Card */}
        <div className="mt-4 mb-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-lime-400/10 text-lime-400 text-xs font-semibold border border-lime-400/20 mb-2">
                <Sparkles className="w-3 h-3" />
                <span>2026 Season 3 Recruit</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                🏸 네트워크 3기 지원 폼
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                운동과 일상의 활력을 함께 채워갈 네트워크 3기 크루원을 기다립니다!
              </p>
            </div>
            <div className="hidden sm:flex text-4xl p-3 bg-slate-800/40 rounded-2xl border border-slate-700/50">
              🏸
            </div>
          </div>
        </div>

        {/* Step Progress Tracker */}
        <StepProgress
          currentStep={currentStep}
          totalSteps={4}
          onSelectStep={handleSelectStep}
        />

        {/* Validation Error Alert */}
        {validationError && (
          <div className="my-4 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs sm:text-sm flex items-center gap-2 animate-bounce-subtle">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Step Content */}
        <div className="mt-4">
          {currentStep === 1 && (
            <Step1BasicInfo data={formData} onChange={handleChange} />
          )}
          {currentStep === 2 && (
            <Step2SportsProfile data={formData} onChange={handleChange} />
          )}
          {currentStep === 3 && (
            <Step3ScheduleExpectations data={formData} onChange={handleChange} />
          )}
          {currentStep === 4 && (
            <Step4SelfIntro
              data={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>

        {/* Navigation Buttons (Bottom Bar for Steps 1~3) */}
        {currentStep < 4 && (
          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`px-4 py-3 rounded-xl border text-sm font-semibold flex items-center gap-2 transition ${
                currentStep === 1
                  ? 'opacity-0 pointer-events-none'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>이전</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-black text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(163,230,53,0.25)] hover:shadow-[0_0_25px_rgba(163,230,53,0.4)] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>다음 단계로</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}
      </main>

      {/* Success Modal */}
      {isSubmitted && (
        <SubmissionSuccessModal
          data={formData}
          onReset={() => {
            setFormData(INITIAL_DATA);
            setCurrentStep(1);
            setIsSubmitted(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
