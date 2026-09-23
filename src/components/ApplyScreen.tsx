import { type FC, type ChangeEvent } from 'react';
import type { FormData } from '../types';
import {
  ArrowLeft,
  Check,
  User,
  GraduationCap,
  MapPin,
  Phone,
  Sparkles,
  Calendar,
  Heart,
  MessageSquare,
  Activity,
} from 'lucide-react';

interface ApplyScreenProps {
  data: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  onSubmit: () => void;
  onBackToHome: () => void;
  isSubmitting: boolean;
  validationError: string | null;
}

export const ApplyScreen: FC<ApplyScreenProps> = ({
  data,
  onChange,
  onSubmit,
  onBackToHome,
  isSubmitting,
  validationError,
}) => {
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/[^0-9]/g, '');
    if (raw.length > 11) raw = raw.slice(0, 11);
    let formatted = raw;
    if (raw.length > 3 && raw.length <= 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
    } else if (raw.length > 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7)}`;
    }
    onChange('phone', formatted);
  };

  const days = ['월', '화', '수', '목', '금', '토', '일'];

  const times = [
    { label: '14:00 ~ 16:00', icon: '☀️' },
    { label: '16:00 ~ 18:00', icon: '⛅' },
    { label: '18:00 ~ 20:00', icon: '🌆' },
    { label: '20:00 이후', icon: '🌙' },
  ];

  const sportsList = [
    {
      id: '배드민턴 🏸',
      name: '배드민턴',
      emoji: '🏸',
      bgColor: 'bg-emerald-50 hover:bg-emerald-100/80',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-400/30 bg-emerald-50/90',
      tagColor: 'bg-emerald-500 text-white',
    },
    {
      id: '탁구 🏓',
      name: '탁구',
      emoji: '🏓',
      bgColor: 'bg-rose-50 hover:bg-rose-100/80',
      activeBorder: 'border-rose-500 ring-2 ring-rose-400/30 bg-rose-50/90',
      tagColor: 'bg-rose-500 text-white',
    },
    {
      id: '족구 ⚽️',
      name: '족구',
      emoji: '⚽',
      bgColor: 'bg-sky-50 hover:bg-sky-100/80',
      activeBorder: 'border-sky-500 ring-2 ring-sky-400/30 bg-sky-50/90',
      tagColor: 'bg-sky-500 text-white',
    },
    {
      id: '종목 상관없이 다양하게 해보고 싶어요',
      name: '모든 종목 다양하게',
      emoji: '✨',
      bgColor: 'bg-amber-50 hover:bg-amber-100/80',
      activeBorder: 'border-amber-500 ring-2 ring-amber-400/30 bg-amber-50/90',
      tagColor: 'bg-amber-500 text-white',
    },
  ];

  const frequencyOptions = [
    { label: '주 1~2회', icon: '🌿' },
    { label: '주 3회 이상', icon: '🔥' },
    { label: '가끔 하는 편', icon: '🌱' },
    { label: '거의 하지 않음', icon: '💤' },
  ];

  const expectationsList = [
    { label: '꾸준한 운동 습관', emoji: '💪' },
    { label: '다양한 친구 만들기', emoji: '🤝' },
    { label: '새로운 운동 배우기', emoji: '🎯' },
    { label: '스트레스 해소', emoji: '⚡' },
    { label: '즐거운 뒤풀이 & 친목', emoji: '🎉' },
    { label: '새로운 경험하기', emoji: '🚀' },
  ];

  const handleToggleSport = (val: string) => {
    let list = [...data.sports];
    if (val === '종목 상관없이 다양하게 해보고 싶어요') {
      if (list.includes(val)) {
        list = list.filter((s) => s !== val);
      } else {
        list = sportsList.map((s) => s.id);
      }
    } else {
      if (list.includes(val)) {
        list = list.filter((s) => s !== val && s !== '종목 상관없이 다양하게 해보고 싶어요');
      } else {
        list.push(val);
      }
    }
    onChange('sports', list);
  };

  const handleToggleDay = (d: string) => {
    let list = [...data.availableDays];
    if (list.includes(d)) {
      list = list.filter((item) => item !== d);
    } else {
      list.push(d);
    }
    onChange('availableDays', list);
  };

  const handleSelectAllDays = () => {
    if (data.availableDays.length === days.length) {
      onChange('availableDays', []);
    } else {
      onChange('availableDays', [...days]);
    }
  };

  const handleToggleTime = (t: string) => {
    let list = [...data.availableTimes];
    if (list.includes(t)) {
      list = list.filter((item) => item !== t);
    } else {
      list.push(t);
    }
    onChange('availableTimes', list);
  };

  const handleToggleExpectation = (exp: string) => {
    let list = [...data.expectations];
    if (list.includes(exp)) {
      list = list.filter((item) => item !== exp);
    } else {
      list.push(exp);
    }
    onChange('expectations', list);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/80 via-[#f8fafc] to-white py-6 px-4">
      <div className="w-full max-w-lg mx-auto">
        {/* Top Header */}
        <div className="mb-5 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>돌아가기</span>
          </button>
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-[11px] font-bold border border-sky-200/60">
            <Sparkles className="w-3 h-3 text-sky-600" />
            <span>네트워크 3기</span>
          </div>
        </div>

        {/* Title Header Card */}
        <div className="mb-5 p-5 rounded-2xl bg-white border border-sky-100 shadow-sm flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>동아리 지원서</span>
              <span className="text-lg">🏸</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              각 항목을 가볍게 체크해 주세요!
            </p>
          </div>
          <div className="flex -space-x-1 text-base p-2 bg-sky-50 rounded-xl border border-sky-100">
            <span>🏸</span>
            <span>🏓</span>
            <span>⚽</span>
          </div>
        </div>

        {/* Validation Error Alert */}
        {validationError && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-semibold flex items-center gap-2">
            <span className="text-rose-500 text-sm font-bold">!</span>
            <span>{validationError}</span>
          </div>
        )}

        {/* Form Container */}
        <div className="space-y-4">
          {/* Section 1: 기본 정보 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 border-b border-slate-100 pb-2.5">
              <div className="w-5 h-5 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                <User className="w-3 h-3" />
              </div>
              <span>기본 정보</span>
              <span className="text-rose-500">*</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={data.name}
                onChange={(e) => onChange('name', e.target.value)}
                placeholder="이름"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:bg-white transition"
              />

              {/* Gender Pills */}
              <div className="grid grid-cols-2 gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/60">
                {(['남', '여'] as const).map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => onChange('gender', gender)}
                    className={`rounded-lg py-1.5 text-xs font-bold transition cursor-pointer ${
                      data.gender === gender
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>

              <input
                type="number"
                value={data.age}
                onChange={(e) => onChange('age', e.target.value)}
                placeholder="나이 (세)"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Section 2: 학교 / 전공 / 학적 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 border-b border-slate-100 pb-2.5">
              <div className="w-5 h-5 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
              <span>대학 및 학적</span>
              <span className="text-rose-500">*</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={data.university}
                onChange={(e) => onChange('university', e.target.value)}
                placeholder="대학교명"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:bg-white transition"
              />
              <input
                type="text"
                value={data.major}
                onChange={(e) => onChange('major', e.target.value)}
                placeholder="학과/전공"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:bg-white transition"
              />
            </div>

            {/* Status Chips */}
            <div className="grid grid-cols-4 gap-1.5">
              {(['재학', '휴학', '졸업', '기타'] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => onChange('academicStatus', status)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    data.academicStatus === status
                      ? 'bg-[#081d47] border-[#081d47] text-white shadow-xs'
                      : 'bg-slate-50/80 border-slate-200/80 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: 거주지 및 연락처 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 border-b border-slate-100 pb-2.5">
              <div className="w-5 h-5 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <MapPin className="w-3 h-3" />
              </div>
              <span>거주지 & 연락처</span>
              <span className="text-rose-500">*</span>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={data.residence}
                  onChange={(e) => onChange('residence', e.target.value)}
                  placeholder="거주 지역 (예: 서울 관악구, 경기 성남시)"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:bg-white transition"
                />
              </div>

              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  value={data.phone}
                  onChange={handlePhoneChange}
                  placeholder="전화번호 (010-0000-0000)"
                  maxLength={13}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 font-mono focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:bg-white transition"
                />
              </div>
            </div>
          </div>

          {/* Section 4: 희망 종목 (포스터 디자인 매칭 비주얼 카드) */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <div className="w-5 h-5 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <span>희망 종목</span>
                <span className="text-rose-500">*</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">복수 선택</span>
            </div>

            {/* Poster style sport cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sportsList.map((sport) => {
                const isSelected = data.sports.includes(sport.id);
                return (
                  <button
                    key={sport.id}
                    type="button"
                    onClick={() => handleToggleSport(sport.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? sport.activeBorder
                        : `border-slate-200/80 ${sport.bgColor}`
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{sport.emoji}</span>
                      <span className="text-xs font-bold text-slate-800">
                        {sport.name}
                      </span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition ${
                        isSelected
                          ? `${sport.tagColor} shadow-xs`
                          : 'border border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: 운동 빈도 & 종목 경험 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 border-b border-slate-100 pb-2.5">
              <div className="w-5 h-5 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Activity className="w-3.5 h-3.5" />
              </div>
              <span>운동 성향 & 경험</span>
              <span className="text-rose-500">*</span>
            </div>

            {/* Frequency chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {frequencyOptions.map((opt) => {
                const isSelected = data.exerciseFrequency === opt.label;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => onChange('exerciseFrequency', opt.label)}
                    className={`py-2.5 px-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center gap-1 ${
                      isSelected
                        ? 'bg-sky-600 border-sky-600 text-white shadow-xs'
                        : 'bg-slate-50/80 border-slate-200/80 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-base">{opt.icon}</span>
                    <span className="text-[11px] font-bold">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Simple experience input */}
            <input
              type="text"
              value={data.experienceCustomNotes}
              onChange={(e) => onChange('experienceCustomNotes', e.target.value)}
              placeholder="종목별 경험 (예: 배드민턴 조금, 탁구 처음, 족구 가끔)"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:bg-white transition"
            />
          </div>

          {/* Section 6: 가능 요일 & 시간대 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <div className="w-5 h-5 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <span>가능한 일정</span>
                <span className="text-rose-500">*</span>
              </div>
              <button
                type="button"
                onClick={handleSelectAllDays}
                className="text-[11px] font-semibold text-sky-600 hover:text-sky-800 cursor-pointer"
              >
                {data.availableDays.length === days.length ? '선택 해제' : '모든 요일 선택'}
              </button>
            </div>

            {/* Days row */}
            <div className="grid grid-cols-7 gap-1.5">
              {days.map((d) => {
                const isSelected = data.availableDays.includes(d);
                const isWeekend = d === '토' || d === '일';
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => handleToggleDay(d)}
                    className={`py-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#081d47] border-[#081d47] text-white shadow-xs'
                        : isWeekend
                        ? 'bg-rose-50/50 border-rose-200/60 text-rose-600 hover:bg-rose-50'
                        : 'bg-slate-50/80 border-slate-200/80 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>

            {/* Time slots */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {times.map((t) => {
                const isSelected = data.availableTimes.includes(t.label);
                return (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => handleToggleTime(t.label)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50 border-sky-500 text-sky-900 ring-1 ring-sky-400'
                        : 'bg-slate-50/80 border-slate-200/80 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{t.icon}</span>
                      <span className="text-[11px]">{t.label}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-sky-600 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 7: 기대하는 것 (태그 칩 클라우드) */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <div className="w-5 h-5 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5" />
                </div>
                <span>기대하는 점</span>
                <span className="text-rose-500">*</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">복수 선택</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {expectationsList.map((exp) => {
                const isChecked = data.expectations.includes(exp.label);
                return (
                  <button
                    key={exp.label}
                    type="button"
                    onClick={() => handleToggleExpectation(exp.label)}
                    className={`py-2 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                      isChecked
                        ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs'
                        : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700'
                    }`}
                  >
                    <span>{exp.emoji}</span>
                    <span>{exp.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 8: 한마디 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 border-b border-slate-100 pb-2.5">
              <div className="w-5 h-5 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <span>남기고 싶은 한마디</span>
              <span className="text-rose-500">*</span>
            </div>

            <textarea
              rows={3}
              value={data.introduction}
              onChange={(e) => onChange('introduction', e.target.value)}
              placeholder="가벼운 각오나 한마디를 적어주세요 :)"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 focus:bg-white transition leading-relaxed"
            />
          </div>

          {/* Bottom Validation Error Alert */}
          {validationError && (
            <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl text-rose-700 text-xs font-bold flex items-center gap-2.5 shadow-sm animate-bounce">
              <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-extrabold shrink-0">
                !
              </span>
              <span>{validationError}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#081d47] hover:from-[#0369a1] hover:to-[#041434] active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-sky-600/20 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>지원서 저장 중...</span>
                </>
              ) : (
                <span>지원서 제출하기 ✨</span>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
