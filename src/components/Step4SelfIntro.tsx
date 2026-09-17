import type { FC } from 'react';
import type { FormData } from '../types';
import { Sparkles, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface Step4Props {
  data: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const Step4SelfIntro: FC<Step4Props> = ({
  data,
  onChange,
  onSubmit,
  isSubmitting,
}) => {
  const quickTags = [
    '#운동초보_환영',
    '#열정가득',
    '#친목좋아해요',
    '#체력기르기',
    '#배드민턴러버',
    '#핑퐁러버',
    '#웃음가득',
  ];

  const handleAddTag = (tag: string) => {
    if (data.introduction.includes(tag)) return;
    const separator = data.introduction.trim() ? ' ' : '';
    onChange('introduction', data.introduction + separator + tag);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Step Header */}
      <div className="bg-white p-5 rounded-3xl border-2 border-court-border shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-black text-[#74c407] uppercase tracking-wider block mb-1">
            Step 4 · Introduce Yourself
          </span>
          <h2 className="text-xl font-black text-[#0d3278] flex items-center gap-2">
            간단한 자기소개 & 제출 💌
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            지원자님을 조금 더 알려주세요! 편하게 2~3줄이면 충분합니다.
          </p>
        </div>
        <div className="text-3xl p-2.5 bg-lime-50 rounded-2xl border border-lime-200">
          🎉
        </div>
      </div>

      {/* 10. 본인 소개 */}
      <div className="pop-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-bold text-slate-800 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#74c407]" />
            10. 마지막으로 간단하게 본인을 소개해주세요 :) <span className="text-rose-500">*</span>
          </label>
          <span className="text-xs font-mono font-bold text-slate-500">
            {data.introduction.length}자
          </span>
        </div>
        <p className="text-xs text-slate-500">
          성격, 취미, 운동 스타일 등 부담 없이 편하게 2~3줄이면 충분해요!
        </p>

        {/* 빠른 키워드 태그 */}
        <div className="flex flex-wrap gap-2 pt-1">
          {quickTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleAddTag(tag)}
              className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 hover:bg-lime-100 text-slate-600 hover:text-[#457a03] border border-slate-200 transition cursor-pointer"
            >
              + {tag}
            </button>
          ))}
        </div>

        <div className="relative">
          <textarea
            rows={5}
            value={data.introduction}
            onChange={(e) => onChange('introduction', e.target.value)}
            placeholder="예시) 안녕하세요! 대학교에서 경영학을 전공하고 있고, 주말마다 땀 흘리며 스트레스 푸는 것을 좋아합니다. 배드민턴은 가끔 쳐봤는데 네트워크에서 재미있게 배우고 좋은 사람들과 친해지고 싶어 지원하게 되었습니다!"
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#74c407] focus:bg-white transition leading-relaxed"
          />
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="bg-white border-2 border-court-border rounded-3xl p-5 space-y-3 shadow-sm">
        <h3 className="text-xs font-black text-slate-500 tracking-wider uppercase flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#74c407]" />
          작성 내용 최종 확인
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <span className="text-slate-400 block mb-1 font-bold">이름/성별/나이</span>
            <span className="font-black text-slate-800 truncate block">
              {data.name || '-'} / {data.gender || '-'} / {data.age ? `${data.age}세` : '-'}
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <span className="text-slate-400 block mb-1 font-bold">학교 / 상태</span>
            <span className="font-black text-slate-800 truncate block">
              {data.university || '-'} ({data.academicStatus || '-'})
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <span className="text-slate-400 block mb-1 font-bold">관심 종목</span>
            <span className="font-black text-[#74c407] truncate block">
              {data.sports.length > 0 ? data.sports.join(', ') : '미선택'}
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <span className="text-slate-400 block mb-1 font-bold">참여 가능 요일</span>
            <span className="font-black text-slate-800 truncate block">
              {data.availableDays.length > 0 ? data.availableDays.join(', ') : '미선택'}
            </span>
          </div>
        </div>
      </div>

      {/* 최종 제출 버튼 */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#74c407] via-[#88d900] to-[#6bb706] hover:opacity-95 text-[#081d47] font-black text-base flex items-center justify-center gap-2.5 shadow-xl shadow-lime-600/25 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer border-2 border-white/80"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-3 border-[#081d47] border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5 stroke-[2.5]" />
              <span>네트워크 3기 지원서 최종 제출하기</span>
            </>
          )}
        </button>
        <p className="text-center text-xs font-semibold text-slate-500 mt-2.5 flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#74c407]" />
          제출 즉시 접수 번호와 함께 디지털 지원증이 발급됩니다.
        </p>
      </div>
    </div>
  );
};
