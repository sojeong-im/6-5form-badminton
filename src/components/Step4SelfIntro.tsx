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
    '#긍정왕',
  ];

  const handleAddTag = (tag: string) => {
    if (data.introduction.includes(tag)) return;
    const separator = data.introduction.trim() ? ' ' : '';
    onChange('introduction', data.introduction + separator + tag);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800/80 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-lime-400/20 text-lime-400 text-sm font-black border border-lime-400/30">
            4
          </span>
          자기소개 & 최종 제출
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          마지막 단계입니다! 지원자님을 편안하게 알려주세요.
        </p>
      </div>

      {/* 10. 본인 소개 */}
      <div className="glass-panel p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-lime-400" />
            10. 마지막으로 간단하게 본인을 소개해주세요 :) <span className="text-lime-400">*</span>
          </label>
          <span className="text-xs text-slate-400 font-mono">
            {data.introduction.length}자
          </span>
        </div>
        <p className="text-xs text-slate-400">
          성격, 취미, 운동 스타일 등 편하게 2~3줄이면 충분합니다!
        </p>

        {/* 빠른 키워드 태그 */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {quickTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleAddTag(tag)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-lime-400 hover:border-lime-400/40 transition"
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
            placeholder="예시) 안녕하세요! 대학교에서 경영학을 전공하고 있고, 평소에 땀 흘리며 스트레스 푸는 것을 좋아합니다. 배드민턴은 가끔 쳐봤는데 동아리에서 재미있게 배우고 좋은 사람들과 친해지고 싶어 지원하게 되었습니다!"
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 transition leading-relaxed"
          />
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 space-y-3">
        <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-lime-400" />
          입력 내용 요약 프리뷰
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/50">
            <span className="text-slate-500 block mb-1">이름/성별/나이</span>
            <span className="font-semibold text-slate-200 truncate block">
              {data.name || '-'} / {data.gender || '-'} / {data.age ? `${data.age}세` : '-'}
            </span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/50">
            <span className="text-slate-500 block mb-1">학교 / 상태</span>
            <span className="font-semibold text-slate-200 truncate block">
              {data.university || '-'} ({data.academicStatus || '-'})
            </span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/50">
            <span className="text-slate-500 block mb-1">관심 종목</span>
            <span className="font-semibold text-lime-400 truncate block">
              {data.sports.length > 0 ? data.sports.join(', ') : '미선택'}
            </span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/50">
            <span className="text-slate-500 block mb-1">참여 가능 요일</span>
            <span className="font-semibold text-slate-200 truncate block">
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
          className="w-full py-4 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-black text-base flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(163,230,53,0.3)] hover:shadow-[0_0_35px_rgba(163,230,53,0.5)] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5 stroke-[2.5]" />
              <span>네트워크 3기 지원서 최종 제출하기</span>
            </>
          )}
        </button>
        <p className="text-center text-xs text-slate-500 mt-2.5 flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-lime-400" />
          제출 즉시 접수 번호 및 접수증이 발급됩니다.
        </p>
      </div>
    </div>
  );
};
