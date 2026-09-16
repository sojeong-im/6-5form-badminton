import type { ChangeEvent, FC } from 'react';
import type { FormData } from '../types';
import { User, Phone, MapPin, GraduationCap } from 'lucide-react';

interface Step1Props {
  data: FormData;
  onChange: (field: keyof FormData, value: any) => void;
}

export const Step1BasicInfo: FC<Step1Props> = ({ data, onChange }) => {
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

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800/80 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-lime-400/20 text-lime-400 text-sm font-black border border-lime-400/30">
            1
          </span>
          기본 인적사항
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          네트워크 동아리 활동 안내 및 원활한 연락을 위한 기본 정보를 입력해 주세요.
        </p>
      </div>

      {/* 1. 이름 / 성별 / 나이 */}
      <div className="glass-panel p-5 rounded-2xl space-y-4">
        <label className="block text-sm font-semibold text-slate-200">
          1. 이름 / 성별 / 나이를 입력해주세요. <span className="text-lime-400">*</span>
          <span className="block text-xs font-normal text-slate-400 mt-0.5">
            예시) 김네트 / 남 / 23세
          </span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={data.name}
                onChange={(e) => onChange('name', e.target.value)}
                placeholder="이름 (예: 김네트)"
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 transition"
              />
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-1.5 h-[42px] bg-slate-900/90 p-1 border border-slate-800 rounded-xl">
              {(['남', '여'] as const).map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => onChange('gender', gender)}
                  className={`rounded-lg text-xs font-semibold transition ${
                    data.gender === gender
                      ? 'bg-lime-400 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
          <div>
            <input
              type="number"
              value={data.age}
              onChange={(e) => onChange('age', e.target.value)}
              placeholder="나이 (예: 23)"
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 transition"
            />
          </div>
        </div>
      </div>

      {/* 2. 학교 / 전공 / 학적 상태 */}
      <div className="glass-panel p-5 rounded-2xl space-y-4">
        <label className="block text-sm font-semibold text-slate-200">
          2. 학교 / 전공 / 학적 상태를 알려주세요. <span className="text-lime-400">*</span>
          <span className="block text-xs font-normal text-emerald-400/90 mt-0.5">
            ✨ 재학 · 휴학 · 졸업 모두 가능합니다! 편하게 적어주세요.
          </span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <GraduationCap className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={data.university}
              onChange={(e) => onChange('university', e.target.value)}
              placeholder="대학교 (예: OO대학교)"
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 transition"
            />
          </div>
          <div>
            <input
              type="text"
              value={data.major}
              onChange={(e) => onChange('major', e.target.value)}
              placeholder="전공 (예: 경영학과)"
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 transition"
            />
          </div>
        </div>
        <div>
          <span className="text-xs text-slate-400 mb-1.5 block">학적 상태 선택</span>
          <div className="flex flex-wrap gap-2">
            {(['재학', '휴학', '졸업', '기타'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => onChange('academicStatus', status)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition ${
                  data.academicStatus === status
                    ? 'bg-lime-400/20 border-lime-400 text-lime-300'
                    : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. 현재 거주 지역 */}
      <div className="glass-panel p-5 rounded-2xl space-y-3">
        <label className="block text-sm font-semibold text-slate-200">
          3. 현재 거주 지역을 알려주세요. <span className="text-lime-400">*</span>
          <span className="block text-xs font-normal text-slate-400 mt-0.5">
            상세 주소는 작성하지 않아도 됩니다. (예: 서울 관악구 / 경기 구리시)
          </span>
        </label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={data.residence}
            onChange={(e) => onChange('residence', e.target.value)}
            placeholder="예: 서울 관악구, 경기 부천시"
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 transition"
          />
        </div>
      </div>

      {/* 4. 연락 가능한 전화번호 */}
      <div className="glass-panel p-5 rounded-2xl space-y-3">
        <label className="block text-sm font-semibold text-slate-200">
          4. 연락 가능한 전화번호를 적어주세요. <span className="text-lime-400">*</span>
          <span className="block text-xs font-normal text-slate-400 mt-0.5">
            합격 안내 및 단톡방 초대를 위해 정확히 입력해 주세요.
          </span>
        </label>
        <div className="relative">
          <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="tel"
            value={data.phone}
            onChange={handlePhoneChange}
            placeholder="010-1234-5678"
            maxLength={13}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 font-mono transition"
          />
        </div>
      </div>
    </div>
  );
};
