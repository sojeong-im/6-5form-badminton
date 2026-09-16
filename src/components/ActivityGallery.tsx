import { useState, type FC } from 'react';
import { Sparkles, ArrowRight, X, ZoomIn, Heart, Users, Trophy } from 'lucide-react';

interface ActivityGalleryProps {
  onGoToApply: () => void;
}

interface PhotoItem {
  id: string;
  src: string;
  title: string;
  category: '배드민턴' | '탁구' | '친목/뒤풀이';
  desc: string;
  tag: string;
}

export const ActivityGallery: FC<ActivityGalleryProps> = ({ onGoToApply }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [filter, setFilter] = useState<string>('전체');

  const photos: PhotoItem[] = [
    {
      id: '1',
      src: '/activities/badminton_court.jpg',
      title: '넓은 체육관 정기 배드민턴 모임',
      category: '배드민턴',
      desc: '쾌적한 전용 코트에서 실력 상관없이 재미있게 랠리를 즐겨요!',
      tag: '🏸 정기 세션',
    },
    {
      id: '2',
      src: '/activities/badminton_net.jpg',
      title: '스포츠클럽 코트 & 네트 플레이',
      category: '배드민턴',
      desc: '서로 응원하고 배려하며 땀 흘리는 열정 넘치는 코트 현장',
      tag: '⚡️ 매치 플레이',
    },
    {
      id: '3',
      src: '/activities/table_tennis_match.jpg',
      title: '탁구장 실내 랠리 & 복식 경기',
      category: '탁구',
      desc: '누구나 쉽게 시작할 수 있는 스릴 만점 핑퐁 타임',
      tag: '🏓 핑퐁 세션',
    },
    {
      id: '4',
      src: '/activities/table_tennis_ball.jpg',
      title: '집중과 힐링의 시간',
      category: '탁구',
      desc: '운동에 온전히 집중하며 일상의 스트레스를 시원하게 날려요',
      tag: '🔥 힐링 스포츠',
    },
    {
      id: '5',
      src: '/activities/dinner.jpg',
      title: '운동 후 꿀맛 같은 고기 회식 & 친목',
      category: '친목/뒤풀이',
      desc: '땀 흘린 후 함께 즐기는 맛있는 음식과 유쾌한 대화',
      tag: '🥩 맛있는 뒤풀이',
    },
  ];

  const categories = ['전체', '배드민턴', '탁구', '친목/뒤풀이'];

  const filteredPhotos =
    filter === '전체'
      ? photos
      : photos.filter((p) => p.category === filter);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Gallery Header */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-lime-400/10 text-lime-400 text-xs font-semibold border border-lime-400/20 mb-1.5">
            <Sparkles className="w-3 h-3" />
            <span>네트워크 크루 현장 스케치</span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            네트워크 활동 사진 갤러리 📸
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            부담 없이 가볍게 즐기고, 뒤풀이까지 유쾌한 네트워크의 실제 분위기를 확인해 보세요!
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                filter === cat
                  ? 'bg-lime-400 text-slate-950 border-lime-400 shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-3 gap-2.5 text-center">
        <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl">
          <Users className="w-4 h-4 text-lime-400 mx-auto mb-1" />
          <span className="block text-xs font-bold text-white">초보 환영</span>
          <span className="text-[10px] text-slate-400">처음이어도 안심</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl">
          <Trophy className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
          <span className="block text-xs font-bold text-white">다양한 종목</span>
          <span className="text-[10px] text-slate-400">배드민턴·탁구·족구</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl">
          <Heart className="w-4 h-4 text-rose-400 mx-auto mb-1" />
          <span className="block text-xs font-bold text-white">즐거운 친목</span>
          <span className="text-[10px] text-slate-400">자율 참석 뒤풀이</span>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative rounded-2xl overflow-hidden border border-slate-800/90 bg-slate-900 cursor-pointer transition-all duration-300 hover:border-lime-400/50 hover:shadow-[0_0_25px_rgba(163,230,53,0.12)] hover:-translate-y-1"
          >
            {/* Image */}
            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-950 relative">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-70 group-hover:opacity-60 transition-opacity" />

              {/* Tag Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-lime-300">
                {photo.tag}
              </div>

              {/* Zoom hover indicator */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>

            {/* Content Bottom */}
            <div className="p-4 bg-slate-900/90 border-t border-slate-800/80">
              <h3 className="font-bold text-sm text-white group-hover:text-lime-400 transition-colors">
                {photo.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                {photo.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box to Apply */}
      <div className="rounded-2xl bg-gradient-to-r from-lime-950/40 via-slate-900 to-emerald-950/40 border border-lime-400/40 p-6 text-center space-y-3">
        <h3 className="text-lg font-black text-white">
          함께 운동하고 추억을 만들어갈 준비가 되셨나요? 🏸
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          복잡한 절차 없이 1~2분이면 신청이 완료됩니다. 지금 3기에 합류해 보세요!
        </p>
        <button
          type="button"
          onClick={onGoToApply}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-black text-sm shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.5)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>네트워크 3기 지원서 작성하기</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/70 text-slate-300 hover:text-white backdrop-blur-md transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>

            <div className="p-5 bg-slate-900 flex items-center justify-between">
              <div>
                <span className="text-xs text-lime-400 font-semibold block mb-1">
                  {selectedPhoto.tag}
                </span>
                <h4 className="text-base font-bold text-white">
                  {selectedPhoto.title}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedPhoto.desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedPhoto(null);
                  onGoToApply();
                }}
                className="shrink-0 px-4 py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition"
              >
                <span>지원하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
