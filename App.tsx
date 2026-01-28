import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

// --- UTILITÁRIOS DE UTM E CHECKOUT ---

const CHECKOUT_BASE_URL = "https://www.ggcheckout.com/checkout/v3/ks6c6BjXeZAgrLQ8BcTe";

/**
 * Função segura para obter UTMs do localStorage.
 * Retorna string ou null.
 */
const getStoredUtms = (): string | null => {
  try {
    return localStorage.getItem("utm_params");
  } catch (e) {
    return null;
  }
};

/**
 * Redireciona para o checkout preservando UTMs de forma segura.
 * Lógica obrigatória: Se existir na URL -> usar. Senão -> usar do localStorage.
 */
const handleCheckoutRedirect = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const stored = getStoredUtms();
    
    let finalParams = params.toString() ? params.toString() : stored;
    
    const finalUrl = finalParams
      ? `${CHECKOUT_BASE_URL}?${finalParams}`
      : CHECKOUT_BASE_URL;
      
    window.open(finalUrl, "_blank", "noopener,noreferrer");
  } catch (err) {
    window.open(CHECKOUT_BASE_URL, "_blank", "noopener,noreferrer");
  }
};

// --- COMPONENTE PÁGINA DE VENDAS (ALTA CONVERSÃO) ---

const SalesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-pink-100 fade-in overflow-x-hidden">
      {/* 1. PRIMEIRA DOBRA - ATAQUE DIRETO */}
      <section className="pt-8 pb-16 px-6 max-w-4xl mx-auto text-center">
        <div className="inline-block px-4 py-2 bg-amber-50 rounded-lg border border-amber-200 mb-8 shadow-sm">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-amber-700 flex items-center gap-2">
            ⚠️ Oferta liberada apenas após o diagnóstico
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter mb-6" style={{ color: COLORS.PURPLE }}>
          Você não está travada no emagrecimento.<br/>
          <span style={{ color: COLORS.MAGENTA }}>Você só nunca teve um método que funcionasse na vida real.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-500 font-medium mb-10 max-w-3xl mx-auto leading-relaxed">
          Descubra como mulheres comuns estão emagrecendo com constância — sem dietas impossíveis, sem culpa e sem recomeçar toda segunda-feira.
        </p>

        <button 
          type="button"
          onClick={(e) => { e.preventDefault(); handleCheckoutRedirect(); }}
          className="w-full max-w-md py-7 px-4 bg-[#25D366] text-white font-black rounded-[2rem] text-xl md:text-2xl shadow-2xl transform transition hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-1 animate-pulse"
        >
          <span>👉 QUERO ACESSAR MEU PROTOCOLO AGORA</span>
        </button>
        <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
          <span>🔒 Acesso imediato</span>
          <span>•</span>
          <span>Compra segura</span>
        </p>
      </section>

      {/* 2. IDENTIFICAÇÃO PROFUNDA (DOR REAL) */}
      <section className="py-20 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-2xl md:text-3xl font-black text-center" style={{ color: COLORS.PURPLE }}>Se você já tentou:</h2>
          <div className="space-y-4">
            {[
              "Dietas que funcionam por 7 dias",
              "Protocolos que exigem perfeição",
              "Métodos que te fazem se sentir fraca quando erra"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <span className="text-red-500 text-xl flex-shrink-0">✕</span>
                <span className="text-lg font-bold text-gray-600">{item}</span>
              </div>
            ))}
          </div>
          <div className="p-8 bg-white rounded-3xl border-2 text-center shadow-xl" style={{ borderColor: COLORS.PURPLE }}>
            <p className="text-xl md:text-2xl font-black mb-4" style={{ color: COLORS.PURPLE }}>Então o problema nunca foi você.</p>
            <p className="text-lg text-gray-500 font-medium">O problema é que ninguém te ensinou constância.</p>
          </div>
        </div>
      </section>

      {/* 3. O MÉTODO SECRETO */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="w-16 h-1 bg-magenta-500 mx-auto" style={{ backgroundColor: COLORS.MAGENTA }}></div>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: COLORS.PURPLE }}>O Método Constância Keto™</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-black uppercase tracking-widest text-gray-400">
            <span>🚫 Não é uma dieta</span>
            <span>🚫 Não é um desafio</span>
            <span>🚫 Não é força de vontade</span>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed border-t border-gray-100 pt-8">
            É um sistema simples que se adapta à sua rotina — e continua funcionando mesmo quando você erra.
          </p>
        </div>
      </section>

      {/* 4. O QUE VOCÊ RECEBE */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h3 className="text-3xl font-black text-center mb-16" style={{ color: COLORS.PURPLE }}>Você recebe acesso imediato a:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Ebook Interativo Constância Keto™", desc: "O guia prático para transformar seu corpo.", icon: "📖" },
            { title: "Diagnóstico Personalizado", desc: "Baseado no seu perfil e metabolismo.", icon: "🎯" },
            { title: "Checklist Diário", desc: "Para você nunca mais se sentir perdida.", icon: "✅" },
            { title: "Estrategia para Dias Difíceis", desc: "O que fazer quando tudo sai do controle.", icon: "🔥" },
            { title: "Acesso Vitalício", desc: "Sem mensalidades, é seu para sempre.", icon: "👑" }
          ].map((item, i) => (
            <div key={i} className="flex gap-6 p-8 bg-white border-2 border-gray-50 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
              <span className="text-5xl flex-shrink-0">{item.icon}</span>
              <div>
                <h4 className="text-xl font-black mb-2" style={{ color: COLORS.PURPLE }}>{item.title}</h4>
                <p className="text-gray-500 font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ANCORAGEM DE PREÇO */}
      <section className="py-20 px-6 bg-[#0b0014] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-black mb-10">Quanto custa continuar tentando e desistindo?</h3>
          <div className="space-y-4 mb-16 opacity-60 font-bold">
            <p className="line-through">Dieta da moda: R$ 200+</p>
            <p className="line-through">Nutricionista por mês: R$ 300+</p>
            <p className="line-through">Suplementos inúteis: R$ 150+</p>
          </div>
          
          <div className="mb-10">
            <p className="text-amber-400 font-black uppercase tracking-widest text-sm mb-2">Hoje você paga apenas:</p>
            <span className="text-7xl md:text-9xl font-black tracking-tighter" style={{ color: COLORS.MAGENTA }}>R$ 14,90</span>
          </div>

          <p className="text-gray-400 font-medium mb-12">
            Pagamento único • Acesso vitalício<br/>
            <span className="text-white">Menos que uma pizza para economizar anos de frustração.</span>
          </p>

          <button 
            type="button"
            onClick={(e) => { e.preventDefault(); handleCheckoutRedirect(); }}
            className="w-full max-w-sm py-5 px-4 bg-[#25D366] text-white font-black rounded-2xl text-xl shadow-2xl transform transition hover:scale-105 active:scale-95 mb-8"
          >
            👉 GARANTIR MINHA VAGA AGORA
          </button>
        </div>
      </section>

      {/* 6. BÔNUS ESTRATÉGICOS */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <h3 className="text-3xl font-black text-center mb-12" style={{ color: COLORS.PURPLE }}>BÔNUS EXCLUSIVOS (LIBERADOS HOJE)</h3>
        <p className="text-center text-gray-500 font-bold mb-10">Somente hoje, além do Método Constância Keto™, você recebe gratuitamente:</p>
        <div className="space-y-6">
          {[
            { title: "Guia Anti-Recaída: Como Não Desistir", val: "R$ 97", icon: "🎁", desc: "O que fazer quando a vontade de abandonar tudo aparece." },
            { title: "Lista de Substituições Keto Inteligentes", val: "R$ 49", icon: "🎁", desc: "Trocas simples para manter o protocolo na vida social." },
            { title: "Mapa da Constância: 7 Erros Fatais", val: "R$ 67", icon: "🎁", desc: "Evite os erros silenciosos que fazem você estagnar." }
          ].map((bonus, i) => (
            <div key={i} className="p-6 bg-pink-50 rounded-3xl border-2 border-pink-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{bonus.icon}</span>
                <div>
                  <span className="font-black text-gray-700 block">{bonus.title}</span>
                  <span className="text-xs text-gray-500 font-medium">{bonus.desc}</span>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="block text-[10px] text-gray-400 line-through font-bold uppercase tracking-widest">{bonus.val}</span>
                <span className="font-black text-pink-600 text-lg">INCLUSO</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 p-8 bg-amber-50 rounded-[2.5rem] border border-amber-200 text-center">
          <p className="text-gray-400 font-bold line-through mb-1">Valor total: R$ 213</p>
          <p className="text-amber-800 font-black text-2xl uppercase tracking-tighter mb-4">Hoje: INCLUSO</p>
          <p className="text-amber-700 text-xs font-bold">⚠️ Disponibilidade limitada. Esses bônus podem sair do ar sem aviso.</p>
        </div>
      </section>

      {/* 7. ESCASSEZ */}
      <section className="py-16 px-6 bg-red-50 border-y border-red-100">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h4 className="text-red-600 font-black uppercase tracking-widest text-sm">⚠️ Atenção:</h4>
          <p className="text-red-900 font-bold text-lg leading-relaxed">
            Essa oferta não fica disponível para todas. Ela é liberada apenas após o diagnóstico e pode ser removida sem aviso. Se você sair dessa página, não há garantia de que verá essa condição novamente.
          </p>
        </div>
      </section>

      {/* 8. GARANTIA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-6xl block mb-6">🛡️</span>
          <h4 className="text-2xl font-black mb-6" style={{ color: COLORS.PURPLE }}>Garantia incondicional de 7 dias</h4>
          <p className="text-gray-500 font-medium leading-relaxed mb-12">
            Se você não sentir que esse método é mais simples e possível do que tudo que já tentou, seu dinheiro é devolvido. Sem perguntas. Sem burrocracia.
          </p>
          
          <button 
            type="button"
            onClick={(e) => { e.preventDefault(); handleCheckoutRedirect(); }}
            className="w-full py-8 bg-[#25D366] text-white font-black rounded-[2.5rem] text-2xl shadow-2xl hover:bg-green-600 transition transform hover:scale-105 active:scale-95"
          >
            👉 SIM, QUERO COMEÇAR AGORA
          </button>
        </div>
      </section>

      <footer className="py-12 bg-white text-center opacity-40">
        <p className="text-[10px] font-black uppercase tracking-widest">Método Constância Keto™ © 2025 • Todos os direitos reservados</p>
      </footer>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
// (Componentes do Quiz omitidos para brevidade, mas devem permanecer os mesmos)
// (Nota: No arquivo real eles devem estar presentes conforme a estrutura anterior)

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="fixed top-0 left-0 w-full h-3 bg-gray-200 z-50 shadow-sm">
    <div className="h-full transition-all duration-500 ease-out" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${COLORS.MAGENTA}, ${COLORS.PURPLE})` }} />
  </div>
);

const Splash: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <div className="min-h-screen flex flex-col items-center bg-[#FDFDFD] relative overflow-hidden">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-magenta-100/30 rounded-full blur-[120px]" style={{ backgroundColor: `${COLORS.MAGENTA}15` }}></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100/30 rounded-full blur-[120px]" style={{ backgroundColor: `${COLORS.PURPLE}10` }}></div>
    <div className="w-full max-w-2xl px-6 pt-12 pb-24 flex flex-col items-center text-center z-10 fade-in">
      <div className="inline-block px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-8"><span className="text-xs md:text-sm font-bold text-gray-700 tracking-tight flex items-center gap-2">✨ Funciona mesmo se você já tentou de tudo</span></div>
      <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6" style={{ color: COLORS.PURPLE }}>Descubra o que está travando seu emagrecimento — <span style={{ color: COLORS.MAGENTA }}>e como corrigir isso no seu caso</span></h1>
      <p className="text-lg md:text-xl text-gray-600 font-medium mb-10 max-w-lg mx-auto">Um diagnóstico rápido que mostra como emagrecer com constância, sem dietas impossíveis e sem medo de errar.</p>
      <div className="relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 border-4 border-white bg-white"><img src="https://ik.imagekit.io/ekdmcxqtr/carousel_antes_depois_5.jpg?updatedAt=1769185371523" alt="Transformação" className="w-full h-auto object-cover" /></div>
      <button 
        type="button"
        onClick={(e) => { e.preventDefault(); onNext(); }} 
        className="w-full py-6 text-white font-black rounded-3xl text-xl md:text-2xl shadow-2xl transform transition hover:scale-105 active:scale-95 animate-pulse" 
        style={{ background: `linear-gradient(135deg, ${COLORS.MAGENTA}, #C2185B)` }}
      >
        QUERO DESCOBRIR MEU DIAGNÓSTICO
      </button>
    </div>
  </div>
);

const QuestionStep: React.FC<{ question: QuizQuestion, answers: Record<string, string>, onAnswer: (qId: string, optId: string) => void, onPrev: () => void, onNext: () => void }> = ({ question, answers, onAnswer, onPrev, onNext }) => {
  const isSelected = (optId: string) => answers[question.id] === optId;
  return (
    <div className="min-h-screen pt-16 pb-32 px-4 md:px-12 max-w-4xl mx-auto flex flex-col justify-center fade-in bg-[#F5F5F5]">
      <div className="text-center mb-10"><h2 className="text-2xl md:text-4xl font-bold mb-4" style={{ color: COLORS.PURPLE }}>{question.headline}</h2><p className="text-gray-600 text-lg">{question.subheadlineText}</p></div>
      <div className={`grid gap-4 ${question.layout === 'grid' ? (question.columns === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2') : 'grid-cols-1'}`}>
        {question.options.map((opt) => (
          <button 
            type="button"
            key={opt.id} 
            onClick={(e) => { e.preventDefault(); onAnswer(question.id, opt.id); if (!question.multiSelect) onNext(); }} 
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 transform hover:shadow-md flex items-center space-x-4 text-left ${isSelected(opt.id) ? 'bg-purple-50' : 'bg-white border-white'}`} 
            style={{ borderColor: isSelected(opt.id) ? COLORS.MAGENTA : 'white', transform: isSelected(opt.id) ? 'scale(1.02)' : 'scale(1)' }}
          >
            {opt.imageUrl && <img src={opt.imageUrl} alt={opt.label} className="w-16 h-16 rounded-xl object-cover shadow-sm" />}
            {!opt.imageUrl && <span className="text-4xl">{opt.icon}</span>}
            <div className="flex-1"><h3 className="font-bold text-lg" style={{ color: isSelected(opt.id) ? COLORS.MAGENTA : COLORS.PURPLE }}>{opt.label}</h3>{opt.description && <p className="text-sm text-gray-500">{opt.description}</p>}</div>
          </button>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 w-full p-6 bg-white border-t border-gray-200 flex justify-between items-center z-40">
        <button type="button" onClick={(e) => { e.preventDefault(); onPrev(); }} className="text-gray-500 font-bold px-6 py-3 hover:bg-gray-100 rounded-xl transition">← Voltar</button>
        {question.multiSelect && <button type="button" onClick={(e) => { e.preventDefault(); onNext(); }} className="px-10 py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:scale-105" style={{ background: COLORS.MAGENTA }}>Próximo Passo →</button>}
      </div>
    </div>
  );
};

const MetricQuestionStep: React.FC<{ question: QuizQuestion, answers: Record<string, string>, onAnswer: (qId: string, value: string) => void, onPrev: () => void, onNext: () => void }> = ({ question, answers, onAnswer, onPrev, onNext }) => {
  const currentValue = parseInt(answers[question.id] || String(question.defaultValue || 70));
  
  const handleUpdate = (val: number) => { 
    const clamped = Math.max(question.min || 0, Math.min(question.max || 300, val)); 
    onAnswer(question.id, String(clamped)); 
  };

  return (
    <div className="min-h-screen pt-12 pb-32 px-4 max-w-xl mx-auto flex flex-col justify-center fade-in bg-[#FAFAFA]">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-black mb-3 leading-tight" style={{ color: COLORS.PURPLE }}>
          {question.headline}
        </h2>
        <p className="text-gray-500 text-base font-medium px-4">
          {question.subheadlineText}
        </p>
      </div>

      <div className="bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center space-y-10">
        {/* Visor Numérico Clean */}
        <div className="relative flex flex-col items-center">
          <div className="flex items-baseline justify-center">
            <span className="text-7xl md:text-8xl font-black tracking-tighter" style={{ color: COLORS.PURPLE }}>
              {currentValue}
            </span>
            <span className="text-xl font-black ml-2 uppercase opacity-30" style={{ color: COLORS.PURPLE }}>
              {question.unit}
            </span>
          </div>
          <div className="w-12 h-1.5 rounded-full mt-2" style={{ background: COLORS.MAGENTA }}></div>
        </div>

        {/* Controles de Ajuste Minimalistas */}
        <div className="w-full flex items-center justify-between gap-6 max-w-xs">
          <button 
            type="button"
            onClick={(e) => { e.preventDefault(); handleUpdate(currentValue - 1); }}
            className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl font-bold text-gray-400 hover:bg-gray-100 active:scale-90 transition-all border border-gray-100"
          >
            －
          </button>
          
          <div className="flex-1 px-2">
            <input 
              type="range" 
              min={question.min} 
              max={question.max} 
              value={currentValue} 
              onChange={(e) => handleUpdate(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-magenta"
              style={{ accentColor: COLORS.MAGENTA }}
            />
          </div>

          <button 
            type="button"
            onClick={(e) => { e.preventDefault(); handleUpdate(currentValue + 1); }}
            className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl font-bold text-gray-400 hover:bg-gray-100 active:scale-90 transition-all border border-gray-100"
          >
            ＋
          </button>
        </div>
      </div>

      {/* Botão de Rodapé Fixo (padrão do quiz) */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-white border-t border-gray-100 flex justify-between items-center z-40">
        <button type="button" onClick={(e) => { e.preventDefault(); onPrev(); }} className="text-gray-400 font-bold px-4 py-2 hover:text-gray-600 transition text-sm">
          ← Voltar
        </button>
        <button 
          type="button"
          onClick={(e) => { e.preventDefault(); onNext(); }} 
          className="px-8 py-4 rounded-2xl font-black text-white shadow-xl transition transform active:scale-95" 
          style={{ background: COLORS.MAGENTA }}
        >
          Confirmar Dados →
        </button>
      </div>
    </div>
  );
};

const DiagnosisStep: React.FC<{ title: string, content: string, icon: string, onNext: () => void }> = ({ title, content, icon, onNext }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
    <div className="max-w-xl space-y-8 fade-in"><div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-5xl">{icon}</span></div><h2 className="text-3xl md:text-4xl font-black" style={{ color: COLORS.PURPLE }}>{title}</h2><p className="text-xl text-gray-600 leading-relaxed">{content}</p><button type="button" onClick={(e) => { e.preventDefault(); onNext(); }} className="w-full py-5 text-white font-bold rounded-2xl text-xl shadow-lg transition hover:scale-105" style={{ background: COLORS.PURPLE }}>Continuar Análise →</button></div>
  </div>
);

const CarouselStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => { const timer = setInterval(() => { setActiveIndex((current) => (current + 1) % TRANSFORMATIONS.length); }, 4000); return () => clearInterval(timer); }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F5F5F5]">
      <div className="max-w-lg w-full space-y-8 fade-in flex flex-col items-center"><h2 className="text-3xl font-black mb-2" style={{ color: COLORS.PURPLE }}>Resultados Reais</h2><div className="w-full relative overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white bg-white aspect-[4/5]">
          {TRANSFORMATIONS.map((t, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-1000 flex flex-col ${i === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}><img src={t.image} alt={t.label} className="w-full flex-1 object-cover" /><div className="p-6 bg-white border-t text-center"><span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-bold rounded-full mb-3">{t.result}</span><p className="text-gray-600 italic font-medium">"{t.text}"</p></div></div>
          ))}
        </div><button type="button" onClick={(e) => { e.preventDefault(); onNext(); }} className="w-full py-5 mt-6 text-white font-black rounded-2xl text-xl shadow-lg transition transform hover:scale-105" style={{ background: COLORS.MAGENTA }}>Eu quero esses resultados!</button></div>
    </div>
  );
};

const TestimonialsStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => { const timer = setInterval(() => { setActiveIndex((current) => (current + 1) % TESTIMONIALS.length); }, 4500); return () => clearInterval(timer); }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <div className="max-w-lg w-full space-y-8 fade-in flex flex-col items-center"><h2 className="text-3xl font-black mb-2" style={{ color: COLORS.PURPLE }}>Milhares de Vidas Transformadas</h2><div className="w-full relative overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-gray-50 bg-gray-50 aspect-[4/5]">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-1000 flex flex-col ${i === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}><img src={t.image} alt={t.name || 'Testimonial'} className="w-full flex-1 object-cover" />{(t.name || t.text) && (<div className="p-8 bg-white border-t">{t.name && <h4 className="font-black text-lg" style={{ color: COLORS.PURPLE }}>{t.name}{t.age > 0 ? `, ${t.age} anos` : ''}</h4>}{t.text && <p className="text-gray-600 italic">"{t.text}"</p>}</div>)}</div>
          ))}
        </div><button type="button" onClick={(e) => { e.preventDefault(); onNext(); }} className="w-full py-5 mt-6 text-white font-black rounded-2xl text-xl shadow-lg transition transform hover:scale-105" style={{ background: COLORS.PURPLE }}>Quero transformar minha vida também →</button></div>
    </div>
  );
};

const EmailCaptureStep: React.FC<{ email: string, setEmail: (e: string) => void, onNext: () => void }> = ({ email, setEmail, onNext }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F5F5F5]">
    <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl space-y-8 text-center border border-gray-100"><div className="text-5xl mb-4">📧</div><h2 className="text-3xl font-black" style={{ color: COLORS.PURPLE }}>Para onde enviamos seu diagnóstico?</h2><input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-5 border-2 border-gray-100 rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-purple-100 transition text-gray-900" /><button type="button" onClick={(e) => { e.preventDefault(); onNext(); }} disabled={!email || !email.includes('@')} className={`w-full py-5 font-bold rounded-2xl text-xl shadow-lg transition transform ${!email || !email.includes('@') ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'hover:scale-105 text-white'}`} style={{ backgroundColor: email.includes('@') ? COLORS.MAGENTA : '#EEE' }}>Ver Meu Resultado Agora!</button></div>
  </div>
);

const LoadingStep: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const duration = 3500; // 3.5 segundos
    const stepInterval = 50;
    const totalSteps = duration / stepInterval;
    const increment = 100 / totalSteps;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // REDIRECIONAMENTO OBRIGATÓRIO EM 3.5S
          setTimeout(() => {
            onComplete(); 
          }, 400);
          return 100;
        }
        return prev + increment;
      });
    }, stepInterval);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
      <div className="max-w-md w-full space-y-10">
        <div className="relative w-40 h-40 mx-auto">
          <div className="absolute inset-0 border-8 border-gray-100 rounded-full"></div>
          <div className="absolute inset-0 border-8 rounded-full border-t-transparent animate-spin" style={{ borderColor: `${COLORS.MAGENTA} transparent transparent transparent` }}></div>
          <div className="absolute inset-0 flex items-center justify-center font-black text-3xl" style={{ color: COLORS.PURPLE }}>{Math.round(progress)}%</div>
        </div>
        <h3 className="text-2xl font-bold" style={{ color: COLORS.PURPLE }}>Preparando protocolo personalizado...</h3>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [showSalesPage, setShowSalesPage] = useState(false);
  const [state, setState] = useState<QuizState>({
    currentStepIndex: 0,
    answers: {},
    email: ''
  });

  // Captura e preservação de UTMs
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const paramsString = params.toString();
      // Se a UTM existir na URL → salvar
      if (paramsString) {
        localStorage.setItem("utm_params", paramsString);
      }
    } catch (e) {
      console.warn("Falha ao persistir UTMs", e);
    }
  }, []);

  const stepsSequence = useMemo(() => {
    const buildSeq = () => {
        const fullSequence = [
          { type: StepType.SPLASH },
          ...QUESTIONS_STAGE_1.map(q => ({ type: StepType.QUESTION, question: q })),
          { type: StepType.DIAGNOSIS_1 },
          { type: StepType.CAROUSEL_BEFORE_AFTER },
          ...QUESTIONS_STAGE_2.map(q => ({ type: StepType.QUESTION, question: q })),
          { type: StepType.DIAGNOSIS_2 },
          ...QUESTIONS_STAGE_3.map(q => ({ type: StepType.QUESTION, question: q })),
          { type: StepType.TESTIMONIALS },
          { type: StepType.DIAGNOSIS_3 },
          ...QUESTIONS_STAGE_4.map(q => ({ type: StepType.METRIC_QUESTION, question: q })),
          { type: StepType.EMAIL_CAPTURE },
          { type: StepType.LOADING }
        ];
        return fullSequence;
    };
    return buildSeq();
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => {
      const nextIndex = Math.min(prev.currentStepIndex + 1, stepsSequence.length);
      if (nextIndex < stepsSequence.length) window.scrollTo(0, 0);
      return { ...prev, currentStepIndex: nextIndex };
    });
  }, [stepsSequence.length]);

  const prevStep = useCallback(() => {
    setState(prev => {
      const nextIndex = Math.max(prev.currentStepIndex - 1, 0);
      window.scrollTo(0, 0);
      return { ...prev, currentStepIndex: nextIndex };
    });
  }, []);

  /**
   * Garante que apenas strings primitivas sejam salvas no estado de respostas,
   * prevenindo erros de serialização se objetos de evento forem passados acidentalmente.
   */
  const handleAnswer = useCallback((qId: string, value: any) => {
    const cleanQId = String(qId);
    const cleanValue = String(value);
    setState(prev => ({ 
      ...prev, 
      answers: { ...prev.answers, [cleanQId]: cleanValue } 
    }));
  }, []);

  // Se o flag showSalesPage estiver ativo ou o índice ultrapassar a sequência, mostra a página de vendas
  if (showSalesPage || state.currentStepIndex >= stepsSequence.length) {
    return <SalesPage />;
  }

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
      case StepType.EMAIL_CAPTURE: return <EmailCaptureStep email={state.email} setEmail={(val) => setState(prev => ({ ...prev, email: String(val) }))} onNext={nextStep} />;
      case StepType.LOADING: return <LoadingStep onComplete={() => {
        setShowSalesPage(true);
      }} />;
      default: return null;
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900 overflow-x-hidden">
      {state.currentStepIndex > 0 && <ProgressBar progress={progress} />}
      {renderStep()}
    </div>
  );
};

export default App;
