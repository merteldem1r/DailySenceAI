export type Sentiment = "positive" | "neutral" | "negative";

export interface Entry {
  id: string;
  text: string;
  sentiment: Sentiment;
  summary: string;
  suggestion: string;
  date: string;
  timestamp: number;
}

export interface AIAnalysisResult {
  sentiment: Sentiment;
  summary: string;
  suggestion: string;
}

export interface UserProfile {
  name: string;
  email: string;
  totalEntries: number;
  positiveCount: number;
  currentStreak: number;
}
