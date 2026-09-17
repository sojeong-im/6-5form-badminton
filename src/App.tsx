import { useState, useEffect } from 'react';
import { type FormData, INITIAL_DATA } from './types';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { StepProgress } from './components/StepProgress';
import { Step1BasicInfo } from './components/Step1BasicInfo';
import { Step2SportsProfile } from './components/Step2SportsProfile';
import { Step3ScheduleExpectations } from './components/Step3ScheduleExpectations';
import { Step4SelfIntro } from './components/Step4SelfIntro';
import { ActivityGallery } from './components/ActivityGallery';
import { SubmissionSuccessModal } from './components/SubmissionSuccessModal';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

const STORAGE_KEY = 'NETWORK_FORM_DRAFT_V1';

export function App() {
  const [activeTab, setActiveTab] = useState<'photos' | 'apply'>('apply');
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
    if (window.confirm('작성 중인 지원서 내용을 초기화하시겠습니까?')) {
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
        window.scrollTo({ top: 350, behavior: 'smooth' });
      }
    }
  };

  const handlePrev = () => {
    setValidationError(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  const handleSelectStep = (step: number) => {
    if (step < currentStep) {
      setValidationError(null);
      setCurrentStep(step);
      window.scrollTo({ top: 350, behavior: 'smooth' });
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
    }, 700);
  };

  return (
    <div className="court-bg min-h-screen text-slate-800 flex flex-col selection:bg-[#74c407] selection:text-[#081d47]">
      {/* Top Navbar */}
      <Navbar
        onReset={handleReset}
        isAutoSaved={isAutoSaved}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 pb-24">
        {/* Poster & Mascot Hero Showcase */}
        <HeroBanner
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab 1: 활동 사진 갤러리 */}
        {activeTab === 'photos' && (
          <ActivityGallery
            onGoToApply={() => {
              setActiveTab('apply');
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
          />
        )}

        {/* Tab 2: 지원하기 폼 */}
        {activeTab === 'apply' && (
          <div className="space-y-4">
            {/* Step Progress Tracker */}
            <StepProgress
              currentStep={currentStep}
              totalSteps={4}
              onSelectStep={handleSelectStep}
            />

            {/* Validation Error Alert */}
            {validationError && (
              <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-2xl text-rose-700 text-xs sm:text-sm font-bold flex items-center gap-2 animate-bounce-subtle">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Step Content */}
            <div>
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
              <div className="pt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className={`px-5 py-3.5 rounded-2xl border-2 font-bold text-sm flex items-center gap-2 transition cursor-pointer ${
                    currentStep === 1
                      ? 'opacity-0 pointer-events-none'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 stroke-[3]" />
                  <span>이전 단계</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3.5 rounded-2xl bg-[#0d3278] hover:bg-[#081d47] text-white font-black text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all cursor-pointer border-2 border-white/20"
                >
                  <span>다음 단계로</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            )}
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
