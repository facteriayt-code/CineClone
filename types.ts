
export interface Movie {
  id: string;
  title: string;
  year: number;
  rating: number;
  genre: string[];
  description: string;
  imageUrl: string;
  backdropUrl: string;
  duration: string;
  cast: string[];
  trending?: boolean;
}

export interface GeminiRecommendation {
  id: string;
  reason: string;
}
