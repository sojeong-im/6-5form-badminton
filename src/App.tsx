import { useState, useEffect } from 'react';
import { type FormData, INITIAL_DATA } from './types';
import { HomeScreen } from './components/HomeScreen';
import { ApplyScreen } from './components/ApplyScreen';
import { PhotosScreen } from './components/PhotosScreen';
import { AdminScreen } from './components/AdminScreen';
import { SubmissionSuccessModal } from './components/SubmissionSuccessModal';
import { submitApplication } from './firebase';

const STORAGE_KEY = 'NETWORK_FORM_DRAFT_V2';

type ViewMode = 'home' | 'apply' | 'photos' | 'admin';

export function App() {
  const [view, setView] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#admin' || window.location.search.includes('admin')) {
        return 'admin';
      }
    }
    return 'home';
  });

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

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setView('admin');
      } else if (window.location.hash === '#apply') {
        setView('apply');
      } else if (window.location.hash === '#photos') {
        setView('photos');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
    const rawPhone = (formData.phone || '').replace(/[^0-9]/g, '');

    if (!formData.name.trim()) {
      setValidationError('이름을 입력해 주세요.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return false;
    }
    if (!formData.gender) {
      setValidationError('성별(남/여)을 선택해 주세요.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return false;
    }
    if (!formData.age.trim()) {
      setValidationError('나이를 입력해 주세요.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return false;
    }
    if (!formData.university.trim()) {
      setValidationError('학교명을 입력해 주세요.');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return false;
    }
    if (!formData.major.trim()) {
      setValidationError('전공/학과를 입력해 주세요.');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return false;
    }
    if (!formData.residence.trim()) {
      setValidationError('거주 지역을 입력해 주세요.');
      window.scrollTo({ top: 220, behavior: 'smooth' });
      return false;
    }
    if (!rawPhone || rawPhone.length < 10) {
      setValidationError('연락처(전화번호 10~11자리)를 올바르게 입력해 주세요.');
      window.scrollTo({ top: 220, behavior: 'smooth' });
      return false;
    }
    if (formData.sports.length === 0) {
      setValidationError('희망 종목을 최소 1개 이상 선택해 주세요.');
      window.scrollTo({ top: 350, behavior: 'smooth' });
      return false;
    }
    if (!formData.exerciseFrequency) {
      setValidationError('평소 운동 빈도를 선택해 주세요.');
      window.scrollTo({ top: 480, behavior: 'smooth' });
      return false;
    }
    if (formData.availableDays.length === 0) {
      setValidationError('참여 가능한 요일을 최소 1개 이상 선택해 주세요.');
      window.scrollTo({ top: 600, behavior: 'smooth' });
      return false;
    }
    if (formData.availableTimes.length === 0) {
      setValidationError('참여 가능한 시간대를 최소 1개 이상 선택해 주세요.');
      window.scrollTo({ top: 650, behavior: 'smooth' });
      return false;
    }
    if (formData.expectations.length === 0) {
      setValidationError('기대하는 점을 최소 1개 이상 선택해 주세요.');
      window.scrollTo({ top: 750, behavior: 'smooth' });
      return false;
    }
    if (!formData.introduction.trim()) {
      setValidationError('간단한 소개나 한마디를 적어주세요.');
      window.scrollTo({ top: 850, behavior: 'smooth' });
      return false;
    }

    setValidationError(null);
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setValidationError(null);

    // Timeout protection (10 seconds)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('네트워크 응답 시간이 초과되었습니다.')), 10000)
    );

    try {
      await Promise.race([submitApplication(formData), timeoutPromise]);
      setIsSubmitted(true);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
    } catch (error: any) {
      console.error('제출 중 오류:', error);
      const errMsg =
        error?.code === 'permission-denied'
          ? '파이어베이스 데이터베이스 권한 오류가 발생했습니다. (Firestore 보안 규칙을 확인해주세요)'
          : error?.message || '제출 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
      setValidationError(errMsg);
      alert(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleReset = () => {
    setFormData(INITIAL_DATA);
    setIsSubmitted(false);
    setView('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex flex-col antialiased">
      {/* View 1: Home (Poster + 2 Buttons) */}
      {view === 'home' && (
        <HomeScreen
          onGoToApply={() => {
            setView('apply');
            window.location.hash = 'apply';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onGoToPhotos={() => {
            setView('photos');
            window.location.hash = 'photos';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onGoToAdmin={() => {
            setView('admin');
            window.location.hash = 'admin';
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
            window.location.hash = '';
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
            window.location.hash = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onGoToApply={() => {
            setView('apply');
            window.location.hash = 'apply';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* View 4: Admin Screen */}
      {view === 'admin' && (
        <AdminScreen
          onBackToHome={() => {
            setView('home');
            window.location.hash = '';
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

