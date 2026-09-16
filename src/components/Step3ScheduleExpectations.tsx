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
    { id: '14:00~16:00', label: '14:00 ~ 16:00', badge: '오후' },
    { id: '16:00~18:00', label: '16:00 ~ 18:00', badge: '늦은 오후' },
    { id: '18:00~20:00', label: '18:00 ~ 20:00', badge: '저녁 피크' },
    { id: '20:00 이후', label: '20:00 이후', badge: '야간' },
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
    { id: '꾸준히 운동하기', emoji: '💪', desc: '주기적인 운동 루틴 만들기' },
    { id: '새로운 운동 배워보기', emoji: '🏸', desc: '새 종목의 재미 발견' },
    { id: '다양한 사람들과 친해지기', emoji: '🤝', desc: '다양한 전공/배경의 친구 사귀기' },
    { id: '학교 밖 새로운 활동 해보기', emoji: '🚀', desc: '일상에서 벗어난 에너지 충전' },
    { id: '가볍고 즐겁게 운동하기', emoji: '🎉', desc: '부담 없이 힐링하며 땀 흘리기' },
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
    <div className="space-y-6">
      <div className="border-b border-slate-800/80 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-lime-400/20 text-lime-400 text-sm font-black border border-lime-400/30">
            3
          </span>
          일정 & 기대하는 점
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          가장 편안한 요일과 시간대를 알려주시면 모임 편성에 적극 반영합니다.
        </p>
      </div>

      {/* 8. 요일 및 시간대 */}
      <div className="glass-panel p-5 rounded-2xl space-y-5">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-slate-200">
            8. 참여 가능한 요일과 시간대를 모두 선택해주세요. <span className="text-lime-400">*</span>
          </label>
        </div>

        {/* 요일 선택 영역 */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <CalendarDays className="w-3.5 h-3.5 text-lime-400" />
              가능한 요일 (복수 선택)
            </span>
            <button
              type="button"
              onClick={handleSelectAllDays}
              className="text-xs text-lime-400 hover:text-lime-300 font-semibold underline underline-offset-4"
            >
              {data.availableDays.length === days.length ? '전체 해제' : '모든 요일 체크'}
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
                  className={`py-3 rounded-xl border text-sm font-bold flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-lime-400 text-slate-950 border-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.3)] scale-[1.02]'
                      : `bg-slate-900/80 border-slate-800 ${
                          isWeekend ? 'text-amber-400 hover:border-amber-400/40' : 'text-slate-300 hover:border-slate-700'
                        }`
                  }`}
                >
                  <span>{day}</span>
                  <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                    {isWeekend ? '주말' : '평일'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 시간대 선택 영역 */}
        <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              선호 시간대 (복수 선택)
            </span>
            <span className="text-lime-400 font-medium">
              {data.availableTimes.length}개 선택됨
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {times.map((time) => {
              const isSelected = data.availableTimes.includes(time.id);
              return (
                <button
                  key={time.id}
                  type="button"
                  onClick={() => handleToggleTime(time.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-lime-400/15 border-lime-400/90 text-white shadow-sm'
                      : 'bg-slate-900/60 border-slate-800/90 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <span className={`block text-sm font-semibold ${isSelected ? 'text-lime-300' : 'text-slate-200'}`}>
                      {time.label}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {time.badge}
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-lime-400 border-lime-400 text-slate-950'
                        : 'border-slate-700 bg-slate-800/40 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 9. 가장 기대하는 것 */}
      <div className="glass-panel p-5 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-slate-200 flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-400" />
            9. 네트워크에서 가장 기대하는 것은 무엇인가요? (복수 선택 가능) <span className="text-lime-400">*</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {expectationsOptions.map((opt) => {
            const isSelected = data.expectations.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleToggleExpectation(opt.id)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'bg-lime-400/10 border-lime-400/80 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="text-xl shrink-0 mt-0.5">{opt.emoji}</span>
                <div className="flex-1">
                  <span className={`block text-sm font-semibold ${isSelected ? 'text-lime-300' : 'text-slate-200'}`}>
                    {opt.id}
                  </span>
                  <span className="block text-xs text-slate-400 mt-0.5">
                    {opt.desc}
                  </span>
                </div>
                <div
                  className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 mt-0.5 ${
                    isSelected ? 'bg-lime-400 border-lime-400 text-slate-950' : 'border-slate-700'
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
  );
};
