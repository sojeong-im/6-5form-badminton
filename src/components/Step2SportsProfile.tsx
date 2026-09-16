import type { FC } from 'react';
import type { FormData } from '../types';
import { Check, Sparkles } from 'lucide-react';

interface Step2Props {
  data: FormData;
  onChange: (field: keyof FormData, value: any) => void;
}

export const Step2SportsProfile: FC<Step2Props> = ({ data, onChange }) => {
  const sportsOptions = [
    { id: '배드민턴', label: '배드민턴', icon: '🏸', desc: '경쾌한 랠리와 스피드' },
    { id: '탁구', label: '탁구', icon: '🏓', desc: '집중력과 빠른 핑퐁' },
    { id: '족구', label: '족구', icon: '⚽️', desc: '협동과 시원한 킥' },
    { id: '종목무관', label: '종목 상관없이 다양하게', icon: '✨', desc: '모든 운동을 열정적으로 경험하고 싶어요' },
  ];

  const handleToggleSport = (id: string) => {
    let updated = [...data.sports];
    if (id === '종목무관') {
      if (updated.includes('종목무관')) {
        updated = updated.filter(s => s !== '종목무관');
      } else {
        updated = ['배드민턴', '탁구', '족구', '종목무관'];
      }
    } else {
      if (updated.includes(id)) {
        updated = updated.filter(s => s !== id && s !== '종목무관');
      } else {
        updated.push(id);
      }
    }
    onChange('sports', updated);
  };

  const frequencyOptions = [
    { id: 'rarely', label: '거의 하지 않는 편', desc: '이제부터 습관을 만들고 싶어요' },
    { id: 'sometimes', label: '가끔 하는 편', desc: '생각날 때 가볍게 즐겨요' },
    { id: 'weekly12', label: '주 1~2회 정도', desc: '정기적으로 땀 흘리는 편이에요' },
    { id: 'weekly3plus', label: '주 3회 이상', desc: '운동이 삶의 큰 활력소예요!' },
  ];

  const experienceLevels = ['처음', '가끔', '해본 적 있음', '자주 즐김'];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800/80 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-lime-400/20 text-lime-400 text-sm font-black border border-lime-400/30">
            2
          </span>
          운동 성향 & 종목 경험
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          실력이나 경험에 상관없이 누구나 즐길 수 있는 매칭을 준비합니다.
        </p>
      </div>

      {/* 5. 관심 있는 종목 */}
      <div className="glass-panel p-5 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-slate-200">
            5. 관심 있는 종목을 선택해주세요. (복수 선택) <span className="text-lime-400">*</span>
          </label>
          <span className="text-xs text-lime-400 font-medium">
            {data.sports.length}개 선택됨
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sportsOptions.map((item) => {
            const isSelected = data.sports.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleToggleSport(item.id)}
                className={`p-4 rounded-xl border text-left transition-all flex items-start justify-between group ${
                  isSelected
                    ? 'bg-gradient-to-r from-lime-950/40 to-slate-900 border-lime-400/80 shadow-[0_0_15px_rgba(163,230,53,0.1)]'
                    : 'bg-slate-900/60 border-slate-800/90 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <span className={`block font-bold text-sm ${isSelected ? 'text-lime-300' : 'text-slate-200'}`}>
                      {item.label}
                    </span>
                    <span className="block text-xs text-slate-400 mt-0.5">
                      {item.desc}
                    </span>
                  </div>
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

      {/* 6. 평소 운동 빈도 */}
      <div className="glass-panel p-5 rounded-2xl space-y-3">
        <label className="block text-sm font-semibold text-slate-200">
          6. 평소 운동은 어느 정도 즐기시나요? <span className="text-lime-400">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {frequencyOptions.map((opt) => {
            const isSelected = data.exerciseFrequency === opt.label;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange('exerciseFrequency', opt.label)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-lime-400/10 border-lime-400 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <span className={`font-semibold text-sm block ${isSelected ? 'text-lime-300' : 'text-slate-200'}`}>
                    {opt.label}
                  </span>
                  <span className="text-xs text-slate-400 block mt-0.5">{opt.desc}</span>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-lime-400 bg-lime-400' : 'border-slate-700'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. 각 종목의 경험 */}
      <div className="glass-panel p-5 rounded-2xl space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-200">
            7. 각 종목의 경험을 간단히 알려주세요.
          </label>
          <p className="text-xs text-emerald-400/90 mt-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>처음이어도 전혀 상관없어요! 수준별 매칭에만 참고됩니다.</span>
          </p>
        </div>

        {/* 종목별 경험 칩 그리드 */}
        <div className="space-y-3">
          {[
            { key: 'experienceBadminton', name: '배드민턴 🏸' },
            { key: 'experienceTableTennis', name: '탁구 🏓' },
            { key: 'experienceJokgu', name: '족구 ⚽️' },
          ].map(({ key, name }) => (
            <div key={key} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <span className="text-sm font-semibold text-slate-300 min-w-[110px]">
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
                      className={`px-3 py-1 rounded-lg text-xs font-medium border transition ${
                        isMatch
                          ? 'bg-lime-400 text-slate-950 font-bold border-lime-400 shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
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
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 transition"
          />
        </div>
      </div>
    </div>
  );
};
