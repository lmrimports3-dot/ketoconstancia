
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

      <div className="flex items-center justify-center gap-6 mb-6 text-sm font-bold text-gray-400">
        <div className="flex items-center gap-2">
          <span>⏱️</span> Leva menos de 1 minuto
        </div>
        <div className="flex items-center gap-2">
          <span>🔒</span> 100% gratuito
        </div>
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
          <button 
            onClick={() => handleUpdate(currentValue - 1)}
            className="w-20 h-20 rounded-full border-4 flex items-center justify-center text-4xl font-black hover:bg-gray-50 transition active:scale-90 shadow-lg"
            style={{ borderColor: COLORS.PURPLE, color: COLORS.PURPLE }}
          >
            -
          </button>
          
          <input 
            type="range"
            min={question.min}
            max={question.max}
            value={currentValue}
            onChange={(e) => handleUpdate(parseInt(e.target.value))}
            className="flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-magenta"
            style={{ accentColor: COLORS.MAGENTA }}
          />

          <button 
            onClick={() => handleUpdate(currentValue + 1)}
            className="w-20 h-20 rounded-full border-4 flex items-center justify-center text-4xl font-black hover:bg-gray-50 transition active:scale-90 shadow-lg"
            style={{ borderColor: COLORS.PURPLE, color: COLORS.PURPLE }}
          >
            +
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full p-6 bg-white border-t border-gray-200 flex justify-between items-center z-40">
        <button onClick={onPrev} className="text-gray-500 font-bold px-6 py-3 hover:bg-gray-100 rounded-xl transition">← Voltar</button>
        <button 
          onClick={onNext}
          className="px-12 py-5 rounded-2xl font-bold text-white shadow-xl transition transform hover:scale-105"
          style={{ background: COLORS.MAGENTA }}
        >
          Confirmar Dados →
        </button>
      </div>
    </div>
  );
};

const DiagnosisStep: React.FC<{ 
  title: string, 
  content: string, 
  icon: string,
  onNext: () => void 
}> = ({ title, content, icon, onNext }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
    <div className="max-w-xl space-y-8 fade-in">
      <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-5xl">{icon}</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-black" style={{ color: COLORS.PURPLE }}>{title}</h2>
      <p className="text-xl text-gray-600 leading-relaxed">{content}</p>
      <button 
        onClick={onNext}
        className="w-full py-5 text-white font-bold rounded-2xl text-xl shadow-lg transition hover:scale-105"
        style={{ background: COLORS.PURPLE }}
      >
        Continuar Análise →
      </button>
    </div>
  </div>
);

const CarouselStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % TRANSFORMATIONS.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F5F5F5]">
      <div className="max-w-lg w-full space-y-8 fade-in flex flex-col items-center">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-black mb-2" style={{ color: COLORS.PURPLE }}>Resultados Reais</h2>
          <p className="text-gray-500">Veja o que a constância pode fazer por você</p>
        </div>
        
        <div className="w-full relative overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white bg-white aspect-[4/5] md:aspect-square">
          {TRANSFORMATIONS.map((t, i) => (
            <div 
              key={i} 
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex flex-col ${i === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img src={t.image} alt={t.label} className="w-full flex-1 object-cover" />
              <div className="p-6 bg-white border-t border-gray-100 text-center">
                <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-bold rounded-full mb-3">{t.result}</span>
                <p className="text-gray-600 italic font-medium">"{t.text}"</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-3 mt-4">
          {TRANSFORMATIONS.map((_, i) => (
            <button 
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8' : 'w-2.5 bg-gray-300'}`}
              style={{ backgroundColor: i === activeIndex ? COLORS.MAGENTA : '' }}
            />
          ))}
        </div>

        <button 
          onClick={onNext}
          className="w-full py-5 mt-6 text-white font-black rounded-2xl text-xl shadow-lg transition transform hover:scale-105 active:scale-95"
          style={{ background: COLORS.MAGENTA }}
        >
          Eu quero esses resultados!
        </button>
      </div>
    </div>
  );
};

const TestimonialsStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, 4500); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <div className="max-w-lg w-full space-y-8 fade-in flex flex-col items-center">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-black mb-2" style={{ color: COLORS.PURPLE }}>Milhares de Vidas Transformadas</h2>
          <p className="text-gray-500">Histórias reais de quem acreditou no método</p>
        </div>
        
        <div className="w-full relative overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-gray-50 bg-gray-50 aspect-[4/5] md:aspect-square">
          {TESTIMONIALS.map((t, i) => (
            <div 
              key={i} 
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex flex-col ${i === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img src={t.image} alt={t.name} className="w-full flex-1 object-cover" />
              <div className="p-8 bg-white border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                   <h4 className="font-black text-lg" style={{ color: COLORS.PURPLE }}>{t.name}, {t.age} anos</h4>
                   <span className="font-bold text-sm px-3 py-1 bg-magenta-50 rounded-full" style={{ color: COLORS.MAGENTA }}>{t.result}</span>
                </div>
                <p className="text-gray-600 italic leading-relaxed">"{t.text}"</p>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores */}
        <div className="flex space-x-3 mt-4">
          {TESTIMONIALS.map((_, i) => (
            <button 
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8' : 'w-2.5 bg-gray-200'}`}
              style={{ backgroundColor: i === activeIndex ? COLORS.PURPLE : '' }}
            />
          ))}
        </div>

        <button 
          onClick={onNext}
          className="w-full py-5 mt-6 text-white font-black rounded-2xl text-xl shadow-lg transition transform hover:scale-105 active:scale-95"
          style={{ background: COLORS.PURPLE }}
        >
          Quero transformar minha vida também →
        </button>
      </div>
    </div>
  );
};

const EmailCaptureStep: React.FC<{ email: string, setEmail: (e: string) => void, onNext: () => void }> = ({ email, setEmail, onNext }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F5F5F5]">
    <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl space-y-8 text-center border border-gray-100">
      <div className="text-5xl mb-4">📧</div>
      <h2 className="text-3xl font-black" style={{ color: COLORS.PURPLE }}>Para onde enviamos seu diagnóstico?</h2>
      <p className="text-gray-500">Insira seu melhor e-mail para receber seu plano personalizado e o acesso à oferta exclusiva.</p>
      <input 
        type="email" 
        placeholder="seu@email.com" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-5 border-2 border-gray-100 rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-purple-100 transition text-gray-900"
      />
      <button 
        onClick={onNext}
        disabled={!email || !email.includes('@')}
        className={`w-full py-5 font-bold rounded-2xl text-xl shadow-lg transition transform ${!email || !email.includes('@') ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'hover:scale-105 text-white'}`}
        style={{ backgroundColor: email.includes('@') ? COLORS.MAGENTA : '#EEE' }}
      >
        Ver Meu Resultado Agora!
      </button>
    </div>
  </div>
);

const LoadingStep: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Analisando seu perfil biológico...",
    "Cruzando dados com nosso banco de dados...",
    "Personalizando seu protocolo de cetose...",
    "Calculando sua taxa metabólica basal...",
    "Finalizando seu plano exclusivo..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    const msgTimer = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(msgTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
      <div className="max-w-md w-full space-y-10">
        <div className="relative w-40 h-40 mx-auto">
          <div className="absolute inset-0 border-8 border-gray-100 rounded-full"></div>
          <div 
            className="absolute inset-0 border-8 rounded-full border-t-transparent animate-spin" 
            style={{ borderColor: `${COLORS.MAGENTA} transparent transparent transparent` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center font-black text-3xl" style={{ color: COLORS.PURPLE }}>
            {progress}%
          </div>
        </div>
        <h3 className="text-2xl font-bold transition-all duration-300" style={{ color: COLORS.PURPLE }}>{messages[messageIndex]}</h3>
        <p className="text-gray-400 italic">Por favor, não feche esta página...</p>
      </div>
    </div>
  );
};

// --- COMPONENTE VSL OBRIGATÓRIO (FIX) ---

const VSLPlayer: React.FC = () => {
  const isPreview = useMemo(() => {
    return window.location.hostname.includes("googleusercontent") ||
           window.location.hostname.includes("aistudio") ||
           window.location.hostname === "localhost";
  }, []);

  useEffect(() => {
    if (!isPreview) {
      const s = document.createElement("script");
      s.src = "https://scripts.converteai.net/d8154a78-90e0-4096-8a57-1af2803d66bb/players/69737ebe325672f377a0cc0b/v4/player.js";
      s.async = true;
      document.head.appendChild(s);
    }
  }, [isPreview]);

  return (
    <div className="vsl-container">
      {isPreview ? (
        <div className="vsl-placeholder">
          <div className="play-icon">▶️</div>
          <p>O vídeo será carregado automaticamente após a publicação</p>
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ 
          __html: `<vturb-smartplayer id="vid-69737ebe325672f377a0cc0b" style="display: block; margin: 0 auto; width: 100%; aspect-ratio: 16/9;"></vturb-smartplayer>` 
        }} />
      )}
    </div>
  );
};

const FinalOfferStep: React.FC<{ answers: Record<string, string> }> = ({ answers }) => {
  const [contentVisible, setContentVisible] = useState(false);
  
  const isPreview = useMemo(() => {
    return window.location.hostname.includes("googleusercontent") ||
           window.location.hostname.includes("aistudio") ||
           window.location.hostname === "localhost";
  }, []);

  // Lógica obrigatória de desbloqueio
  useEffect(() => {
    const handleVslMessage = (event: MessageEvent) => {
      if (event.data === "VSL_FINISHED") {
        setContentVisible(true);
      }
    };
    window.addEventListener("message", handleVslMessage);
    
    // Fallback para preview: permitir ver o conteúdo após alguns segundos para testes
    if (isPreview) {
      const timer = setTimeout(() => setContentVisible(true), 5000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("message", handleVslMessage);
      };
    }

    return () => window.removeEventListener("message", handleVslMessage);
  }, [isPreview]);

  return (
    <div className="min-h-screen bg-white">
      {/* VSL SEMPRE NO TOPO - ÚNICA COISA VISÍVEL INICIALMENTE */}
      <div className="bg-[#F5F5F5] py-10 px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
           <h2 className="text-2xl md:text-3xl font-black mb-2" style={{ color: COLORS.PURPLE }}>Seu Diagnóstico está Pronto!</h2>
           <p className="text-gray-600 font-medium italic">Assista ao vídeo abaixo para desbloquear seu plano completo</p>
        </div>
        <VSLPlayer />
      </div>

      {/* PÁGINA DE VENDAS BLOQUEADA (DESBLOQUEIA APÓS VSL) */}
      {contentVisible && (
        <div id="sales-page" className="fade-in">
          {/* Headline Principal */}
          <div className="max-w-4xl mx-auto px-6 py-16 text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter" style={{ color: COLORS.PURPLE }}>
              Você não precisa tentar mais nada.<br/>
              <span style={{ color: COLORS.MAGENTA }}>Você só precisa seguir o plano certo.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
              O Método Constância Keto™ mostra exatamente o que comer, como ajustar e como manter o resultado sem efeito sanfona, sem dietas malucas e sem sofrimento.
            </p>
          </div>

          {/* Bloco de Benefícios */}
          <div className="bg-[#F9F9F9] py-16 px-6">
            <div className="max-w-xl mx-auto space-y-6">
              <h3 className="text-2xl font-black text-center mb-10" style={{ color: COLORS.PURPLE }}>Com acesso imediato, você vai:</h3>
              <ul className="space-y-4">
                {[
                  "Descobrir por que seu emagrecimento travou",
                  "Corrigir erros invisíveis que te fazem engordar",
                  "Emagrecer com constância, mesmo sem tempo",
                  "Seguir um plano simples e possível",
                  "Parar de recomeçar toda segunda-feira"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <span className="text-2xl text-green-500">✔</span>
                    <span className="text-lg font-bold text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Autoridade Emocional */}
          <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-8">
            <div className="w-20 h-1 bg-magenta-500 mx-auto" style={{ backgroundColor: COLORS.MAGENTA }}></div>
            <h2 className="text-3xl md:text-4xl font-black leading-tight" style={{ color: COLORS.PURPLE }}>
              Este método não é uma dieta da moda e não depende de força de vontade infinita.
            </h2>
            <p className="text-xl md:text-2xl text-gray-500 font-medium">
              Ele funciona porque se adapta ao seu corpo, ao seu ritmo e à sua realidade.
            </p>
          </div>

          {/* Oferta Irresistível */}
          <div className="max-w-2xl mx-auto px-6 pb-32">
            <div className="bg-white rounded-[3rem] shadow-2xl border-4 p-10 text-center relative overflow-hidden" style={{ borderColor: COLORS.PURPLE }}>
              <div className="absolute top-0 right-0 p-4 bg-yellow-400 font-black text-xs uppercase tracking-widest rotate-12 translate-x-4 -translate-y-2">Oferta Única</div>
              
              <h3 className="text-2xl font-black mb-8" style={{ color: COLORS.PURPLE }}>Acesso Vitalício ao Método Constância Keto™</h3>
              
              <div className="space-y-3 mb-10 text-left max-w-xs mx-auto">
                {["Compra única", "Sem mensalidade", "Sem renovação", "Acesso imediato"].map((tag, i) => (
                  <div key={i} className="flex items-center gap-2 font-bold text-gray-400 uppercase text-xs">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.MAGENTA }}></span>
                    {tag}
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <p className="text-gray-400 line-through text-xl font-bold">De R$ 197,00</p>
                <div className="flex justify-center items-baseline gap-2">
                  <span className="text-2xl font-black text-gray-900">Hoje por</span>
                  <span className="text-6xl md:text-7xl font-black" style={{ color: COLORS.MAGENTA }}>R$ 27,90</span>
                </div>
                <p className="mt-4 text-gray-500 font-bold italic">
                  Menos do que você gasta em um lanche que atrasa seu resultado.
                </p>
              </div>

              <button 
                onClick={() => window.open('https://pay.kiwify.com.br/hC6S0pP', '_blank')}
                className="w-full py-7 bg-green-500 text-white font-black rounded-3xl text-xl md:text-2xl shadow-xl hover:bg-green-600 transition transform hover:scale-105 active:scale-95 animate-pulse uppercase"
              >
                SIM, QUERO EMAGRECER COM CONSTÂNCIA
              </button>

              <div className="mt-8 flex flex-wrap justify-center gap-6 opacity-60">
                <div className="flex flex-col items-center"><span className="text-2xl">🔒</span><span className="text-[10px] font-bold">Compra Segura</span></div>
                <div className="flex flex-col items-center"><span className="text-2xl">⚡</span><span className="text-[10px] font-bold">Acesso Imediato</span></div>
                <div className="flex flex-col items-center"><span className="text-2xl">📱</span><span className="text-[10px] font-bold">Mobile Friendly</span></div>
                <div className="flex flex-col items-center"><span className="text-2xl">📩</span><span className="text-[10px] font-bold">Suporte VIP</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
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
    
    // Stage 1
    QUESTIONS_STAGE_1.forEach(q => seq.push({ type: StepType.QUESTION, question: q }));
    seq.push({ type: StepType.DIAGNOSIS_1 });
    seq.push({ type: StepType.CAROUSEL_BEFORE_AFTER });
    
    // Stage 2
    QUESTIONS_STAGE_2.forEach(q => seq.push({ type: StepType.QUESTION, question: q }));
    seq.push({ type: StepType.DIAGNOSIS_2 });
    
    // Stage 3
    QUESTIONS_STAGE_3.forEach(q => seq.push({ type: StepType.QUESTION, question: q }));
    seq.push({ type: StepType.TESTIMONIALS });
    seq.push({ type: StepType.DIAGNOSIS_3 });
    
    // Stage 4
    QUESTIONS_STAGE_4.forEach(q => seq.push({ type: StepType.METRIC_QUESTION, question: q }));
    
    seq.push({ type: StepType.EMAIL_CAPTURE });
    seq.push({ type: StepType.LOADING });
    seq.push({ type: StepType.FINAL_OFFER });
    return seq;
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => {
      const nextIndex = Math.min(prev.currentStepIndex + 1, stepsSequence.length - 1);
      if (nextIndex !== prev.currentStepIndex) {
        window.scrollTo(0, 0);
      }
      return { ...prev, currentStepIndex: nextIndex };
    });
  }, [stepsSequence.length]);

  const prevStep = useCallback(() => {
    setState(prev => {
      const nextIndex = Math.max(prev.currentStepIndex - 1, 0);
      if (nextIndex !== prev.currentStepIndex) {
        window.scrollTo(0, 0);
      }
      return { ...prev, currentStepIndex: nextIndex };
    });
  }, []);

  const handleAnswer = useCallback((qId: string, value: string) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [qId]: String(value) }
    }));
  }, []);

  const currentStepData = stepsSequence[state.currentStepIndex];
  const progress = (state.currentStepIndex / (stepsSequence.length - 1)) * 100;

  const renderStep = () => {
    switch (currentStepData.type) {
      case StepType.SPLASH:
        return <Splash onNext={nextStep} />;
      case StepType.QUESTION:
        return (
          <QuestionStep 
            question={currentStepData.question!} 
            answers={state.answers}
            onAnswer={handleAnswer}
            onPrev={prevStep}
            onNext={nextStep}
          />
        );
      case StepType.DIAGNOSIS_1:
        return (
          <DiagnosisStep 
            icon="🧠"
            title="Padrão Emocional Identificado"
            content="Notamos que suas tentativas anteriores foram travadas por gatilhos de estresse. Nosso método foca em silenciar essa fome emocional para que a constância seja automática."
            onNext={nextStep}
          />
        );
      case StepType.DIAGNOSIS_2:
        return (
          <DiagnosisStep 
            icon="🔥"
            title="Perfil Metabólico"
            content="Seu estilo de vida atual sugere um metabolismo que precisa de um 'choque' de cetose controlada. Vamos priorizar a queima de gordura visceral nas primeiras 2 semanas."
            onNext={nextStep}
          />
        );
      case StepType.DIAGNOSIS_3:
        return (
          <DiagnosisStep 
            icon="🎯"
            title="Personalização Final"
            content="Com base nas suas preferências, selecionamos as receitas que exigem menos tempo de preparo e maior saciedade. Estamos prontos para calcular seus números finais."
            onNext={nextStep}
          />
        );
      case StepType.CAROUSEL_BEFORE_AFTER:
        return <CarouselStep onNext={nextStep} />;
      case StepType.TESTIMONIALS:
        return <TestimonialsStep onNext={nextStep} />;
      case StepType.METRIC_QUESTION:
        return (
          <MetricQuestionStep 
            question={currentStepData.question!}
            answers={state.answers}
            onAnswer={handleAnswer}
            onPrev={prevStep}
            onNext={nextStep}
          />
        );
      case StepType.EMAIL_CAPTURE:
        return (
          <EmailCaptureStep 
            email={state.email}
            setEmail={(e) => setState(prev => ({ ...prev, email: String(e) }))}
            onNext={nextStep}
          />
        );
      case StepType.LOADING:
        return <LoadingStep onComplete={nextStep} />;
      case StepType.FINAL_OFFER:
        return <FinalOfferStep answers={state.answers} />;
      default:
        return null;
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900 overflow-x-hidden">
      {state.currentStepIndex > 0 && state.currentStepIndex < stepsSequence.length - 1 && (
        <ProgressBar progress={progress} />
      )}
      {renderStep()}
    </div>
  );
};

export default App;
