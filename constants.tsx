
import React from 'react';
import { QuizQuestion } from './types.ts';

export const COLORS = {
  PURPLE: '#2D1B4E',
  MAGENTA: '#E91E63',
  GOLD: '#FFD700',
  WHITE: '#FFFFFF',
  LIGHT_GRAY: '#F5F5F5',
};

export const QUESTIONS_STAGE_1: QuizQuestion[] = [
  {
    id: 'idade',
    headline: 'Qual é a sua idade?',
    subheadlineText: 'Seu plano será personalizado para sua fase da vida',
    copyAdicional: 'Cada fase tem desafios differentes. Vamos personalizar para VOCÊ.',
    layout: 'grid',
    columns: 2,
    options: [
      { 
        id: '25-35', 
        label: '25-35 anos', 
        description: 'Jovem Adulta', 
        icon: '🎀', 
        imageUrl: 'https://ik.imagekit.io/ekdmcxqtr/Image_fx.png' 
      },
      { 
        id: '36-45', 
        label: '36-45 anos', 
        description: 'Mulher Forte', 
        icon: '💪', 
        imageUrl: 'https://ik.imagekit.io/ekdmcxqtr/Image_fx%20(1).png' 
      },
      { 
        id: '46-55', 
        label: '46-55 anos', 
        description: 'Mulher Elegante', 
        icon: '✨', 
        imageUrl: 'https://ik.imagekit.io/ekdmcxqtr/Image_fx%20(2).png' 
      },
      { 
        id: '55+', 
        label: '55+ anos', 
        description: 'Mulher Empoderada', 
        icon: '👑', 
        imageUrl: 'https://ik.imagekit.io/ekdmcxqtr/Image_fx%20(3).png' 
      },
    ]
  },
  {
    id: 'objetivo',
    headline: 'Qual é seu objetivo principal?',
    subheadlineText: 'Isso vai guiar seu diagnóstico',
    copyAdicional: 'Não existe resposta errada. Queremos entender VOCÊ.',
    layout: 'list',
    options: [
      { id: 'peso', label: 'Perder peso', description: 'Reduzir números na balança', icon: '📉' },
      { id: 'energia', label: 'Ganhar energia', description: 'Acordar mais disposta', icon: '⚡' },
      { id: 'saude', label: 'Melhorar saúde', description: 'Exames melhores, vida melhor', icon: '💚' },
      { id: 'metabolismo', label: 'Acelerar metabolismo', description: 'Queimar mais calorias', icon: '🔥' },
      { id: 'tudo', label: 'Tudo junto', description: 'Transformação completa', icon: '🎯' },
    ]
  },
  {
    id: 'tentativas',
    headline: 'Quantas dietas você já tentou?',
    subheadlineText: 'Isso nos ajuda a entender seu histórico',
    copyAdicional: 'Cada tentativa é uma lição. Vamos usar isso a seu favor.',
    layout: 'grid',
    columns: 2,
    options: [
      { id: '1-2', label: '1-2 dietas', description: 'Iniciante', icon: '1️⃣' },
      { id: '3-5', label: '3-5 dietas', description: 'Experiente', icon: '2️⃣' },
      { id: '6-10', label: '6-10 dietas', description: 'Veterana', icon: '3️⃣' },
      { id: '10+', label: '10+ dietas', description: 'Extremamente experiente', icon: '💥' },
    ]
  },
  {
    id: 'frustracao',
    headline: 'Qual é sua maior frustração?',
    subheadlineText: 'Vamos resolver isso no seu plano',
    copyAdicional: 'Você não está sozinha. Milhares de mulheres sentem o mesmo.',
    layout: 'list',
    options: [
      { id: 'desistir', label: 'Desistir sempre', description: 'Começo e não consigo manter', icon: '😤' },
      { id: 'compulsao', label: 'Comer compulsivamente', description: 'Perco o controle com comida', icon: '🍰' },
      { id: 'tempo', label: 'Falta de tempo', description: 'Vida muito ocupada', icon: '⏰' },
      { id: 'motivacao', label: 'Falta de motivação', description: 'Não consigo me motivar', icon: '😔' },
      { id: 'ciclo', label: 'Ciclo infinito', description: 'Recomeço do zero sempre', icon: '🔄' },
    ]
  }
];

export const QUESTIONS_STAGE_2: QuizQuestion[] = [
  {
    id: 'estilo_vida',
    headline: 'Qual é seu estilo de vida?',
    subheadlineText: 'Vamos adaptar o método para sua rotina',
    layout: 'grid',
    columns: 2,
    options: [
      { id: 'caseira', label: 'Caseira', description: 'Trabalho home office', icon: '🏠' },
      { id: 'corporativa', label: 'Corporativa', description: 'Escritório, reuniões', icon: '🏢' },
      { id: 'acelerada', label: 'Acelerada', description: 'Sempre correndo', icon: '🚀' },
      { id: 'equilibrada', label: 'Equilibrada', description: 'Rotina organizada', icon: '🧘' },
    ]
  },
  {
    id: 'relacionamento_comida',
    headline: 'Qual é seu relacionamento com comida?',
    subheadlineText: 'Isso vai guiar suas receitas',
    layout: 'list',
    options: [
      { id: 'gourmet', label: 'Gourmet', description: 'Adora cozinhar', icon: '🍽️' },
      { id: 'pratico', label: 'Prático', description: 'Quer rápido', icon: '⏱️' },
      { id: 'social', label: 'Social', description: 'Come com amigos', icon: '🎉' },
      { id: 'emocional', label: 'Emocional', description: 'Come por sentimentos', icon: '🧠' },
      { id: 'educado', label: 'Educado', description: 'Quer aprender', icon: '📚' },
    ]
  },
  {
    id: 'bloqueio',
    headline: 'Qual é seu maior bloqueio?',
    subheadlineText: 'Vamos resolver isso no seu plano',
    layout: 'list',
    options: [
      { id: 'conhecimento', label: 'Falta de conhecimento', icon: '🧠' },
      { id: 'disciplina', label: 'Falta de disciplina', icon: '💪' },
      { id: 'tempo', label: 'Falta de tempo', icon: '⏰' },
      { id: 'motivacao', label: 'Falta de motivação', icon: '🔋' },
      { id: 'suporte', label: 'Falta de suporte', icon: '👥' },
    ]
  },
  {
    id: 'expectativa',
    headline: 'Qual é sua expectativa?',
    subheadlineText: 'Vamos alinhar expectativas reais',
    layout: 'grid',
    columns: 2,
    options: [
      { id: 'rapido', label: 'Rápido', description: 'Resultados em 2 semanas', icon: '⚡' },
      { id: 'progressivo', label: 'Progressivo', description: 'Resultados em 4-6 semanas', icon: '📈' },
      { id: 'sustentavel', label: 'Sustentável', description: 'Resultados em 8-12 semanas', icon: '🎯' },
      { id: 'transformacao', label: 'Transformação', description: 'Mudança completa em 90 dias', icon: '🏆' },
    ]
  }
];

export const QUESTIONS_STAGE_3: QuizQuestion[] = [
  {
    id: 'corpo',
    headline: 'Qual corpo você deseja?',
    subheadlineText: 'Isso vai guiar seu treino',
    layout: 'grid',
    columns: 2,
    options: [
      { id: 'curvilineo', label: 'Curvilíneo', icon: '💃' },
      { id: 'atletico', label: 'Atlético', icon: '🏃' },
      { id: 'magro', label: 'Magro', icon: '✨' },
      { id: 'saudavel', label: 'Saudável', icon: '🎯' },
    ]
  },
  {
    id: 'disponibilidade',
    headline: 'Quanto tempo você tem por dia?',
    subheadlineText: 'Vamos criar um plano realista',
    layout: 'list',
    options: [
      { id: '15min', label: '15 minutos', icon: '⏱️' },
      { id: '30min', label: '30 minutos', icon: '⏱️' },
      { id: '1h', label: '1 hora', icon: '⏱️' },
      { id: '1h+', label: 'Mais de 1 hora', icon: '⏱️' },
    ]
  },
  {
    id: 'preferencia',
    headline: 'Qual é sua preferência de receitas?',
    subheadlineText: 'Vamos personalizar seu cardápio',
    layout: 'list',
    options: [
      { id: 'saudavel', label: 'Saudável', icon: '🥗' },
      { id: 'gourmet', label: 'Gourmet', icon: '🍔' },
      { id: 'rapida', label: 'Rápida', icon: '⚡' },
      { id: 'vegetariana', label: 'Vegetariana', icon: '🌱' },
      { id: 'flexivel', label: 'Flexível', icon: '🎉' },
    ]
  }
];

export const QUESTIONS_STAGE_4: QuizQuestion[] = [
  {
    id: 'peso_atual',
    headline: 'Qual é o seu peso atual?',
    subheadlineText: 'Isso ajuda a calcular sua necessidade calórica exata.',
    options: [],
    unit: 'kg',
    min: 40,
    max: 200,
    defaultValue: 75
  },
  {
    id: 'altura',
    headline: 'Qual é a sua altura?',
    subheadlineText: 'Para calcularmos seu IMC de forma profissional.',
    options: [],
    unit: 'cm',
    min: 130,
    max: 220,
    defaultValue: 165
  },
  {
    id: 'peso_meta',
    headline: 'Qual peso você quer atingir?',
    subheadlineText: 'Defina seu objetivo final para traçarmos a rota.',
    options: [],
    unit: 'kg',
    min: 40,
    max: 150,
    defaultValue: 60
  }
];

export const TESTIMONIALS = [
  {
    name: 'Ana Paula',
    age: 38,
    result: '-12kg em 90 dias',
    text: 'Tentei 15 dietas diferentes. Nenhuma funcionou até entender que precisava de constância.',
    image: 'https://ik.imagekit.io/ekdmcxqtr/prova_social_padronizada_3.jpg'
  },
  {
    name: 'Beatriz',
    age: 45,
    result: '-9kg + Paz mental',
    text: 'Finalmente entendi meus gatilhos emocionais. Perder peso foi uma consequência natural.',
    image: 'https://ik.imagekit.io/ekdmcxqtr/prova_social_padronizada_5.jpg'
  },
  {
    name: 'Juliana',
    age: 34,
    result: '-7kg em 30 dias',
    text: 'Prático e eficiente para quem não tem tempo. As receitas são deliciosas e o suporte é nota 10.',
    image: 'https://ik.imagekit.io/ekdmcxqtr/prova_social_padronizada_1.jpg'
  }
];

export const TRANSFORMATIONS = [
  { 
    label: 'Transformação Real', 
    result: '-12kg em 90 dias', 
    text: 'Finalmente encontrei um método sustentável que não me priva de viver.', 
    image: 'https://ik.imagekit.io/ekdmcxqtr/carousel_antes_depois_1.jpg?updatedAt=1769185371443' 
  },
  { 
    label: 'Resultado Incrível', 
    result: '-9kg em 60 dias', 
    text: 'A constância superou a perfeição e os resultados vieram naturalmente.', 
    image: 'https://ik.imagekit.io/ekdmcxqtr/carousel_antes_depois_2.jpg?updatedAt=1769185371254' 
  },
  { 
    label: 'Nova Mulher', 
    result: '-15kg em 4 meses', 
    text: 'Minha autoestima voltou junto com a minha energia diária.', 
    image: 'https://ik.imagekit.io/ekdmcxqtr/carousel_antes_depois_4.jpg?updatedAt=1769185371770' 
  },
];
