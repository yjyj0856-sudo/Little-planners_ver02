import React, { useState, useRef } from 'react';
import { 
  Sparkles, BookOpen, Award, Phone, Mail, ArrowRight, ChevronLeft, ChevronRight, 
  Star, CheckCircle2, Menu, X, Send, Calendar, Flame, Layers, Quote, ArrowUpRight,
  User, Check, Heart, ExternalLink, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ==========================================
// DATA STRUCTURES
// ==========================================

const TIMELINE_STEPS = [
  {
    num: "01",
    title: "국제회의 기획자",
    period: "14년",
    desc: "14년 의료·과학 국제 학술대회를 설계하고 운영했습니다. 어른들의 가장 큰 무대를 만들어온 시간입니다."
  },
  {
    num: "02",
    title: "독서토론 리더",
    period: "3년",
    desc: "3년째 책을 매개로 사람의 생각을 끌어내는 현장에 서 있습니다. 기획이 교육으로 옮겨온 전환점입니다."
  },
  {
    num: "03",
    title: "도서관 AI×독서 교육",
    period: "현장 검증",
    desc: "AI북토피아를 비롯해 초등부터 성인까지, 전 계층을 대상으로 도서관 현장에서 검증을 쌓았습니다."
  },
  {
    num: "04",
    title: "어린이기획력 — 리틀플래너스",
    period: "도착점",
    desc: "리틀플래너스 먼저 기획하고, AI로 구현하는 교육 IP. 14년의 결론이자 도착점입니다."
  }
];

const CASES = [
  {
    id: 1,
    title: "중랑아트센터 SDGs 전시 (2025)",
    summary: "초등학생 15명이 기획 → 316명 관람 → 단 1.5일",
    desc: "아이들의 기획이 기관 규모의 결과물이 된 대표 사례입니다.",
    bgType: "mint", // mint vs lavender
    details: {
      theme: "어린이 눈으로 본 환경과 지속가능발전(SDGs)",
      method: "스스로 문제 인지 후 기획서 손작성 및 AI 이미지 렌더링",
      outcome: "현직 큐레이터들도 놀란 316명의 자발적 지역 주민 관람 성과"
    }
  },
  {
    id: 2,
    title: "AI북토피아 (2025, 중랑구 도서관)",
    summary: "대상별 맞춤형 설계 교육 프로그램",
    desc: "청소년은 북포스터, 초등은 북포트폴리오, 학부모는 독서로드맵. 같은 프로그램도 대상에 따라 완전히 다르게 설계합니다.",
    bgType: "lavender",
    details: {
      theme: "연령에 부합하는 개인 맞춤형 지식 구조화",
      method: "독서 토론과 데이터 연동 AI 마인드맵 구축",
      outcome: "학부모와 청소년 동시 높은 만족도 달성, 장기 위탁 모델 채택"
    }
  },
  {
    id: 3,
    title: "AI 독서토론리더 교육 (2026)",
    summary: "현직 리더 대상 전문가 마스터 코스",
    desc: "현직 리더 대상 · 오전/오후반 · 주 1회 · 총 8회. 가르치는 사람을 가르치는, 전문가 교육입니다.",
    bgType: "mint",
    details: {
      theme: "현직 독서토론 지도자 전문 역량 고도화",
      method: "8주간의 AI 융합 교육 설계 가이드 및 교수 모형 마스터",
      outcome: "도서관 및 아동 교육 현장에서 즉시 적용 가능한 자격 역량 부여"
    }
  },
  {
    id: 4,
    title: "초등 독서토론리더 동아리 '아로리'",
    summary: "리플쌤 직강의 2년차 지속형 동아리",
    desc: "리플쌤이 직접 지도하며 2년째 이어지고 있습니다. 일회성 특강이 아닌, 지속되는 프로그램입니다.",
    bgType: "lavender",
    details: {
      theme: "장기 독서 토론 및 지식 공유 아카이브",
      method: "어린이가 리더가 되어 직접 기획하고 토론 이끌기",
      outcome: "수동적 참여자가 아닌 능동적 기획자 성장을 입증하는 우수 모델"
    }
  },
  {
    id: 5,
    title: "서초 우면도서관 '생각나무' (2026)",
    summary: "AI 활용 연속 독후활동 프로젝트",
    desc: "AI 활용 독후활동 · 3개월 · 격주 운영. 정규 프로그램을 안정적으로 운영하는 역량입니다.",
    bgType: "mint",
    details: {
      theme: "3개월 정규 코스 독후 융합 포트폴리오",
      method: "독서 내용을 입체적으로 해석하여 책 속 아이디어를 현실로 기획",
      outcome: "도서관 정규 학기 연속 연장 개설 및 우수 활동 작품집 발간"
    }
  }
];

const ARTWORKS = [
  {
    concept: "KIDS CURATE",
    label: "초등",
    title: "「우리가 만든 SDGs 전시」",
    color: "from-blue-400 to-indigo-500",
    desc: "초등학생 15명이 주제 선정부터 동선 설계까지 직접 기획하고, AI로 전시 포스터와 도슨트 카드를 제작한 전시. 1.5일간 316명이 다녀갔습니다.",
    image: "https://postfiles.pstatic.net/MjAyNjA3MDJfNzEg/MDAxNzgyOTg3Mjk3OTg3.w2dEjt8N4gwIT_QCR2ZtWQgXRfATmEWLI8hIFYwEK78g.Q9hc_GSulCNddnqECUA1T75iozg09oklYrKwcg8Qslsg.PNG/u8222895863_Cheerful_3D_clay_render_illustration_of_a_small_c_d1e2ef9f-6a3f-.png?type=w3840"
  },
  {
    concept: "BOOK CREATOR",
    label: "청소년",
    title: "「나만의 북포스터 프로젝트」",
    color: "from-amber-400 to-emerald-500",
    desc: "책을 읽고 핵심 메시지를 스스로 뽑아 카피와 비주얼 콘셉트를 기획한 뒤, AI로 완성한 북포스터. 읽은 책이 한 장의 작품이 되는 경험입니다.",
    image: "https://postfiles.pstatic.net/MjAyNjA3MDJfMjgx/MDAxNzgyOTg3Mjk4MDI0.W6HDSxoSCP-_gFTtyriIMqvMPzhjvnZGprNmyP34c5kg.HcdSYpybqP1TkB3I9_aGM71FFNcMVjjZOGpZKcCsUJog.PNG/u8222895863_Cheerful_3D_clay_render_illustration_of_a_creativ_739173b5-a780-.png?type=w3840"
  },
  {
    concept: "MY FUTURE MAP",
    label: "고등",
    title: "「AI 진로 포트폴리오」",
    color: "from-purple-400 to-pink-500",
    desc: "자신의 강점과 관심사를 분석해 진로 방향을 직접 설계하고, AI로 자기소개 키비주얼과 포트폴리오 문서를 완성하는 프로젝트. 입시가 아니라, 인생 첫 기획서입니다.",
    image: "https://postfiles.pstatic.net/MjAyNjA3MDJfMjEy/MDAxNzgyOTg3Mjk4MDI4.nLxfqwyi5vVShArERhA_Ah4JtH3tDUioswKAvRyPnCYg.6kjmv7NDsU8YnF93KDU6J06l7Xvz_NETorQLn7B47G8g.PNG/u8222895863_Cheerful_3D_clay_render_illustration_of_a_glowing_dcc38d94-2dbf-.png?type=w3840"
  }
];

const PROCESS_STEPS = [
  {
    num: "1",
    bg: "bg-brand-mint/20 text-brand-deep-teal border-brand-mint",
    title: "독서와 생각 열기",
    desc: "책으로 주제를 만나고, 아이의 언어로 끌어냅니다."
  },
  {
    num: "2",
    bg: "bg-brand-yellow/20 text-yellow-800 border-brand-yellow",
    title: "AI를 '대화 상대'로 만나기",
    desc: "AI는 정답 기계가 아니라 사고의 출발점입니다."
  },
  {
    num: "3",
    bg: "bg-brand-amber/20 text-brand-amber border-brand-amber relative overflow-visible",
    title: "상상하고, 손으로 기획하기 ★",
    desc: "프롬프트를 직접 손으로 씁니다. 여기가 이 수업의 심장입니다.",
    isHeart: true
  },
  {
    num: "4",
    bg: "bg-purple-100 text-purple-700 border-purple-300",
    title: "AI로 구현하기",
    desc: "기획을 눈에 보이게 만드는 마지막 도구로 AI를 씁니다."
  },
  {
    num: "5",
    bg: "bg-emerald-100 text-emerald-700 border-emerald-300",
    title: "발표와 공유",
    desc: "자기 생각을 표현하고, 책임지는 경험으로 마무리합니다."
  }
];

const BLOG_POSTS = [
  {
    tag: "교육 철학",
    title: "선(先)기획 후(後)AI: 우리 아이들에게 코딩보다 생각 설계가 더 시급한 이유",
    date: "2026.06.28",
    readTime: "5 min read",
    link: "https://blog.naver.com/littleplanners"
  },
  {
    tag: "수업 현장",
    title: "초등생 15명의 아이디어가 316명 관람 SDGs 전시회로 재탄생하기까지의 1.5일간의 기록",
    date: "2026.06.14",
    readTime: "7 min read",
    link: "https://blog.naver.com/littleplanners"
  },
  {
    tag: "도서관 소식",
    title: "서초 우면도서관 '생각나무' 정규 클래스 마감 후기 및 학부모 피드백 요약",
    date: "2026.05.30",
    readTime: "4 min read",
    link: "https://blog.naver.com/littleplanners"
  }
];

// ==========================================
// REUSABLE BRAND LOGO COMPONENT
// ==========================================
function BrandLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className} select-none shrink-0`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_2px_4px_rgba(43,170,177,0.3)]">
        <circle cx="50" cy="50" r="45" fill="#2BAAB1" />
        <g transform="rotate(-6 50 50)">
          <text 
            x="50" 
            y="41" 
            textAnchor="middle" 
            fill="#F5D410" 
            style={{ fontFamily: "'GmarketSans', 'Outfit', sans-serif", fontWeight: 900, fontSize: "17.5px", letterSpacing: "-0.5px" }}
          >
            Little
          </text>
          <text 
            x="50" 
            y="63" 
            textAnchor="middle" 
            fill="#F5D410" 
            style={{ fontFamily: "'GmarketSans', 'Outfit', sans-serif", fontWeight: 900, fontSize: "17.5px", letterSpacing: "-0.5px" }}
          >
            Planners
          </text>
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// REUSABLE MASCOT COMPONENT (WITH AUTOMATIC BACKGROUND REMOVAL)
// ==========================================
const processedImageCache: { [url: string]: string } = {};

function useProcessedMascot(imageUrl: string) {
  const [processedUrl, setProcessedUrl] = React.useState<string>(processedImageCache[imageUrl] || imageUrl);

  React.useEffect(() => {
    if (processedImageCache[imageUrl]) {
      setProcessedUrl(processedImageCache[imageUrl]);
      return;
    }

    let isMounted = true;
    
    // We use CORS proxies to bypass origin restrictions and load the image into a canvas
    const proxies = [
      (url: string) => `https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=${encodeURIComponent(url)}`,
      (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
    ];

    async function processImage() {
      for (const proxyFn of proxies) {
        if (!isMounted) return;
        try {
          const proxiedUrl = proxyFn(imageUrl);
          const img = new Image();
          img.crossOrigin = "anonymous";
          
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(new Error("Failed to load image"));
            img.src = proxiedUrl;
          });

          if (!isMounted) return;

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("Could not get 2D context");

          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          const width = canvas.width;
          const height = canvas.height;

          // Flood fill logic starting from boundaries to eliminate the grey/white checkered pattern
          const visited = new Uint8Array(width * height);
          const queue: number[] = [];

          // Helper to check if color matches the light background checkers (gray and white)
          const isLightColor = (r: number, g: number, b: number, a: number) => {
            if (a < 5) return true;
            return r > 180 && g > 180 && b > 180;
          };

          const addPixel = (x: number, y: number) => {
            if (x < 0 || x >= width || y < 0 || y >= height) return;
            const idx = y * width + x;
            if (visited[idx]) return;
            visited[idx] = 1;

            const rIdx = idx * 4;
            const r = data[rIdx];
            const g = data[rIdx + 1];
            const b = data[rIdx + 2];
            const a = data[rIdx + 3];

            if (isLightColor(r, g, b, a)) {
              queue.push(idx);
            }
          };

          // Seed all edges
          for (let x = 0; x < width; x++) {
            addPixel(x, 0);
            addPixel(x, height - 1);
          }
          for (let y = 0; y < height; y++) {
            addPixel(0, y);
            addPixel(width - 1, y);
          }

          let head = 0;
          while (head < queue.length) {
            const idx = queue[head++];
            const rIdx = idx * 4;
            data[rIdx + 3] = 0; // Set Alpha to 0

            const x = idx % width;
            const y = Math.floor(idx / width);

            addPixel(x + 1, y);
            addPixel(x - 1, y);
            addPixel(x, y + 1);
            addPixel(x, y - 1);
          }

          ctx.putImageData(imageData, 0, 0);
          const resultUrl = canvas.toDataURL("image/png");
          processedImageCache[imageUrl] = resultUrl;
          
          if (isMounted) {
            setProcessedUrl(resultUrl);
          }
          break;
        } catch (err) {
          console.warn("Proxy processing failed, trying next...", err);
        }
      }
    }

    processImage();

    return () => {
      isMounted = false;
    };
  }, [imageUrl]);

  return processedUrl;
}

function MascotCharacter({ text, className = "" }: { text: string; className?: string }) {
  const imageUrl = "https://postfiles.pstatic.net/MjAyNjA3MDJfMTQ1/MDAxNzgyOTg2MTQ0OTgy.CBJHlWXKX38zd6whuC_3kO2okw-DFxB0ivzw34ReOIAg.7Wgp9aeZTRknZBPmKevZKJlcBn7FB5rxwLCI35gJodQg.PNG/ChatGPT_Image_2026%EB%85%84_7%EC%9B%94_2%EC%9D%BC_%EC%98%A4%ED%9B%84_06_55_08.png?type=w3840";
  const processedUrl = useProcessedMascot(imageUrl);

  return (
    <div className={`relative flex flex-col items-center justify-center ${className} select-none group`}>
      {/* Soft shadow */}
      <motion.div 
        className="absolute bottom-4 w-2/3 h-2.5 bg-black/5 rounded-full blur-xs"
        animate={{
          scaleX: [0.9, 1.15, 0.9],
          opacity: [0.4, 0.15, 0.4],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Main mascot body with gentle bobbing/hover animation */}
      <motion.div 
        className="relative w-28 h-28 md:w-36 md:h-36 cursor-pointer"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
        whileTap={{ scale: 0.95 }}
      >
        <img 
          src={processedUrl} 
          alt="리플 캐릭터"
          className="w-full h-full object-contain drop-shadow-[0_4px_6px_rgba(30,42,56,0.12)]"
          referrerPolicy="no-referrer"
        />

        {/* Floating decorative badge "AI★" */}
        <motion.div 
          className="absolute top-2 right-2 text-white bg-[#2BAAB1] text-[9px] px-1.5 py-0.5 rounded-full font-bold border border-white shadow-sm transform rotate-12 scale-90"
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          AI★
        </motion.div>
      </motion.div>

      {/* Brand Text Badge below character */}
      <motion.span 
        className="mt-3 text-xs font-display font-bold tracking-wider text-brand-navy bg-white px-3 py-1 rounded-full border border-gray-150 shadow-sm relative z-10 block"
        whileHover={{ scale: 1.05, backgroundColor: "#E6F6F6" }}
      >
        {text}
      </motion.span>
    </div>
  );
}

export default function App() {
  const [selectedCase, setSelectedCase] = useState<typeof CASES[0] | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: 'yjyj0856@gmail.com', content: '', org: '도서관' });
  const [submitted, setSubmitted] = useState(false);

  // For artwork horizontal scroll
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 1.5 : scrollLeft + clientWidth / 1.5;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsInquiryOpen(false);
      // Reset
      setFormData({ name: '', phone: '', email: 'yjyj0856@gmail.com', content: '', org: '도서관' });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-brand-off-white text-gray-800 font-sans antialiased overflow-x-hidden selection:bg-brand-mint selection:text-white">
      
      {/* ==========================================
          HEADER / NAVIGATION
          ========================================== */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-brand-off-white/85 border-b border-gray-100 px-4 md:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <BrandLogo className="w-11 h-11 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
            <div>
              <span className="font-display text-lg font-bold text-brand-navy block leading-none">리틀플래너스</span>
              <span className="text-[10px] text-brand-deep-teal font-medium uppercase tracking-widest block mt-0.5">Little Planners</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-brand-navy/80">
            <a href="#about" className="hover:text-brand-mint transition-colors">어린이기획자란</a>
            <a href="#timeline" className="hover:text-brand-mint transition-colors">기획자의 길</a>
            <a href="#cases" className="hover:text-brand-mint transition-colors">운영 사례</a>
            <a href="#gallery" className="hover:text-brand-mint transition-colors">아이들 결과물</a>
            <a href="#process" className="hover:text-brand-mint transition-colors">수업 프로세스</a>
          </nav>

          {/* Header Action Button */}
          <div className="flex items-center gap-3">
            <a 
              href="https://blog.naver.com/littleplanners" 
              target="_blank" 
              rel="noreferrer" 
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 border border-brand-navy/20 text-brand-navy hover:bg-brand-navy/5 text-sm font-medium rounded-full transition-all"
            >
              학부모 안내 <ExternalLink size={14} />
            </a>
            <button 
              onClick={() => setIsInquiryOpen(true)}
              className="px-5 py-2.5 bg-brand-deep-teal text-white hover:bg-opacity-95 text-sm font-medium rounded-full shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer"
            >
              기관 협업 문의
            </button>
          </div>

        </div>
      </header>

      {/* ==========================================
          1. HERO SECTION
          ========================================== */}
      <section id="hero" className="relative dotted-grid bg-brand-off-white pt-12 pb-20 md:py-28 px-4 md:px-8 overflow-hidden border-b border-gray-100">
        {/* Floating wavy vector paths in background */}
        <div className="absolute top-1/4 right-5 w-48 h-48 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-brand-mint stroke-2 stroke-dasharray-[4,4]">
            <path d="M10,50 Q40,20 70,80 T130,10" />
          </svg>
        </div>
        <div className="absolute bottom-10 left-10 w-36 h-36 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-brand-amber stroke-2 stroke-dasharray-[4,4]">
            <path d="M0,20 Q30,80 60,30 T120,70" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Mascot peeking (Leaning over a shape on left/top on mobile, left on desktop) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex justify-center lg:justify-start order-2 lg:order-1 relative"
          >
            <div className="relative bg-brand-mint/10 border-2 border-dashed border-brand-mint/40 rounded-[40px] p-8 pb-12 w-full max-w-sm flex flex-col items-center">
              {/* Absolute Mascot */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 lg:left-2/3 lg:translate-x-0">
                <MascotCharacter text="리플" />
              </div>
              
              {/* Cute Speech Bubble */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-12 text-center bg-white border border-brand-navy text-brand-navy text-sm font-semibold rounded-2xl px-5 py-3 shadow-sm relative"
              >
                반가워요! 리플이에요 👋
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-brand-navy rotate-45"></div>
              </motion.div>

              {/* Box Contents */}
              <div className="mt-6 text-center">
                <h4 className="font-display font-bold text-brand-navy">리틀플래너스 교육</h4>
                <p className="text-xs text-brand-deep-teal font-medium mt-1">도서관·미술관 검증 프로그램</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <span className="text-[11px] bg-white border border-gray-100 text-gray-600 px-2.5 py-1 rounded-full">#선기획후AI</span>
                  <span className="text-[11px] bg-white border border-gray-100 text-gray-600 px-2.5 py-1 rounded-full">#SDGs융합</span>
                  <span className="text-[11px] bg-white border border-gray-100 text-gray-600 px-2.5 py-1 rounded-full">#주도적기획력</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hero Texts */}
          <div className="lg:col-span-8 space-y-6 order-1 lg:order-2 text-center lg:text-left">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-mint/15 text-brand-deep-teal text-xs font-bold uppercase tracking-wider"
            >
              <Sparkles size={12} className="text-brand-mint" /> NEW PARADIGM OF EDUCATION
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extrabold text-[36px] sm:text-[48px] lg:text-[62px] leading-[1.1] text-brand-navy tracking-tight max-w-3xl"
            >
              AI 시대의 진짜 실력은,<br className="hidden sm:inline" /> <span className="text-brand-mint underline decoration-brand-yellow decoration-wavy decoration-3 underline-offset-8">어린이 기획력</span>입니다
            </motion.h1>

            {/* Subheading emphasizing statistics */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="p-4 sm:p-5 bg-white border-l-4 border-brand-mint rounded-r-2xl shadow-sm inline-block max-w-2xl text-left"
            >
              <p className="text-[15px] sm:text-[18px] text-gray-700 leading-relaxed">
                초등학생 <strong className="text-brand-deep-teal text-lg sm:text-xl">15명</strong>이 직접 기획한 전시에, <strong className="text-brand-deep-teal text-lg sm:text-xl">316명</strong>이 다녀갔습니다.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4"
            >
              <motion.button 
                onClick={() => setIsInquiryOpen(true)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-brand-deep-teal hover:bg-brand-deep-teal/95 text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                🟢 기관 협업 문의하기 <ArrowRight size={18} />
              </motion.button>
              <motion.a 
                href="https://blog.naver.com/littleplanners" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 border-2 border-brand-navy/15 text-brand-navy hover:bg-brand-navy/5 font-bold rounded-full transition-all flex items-center gap-2"
              >
                ⚪ 학부모 안내 보기
              </motion.a>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ==========================================
          2. 기획자의 길 (LIGHT SECTION)
          ========================================== */}
      <section id="timeline" className="py-20 px-4 md:px-8 bg-brand-off-white">
        <div className="max-w-6xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-16"
          >
            <span className="text-xs font-bold text-brand-mint uppercase tracking-widest block">FOUNDER'S BACKGROUND</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-[44px] leading-tight text-brand-navy max-w-3xl mx-auto">
              국제회의를 기획하던 사람이, <br className="hidden sm:inline"/>이제 아이들의 첫 기획을 돕습니다
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              어린이기획력은 갑자기 시작한 신사업이 아닙니다. <br className="hidden sm:inline" />
              <strong className="text-brand-navy">14년 기획 커리어</strong>가 자연스럽게 도착한 자리입니다.
            </p>
          </motion.div>

          {/* Timeline Process */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Dashed Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[135px] left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-brand-mint/40 z-0"></div>

            {TIMELINE_STEPS.map((step, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02, boxShadow: "0 10px 25px -5px rgba(43, 170, 177, 0.1)" }}
                className="bg-white border border-gray-150 rounded-[28px] p-6 shadow-sm hover:shadow-md transition-all relative z-10 flex flex-col justify-between min-h-[260px] group cursor-pointer"
              >
                <div>
                  {/* Floating badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-4xl font-display font-extrabold text-brand-mint/20 group-hover:text-brand-mint/40 transition-colors">
                      {step.num}
                    </span>
                    <span className="bg-brand-mint/10 text-brand-deep-teal text-xs font-bold px-2.5 py-1 rounded-full">
                      {step.period}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-navy mb-2.5 group-hover:text-brand-mint transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {/* Arrow indicator at the step end for timeline flow */}
                <div className="mt-4 flex justify-end md:hidden">
                  <span className="text-brand-mint text-sm">↓ 다음 단계</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-14 text-center bg-brand-mint/5 py-4 px-6 rounded-2xl border border-brand-mint/20 max-w-lg mx-auto"
          >
            <p className="text-brand-deep-teal font-bold text-[16px] sm:text-[18px]">
              " 기획을 가르치는 사람이, 진짜 기획자입니다. "
            </p>
          </motion.div>

        </div>
      </section>

      {/* ==========================================
          3. 어린이기획자란 (MINT TINTED BAND)
          ========================================== */}
      <section id="about" className="py-16 px-4 md:px-8 bg-brand-mint/10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <div className="w-12 h-12 rounded-full bg-brand-mint/20 flex items-center justify-center mx-auto mb-2 text-brand-mint">
            <HelpCircle size={24} />
          </div>
          
          <h2 className="font-display font-extrabold text-2xl sm:text-[34px] text-brand-navy">
            AI 체험 수업이 아닙니다. '어린이기획력' 교육입니다.
          </h2>
          
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            리틀플래너스의 중심은 AI가 아니라 아이의 기획력입니다. <br className="hidden sm:inline" />
            AI도, SDGs도, 독서도 — 모두 그 목표를 위한 도구일 뿐입니다.
          </p>

          {/* Philosophy Accent Quote Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="my-8 py-8 px-6 sm:px-12 bg-white border border-brand-navy rounded-[30px] shadow-sm relative overflow-hidden inline-block text-left max-w-2xl cursor-pointer"
          >
            {/* Absolute quote marks */}
            <Quote className="absolute -top-1 -left-1 text-gray-100 w-16 h-16 pointer-events-none" />
            
            <p className="font-display font-extrabold text-2xl sm:text-3xl text-brand-navy leading-tight text-center relative z-10">
              <span className="relative z-10 inline-block">
                선(先)기획, 후(後) AI.
                <span className="absolute bottom-0.5 left-0 w-full h-3 bg-brand-yellow/80 -z-10 rounded-full"></span>
              </span>
            </p>
            <p className="text-gray-600 text-sm sm:text-base mt-4 text-center font-medium relative z-10">
              먼저 생각하고 구조화한 뒤, AI로 구현합니다.
            </p>
          </motion.div>

          <div className="pt-2">
            <motion.a 
              href="https://blog.naver.com/littleplanners" 
              target="_blank" 
              rel="noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-brand-navy hover:text-white border border-brand-navy/20 text-brand-navy text-[15px] font-bold rounded-full transition-all shadow-sm"
            >
              이 철학이 궁금하시다면 → <span className="text-brand-deep-teal font-extrabold hover:text-brand-yellow">블로그: '선기획 후AI' 이야기 읽기</span>
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          4. 운영 사례 (NAVY DARK SECTION)
          ========================================== */}
      <section id="cases" className="py-20 px-4 md:px-8 bg-brand-navy text-white relative">
        <div className="max-w-7xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6"
          >
            <div className="space-y-4">
              <span className="text-xs font-bold text-brand-mint uppercase tracking-widest block">PROVEN RESULTS</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-[42px] leading-tight text-white">
                말이 아니라, <span className="text-brand-mint">결과</span>로 보여드립니다
              </h2>
            </div>
            {/* Neon stats row */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-wrap gap-8 bg-white/5 border border-white/10 rounded-3xl p-6"
            >
              <div className="space-y-1">
                <span className="text-[11px] text-gray-400 block font-medium">참여 인원</span>
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-brand-yellow block">15명 기획</span>
              </div>
              <div className="w-[1px] bg-white/10 hidden sm:block"></div>
              <div className="space-y-1">
                <span className="text-[11px] text-gray-400 block font-medium">실제 관람객</span>
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-brand-mint block">316명 관람</span>
              </div>
              <div className="w-[1px] bg-white/10 hidden sm:block"></div>
              <div className="space-y-1">
                <span className="text-[11px] text-gray-400 block font-medium">전시 운영 기간</span>
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-white block">1.5일</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Cases grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASES.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02, 
                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)" 
                }}
                className={`rounded-[28px] p-8 border border-white/5 shadow-md flex flex-col justify-between min-h-[300px] transition-all cursor-pointer ${
                  item.bgType === 'mint' 
                    ? 'bg-brand-mint text-brand-navy' 
                    : 'bg-white/10 text-white'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                      item.bgType === 'mint' ? 'bg-white/40 text-brand-navy' : 'bg-white/15 text-brand-mint'
                    }`}>
                      CASE 0{item.id}
                    </span>
                  </div>
                  
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl mb-3 leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className={`text-sm font-bold mb-4 ${
                    item.bgType === 'mint' ? 'text-brand-deep-teal' : 'text-brand-yellow'
                  }`}>
                    {item.summary}
                  </p>
                  
                  <p className={`text-sm leading-relaxed mb-6 ${
                    item.bgType === 'mint' ? 'text-brand-navy/85' : 'text-gray-300'
                  }`}>
                    {item.desc}
                  </p>
                </div>

                <motion.button 
                  onClick={() => setSelectedCase(item)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3.5 rounded-full font-bold text-sm tracking-wide transition-all cursor-pointer ${
                    item.bgType === 'mint' 
                      ? 'bg-brand-navy text-white hover:bg-brand-navy/90' 
                      : 'bg-white text-brand-navy hover:bg-gray-100'
                  }`}
                >
                  자세히 보기
                </motion.button>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          5. 결과물 갤러리 (LIGHT SECTION WITH SCROLL CAROUSEL)
          ========================================== */}
      <section id="gallery" className="py-20 px-4 md:px-8 bg-brand-off-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="text-xs font-bold text-brand-mint uppercase tracking-widest block">CREATIVE PORTFOLIOS</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-[42px] leading-tight text-brand-navy">
                이런 발상은, <br className="inline sm:hidden"/>AI가 먼저 줄 수 없습니다
              </h2>
              <p className="text-gray-500 text-sm sm:text-base font-medium">
                학년이 오를수록, 기획은 깊어집니다
              </p>
            </motion.div>
            
            {/* Custom slider controls */}
            <div className="flex gap-2">
              <motion.button 
                onClick={() => scroll('left')}
                whileHover={{ scale: 1.1, backgroundColor: "#E6F6F6" }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full border border-brand-navy/15 flex items-center justify-center hover:bg-brand-navy/5 text-brand-navy transition-all cursor-pointer bg-white shadow-xs"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button 
                onClick={() => scroll('right')}
                whileHover={{ scale: 1.1, backgroundColor: "#E6F6F6" }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full border border-brand-navy/15 flex items-center justify-center hover:bg-brand-navy/5 text-brand-navy transition-all cursor-pointer bg-white shadow-xs"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>

          {/* Scrolling Container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            {ARTWORKS.map((art, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -6, scale: 1.01, boxShadow: "0 15px 30px -10px rgba(0,0,0,0.1)" }}
                className="min-w-[280px] sm:min-w-[360px] md:min-w-[400px] snap-start bg-white rounded-[28px] border border-gray-150 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
              >
                {/* Visual Representation box with actual image & premium styling */}
                <div className="h-[240px] relative overflow-hidden bg-brand-navy">
                  <img 
                    src={art.image} 
                    alt={art.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Premium overlay gradient for maximum text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40 z-2"></div>
                  
                  <span className="absolute top-6 left-6 text-[10px] font-bold text-white bg-brand-navy/70 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider z-10 border border-white/10">
                    CONCEPT: {art.concept}
                  </span>

                  <span className="absolute bottom-6 right-6 text-xs font-bold text-white bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-md z-10">
                    리틀플래너스 AI 시각화
                  </span>
                </div>

                {/* Info Text */}
                <div className="p-6 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-brand-mint text-xs font-bold">{art.label}</span>
                      <h4 className="font-display font-extrabold text-lg text-brand-navy mt-0.5">
                        {art.title}
                      </h4>
                    </div>
                    {/* Small button inside */}
                    <motion.button 
                      whileHover={{ scale: 1.1, rotate: 45 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-brand-off-white hover:bg-brand-mint/20 text-brand-navy hover:text-brand-deep-teal transition-all flex items-center justify-center cursor-pointer"
                    >
                      <ArrowUpRight size={18} />
                    </motion.button>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {art.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center space-y-4 max-w-2xl mx-auto"
          >
            <p className="text-gray-600 text-sm sm:text-base font-medium">
              아이의 머릿속에서 먼저 태어난 상상을, AI는 그림으로 옮겼을 뿐입니다.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ==========================================
          6. 수업 프로세스 (NAVY DARK SECTION)
          ========================================== */}
      <section id="process" className="py-20 px-4 md:px-8 bg-brand-navy text-white relative">
        <div className="max-w-6xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-16"
          >
            <span className="text-xs font-bold text-brand-mint uppercase tracking-widest block">HOW WE TEACH</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-[42px] leading-tight text-white">
              즉흥이 아니라, 설계된 5단계입니다
            </h2>
          </motion.div>

          {/* Process Row */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -8, scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                className={`bg-white/5 border border-white/10 rounded-[28px] p-6 flex flex-col justify-between min-h-[220px] transition-all relative cursor-pointer ${
                  step.isHeart ? 'ring-2 ring-brand-yellow/80 bg-white/10 scale-102 shadow-lg shadow-brand-yellow/5' : ''
                }`}
              >
                {step.isHeart && (
                  <span className="absolute -top-3 left-6 bg-brand-yellow text-brand-navy text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1 animate-pulse">
                    <Star size={10} fill="currentColor" /> CORE STEP
                  </span>
                )}

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-display font-extrabold text-sm text-brand-mint">
                      {step.num}
                    </span>
                    {step.isHeart && <Heart size={16} className="text-brand-yellow fill-brand-yellow" />}
                  </div>

                  <h3 className="font-display font-bold text-[16px] sm:text-[18px] text-white mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-brand-mint">
                  <span>프로세스 순서</span>
                  <ArrowRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          7. 대표 프로필 (LIGHT SECTION)
          ========================================== */}
      <section id="founder" className="py-20 px-4 md:px-8 bg-brand-off-white">
        <div className="max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Left Photo Placeholder & Stylized Avatar */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="md:col-span-4 flex flex-col items-center"
            >
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-brand-mint/10 border-4 border-brand-navy p-2 flex items-center justify-center shadow-lg group">
                {/* Floating elements representing curriculum */}
                <motion.div 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-white border border-brand-navy flex items-center justify-center shadow-sm select-none"
                >
                  <span className="text-sm">🗓️</span>
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-brand-yellow border border-brand-navy flex items-center justify-center shadow-sm font-bold text-xs text-brand-navy select-none"
                >
                  14Y+
                </motion.div>

                {/* Inner stylized human avatar drawing (Riffle Coach representation) */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-brand-mint via-brand-mint/50 to-brand-deep-teal overflow-hidden flex items-center justify-center relative">
                  {/* Stylized face vector placeholder */}
                  <div className="w-24 h-24 bg-white/90 rounded-full border-2 border-brand-navy flex flex-col items-center justify-center shadow-inner relative">
                    {/* Glasses */}
                    <div className="flex gap-2 mb-1.5">
                      <div className="w-6 h-6 border-2 border-brand-navy rounded-full bg-white/40"></div>
                      <div className="w-6 h-6 border-2 border-brand-navy rounded-full bg-white/40"></div>
                    </div>
                    {/* Smiling expression */}
                    <div className="w-4 h-2 border-b-2 border-brand-navy rounded-b-full"></div>
                    {/* Little hair ribbon */}
                    <div className="absolute -top-2 w-10 h-3 bg-brand-navy rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <span className="mt-4 font-display font-bold text-brand-navy text-lg">김연주 대표</span>
              <span className="text-xs text-brand-deep-teal font-semibold">리틀플래너스 디렉터</span>
            </motion.div>

            {/* Right details */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="md:col-span-8 space-y-6"
            >
              <span className="text-xs font-bold text-brand-mint uppercase tracking-widest block">INSTRUCTOR PROFILE</span>
              
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-navy leading-snug">
                김연주 (리플쌤) — 14년 국제회의 기획자, <br className="hidden sm:inline" />
                그리고 초5 아이의 엄마
              </h2>

              {/* Badges list */}
              <div className="flex flex-wrap gap-2 pt-2">
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-1 bg-brand-yellow/15 text-yellow-800 border border-brand-yellow/30 text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer"
                >
                  ★ Google Gemini 공인 교육자 (Certified Educator)
                </motion.span>
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-1 bg-brand-mint/15 text-brand-deep-teal border border-brand-mint/20 text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer"
                >
                  ★ 컨벤션기획사 2급
                </motion.span>
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-100 text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer"
                >
                  ★ AI 콘텐츠 전문가 인증
                </motion.span>
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 border border-gray-200 text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer"
                >
                  ★ 상표 등록 제40-2025-0164692호
                </motion.span>
              </div>

              {/* Lecture experience */}
              <div className="p-5 bg-white border border-gray-150 rounded-2xl shadow-sm">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">대표 출강 및 파트너십</h4>
                <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed">
                  <strong>SeSAC · 인천대학교 · KINTEX</strong> 등에서 AI×MICE 성인 교육을 진행하고 있습니다. 전문가 대상 교육부터 어린이를 위한 정규 클래스까지, 모든 과정은 실전적 역량을 근간으로 설계됩니다.
                </p>
              </div>

              <p className="text-brand-navy/90 text-sm sm:text-base font-medium">
                " 전문성과 진심, 두 가지 모두로 아이들을 만납니다. "
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ==========================================
          8. 학부모 섹션 (WARM OFF-WHITE WITH AMBER ACCENTS)
          ========================================== */}
      <section id="parents" className="py-20 px-4 md:px-8 bg-amber-50/50 border-t border-b border-amber-100">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <span className="text-xs font-bold text-brand-amber uppercase tracking-widest block">FOR DEAR PARENTS</span>
          
          <h2 className="font-display font-extrabold text-2xl sm:text-[36px] text-brand-navy leading-tight">
            AI에게 휘둘리는 아이가 아니라, <br className="hidden sm:inline"/>
            <span className="text-brand-amber relative">
              AI를 부리는 아이로
              <span className="absolute bottom-1 left-0 w-full h-2.5 bg-brand-yellow/40 -z-10 rounded-full"></span>
            </span>
          </h2>

          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="p-6 sm:p-8 bg-white border border-brand-amber/20 rounded-[32px] shadow-sm max-w-3xl mx-auto text-left space-y-4"
          >
            <p className="text-brand-navy text-sm sm:text-[15px] font-bold leading-relaxed">
              수업이 끝난 뒤 아이가 이렇게 말합니다. "내가 생각한 걸 AI가 그려줬어!"
            </p>
            <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed">
              순서가 중요합니다. AI가 먼저가 아니라, 아이의 생각이 먼저입니다. <br />
              리틀플래너스에서 아이들은 질문하고, 계획하고, 표현하는 법을 배웁니다. <br />
              그 힘은 AI가 아무리 발전해도 대체되지 않습니다.
            </p>
          </motion.div>

          <div className="pt-2">
            <motion.a 
              href="https://blog.naver.com/littleplanners" 
              target="_blank" 
              rel="noreferrer" 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-amber hover:bg-brand-amber/95 text-white font-bold rounded-full transition-all shadow-sm cursor-pointer"
            >
              수업 현장 이야기 보러 가기 → 네이버 블로그
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          9. 기관 협업 안내 (MINT GRADIENT BAND)
          ========================================== */}
      <section id="cooperation" className="py-20 px-4 md:px-8 bg-gradient-to-br from-brand-mint to-brand-deep-teal text-white relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left mascot info */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 flex flex-col items-center text-center lg:text-left lg:items-start space-y-6"
            >
              
              <div className="relative">
                <MascotCharacter text="리플 협업" />
                <motion.div 
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-3 -right-6 bg-brand-navy border border-white text-white text-[10px] font-bold px-2.5 py-1 rounded-full select-none"
                >
                  안녕! 함께해요! 🤝
                </motion.div>
              </div>

              <div className="space-y-3">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  함께 그려볼 수 있는 <br/>부분이 많습니다
                </h3>
                <p className="text-xs sm:text-sm text-white/90">
                  도서관·문화재단·청소년기관과 함께합니다
                </p>
              </div>

              <p className="text-xs sm:text-sm text-gray-100 leading-relaxed max-w-sm">
                리틀플래너스는 기관 프로그램 위탁 모델로 운영됩니다. 특강부터 정규 프로그램, 전시형 프로젝트까지 — 기관의 목표와 예산에 맞춰 유연하게 조율 가능합니다.
              </p>

              {/* Direct call metadata */}
              <div className="pt-2 text-xs text-brand-yellow font-bold space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <Mail size={14} /> <span>📩 yjyj0856@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} /> <span>📞 010-8349-1155</span>
                </div>
              </div>
            </motion.div>

            {/* Right formats & Action */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-7 space-y-8"
            >
              
              {/* Cooperation formats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div 
                  whileHover={{ y: -6, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  className="bg-white/10 border border-white/15 p-5 rounded-2xl cursor-pointer transition-all"
                >
                  <span className="text-xl block mb-2">💡</span>
                  <h4 className="font-bold text-sm text-white mb-1">단발 특강 · 워크숍</h4>
                  <p className="text-[11px] text-gray-200">기획력 기초와 AI 도구 체험을 압축적으로 설계</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -6, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  className="bg-white/10 border border-white/15 p-5 rounded-2xl cursor-pointer transition-all"
                >
                  <span className="text-xl block mb-2">🗓️</span>
                  <h4 className="font-bold text-sm text-white mb-1">정규 프로그램</h4>
                  <p className="text-[11px] text-gray-200">4~12회차 수준의 체계적 포트폴리오 기획</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -6, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  className="bg-white/10 border border-white/15 p-5 rounded-2xl cursor-pointer transition-all"
                >
                  <span className="text-xl block mb-2">🎨</span>
                  <h4 className="font-bold text-sm text-white mb-1">전시·발표형 프로젝트</h4>
                  <p className="text-[11px] text-gray-200">주민들이 참여 가능한 공공 전시 성과 연계</p>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-brand-navy border border-white/10 rounded-3xl p-6 text-center space-y-4 shadow-xl"
              >
                <p className="text-sm font-semibold text-brand-mint">
                  협업 제안서 및 커리큘럼 소개서를 받아보시겠습니까?
                </p>
                <motion.button 
                  onClick={() => setIsInquiryOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 bg-brand-yellow hover:bg-yellow-400 text-brand-navy font-extrabold rounded-full transition-all shadow-md flex items-center gap-2 mx-auto cursor-pointer text-sm"
                >
                  <Send size={16} /> 간단 문의 남기기
                </motion.button>
              </motion.div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* ==========================================
          10. 블로그 + FOOTER (NAVY DARK SECTION)
          ========================================== */}
      <section id="blog" className="py-20 px-4 md:px-8 bg-brand-navy text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-14"
          >
            <span className="text-xs font-bold text-brand-mint uppercase tracking-widest block">LATEST INSIGHTS</span>
            <h2 className="font-display font-extrabold text-3xl text-white">
              지금도, 현장에서 운영 중입니다
            </h2>
            <p className="text-sm text-gray-400">
              리틀플래너스의 수업과 아이들의 성장은 블로그에 기록됩니다.
            </p>
            <div className="pt-1">
              <a 
                href="https://blog.naver.com/littleplanners" 
                target="_blank" 
                rel="noreferrer" 
                className="text-brand-mint hover:text-white font-bold inline-flex items-center gap-1 text-sm underline decoration-brand-mint underline-offset-4"
              >
                네이버 블로그 littleplanners 최신 글 보기 →
              </a>
            </div>
          </motion.div>

          {/* Blog cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {BLOG_POSTS.map((post, idx) => (
              <motion.a 
                key={idx}
                href={post.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6, backgroundColor: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(43, 170, 177, 0.4)" }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] bg-brand-mint/15 text-brand-mint font-bold px-2.5 py-0.5 rounded-full">
                      {post.tag}
                    </span>
                    <span className="text-[11px] text-gray-400">{post.date}</span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-brand-yellow transition-colors leading-snug">
                    {post.title}
                  </h4>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                  <span>{post.readTime}</span>
                  <span className="text-brand-mint font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                    자세히 읽기 →
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Footer separator */}
          <div className="w-full h-[1px] bg-white/10 mb-10"></div>

          {/* Footer content */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <BrandLogo className="w-10 h-10" />
                <h4 className="font-display font-extrabold text-lg text-white leading-none">
                  리틀플래너스 <span className="text-brand-mint block sm:inline sm:ml-1 text-sm font-normal">Little Planners</span>
                </h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-lg">
                플랜킷 스튜디오 · 책에서 시작해, 기획으로 — 도서관에서 검증한 어린이기획력
              </p>
              <p className="text-[11px] text-gray-500">
                상표등록 제40-2025-0164692호 | 이메일: yjyj0856@gmail.com | 연락처: 010-8349-1155
              </p>
            </div>
            <div className="text-left md:text-right space-y-1">
              <p className="text-xs text-gray-400">
                © PLANKIT Studio. All rights reserved.
              </p>
              <p className="text-[10px] text-gray-500">
                본 웹사이트의 콘텐츠 및 교육 설계 IP에 대한 지식재산권은 플랜킷 스튜디오에 있습니다.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          CASE STUDY POPUP MODAL
          ========================================== */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
            ></motion.div>

            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white border-2 border-brand-navy rounded-[32px] p-6 sm:p-8 max-w-xl w-full shadow-2xl relative z-10 text-brand-navy"
            >
              <button 
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-brand-off-white hover:bg-gray-100 flex items-center justify-center text-brand-navy transition-all active:scale-90 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="space-y-5">
                <div>
                  <span className="text-[10px] bg-brand-mint/15 text-brand-deep-teal font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    Detailed Case Study
                  </span>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-brand-navy mt-3 leading-snug">
                    {selectedCase.title}
                  </h3>
                </div>

                <div className="bg-brand-mint/10 border border-brand-mint/20 p-4 rounded-xl">
                  <p className="text-xs font-extrabold text-brand-deep-teal uppercase tracking-wider mb-1">핵심 통계 및 성과</p>
                  <p className="text-sm font-bold">{selectedCase.summary}</p>
                </div>

                <div className="space-y-4 text-sm leading-relaxed text-gray-700">
                  <div>
                    <strong className="text-xs text-gray-400 block mb-0.5">기획 주제</strong>
                    <p className="font-semibold text-brand-navy">{selectedCase.details.theme}</p>
                  </div>
                  <div>
                    <strong className="text-xs text-gray-400 block mb-0.5">교육 구현 기법 (선기획 후AI)</strong>
                    <p>{selectedCase.details.method}</p>
                  </div>
                  <div>
                    <strong className="text-xs text-gray-400 block mb-0.5">정량 및 정성 결과</strong>
                    <p className="text-brand-deep-teal font-medium">{selectedCase.details.outcome}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex gap-2">
                  <button 
                    onClick={() => setSelectedCase(null)}
                    className="flex-1 py-3 bg-brand-navy text-white font-bold rounded-full text-sm hover:bg-brand-navy/95 transition-all"
                  >
                    닫기
                  </button>
                  <a 
                    href="https://blog.naver.com/littleplanners" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex-1 py-3 border border-brand-navy/20 hover:bg-brand-navy/5 font-bold rounded-full text-sm text-center transition-all inline-flex items-center justify-center gap-1"
                  >
                    블로그 글 읽기 <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==========================================
          INTERACTIVE INQUIRY FORM MODAL
          ========================================== */}
      <AnimatePresence>
        {isInquiryOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInquiryOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
            ></motion.div>

            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white border-2 border-brand-navy rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl relative z-10 text-brand-navy"
            >
              <button 
                onClick={() => setIsInquiryOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-brand-off-white hover:bg-gray-100 flex items-center justify-center text-brand-navy transition-all active:scale-90 cursor-pointer"
              >
                <X size={18} />
              </button>

              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-mint/20 text-brand-mint flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-display font-bold text-xl">소중한 문의가 접수되었습니다!</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    디렉터 리플쌤이 빠른 시일 내에 기재하신 메일 또는 연락처로 연락드리겠습니다.
                  </p>
                  <p className="text-xs text-brand-deep-teal font-semibold">
                    yjyj0856@gmail.com · 010-8349-1155
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] bg-brand-yellow/30 text-yellow-800 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      Partner Inquiry
                    </span>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-brand-navy mt-3 leading-tight">
                      기관 협업 간단 문의하기
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">예산, 기간, 인원수 등에 따라 프로그램 조율이 가능합니다.</p>
                  </div>

                  <div className="space-y-3 pt-2 text-left">
                    <div>
                      <label className="text-xs font-bold text-brand-navy/80 block mb-1">기관 구분</label>
                      <select 
                        value={formData.org}
                        onChange={(e) => setFormData({...formData, org: e.target.value})}
                        className="w-full border-2 border-brand-navy/15 rounded-xl px-3 py-2 text-sm focus:border-brand-mint outline-none bg-white font-medium"
                      >
                        <option value="도서관">도서관 (공공/사립)</option>
                        <option value="문화재단">문화재단 / 지자체</option>
                        <option value="청소년기관">청소년 문화의 집 / 센터</option>
                        <option value="학교">초등학교 / 동아리</option>
                        <option value="기타">기타 단체 / 학부모 단체</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-brand-navy/80 block mb-1">문의자명 / 기관명</label>
                      <input 
                        required
                        type="text" 
                        placeholder="예: 중랑구립도서관 김기획 팀장"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full border-2 border-brand-navy/15 rounded-xl px-3 py-2 text-sm focus:border-brand-mint outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-brand-navy/80 block mb-1">회신받을 연락처</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="예: 010-XXXX-XXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full border-2 border-brand-navy/15 rounded-xl px-3 py-2 text-sm focus:border-brand-mint outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-brand-navy/80 block mb-1">기본 문의 내용 (희망시기, 회차 등)</label>
                      <textarea 
                        required
                        rows={3}
                        placeholder="예: 2026년 가을학기 중 초등 저학년 대상 4회차 정규 기획 프로그램을 계획하고 있습니다. 예산 견적 및 커리큘럼 제안서 희망합니다."
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        className="w-full border-2 border-brand-navy/15 rounded-xl px-3 py-2 text-sm focus:border-brand-mint outline-none font-medium text-gray-700"
                      />
                    </div>

                    <div className="p-3 bg-brand-off-white rounded-lg border border-gray-150 text-[11px] text-gray-500">
                      💡 수신 메일주소는 디렉터의 공식 이메일인 <strong className="text-brand-deep-teal">yjyj0856@gmail.com</strong>으로 매칭 처리됩니다.
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 bg-brand-deep-teal hover:bg-brand-deep-teal/95 text-white font-bold rounded-full text-sm transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Send size={14} /> 문의 보내기
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
