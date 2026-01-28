
export enum StepType {
  SPLASH,
  QUESTION,
  DIAGNOSIS_1,
  DIAGNOSIS_2,
  DIAGNOSIS_3,
  CAROUSEL_BEFORE_AFTER,
  TESTIMONIALS,
  EMAIL_CAPTURE,
  METRIC_QUESTION,
  LOADING
}

export interface Option {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
}

export interface QuizQuestion {
  id: string;
  headline: string;
  subheadlineText: string;
  options: Option[];
  copyAdicional?: string;
  layout?: 'grid' | 'list';
  columns?: number;
  multiSelect?: boolean;
  unit?: string;
  min?: number;
  max?: number;
  defaultValue?: number;
}

export interface QuizState {
  currentStepIndex: number;
  answers: Record<string, string>;
  email: string;
}
