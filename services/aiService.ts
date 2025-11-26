import { AIAnalysisResult, Sentiment } from "@/types";
import { getSentimentTexts } from "@/utils/sentimentTexts";
import { HfInference } from "@huggingface/inference";

const HUGGING_FACE_TOKEN = process.env.EXPO_PUBLIC_HUGGING_FACE_TOKEN || "";
const hf = new HfInference(HUGGING_FACE_TOKEN);

export const AIService = {
  analyzeText: async (text: string): Promise<AIAnalysisResult> => {
    try {
      const { sentiment, score } = await AIService.getSentiment(text);
      const { summary, suggestion } = getSentimentTexts(sentiment, score);

      return {
        sentiment,
        summary,
        suggestion,
      };
    } catch (error) {
      console.error("Error analyzing text:", error);
      throw new Error("Failed to analyze your text. Please check your internet connection and try again.");
    }
  },

  getSentiment: async (text: string): Promise<{ sentiment: Sentiment; score: number }> => {
    try {
      const output = await hf.textClassification({
        model: "finiteautomata/bertweet-base-sentiment-analysis",
        inputs: text,
      });

      console.log("API Response:", output);

      if (Array.isArray(output) && output.length > 0) {
        const sortedResults = output.sort((a, b) => b.score - a.score);
        const topResult = sortedResults[0];
        const label = topResult.label?.toLowerCase();
        const score = topResult.score;

        // NEG, NEU, POS
        let sentiment: Sentiment = "neutral";

        if (label?.includes("pos")) {
          sentiment = "positive";
        } else if (label?.includes("neg")) {
          sentiment = "negative";
        } else if (label?.includes("neu")) {
          sentiment = "neutral";
        }

        return { sentiment, score };
      } else {
        throw new Error("No valid response from sentiment analysis API");
      }
    } catch (error) {
      console.error("Error getting sentiment from API:", error);
      throw error;
    }
  },
};
