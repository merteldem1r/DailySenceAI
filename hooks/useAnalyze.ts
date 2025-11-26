import { AIService } from "@/services/aiService";
import { StorageService } from "@/services/storage";
import { Entry } from "@/types";
import { formatDate, generateId } from "@/utils/dateUtils";
import { useState } from "react";
import { Alert } from "react-native";

interface UseAnalyzeResult {
  isAnalyzing: boolean;
  error: string | null;
  analyzeText: (text: string) => Promise<Entry | null>;
}

export const useAnalyze = (): UseAnalyzeResult => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeText = async (text: string): Promise<Entry | null> => {
    // Reset error state
    setError(null);

    // Validation
    if (!text.trim()) {
      setError("Please enter some text to analyze");
      return null;
    }

    if (text.trim().length < 20) {
      setError("Please enter at least 20 characters");
      return null;
    }

    setIsAnalyzing(true);

    try {
      // Call AI service to analyze text
      const aiResult = await AIService.analyzeText(text);

      // Create entry object
      const entry: Entry = {
        id: generateId(),
        text: text.trim(),
        sentiment: aiResult.sentiment,
        sentimentScore: aiResult.sentimentScore,
        summary: aiResult.summary,
        suggestion: aiResult.suggestion,
        date: formatDate(Date.now()),
        timestamp: Date.now(),
      };

      // Save to AsyncStorage
      await StorageService.saveEntry(entry);

      setIsAnalyzing(false);
      return entry;
    } catch (err) {
      setIsAnalyzing(false);
      const errorMessage = err instanceof Error ? err.message : "Failed to analyze text. Please try again.";
      setError(errorMessage);
      Alert.alert("Analysis Failed", errorMessage);
      return null;
    }
  };

  return {
    isAnalyzing,
    error,
    analyzeText,
  };
};
