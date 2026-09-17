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
    <div className="space-y-5 animate-fade-in">
      {/* Step Header */}
      <div className="bg-white p-5 rounded-3xl border-2 border-court-border shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-black text-[#74c407] uppercase tracking-wider block mb-1">
            Step 1 · Basic Info
          </span>
          <h2 className="text-xl font-black text-[#0d3278] flex items-center gap-2">
            기본 인적사항을 알려주세요 👋
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            원활한 동아리 활동 안내와 소통을 위해 필요한 정보입니다.
          </p>
        </div>
        <div className="text-3xl p-2.5 bg-lime-50 rounded-2xl border border-lime-200">
          🏸
        </div>
      </div>

      {/* 1. 이름 / 성별 / 나이 */}
      <div className="pop-card p-6 space-y-4">
        <label className="block text-sm font-bold text-slate-800">
          1. 이름 / 성별 / 나이를 적어주세요. <span className="text-rose-500">*</span>
          <span className="block text-xs font-medium text-slate-500 mt-0.5">
            예시) 김네트 / 남 / 23세
          </span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={data.name}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="이름 (예: 김네트)"
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl pl-10 pr-3.5 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#74c407] focus:bg-white transition"
            />
          </div>
          <div>
            <div className="grid grid-cols-2 gap-1.5 h-[48px] bg-slate-100 p-1 border-2 border-slate-200 rounded-2xl">
              {(['남', '여'] as const).map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => onChange('gender', gender)}
                  className={`rounded-xl text-xs font-bold transition ${
                    data.gender === gender
                      ? 'bg-[#0d3278] text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
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
              placeholder="나이 (예: 23세)"
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#74c407] focus:bg-white transition"
            />
          </div>
        </div>
      </div>

      {/* 2. 학교 / 전공 / 학적 상태 */}
      <div className="pop-card p-6 space-y-4">
        <label className="block text-sm font-bold text-slate-800">
          2. 학교 / 전공 / 학적 상태를 알려주세요. <span className="text-rose-500">*</span>
          <span className="inline-block text-xs font-bold text-[#457a03] bg-lime-100/80 px-2 py-0.5 rounded-md mt-1">
            ✨ 재학 · 휴학 · 졸업 모두 가능합니다!
          </span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={data.university}
              onChange={(e) => onChange('university', e.target.value)}
              placeholder="대학교 (예: OO대학교)"
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl pl-10 pr-3.5 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#74c407] focus:bg-white transition"
            />
          </div>
          <div>
            <input
              type="text"
              value={data.major}
              onChange={(e) => onChange('major', e.target.value)}
              placeholder="전공 (예: 경영학과)"
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#74c407] focus:bg-white transition"
            />
          </div>
        </div>
        <div>
          <span className="text-xs font-bold text-slate-600 mb-2 block">학적 상태</span>
          <div className="flex flex-wrap gap-2">
            {(['재학', '휴학', '졸업', '기타'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => onChange('academicStatus', status)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition ${
                  data.academicStatus === status
                    ? 'bg-[#0d3278] border-[#0d3278] text-white shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. 현재 거주 지역 */}
      <div className="pop-card p-6 space-y-3">
        <label className="block text-sm font-bold text-slate-800">
          3. 현재 거주 지역을 알려주세요. <span className="text-rose-500">*</span>
          <span className="block text-xs font-medium text-slate-500 mt-0.5">
            상세 주소는 작성하지 않아도 됩니다. (예: 서울 관악구 / 경기 구리시)
          </span>
        </label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={data.residence}
            onChange={(e) => onChange('residence', e.target.value)}
            placeholder="예: 서울 구로구, 관악구, 경기 부천시 등"
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl pl-10 pr-3.5 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#74c407] focus:bg-white transition"
          />
        </div>
      </div>

      {/* 4. 연락 가능한 전화번호 */}
      <div className="pop-card p-6 space-y-3">
        <label className="block text-sm font-bold text-slate-800">
          4. 연락 가능한 전화번호를 적어주세요. <span className="text-rose-500">*</span>
          <span className="block text-xs font-medium text-slate-500 mt-0.5">
            합격 안내 및 공지 단톡방 초대를 위해 정확히 적어주세요.
          </span>
        </label>
        <div className="relative">
          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="tel"
            value={data.phone}
            onChange={handlePhoneChange}
            placeholder="010-1234-5678"
            maxLength={13}
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl pl-10 pr-3.5 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#74c407] focus:bg-white font-mono transition"
          />
        </div>
      </div>
    </div>
  );
};
