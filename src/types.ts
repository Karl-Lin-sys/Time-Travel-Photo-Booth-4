export interface Era {
  id: string;
  name: string;
  prompt: string;
  image?: string;
}

export type AppState = 'capture' | 'select-era' | 'processing' | 'result';
