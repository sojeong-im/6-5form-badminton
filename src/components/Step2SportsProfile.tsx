import type { FC } from 'react';
import type { FormData } from '../types';
import { Check, Sparkles } from 'lucide-react';

interface Step2Props {
  data: FormData;
  onChange: (field: keyof FormData, value: any) => void;
}

export const Step2SportsProfile: FC<Step2Props> = ({ data, onChange }) => {
  const sportsOptions = [
    {
      id: '배드민턴',
      label: '배드민턴',
      emoji: '🏸',
      mascot: '셔틀이',
      desc: '경쾌한 랠리와 시원한 스매시!',
      badge: '라켓 세션'
    },
    {
      id: '탁구',
      label: '탁구',
      emoji: '🏓',
      mascot: '핑퐁이',
      desc: '스릴 만점 핑퐁 랠리와 복식 경기!',
      badge: '핑퐁 세션'
    },
    {
      id: '족구',
      label: '족구',
      emoji: '⚽️',
      mascot: '족구이',
      desc: '협동과 시원한 발차기 네트 플레이!',
      badge: '네트 풋볼'
    },
    {
      id: '종목무관',
      label: '종목 상관없이 다양하게',
      emoji: '🌟',
      mascot: '올라운더',
      desc: '공만 넘어가면 뭐든 신나게 해보고 싶어요!',
      badge: '만능 크루'
    },
  ];

  const handleToggleSport = (id: string) => {
    let updated = [...data.sports];
    if (id === '종목무관') {
      if (updated.includes('종목무관')) {
        updated = updated.filter((s) => s !== '종목무관');
      } else {
        updated = ['배드민턴', '탁구', '족구', '종목무관'];
      }
    } else {
      if (updated.includes(id)) {
        updated = updated.filter((s) => s !== id && s !== '종목무관');
      } else {
        updated.push(id);
      }
    }
    onChange('sports', updated);
  };

  const frequencyOptions = [
    { id: 'rarely', label: '거의 하지 않는 편', desc: '네트워크에서 즐거운 첫 운동 습관 만들기!' },
    { id: 'sometimes', label: '가끔 하는 편', desc: '주말이나 생각날 때 가볍게 즐겨요' },
    { id: 'weekly12', label: '주 1~2회 정도', desc: '정기적으로 땀 흘리며 스트레스 해소!' },
    { id: 'weekly3plus', label: '주 3회 이상', desc: '운동이 일상의 가장 큰 활력소!' },
  ];

  const experienceLevels = ['처음', '가끔', '해본 적 있음', '자주 즐김'];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Step Header */}
      <div className="bg-white p-5 rounded-3xl border-2 border-court-border shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-black text-[#74c407] uppercase tracking-wider block mb-1">
            Step 2 · Sports Taste
          </span>
          <h2 className="text-xl font-black text-[#0d3278] flex items-center gap-2">
            관심 있는 종목과 경험도 🏸
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            실력은 전혀 상관없어요! 누구나 편안하게 즐길 수 있도록 맞춤 매칭해 드립니다.
          </p>
        </div>
        <div className="text-3xl p-2.5 bg-lime-50 rounded-2xl border border-lime-200">
          🏓
        </div>
      </div>

      {/* 5. 관심 있는 종목 */}
      <div className="pop-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-bold text-slate-800">
            5. 관심 있는 종목을 선택해주세요. (복수 선택) <span className="text-rose-500">*</span>
          </label>
          <span className="text-xs font-black text-[#74c407] bg-lime-50 px-2.5 py-1 rounded-full border border-lime-200">
            {data.sports.length}개 선택됨
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {sportsOptions.map((item) => {
            const isSelected = data.sports.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleToggleSport(item.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-lime-50 to-white border-[#74c407] shadow-md shadow-lime-500/15 ring-2 ring-lime-400/20'
                    : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl shrink-0 mt-0.5">{item.emoji}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`font-black text-sm ${isSelected ? 'text-[#0d3278]' : 'text-slate-800'}`}>
                        {item.label}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-white border border-slate-200 rounded-md text-slate-600">
                        {item.mascot}
                      </span>
                    </div>
                    <span className="block text-xs font-medium text-slate-500 mt-1 leading-snug">
                      {item.desc}
                    </span>
                  </div>
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

      {/* 6. 평소 운동 빈도 */}
      <div className="pop-card p-6 space-y-4">
        <label className="block text-sm font-bold text-slate-800">
          6. 평소 운동은 어느 정도 즐기시나요? <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {frequencyOptions.map((opt) => {
            const isSelected = data.exerciseFrequency === opt.label;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange('exerciseFrequency', opt.label)}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-lime-50 border-[#74c407] text-[#0d3278] shadow-sm'
                    : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div>
                  <span className={`font-bold text-sm block ${isSelected ? 'text-[#0d3278]' : 'text-slate-800'}`}>
                    {opt.label}
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">{opt.desc}</span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-[#0d3278] bg-[#0d3278]' : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. 각 종목의 경험 */}
      <div className="pop-card p-6 space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-800">
            7. 각 종목의 경험을 간단히 알려주세요.
          </label>
          <p className="text-xs font-bold text-[#457a03] bg-lime-100/70 px-3 py-1.5 rounded-xl mt-1.5 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#74c407]" />
            <span>처음이어도 전혀 상관없어요! 수준별 팀 매칭에만 참고됩니다.</span>
          </p>
        </div>

        {/* 종목별 경험 칩 그리드 */}
        <div className="space-y-3">
          {[
            { key: 'experienceBadminton', name: '배드민턴 🏸' },
            { key: 'experienceTableTennis', name: '탁구 🏓' },
            { key: 'experienceJokgu', name: '족구 ⚽️' },
          ].map(({ key, name }) => (
            <div
              key={key}
              className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
            >
              <span className="text-sm font-bold text-slate-800 min-w-[110px]">
                {name}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {experienceLevels.map((lvl) => {
                  const currentVal = (data as any)[key];
                  const isMatch = currentVal === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => onChange(key as keyof FormData, lvl)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                        isMatch
                          ? 'bg-[#0d3278] text-white border-[#0d3278] shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div>
          <input
            type="text"
            value={data.experienceCustomNotes}
            onChange={(e) => onChange('experienceCustomNotes', e.target.value)}
            placeholder="기타 종목 경험이나 덧붙이고 싶은 말이 있다면 자유롭게 적어주세요. (선택)"
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#74c407] focus:bg-white transition"
          />
        </div>
      </div>
    </div>
  );
};
