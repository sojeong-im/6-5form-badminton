import { useState, type FC } from 'react';
import { Sparkles, ArrowRight, X, ZoomIn, Heart, Users, Trophy } from 'lucide-react';

interface ActivityGalleryProps {
  onGoToApply: () => void;
}

interface PhotoItem {
  id: string;
  src: string;
  title: string;
  category: '배드민턴' | '탁구' | '야외/족구' | '친목/뒤풀이';
  desc: string;
  tag: string;
}

export const ActivityGallery: FC<ActivityGalleryProps> = ({ onGoToApply }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [filter, setFilter] = useState<string>('전체');

  const photos: PhotoItem[] = [
    {
      id: '1',
      src: '/activities/badminton_all_courts.jpg',
      title: '전 코트 풀가동 정기 세션 전경',
      category: '배드민턴',
      desc: '여러 코트에서 다 함께 신나게 땀 흘리는 네트워크 정기 운동',
      tag: '🏸 풀코트 세션',
    },
    {
      id: '2',
      src: '/activities/badminton_court.jpg',
      title: '넓고 쾌적한 실내 체육관 모임',
      category: '배드민턴',
      desc: '실력 상관없이 누구나 즐겁게 랠리를 주고받는 코트',
      tag: '🏸 정기 세션',
    },
    {
      id: '3',
      src: '/activities/badminton_serve_05.jpg',
      title: '05번 코트 서브 & 경기 집중',
      category: '배드민턴',
      desc: '신중한 서브와 빠른 반응! 코트 위의 진지하고 멋진 순간',
      tag: '🏸 서브 플레이',
    },
    {
      id: '4',
      src: '/activities/badminton_match_05.jpg',
      title: '05번 코트 배드민턴 복식 게임',
      category: '배드민턴',
      desc: '서로 호흡을 맞추며 즐기는 박진감 넘치는 복식 매치',
      tag: '🏸 코트 플레이',
    },
    {
      id: '5',
      src: '/activities/court_rally.jpg',
      title: '실내 체육관 배드민턴 랠리',
      category: '배드민턴',
      desc: '팀워크를 맞추며 파이팅 넘치게 즐기는 복식 게임 현장',
      tag: '🏸 복식 랠리',
    },
    {
      id: '6',
      src: '/activities/scoreboard.jpg',
      title: '손에 땀을 쥐는 스코어보드',
      category: '배드민턴',
      desc: '4:5 팽팽한 접전! 서로 응원하며 웃음 터지는 명승부',
      tag: '🔥 긴장감 100%',
    },
    {
      id: '7',
      src: '/activities/aircon_cool.jpg',
      title: '열기 식히는 시원한 에어컨 앞!',
      category: '친목/뒤풀이',
      desc: '열정적으로 뛴 후 대형 에어컨 바람 아래 옹기종기 모여 휴식 ❄️',
      tag: '❄️ 시원한 쿨다운',
    },
    {
      id: '8',
      src: '/activities/badminton_net.jpg',
      title: '스포츠클럽 코트 & 네트 플레이',
      category: '배드민턴',
      desc: '서로 응원하고 배려하며 땀 흘리는 열정 넘치는 코트 현장',
      tag: '⚡️ 매치 플레이',
    },
    {
      id: '9',
      src: '/activities/pingpong_club.jpg',
      title: '힙한 네온 탁구장 단체전',
      category: '탁구',
      desc: '감각적인 조명 아래 함께 응원하고 환호하는 뜨거운 핑퐁 타임',
      tag: '🏓 핑퐁 나이트',
    },
    {
      id: '10',
      src: '/activities/table_tennis_match.jpg',
      title: '탁구장 실내 랠리 & 복식 경기',
      category: '탁구',
      desc: '누구나 쉽게 시작할 수 있는 스릴 만점 핑퐁 타임',
      tag: '🏓 핑퐁 세션',
    },
    {
      id: '11',
      src: '/activities/table_tennis_ball.jpg',
      title: '집중과 힐링의 시간',
      category: '탁구',
      desc: '운동에 온전히 집중하며 일상의 스트레스를 시원하게 날려요',
      tag: '🏓 힐링 스포츠',
    },
    {
      id: '12',
      src: '/activities/pingpong_selfie.jpg',
      title: '운동 열정 가득 크루 셀피',
      category: '탁구',
      desc: '헤어밴드 장착 완료! 언제나 유쾌하고 에너지 넘치는 분위기',
      tag: '✨ 크루 에너지',
    },
    {
      id: '13',
      src: '/activities/outdoor_game.jpg',
      title: '야외 인조잔디 네트 레크리에이션',
      category: '야외/족구',
      desc: '푸른 하늘 아래서 풍선과 공으로 즐기는 꿀잼 단체 게임!',
      tag: '☀️ 야외 액티비티',
    },
    {
      id: '14',
      src: '/activities/night_outdoor.jpg',
      title: '가로등 아래 야간 네트 스포츠',
      category: '야외/족구',
      desc: '선선한 밤공기 마시며 즐기는 낭만 가득 야외 매치!',
      tag: '🌙 야간 스포츠',
    },
    {
      id: '15',
      src: '/activities/crew_group.jpg',
      title: '활기찬 네트워크 단체 기념사진',
      category: '친목/뒤풀이',
      desc: '처음 만났어도 금방 절친이 되는 따뜻하고 유쾌한 동아리',
      tag: '📸 단체 사진',
    },
    {
      id: '16',
      src: '/activities/boardgame_fun.jpg',
      title: '테이블 미니게임 & 보드게임 친목',
      category: '친목/뒤풀이',
      desc: '운동 후 삼삼오오 모여 웃고 떠드는 재미있는 게임 타임',
      tag: '🎲 보드게임 친목',
    },
    {
      id: '17',
      src: '/activities/racket_fun.jpg',
      title: '라켓 뒤로 웃음꽃 피는 현장',
      category: '친목/뒤풀이',
      desc: '서먹함 1초 만에 해제! 언제나 편안하고 장난기 넘치는 모임',
      tag: '🎉 유쾌한 분위기',
    },
    {
      id: '18',
      src: '/activities/dinner.jpg',
      title: '운동 후 꿀맛 같은 고기 회식 & 친목',
      category: '친목/뒤풀이',
      desc: '땀 흘린 후 함께 즐기는 맛있는 음식과 유쾌한 대화',
      tag: '🥩 맛있는 뒤풀이',
    },
  ];

  const categories = ['전체', '배드민턴', '탁구', '야외/족구', '친목/뒤풀이'];

  const filteredPhotos =
    filter === '전체'
      ? photos
      : photos.filter((p) => p.category === filter);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Gallery Header */}
      <div className="bg-white p-6 rounded-3xl border-2 border-court-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-100 text-[#457a03] text-xs font-black mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#74c407]" />
            <span>네트워크 크루 현장 사진 (총 18컷)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0d3278] tracking-tight">
            네트워크 현장 둘러보기 📸
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            체육관 풀코트 세션, 힙한 네온 탁구장, 야외 네트 레크리에이션, 유쾌한 뒤풀이까지!
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-black border-2 transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-[#0d3278] text-white border-[#0d3278] shadow-md'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-white border-2 border-court-border p-4 rounded-2xl shadow-sm">
          <Users className="w-5 h-5 text-[#74c407] mx-auto mb-1.5" />
          <span className="block text-xs sm:text-sm font-black text-slate-800">초보 대환영</span>
          <span className="text-[11px] text-slate-500 font-medium">처음이어도 안심!</span>
        </div>
        <div className="bg-white border-2 border-court-border p-4 rounded-2xl shadow-sm">
          <Trophy className="w-5 h-5 text-emerald-500 mx-auto mb-1.5" />
          <span className="block text-xs sm:text-sm font-black text-slate-800">다양한 액티비티</span>
          <span className="text-[11px] text-slate-500 font-medium">배드민턴·탁구·야외</span>
        </div>
        <div className="bg-white border-2 border-court-border p-4 rounded-2xl shadow-sm">
          <Heart className="w-5 h-5 text-rose-500 mx-auto mb-1.5" />
          <span className="block text-xs sm:text-sm font-black text-slate-800">즐거운 친목</span>
          <span className="text-[11px] text-slate-500 font-medium">보드게임 & 맛집 회식</span>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative rounded-3xl overflow-hidden border-2 border-court-border bg-white cursor-pointer transition-all duration-300 hover:border-[#74c407] hover:shadow-xl hover:shadow-lime-500/15 hover:-translate-y-1"
          >
            {/* Image */}
            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Tag Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-black text-[#0d3278] shadow-sm">
                {photo.tag}
              </div>

              {/* Zoom hover indicator */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>

            {/* Content Bottom */}
            <div className="p-4 bg-white">
              <h3 className="font-black text-sm sm:text-base text-slate-800 group-hover:text-[#0d3278] transition-colors">
                {photo.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1 font-medium">
                {photo.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box to Apply */}
      <div className="rounded-3xl bg-gradient-to-r from-[#74c407] via-[#88d900] to-[#5ea102] p-7 text-center space-y-3 text-white shadow-xl shadow-lime-600/20 border-2 border-white">
        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#081d47]">
          “넘기는 건 공, 가까워지는 건 우리.”
        </h3>
        <p className="text-xs sm:text-sm font-bold text-lime-950/90 max-w-md mx-auto leading-relaxed">
          사진으로 보는 것보다 실제로 함께할 때 100배 더 신나요!<br />
          네트워크 3기에서 잊지 못할 추억을 만들어보세요.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={onGoToApply}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#0d3278] hover:bg-[#081d47] text-white font-black text-sm sm:text-base shadow-xl active:scale-[0.98] transition-all cursor-pointer border-2 border-white/40"
          >
            <span>네트워크 3기 지원서 작성하기</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden border-2 border-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-md transition cursor-pointer"
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

            <div className="p-5 bg-white flex items-center justify-between">
              <div>
                <span className="text-xs text-[#74c407] font-black block mb-1">
                  {selectedPhoto.tag}
                </span>
                <h4 className="text-base sm:text-lg font-black text-[#0d3278]">
                  {selectedPhoto.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedPhoto.desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedPhoto(null);
                  onGoToApply();
                }}
                className="shrink-0 px-4 py-2.5 rounded-xl bg-[#0d3278] hover:bg-[#081d47] text-white font-black text-xs flex items-center gap-1.5 transition cursor-pointer"
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
