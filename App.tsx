
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { StepType, QuizState, QuizQuestion } from './types.ts';
import { 
  COLORS, 
  QUESTIONS_STAGE_1, 
  QUESTIONS_STAGE_2, 
  QUESTIONS_STAGE_3, 
  QUESTIONS_STAGE_4,
  TESTIMONIALS, 
  TRANSFORMATIONS 
} from './constants.tsx';

// --- COMPONENTES ATÔMICOS ---

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="fixed top-0 left-0 w-full h-3 bg-gray-200 z-50 shadow-sm">
    <div 
      className="h-full transition-all duration-500 ease-out" 
      style={{ 
        width: `${progress}%`,
        background: `linear-gradient(90deg, ${COLORS.MAGENTA}, ${COLORS.PURPLE})`
      }}
    />
  </div>
);

const Splash: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <div className="min-h-screen flex flex-col items-center bg-[#FDFDFD] relative overflow-hidden">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-magenta-100/30 rounded-full blur-[120px]" style={{ backgroundColor: `${COLORS.MAGENTA}15` }}></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100/30 rounded-full blur-[120px]" style={{ backgroundColor: `${COLORS.PURPLE}10` }}></div>

    <div className="w-full max-w-2xl px-6 pt-12 pb-24 flex flex-col items-center text-center z-10 fade-in">
      <div className="inline-block px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-8">
        <span className="text-xs md:text-sm font-bold text-gray-700 tracking-tight flex items-center gap-2">
          ✨ Funciona mesmo se você já tentou de tudo
        </span>
      </div>

      <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6" style={{ color: COLORS.PURPLE }}>
        Descubra o que está travando seu emagrecimento — <span style={{ color: COLORS.MAGENTA }}>e como corrigir isso no seu caso</span>
      </h1>

      <p className="text-lg md:text-xl text-gray-600 font-medium mb-10 max-w-lg mx-auto">
        Um diagnóstico rápido que mostra como emagrecer com constância, sem dietas impossíveis e sem medo de errar.
      </p>

      <div className="relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 border-4 border-white bg-white">
        <img 
          src="https://ik.imagekit.io/ekdmcxqtr/carousel_antes_depois_5.jpg?updatedAt=1769185371523" 
          alt="Transformação Método Constância Keto" 
          className="w-full h-auto object-cover"
        />
      </div>

      <button 
        onClick={onNext}
        className="w-full py-6 text-white font-black rounded-3xl text-xl md:text-2xl shadow-2xl transform transition hover:scale-105 active:scale-95 animate-pulse"
        style={{ background: `linear-gradient(135deg, ${COLORS.MAGENTA}, #C2185B)` }}
      >
        QUERO DESCOBRIR MEU DIAGNÓSTICO
      </button>
    </div>
  </div>
);

const QuestionStep: React.FC<{ 
  question: QuizQuestion, 
  answers: Record<string, string>, 
  onAnswer: (qId: string, optId: string) => void,
  onPrev: () => void,
  onNext: () => void
}> = ({ question, answers, onAnswer, onPrev, onNext }) => {
  const isSelected = (optId: string) => answers[question.id] === optId;

  return (
    <div className="min-h-screen pt-16 pb-32 px-4 md:px-12 max-w-4xl mx-auto flex flex-col justify-center fade-in bg-[#F5F5F5]">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold mb-4" style={{ color: COLORS.PURPLE }}>{question.headline}</h2>
        <p className="text-gray-600 text-lg">{question.subheadlineText}</p>
      </div>

      <div className={`grid gap-4 ${question.layout === 'grid' ? (question.columns === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2') : 'grid-cols-1'}`}>
        {question.options.map((opt) => (
          <div 
            key={opt.id}
            onClick={() => {
              onAnswer(question.id, opt.id);
              if (!question.multiSelect) onNext();
            }}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 transform hover:shadow-md flex items-center space-x-4
              ${isSelected(opt.id) ? 'bg-purple-50' : 'bg-white border-white'}
            `}
            style={{ 
              borderColor: isSelected(opt.id) ? COLORS.MAGENTA : 'white',
              transform: isSelected(opt.id) ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            {opt.imageUrl && <img src={opt.imageUrl} alt={opt.label} className="w-16 h-16 rounded-xl object-cover shadow-sm" />}
            {!opt.imageUrl && <span className="text-4xl">{opt.icon}</span>}
            <div className="flex-1">
              <h3 className="font-bold text-lg" style={{ color: isSelected(opt.id) ? COLORS.MAGENTA : COLORS.PURPLE }}>{opt.label}</h3>
              {opt.description && <p className="text-sm text-gray-500">{opt.description}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full p-6 bg-white border-t border-gray-200 flex justify-between items-center z-40">
        <button onClick={onPrev} className="text-gray-500 font-bold px-6 py-3 hover:bg-gray-100 rounded-xl transition">← Voltar</button>
        {question.multiSelect && (
          <button 
            onClick={onNext}
            className="px-10 py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:scale-105"
            style={{ background: COLORS.MAGENTA }}
          >
            Próximo Passo →
          </button>
        )}
      </div>
    </div>
  );
};

const MetricQuestionStep: React.FC<{ 
  question: QuizQuestion, 
  answers: Record<string, string>, 
  onAnswer: (qId: string, value: string) => void,
  onPrev: () => void,
  onNext: () => void
}> = ({ question, answers, onAnswer, onPrev, onNext }) => {
  const currentValue = parseInt(answers[question.id] || String(question.defaultValue || 70));
  
  const handleUpdate = (val: number) => {
    const clamped = Math.max(question.min || 0, Math.min(question.max || 300, val));
    onAnswer(question.id, String(clamped));
  };

  return (
    <div className="min-h-screen pt-16 pb-32 px-4 md:px-12 max-w-4xl mx-auto flex flex-col justify-center fade-in bg-[#F5F5F5]">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: COLORS.PURPLE }}>{question.headline}</h2>
        <p className="text-gray-600 text-lg">{question.subheadlineText}</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-8 bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gray-100">
        <div className="flex items-baseline space-x-4">
          <span className="text-8xl md:text-9xl font-black tracking-tighter" style={{ color: COLORS.MAGENTA }}>{currentValue}</span>
          <span className="text-3xl font-bold text-gray-400 uppercase">{question.unit}</span>
        </div>

        <div className="flex items-center space-x-6 w-full max-w-sm">
          <button onClick={() => handleUpdate(currentValue - 1)} className="w-20 h-20 rounded-full border-4 flex items-center justify-center text-4xl font-black hover:bg-gray-50 transition active:scale-90 shadow-lg" style={{ borderColor: COLORS.PURPLE, color: COLORS.PURPLE }}>-</button>
          <input type="range" min={question.min} max={question.max} value={currentValue} onChange={(e) => handleUpdate(parseInt(e.target.value))} className="flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-magenta" style={{ accentColor: COLORS.MAGENTA }} />
          <button onClick={() => handleUpdate(currentValue + 1)} className="w-20 h-20 rounded-full border-4 flex items-center justify-center text-4xl font-black hover:bg-gray-50 transition active:scale-90 shadow-lg" style={{ borderColor: COLORS.PURPLE, color: COLORS.PURPLE }}>+</button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full p-6 bg-white border-t border-gray-200 flex justify-between items-center z-40">
        <button onClick={onPrev} className="text-gray-500 font-bold px-6 py-3 hover:bg-gray-100 rounded-xl transition">← Voltar</button>
        <button onClick={onNext} className="px-12 py-5 rounded-2xl font-bold text-white shadow-xl transition transform hover:scale-105" style={{ background: COLORS.MAGENTA }}>Confirmar Dados →</button>
      </div>
    </div>
  );
};

const DiagnosisStep: React.FC<{ title: string, content: string, icon: string, onNext: () => void }> = ({ title, content, icon, onNext }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
    <div className="max-w-xl space-y-8 fade-in">
      <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-5xl">{icon}</span></div>
      <h2 className="text-3xl md:text-4xl font-black" style={{ color: COLORS.PURPLE }}>{title}</h2>
      <p className="text-xl text-gray-600 leading-relaxed">{content}</p>
      <button onClick={onNext} className="w-full py-5 text-white font-bold rounded-2xl text-xl shadow-lg transition hover:scale-105" style={{ background: COLORS.PURPLE }}>Continuar Análise →</button>
    </div>
  </div>
);

const CarouselStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => { setActiveIndex((current) => (current + 1) % TRANSFORMATIONS.length); }, 4000); 
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F5F5F5]">
      <div className="max-w-lg w-full space-y-8 fade-in flex flex-col items-center">
        <h2 className="text-3xl font-black mb-2" style={{ color: COLORS.PURPLE }}>Resultados Reais</h2>
        <div className="w-full relative overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white bg-white aspect-[4/5]">
          {TRANSFORMATIONS.map((t, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-1000 flex flex-col ${i === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              <img src={t.image} alt={t.label} className="w-full flex-1 object-cover" />
              <div className="p-6 bg-white border-t text-center">
                <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-bold rounded-full mb-3">{t.result}</span>
                <p className="text-gray-600 italic font-medium">"{t.text}"</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onNext} className="w-full py-5 mt-6 text-white font-black rounded-2xl text-xl shadow-lg transition transform hover:scale-105" style={{ background: COLORS.MAGENTA }}>Eu quero esses resultados!</button>
      </div>
    </div>
  );
};

const TestimonialsStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => { setActiveIndex((current) => (current + 1) % TESTIMONIALS.length); }, 4500); 
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <div className="max-w-lg w-full space-y-8 fade-in flex flex-col items-center">
        <h2 className="text-3xl font-black mb-2" style={{ color: COLORS.PURPLE }}>Milhares de Vidas Transformadas</h2>
        <div className="w-full relative overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-gray-50 bg-gray-50 aspect-[4/5]">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-1000 flex flex-col ${i === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              <img src={t.image} alt={t.name || 'Testimonial'} className="w-full flex-1 object-cover" />
              {(t.name || t.text) && (
                <div className="p-8 bg-white border-t">
                  {t.name && <h4 className="font-black text-lg" style={{ color: COLORS.PURPLE }}>{t.name}{t.age > 0 ? `, ${t.age} anos` : ''}</h4>}
                  {t.text && <p className="text-gray-600 italic">"{t.text}"</p>}
                </div>
              )}
            </div>
          ))}
        </div>
        <button onClick={onNext} className="w-full py-5 mt-6 text-white font-black rounded-2xl text-xl shadow-lg transition transform hover:scale-105" style={{ background: COLORS.PURPLE }}>Quero transformar minha vida também →</button>
      </div>
    </div>
  );
};

const EmailCaptureStep: React.FC<{ email: string, setEmail: (e: string) => void, onNext: () => void }> = ({ email, setEmail, onNext }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F5F5F5]">
    <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl space-y-8 text-center border border-gray-100">
      <div className="text-5xl mb-4">📧</div>
      <h2 className="text-3xl font-black" style={{ color: COLORS.PURPLE }}>Para onde enviamos seu diagnóstico?</h2>
      <input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-5 border-2 border-gray-100 rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-purple-100 transition text-gray-900" />
      <button onClick={onNext} disabled={!email || !email.includes('@')} className={`w-full py-5 font-bold rounded-2xl text-xl shadow-lg transition transform ${!email || !email.includes('@') ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'hover:scale-105 text-white'}`} style={{ backgroundColor: email.includes('@') ? COLORS.MAGENTA : '#EEE' }}>Ver Meu Resultado Agora!</button>
    </div>
  </div>
);

const LoadingStep: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(timer); setTimeout(onComplete, 500); return 100; }
        return prev + 1;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onComplete]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
      <div className="max-w-md w-full space-y-10">
        <div className="relative w-40 h-40 mx-auto">
          <div className="absolute inset-0 border-8 border-gray-100 rounded-full"></div>
          <div className="absolute inset-0 border-8 rounded-full border-t-transparent animate-spin" style={{ borderColor: `${COLORS.MAGENTA} transparent transparent transparent` }}></div>
          <div className="absolute inset-0 flex items-center justify-center font-black text-3xl" style={{ color: COLORS.PURPLE }}>{progress}%</div>
        </div>
        <h3 className="text-2xl font-bold" style={{ color: COLORS.PURPLE }}>Personalizando seu protocolo...</h3>
      </div>
    </div>
  );
};

// --- COMPONENTE VSL OBRIGATÓRIO ---

const VSLPlayer: React.FC = () => {
  useEffect(() => {
    console.log("[DEBUG] Carregando Player VTurb...");
    const s = document.createElement("script");
    s.src = "https://scripts.converteai.net/d8154a78-90e0-4096-8a57-1af2803d66bb/players/69737ebe325672f377a0cc0b/v4/player.js";
    s.async = true;
    document.head.appendChild(s);
    return () => {
      // Cleanup do script se necessário
    };
  }, []);

  return (
    <div className="vsl-container w-full max-w-[720px] mx-auto px-4">
      <vturb-smartplayer 
        id="vid-69737ebe325672f377a0cc0b" 
        style={{ display: 'block', margin: '0 auto', width: '100%', aspectRatio: '16/9' }}
      ></vturb-smartplayer>
    </div>
  );
};

// --- SALES PAGE FINAL COM DESBLOQUEIO REAL ---

const FinalOfferStep: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  useEffect(() => {
    console.log("[DEBUG] Listener de eventos do vídeo ativado.");

    const handleVideoEvent = (event: MessageEvent) => {
      // VTurb envia mensagens via postMessage
      // Pode vir como string ou objeto dependendo da versão/configuração
      const data = event.data;
      
      console.log("[DEBUG] Mensagem recebida do player:", data);

      // Verificação robusta de múltiplos possíveis formatos de evento de término
      const isVideoEnd = 
        data === "VSL_FINISHED" || 
        data === "smartplayer_video_end" ||
        data?.event === "video_end" || 
        data?.type === "video_end" ||
        (typeof data === "string" && data.includes("video_end"));

      if (isVideoEnd) {
        console.log("[DEBUG] EVENTO DE TÉRMINO DETECTADO! Desbloqueando página de vendas...");
        setIsUnlocked(true);
      }
    };

    window.addEventListener("message", handleVideoEvent);
    
    // Fallback apenas para ambiente de desenvolvimento local ou Preview do AI Studio
    // Isso permite que você teste o design sem ver o vídeo todo se desejar, 
    // mas em produção o evento REAL deve comandar.
    const isDevelopment = window.location.hostname === "localhost" || window.location.hostname.includes("aistudio");
    if (isDevelopment) {
       console.log("[DEBUG] Detectado ambiente de teste. Fallback de 10s ativo.");
       const timer = setTimeout(() => {
         if (!isUnlocked) {
            console.log("[DEBUG] Fallback de teste: Desbloqueando...");
            setIsUnlocked(true);
         }
       }, 10000);
       return () => {
         clearTimeout(timer);
         window.removeEventListener("message", handleVideoEvent);
       }
    }

    return () => window.removeEventListener("message", handleVideoEvent);
  }, [isUnlocked]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden selection:bg-magenta-100">
      {/* SEÇÃO VSL - SEMPRE VISÍVEL NO TOPO */}
      <div className="bg-[#0b0014] py-12 px-4 shadow-inner">
        <div className="max-w-4xl mx-auto text-center mb-8">
           <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">Seu Diagnóstico está Pronto!</h2>
           <p className="text-gray-400 font-medium italic">Assista ao vídeo abaixo para liberar seu acesso exclusivo</p>
        </div>
        <VSLPlayer />
      </div>

      {/* PÁGINA DE VENDAS - BLOQUEADA POR ESTADO */}
      <div 
        id="sales-page" 
        style={{ display: isUnlocked ? 'block' : 'none' }}
        className={`fade-in ${isUnlocked ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Headline Principal */}
        <div className="max-w-4xl mx-auto px-6 py-16 text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter" style={{ color: COLORS.PURPLE }}>
            Você não precisa tentar mais nada.<br/>
            <span style={{ color: COLORS.MAGENTA }}>Você só precisa seguir o plano certo.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed border-t-2 pt-8" style={{ borderTopColor: `${COLORS.MAGENTA}15` }}>
            O Método Constância Keto™ mostra exatamente o que comer, como ajustar e como manter o resultado sem efeito sanfona, sem dietas malucas e sem sofrimento.
          </p>
        </div>

        {/* Bloco de Benefícios */}
        <div className="bg-[#FDFDFD] py-20 px-6 border-y border-gray-50">
          <div className="max-w-xl mx-auto space-y-6">
            <h3 className="text-2xl font-black text-center mb-10" style={{ color: COLORS.PURPLE }}>Com acesso imediato, você vai:</h3>
            <ul className="grid gap-4">
              {[
                "Descobrir por que seu emagrecimento travou",
                "Corrigir erros invisíveis que te fazem engordar",
                "Emagrecer com constância, mesmo sem tempo",
                "Seguir um plano simples e possível",
                "Parar de recomeçar toda segunda-feira"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 p-5 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">✔</span>
                  <span className="text-lg font-bold text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Autoridade Emocional */}
        <div className="max-w-3xl mx-auto px-6 py-24 text-center space-y-8">
          <div className="w-16 h-1 bg-magenta-500 mx-auto" style={{ backgroundColor: COLORS.MAGENTA }}></div>
          <h2 className="text-3xl md:text-5xl font-black leading-tight" style={{ color: COLORS.PURPLE }}>
            Este método não é uma dieta da moda e não depende de força de vontade infinita.
          </h2>
          <p className="text-xl md:text-2xl text-gray-500 font-medium italic">
            Ele funciona porque se adapta ao seu corpo, ao seu ritmo e à sua realidade.
          </p>
        </div>

        {/* Oferta Irresistível */}
        <div className="max-w-2xl mx-auto px-6 pb-32">
          <div className="bg-white rounded-[3.5rem] shadow-2xl border-[6px] p-8 md:p-14 text-center relative overflow-hidden" style={{ borderColor: COLORS.PURPLE }}>
            <div className="absolute top-0 right-0 p-4 bg-yellow-400 font-black text-[10px] uppercase tracking-widest rotate-12 translate-x-8 -translate-y-2 shadow-xl">Acesso Vitalício</div>
            
            <h3 className="text-2xl md:text-4xl font-black mb-10 leading-tight" style={{ color: COLORS.PURPLE }}>Acesso Completo ao Método Constância Keto™</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-12">
              {["Compra única", "Sem mensalidade", "Sem renovação", "Acesso imediato"].map((tag, i) => (
                <div key={i} className="flex items-center justify-center gap-2 font-bold text-gray-500 uppercase text-[9px] tracking-widest py-3 bg-gray-50 rounded-2xl">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.MAGENTA }}></span>
                  {tag}
                </div>
              ))}
            </div>

            <div className="mb-12">
              <div className="flex justify-center items-baseline gap-2">
                <span className="text-2xl font-black text-gray-900">Hoje por</span>
                <span className="text-7xl md:text-8xl font-black tracking-tighter" style={{ color: COLORS.MAGENTA }}>R$ 27,90</span>
              </div>
              <p className="mt-6 text-gray-500 font-bold italic text-lg leading-relaxed">
                Menos do que você gasta em um lanche que atrasa seu resultado.
              </p>
            </div>

            <button 
              onClick={() => {
                 console.log("[DEBUG] Clique no botão de compra detectado.");
                 window.open('https://pay.kiwify.com.br/hC6S0pP', '_blank');
              }}
              className="w-full py-8 bg-[#25D366] text-white font-black rounded-[2rem] text-xl md:text-3xl shadow-2xl hover:bg-green-600 transition transform hover:scale-105 active:scale-95 animate-pulse uppercase tracking-tight"
            >
              SIM, QUERO EMAGRECER COM CONSTÂNCIA
            </button>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-80">
              <div className="flex flex-col items-center"><span className="text-3xl">🔒</span><span className="text-[10px] font-black uppercase mt-2">100% Seguro</span></div>
              <div className="flex flex-col items-center"><span className="text-3xl">⚡</span><span className="text-[10px] font-black uppercase mt-2">Imediato</span></div>
              <div className="flex flex-col items-center"><span className="text-3xl">📱</span><span className="text-[10px] font-black uppercase mt-2">No Celular</span></div>
              <div className="flex flex-col items-center"><span className="text-3xl">📩</span><span className="text-[10px] font-black uppercase mt-2">Suporte VIP</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    currentStepIndex: 0,
    answers: {},
    email: ''
  });

  const stepsSequence = useMemo(() => {
    const seq = [];
    seq.push({ type: StepType.SPLASH });
    QUESTIONS_STAGE_1.forEach(q => seq.push({ type: StepType.QUESTION, question: q }));
    seq.push({ type: StepType.DIAGNOSIS_1 });
    seq.push({ type: StepType.CAROUSEL_BEFORE_AFTER });
    QUESTIONS_STAGE_2.forEach(q => seq.push({ type: StepType.QUESTION, question: q }));
    seq.push({ type: StepType.DIAGNOSIS_2 });
    // Fix: Removed incorrect reference to StepType.QUESTIONS_STAGE_3 which was causing a TypeScript error
    QUESTIONS_STAGE_3.forEach(q => seq.push({ type: StepType.QUESTION, question: q }));
    seq.push({ type: StepType.TESTIMONIALS });
    seq.push({ type: StepType.DIAGNOSIS_3 });
    QUESTIONS_STAGE_4.forEach(q => seq.push({ type: StepType.METRIC_QUESTION, question: q }));
    seq.push({ type: StepType.EMAIL_CAPTURE });
    seq.push({ type: StepType.LOADING });
    seq.push({ type: StepType.FINAL_OFFER });
    return seq;
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => {
      const nextIndex = Math.min(prev.currentStepIndex + 1, stepsSequence.length - 1);
      if (nextIndex !== prev.currentStepIndex) window.scrollTo(0, 0);
      return { ...prev, currentStepIndex: nextIndex };
    });
  }, [stepsSequence.length]);

  const prevStep = useCallback(() => {
    setState(prev => {
      const nextIndex = Math.max(prev.currentStepIndex - 1, 0);
      if (nextIndex !== prev.currentStepIndex) window.scrollTo(0, 0);
      return { ...prev, currentStepIndex: nextIndex };
    });
  }, []);

  const handleAnswer = useCallback((qId: string, value: string) => {
    setState(prev => ({ ...prev, answers: { ...prev.answers, [qId]: String(value) } }));
  }, []);

  const currentStepData = stepsSequence[state.currentStepIndex];
  const progress = (state.currentStepIndex / (stepsSequence.length - 1)) * 100;

  const renderStep = () => {
    switch (currentStepData.type) {
      case StepType.SPLASH: return <Splash onNext={nextStep} />;
      case StepType.QUESTION: return <QuestionStep question={currentStepData.question!} answers={state.answers} onAnswer={handleAnswer} onPrev={prevStep} onNext={nextStep} />;
      case StepType.DIAGNOSIS_1: return <DiagnosisStep icon="🧠" title="Padrão Identificado" content="Seu histórico sugere que o estresse trava sua queima de gordura. Vamos resolver isso." onNext={nextStep} />;
      case StepType.DIAGNOSIS_2: return <DiagnosisStep icon="🔥" title="Perfil Metabólico" content="Sua rotina exige um choque inicial de cetose para destravar o metabolismo." onNext={nextStep} />;
      case StepType.DIAGNOSIS_3: return <DiagnosisStep icon="🎯" title="Reta Final" content="Calculamos seus números exatos. Seu plano está sendo gerado agora." onNext={nextStep} />;
      case StepType.CAROUSEL_BEFORE_AFTER: return <CarouselStep onNext={nextStep} />;
      case StepType.TESTIMONIALS: return <TestimonialsStep onNext={nextStep} />;
      case StepType.METRIC_QUESTION: return <MetricQuestionStep question={currentStepData.question!} answers={state.answers} onAnswer={handleAnswer} onPrev={prevStep} onNext={nextStep} />;
      case StepType.EMAIL_CAPTURE: return <EmailCaptureStep email={state.email} setEmail={(e) => setState(prev => ({ ...prev, email: String(e) }))} onNext={nextStep} />;
      case StepType.LOADING: return <LoadingStep onComplete={nextStep} />;
      case StepType.FINAL_OFFER: return <FinalOfferStep />;
      default: return null;
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900 overflow-x-hidden">
      {state.currentStepIndex > 0 && state.currentStepIndex < stepsSequence.length - 1 && <ProgressBar progress={progress} />}
      {renderStep()}
    </div>
  );
};

export default App;
