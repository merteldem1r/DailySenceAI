import { Sentiment } from "@/types";

interface SentimentText {
  summary: string;
  suggestion: string;
}

export const getSentimentTexts = (sentiment: Sentiment, score: number): SentimentText => {
  if (sentiment === "positive") {
    // very strong positive (0.85+)
    if (score >= 0.85) {
      return {
        summary:
          "You're radiating exceptional positivity and joy! Your energy is at its peak and you're feeling truly fulfilled.",
        suggestion:
          "This is your moment! Channel this amazing energy into your most important goals. Document what's making you feel this way.",
      };
    }
    // strong positive (0.70-0.84)
    else if (score >= 0.7) {
      return {
        summary:
          "You're having a great day with positive energy and motivation. Your outlook seems optimistic and encouraging.",
        suggestion:
          "Keep this momentum going! Consider writing down what's making you feel good so you can recreate it.",
      };
    }
    // moderate positive (0.55-0.69)
    else if (score >= 0.55) {
      return {
        summary:
          "You're feeling good with a positive mindset. Things are looking up and you have a hopeful perspective.",
        suggestion:
          "Build on this positivity by celebrating small wins and maintaining healthy habits that support your mood.",
      };
    }
    // mild positive (below 0.55)
    else {
      return {
        summary: "You're experiencing gentle positive feelings. There's a subtle uplift in your mood and outlook.",
        suggestion:
          "Nurture these positive feelings by doing something you enjoy or spending time with people who lift you up.",
      };
    }
  } else if (sentiment === "negative") {
    // very strong negative (0.85+)
    if (score >= 0.85) {
      return {
        summary:
          "You're going through a very challenging time and feeling overwhelmed. These feelings are intense right now.",
        suggestion:
          "Please reach out to someone you trust. Consider professional support if these feelings persist. You don't have to face this alone.",
      };
    }
    // strong negative (0.70-0.84)
    else if (score >= 0.7) {
      return {
        summary:
          "You're facing significant challenges and feeling stressed or overwhelmed. It's a tough day emotionally.",
        suggestion:
          "Be extra kind to yourself today. Take breaks, practice self-care, and don't hesitate to ask for help if you need it.",
      };
    }
    // moderate negative (0.55-0.69)
    else if (score >= 0.55) {
      return {
        summary: "You're experiencing some difficult emotions and stress. Things feel challenging at the moment.",
        suggestion:
          "Remember to be kind to yourself. Consider taking a short break, talking to someone, or doing something you enjoy.",
      };
    }
    // mild negative (below 0.55)
    else {
      return {
        summary: "You're feeling a bit off or frustrated. There are some minor challenges affecting your mood.",
        suggestion:
          "Try to shift your focus to something positive or take a brief walk. Small actions can help improve your mood.",
      };
    }
  } else {
    // Neutral sentiment
    // strong neutral (0.70+)
    if (score >= 0.7) {
      return {
        summary: "You're in a balanced and stable emotional state. Things feel steady and manageable right now.",
        suggestion:
          "Use this calm period to reflect on your goals and plan ahead. Stability is a great foundation for progress.",
      };
    }
    // moderate neutral (0.55-0.69)
    else if (score >= 0.55) {
      return {
        summary:
          "You're experiencing moderate emotions with a balanced perspective. Things seem to be moving at a steady pace.",
        suggestion: "Take a moment to reflect on small wins today. Sometimes progress is subtle but still meaningful.",
      };
    }
    // mild neutral (below 0.55)
    else {
      return {
        summary:
          "You're feeling neither particularly positive nor negative. Your emotions are somewhere in the middle.",
        suggestion:
          "This is a good time to check in with yourself. Consider what might help you feel more energized or engaged.",
      };
    }
  }
};
