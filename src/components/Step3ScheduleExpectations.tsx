import type { FC } from 'react';
import type { FormData } from '../types';
import { CalendarDays, Clock, Heart, Check } from 'lucide-react';

interface Step3Props {
  data: FormData;
  onChange: (field: keyof FormData, value: any) => void;
}

export const Step3ScheduleExpectations: FC<Step3Props> = ({ data, onChange }) => {
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const times = [
    { id: '14:00~16:00', label: '14:00 ~ 16:00', badge: '오후 타임' },
    { id: '16:00~18:00', label: '16:00 ~ 18:00', badge: '늦은 오후' },
    { id: '18:00~20:00', label: '18:00 ~ 20:00', badge: '퇴근/수업 후 피크' },
    { id: '20:00 이후', label: '20:00 이후', badge: '야간 나이트' },
  ];

  const handleToggleDay = (day: string) => {
    let updated = [...data.availableDays];
    if (updated.includes(day)) {
      updated = updated.filter((d) => d !== day);
    } else {
      updated.push(day);
    }
    onChange('availableDays', updated);
  };

  const handleSelectAllDays = () => {
    if (data.availableDays.length === days.length) {
      onChange('availableDays', []);
    } else {
      onChange('availableDays', [...days]);
    }
  };

  const handleToggleTime = (timeId: string) => {
    let updated = [...data.availableTimes];
    if (updated.includes(timeId)) {
      updated = updated.filter((t) => t !== timeId);
    } else {
      updated.push(timeId);
    }
    onChange('availableTimes', updated);
  };

  const expectationsOptions = [
    { id: '꾸준히 운동하기', emoji: '💪', desc: '주기적인 운동 루틴과 체력 기르기' },
    { id: '새로운 운동 배워보기', emoji: '🏸', desc: '배드민턴·탁구·족구 재미 발견' },
    { id: '다양한 사람들과 친해지기', emoji: '🤝', desc: '다양한 사람들과 유쾌한 친목' },
    { id: '학교 밖 새로운 활동 해보기', emoji: '🚀', desc: '일상에서 벗어나 리프레시하기' },
    { id: '가볍고 즐겁게 운동하기', emoji: '🎉', desc: '부담 없이 웃으며 땀 흘리기' },
  ];

  const handleToggleExpectation = (id: string) => {
    let updated = [...data.expectations];
    if (updated.includes(id)) {
      updated = updated.filter((item) => item !== id);
    } else {
      updated.push(id);
    }
    onChange('expectations', updated);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Step Header */}
      <div className="bg-white p-5 rounded-3xl border-2 border-court-border shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-black text-[#74c407] uppercase tracking-wider block mb-1">
            Step 3 · Schedule & Hope
          </span>
          <h2 className="text-xl font-black text-[#0d3278] flex items-center gap-2">
            참여 일정과 기대하는 점 🗓️
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            가장 편한 요일과 시간대를 알려주시면 크루 모임 편성에 적극 반영합니다.
          </p>
        </div>
        <div className="text-3xl p-2.5 bg-lime-50 rounded-2xl border border-lime-200">
          ⚽️
        </div>
      </div>

      {/* 8. 요일 및 시간대 */}
      <div className="pop-card p-6 space-y-5">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-bold text-slate-800">
            8. 참여 가능한 요일과 시간대를 모두 선택해주세요. <span className="text-rose-500">*</span>
          </label>
        </div>

        {/* 요일 선택 */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-bold text-slate-700">
              <CalendarDays className="w-4 h-4 text-[#74c407]" />
              가능한 요일 (복수 선택)
            </span>
            <button
              type="button"
              onClick={handleSelectAllDays}
              className="text-xs text-[#0d3278] hover:text-blue-700 font-bold underline underline-offset-4 cursor-pointer"
            >
              {data.availableDays.length === days.length ? '전체 해제' : '모든 요일 체크 ✓'}
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => {
              const isSelected = data.availableDays.includes(day);
              const isWeekend = day === '토' || day === '일';
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleToggleDay(day)}
                  className={`py-3.5 rounded-2xl border-2 text-sm font-black flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#74c407] to-[#88d900] text-[#081d47] border-[#74c407] shadow-md shadow-lime-500/20 scale-[1.03]'
                      : `bg-slate-50/80 border-slate-200 ${
                          isWeekend ? 'text-amber-600 hover:border-amber-300' : 'text-slate-700 hover:border-slate-300'
                        }`
                  }`}
                >
                  <span>{day}</span>
                  <span className={`text-[10px] font-bold mt-0.5 ${isSelected ? 'text-[#081d47]/80' : 'text-slate-400'}`}>
                    {isWeekend ? '주말' : '평일'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 시간대 선택 */}
        <div className="space-y-2.5 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-bold text-slate-700">
              <Clock className="w-4 h-4 text-[#74c407]" />
              선호 시간대 (복수 선택)
            </span>
            <span className="text-xs font-black text-[#74c407]">
              {data.availableTimes.length}개 선택됨
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {times.map((time) => {
              const isSelected = data.availableTimes.includes(time.id);
              return (
                <button
                  key={time.id}
                  type="button"
                  onClick={() => handleToggleTime(time.id)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-lime-50 border-[#74c407] shadow-sm'
                      : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div>
                    <span className={`block text-sm font-bold ${isSelected ? 'text-[#0d3278]' : 'text-slate-800'}`}>
                      {time.label}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 block mt-0.5">
                      {time.badge}
                    </span>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-xl flex items-center justify-center border-2 shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#0d3278] border-[#0d3278] text-white'
                        : 'border-slate-300 bg-white text-transparent'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 9. 가장 기대하는 것 */}
      <div className="pop-card p-6 space-y-4">
        <label className="block text-sm font-bold text-slate-800 flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-rose-500" />
          9. 네트워크에서 가장 기대하는 것은 무엇인가요? (복수 선택 가능) <span className="text-rose-500">*</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {expectationsOptions.map((opt) => {
            const isSelected = data.expectations.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleToggleExpectation(opt.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-lime-50 border-[#74c407] shadow-sm'
                    : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <span className="text-2xl shrink-0 mt-0.5">{opt.emoji}</span>
                <div className="flex-1">
                  <span className={`block text-sm font-bold ${isSelected ? 'text-[#0d3278]' : 'text-slate-800'}`}>
                    {opt.id}
                  </span>
                  <span className="block text-xs font-medium text-slate-500 mt-0.5 leading-snug">
                    {opt.desc}
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center border-2 shrink-0 mt-0.5 ${
                    isSelected ? 'bg-[#0d3278] border-[#0d3278] text-white' : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
