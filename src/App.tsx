import { useState, useEffect } from 'react';
import { type FormData, INITIAL_DATA } from './types';
import { HomeScreen } from './components/HomeScreen';
import { ApplyScreen } from './components/ApplyScreen';
import { PhotosScreen } from './components/PhotosScreen';
import { SubmissionSuccessModal } from './components/SubmissionSuccessModal';

const STORAGE_KEY = 'NETWORK_FORM_DRAFT_V2';

export function App() {
  const [view, setView] = useState<'home' | 'apply' | 'photos'>('home');
  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DATA;
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto save
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {
      console.error(e);
    }
  }, [formData]);

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setValidationError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setValidationError('1. 이름을 입력해주세요.');
      return false;
    }
    if (!formData.gender) {
      setValidationError('1. 성별을 선택해주세요.');
      return false;
    }
    if (!formData.age.trim()) {
      setValidationError('1. 나이를 입력해주세요.');
      return false;
    }
    if (!formData.university.trim()) {
      setValidationError('2. 학교명을 입력해주세요.');
      return false;
    }
    if (!formData.major.trim()) {
      setValidationError('2. 전공을 입력해주세요.');
      return false;
    }
    if (!formData.residence.trim()) {
      setValidationError('3. 거주 지역을 입력해주세요.');
      return false;
    }
    if (!formData.phone.trim() || formData.phone.length < 11) {
      setValidationError('4. 올바른 연락처(전화번호)를 입력해주세요.');
      return false;
    }
    if (formData.sports.length === 0) {
      setValidationError('5. 관심 있는 종목을 최소 1개 이상 선택해주세요.');
      return false;
    }
    if (!formData.exerciseFrequency) {
      setValidationError('6. 평소 운동 빈도를 선택해주세요.');
      return false;
    }
    if (formData.availableDays.length === 0) {
      setValidationError('8. 참여 가능한 요일을 최소 1개 이상 선택해주세요.');
      return false;
    }
    if (formData.availableTimes.length === 0) {
      setValidationError('8. 참여 가능한 시간대를 최소 1개 이상 선택해주세요.');
      return false;
    }
    if (formData.expectations.length === 0) {
      setValidationError('9. 기대하는 것을 최소 1개 이상 선택해주세요.');
      return false;
    }
    if (!formData.introduction.trim() || formData.introduction.trim().length < 5) {
      setValidationError('10. 본인 소개를 간단히 적어주세요.');
      return false;
    }

    setValidationError(null);
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
    }, 600);
  };

  const handleReset = () => {
    setFormData(INITIAL_DATA);
    setIsSubmitted(false);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex flex-col antialiased">
      {/* View 1: Home (Poster + 2 Buttons) */}
      {view === 'home' && (
        <HomeScreen
          onGoToApply={() => {
            setView('apply');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onGoToPhotos={() => {
            setView('photos');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* View 2: Apply Screen */}
      {view === 'apply' && (
        <ApplyScreen
          data={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onBackToHome={() => {
            setView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isSubmitting={isSubmitting}
          validationError={validationError}
        />
      )}

      {/* View 3: Photos Screen */}
      {view === 'photos' && (
        <PhotosScreen
          onBackToHome={() => {
            setView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onGoToApply={() => {
            setView('apply');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Success Modal */}
      {isSubmitted && (
        <SubmissionSuccessModal
          data={formData}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;
