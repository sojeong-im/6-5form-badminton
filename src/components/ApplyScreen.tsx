import { type FC, type ChangeEvent } from 'react';
import type { FormData } from '../types';
import { ArrowLeft, Check } from 'lucide-react';

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
  const times = ['14:00~16:00', '16:00~18:00', '18:00~20:00', '20:00 이후'];
  const sportsOptions = ['배드민턴 🏸', '탁구 🏓', '족구 ⚽️', '종목 상관없이 다양하게 해보고 싶어요'];
  const frequencyOptions = ['거의 하지 않는 편', '가끔 하는 편', '주 1~2회 정도', '주 3회 이상'];
  const expectationsOptions = [
    '꾸준히 운동하기',
    '새로운 운동 배워보기',
    '다양한 사람들과 친해지기',
    '학교 밖 새로운 활동 해보기',
    '가볍고 즐겁게 운동하기',
  ];

  const handleToggleSport = (val: string) => {
    let list = [...data.sports];
    if (val === '종목 상관없이 다양하게 해보고 싶어요') {
      if (list.includes(val)) {
        list = list.filter((s) => s !== val);
      } else {
        list = [...sportsOptions];
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
    <div className="w-full max-w-xl mx-auto py-6 px-4">
      {/* Top Header */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>처음으로</span>
        </button>
        <span className="text-xs font-semibold text-slate-400">네트워크 3기</span>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          네트워크 3기 지원서
        </h1>
        <p className="text-sm text-slate-500 mt-1.5">
          아래 질문에 답변을 작성해 주세요.
        </p>
      </div>

      {/* Validation Error Alert */}
      {validationError && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm font-medium">
          {validationError}
        </div>
      )}

      {/* Form Fields */}
      <div className="space-y-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* 1. 이름 / 성별 / 나이 */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-900">
            1. 이름 / 성별 / 나이를 적어주세요. <span className="text-rose-500">*</span>
          </label>
          <p className="text-xs text-slate-400">예) 김네트 / 남 / 23세</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <input
              type="text"
              value={data.name}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="이름"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition"
            />
            <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 border border-slate-200 rounded-xl">
              {(['남', '여'] as const).map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => onChange('gender', gender)}
                  className={`rounded-lg text-xs font-semibold transition ${
                    data.gender === gender
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
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
              placeholder="나이"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition"
            />
          </div>
        </div>

        {/* 2. 학교 / 전공 / 학적 상태 */}
        <div className="space-y-2 pt-4 border-t border-slate-100">
          <label className="block text-sm font-semibold text-slate-900">
            2. 학교 / 전공 / 학적 상태를 알려주세요. <span className="text-rose-500">*</span>
          </label>
          <p className="text-xs text-slate-500">
            예) OO대학교 / 경영학과 / 재학 <br />
            <span className="text-slate-400">재학·휴학·졸업 모두 가능합니다!</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <input
              type="text"
              value={data.university}
              onChange={(e) => onChange('university', e.target.value)}
              placeholder="학교 (예: OO대학교)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition"
            />
            <input
              type="text"
              value={data.major}
              onChange={(e) => onChange('major', e.target.value)}
              placeholder="전공 (예: 경영학과)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition"
            />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {(['재학', '휴학', '졸업', '기타'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => onChange('academicStatus', status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                  data.academicStatus === status
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* 3. 현재 거주 지역 */}
        <div className="space-y-2 pt-4 border-t border-slate-100">
          <label className="block text-sm font-semibold text-slate-900">
            3. 현재 거주 지역을 알려주세요. <span className="text-rose-500">*</span>
          </label>
          <p className="text-xs text-slate-400">
            예) 서울 관악구 / 경기 구리시 (상세 주소는 작성하지 않아도 됩니다.)
          </p>
          <input
            type="text"
            value={data.residence}
            onChange={(e) => onChange('residence', e.target.value)}
            placeholder="거주 지역"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition"
          />
        </div>

        {/* 4. 연락 가능한 전화번호 */}
        <div className="space-y-2 pt-4 border-t border-slate-100">
          <label className="block text-sm font-semibold text-slate-900">
            4. 연락 가능한 전화번호를 적어주세요. <span className="text-rose-500">*</span>
          </label>
          <p className="text-xs text-slate-400">예) 010-1234-5678</p>
          <input
            type="tel"
            value={data.phone}
            onChange={handlePhoneChange}
            placeholder="010-1234-5678"
            maxLength={13}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white font-mono transition"
          />
        </div>

        {/* 5. 관심 있는 종목 */}
        <div className="space-y-2.5 pt-4 border-t border-slate-100">
          <label className="block text-sm font-semibold text-slate-900">
            5. 관심 있는 종목을 선택해주세요. (복수 선택) <span className="text-rose-500">*</span>
          </label>
          <div className="space-y-2 pt-1">
            {sportsOptions.map((opt) => {
              const isChecked = data.sports.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleToggleSport(opt)}
                  className={`w-full p-3 rounded-xl border text-left text-sm font-medium flex items-center justify-between transition ${
                    isChecked
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>{opt}</span>
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center ${
                      isChecked ? 'border-white bg-white/20 text-white' : 'border-slate-300'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. 평소 운동 빈도 */}
        <div className="space-y-2.5 pt-4 border-t border-slate-100">
          <label className="block text-sm font-semibold text-slate-900">
            6. 평소 운동은 어느 정도 즐기시나요? <span className="text-rose-500">*</span>
          </label>
          <div className="space-y-2 pt-1">
            {frequencyOptions.map((opt) => {
              const isChecked = data.exerciseFrequency === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onChange('exerciseFrequency', opt)}
                  className={`w-full p-3 rounded-xl border text-left text-sm font-medium flex items-center justify-between transition ${
                    isChecked
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>{opt}</span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isChecked ? 'border-white bg-white' : 'border-slate-300'
                    }`}
                  >
                    {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 7. 각 종목의 경험 */}
        <div className="space-y-2 pt-4 border-t border-slate-100">
          <label className="block text-sm font-semibold text-slate-900">
            7. 각 종목의 경험을 간단히 알려주세요.
          </label>
          <p className="text-xs text-slate-400">
            예) 배드민턴 — 가끔 / 탁구 — 처음 / 족구 — 해본 적 있음 <br />
            처음이어도 전혀 상관없어요!
          </p>
          <input
            type="text"
            value={data.experienceCustomNotes}
            onChange={(e) => onChange('experienceCustomNotes', e.target.value)}
            placeholder="예: 배드민턴 — 가끔, 탁구 — 처음, 족구 — 해본 적 있음"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition"
          />
        </div>

        {/* 8. 참여 가능한 요일과 시간대 */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <label className="block text-sm font-semibold text-slate-900">
            8. 참여 가능한 요일과 시간대를 모두 선택해주세요. (복수 선택) <span className="text-rose-500">*</span>
          </label>

          {/* 요일 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>요일</span>
              <button
                type="button"
                onClick={handleSelectAllDays}
                className="text-xs text-slate-700 underline underline-offset-2 font-medium"
              >
                {data.availableDays.length === days.length ? '전체 해제' : '모든 요일 체크'}
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {days.map((d) => {
                const isSelected = data.availableDays.includes(d);
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => handleToggleDay(d)}
                    className={`py-2.5 rounded-xl border text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 시간대 */}
          <div className="space-y-2 pt-2">
            <span className="text-xs text-slate-500 block">시간대</span>
            <div className="space-y-1.5">
              {times.map((t) => {
                const isSelected = data.availableTimes.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleToggleTime(t)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition ${
                      isSelected
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{t}</span>
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected ? 'border-white bg-white/20 text-white' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 9. 가장 기대하는 것 */}
        <div className="space-y-2.5 pt-4 border-t border-slate-100">
          <label className="block text-sm font-semibold text-slate-900">
            9. 네트워크에서 가장 기대하는 것은 무엇인가요? (복수 선택 가능) <span className="text-rose-500">*</span>
          </label>
          <div className="space-y-2 pt-1">
            {expectationsOptions.map((exp) => {
              const isChecked = data.expectations.includes(exp);
              return (
                <button
                  key={exp}
                  type="button"
                  onClick={() => handleToggleExpectation(exp)}
                  className={`w-full p-3 rounded-xl border text-left text-sm font-medium flex items-center justify-between transition ${
                    isChecked
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>{exp}</span>
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      isChecked ? 'border-white bg-white/20 text-white' : 'border-slate-300'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 10. 간단 자기소개 */}
        <div className="space-y-2 pt-4 border-t border-slate-100">
          <label className="block text-sm font-semibold text-slate-900">
            10. 마지막으로 간단하게 본인을 소개해주세요 :) <span className="text-rose-500">*</span>
          </label>
          <p className="text-xs text-slate-400">
            성격, 취미, 운동 스타일 등 편하게 2~3줄이면 충분합니다!
          </p>
          <textarea
            rows={4}
            value={data.introduction}
            onChange={(e) => onChange('introduction', e.target.value)}
            placeholder="편하게 작성해 주세요."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition leading-relaxed"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-[#0d3278] hover:bg-[#081d47] text-white font-bold text-base transition-all disabled:opacity-50 cursor-pointer shadow-md"
          >
            {isSubmitting ? '제출 중...' : '제출하기'}
          </button>
        </div>
      </div>
    </div>
  );
};
