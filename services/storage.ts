import { Entry } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  ENTRIES: "@dailysense_entries",
  USER_PROFILE: "@dailysense_user_profile",
} as const;

interface UserProfile {
  name: string;
  email: string;
}

export const StorageService = {
  saveEntry: async (entry: Entry): Promise<void> => {
    try {
      const existingEntries = await StorageService.getEntries();
      const updatedEntries = [entry, ...existingEntries];
      await AsyncStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(updatedEntries));
    } catch (error) {
      console.error("Error saving entry:", error);
      throw new Error("Failed to save entry. Please try again.");
    }
  },

  getEntries: async (): Promise<Entry[]> => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.ENTRIES);
      if (!stored) return [];

      const entries: Entry[] = JSON.parse(stored);
      // Ensure entries are sorted by timestamp (newest first)
      return entries.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error("Error getting entries:", error);
      throw new Error("Failed to load entries. Please try again.");
    }
  },

  deleteEntry: async (id: string): Promise<void> => {
    try {
      const entries = await StorageService.getEntries();
      const filteredEntries = entries.filter((entry) => entry.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(filteredEntries));
    } catch (error) {
      console.error("Error deleting entry:", error);
      throw new Error("Failed to delete entry. Please try again.");
    }
  },

  clearAllEntries: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.ENTRIES);
    } catch (error) {
      console.error("Error clearing entries:", error);
      throw new Error("Failed to clear entries. Please try again.");
    }
  },

  getStatistics: async (): Promise<{
    totalEntries: number;
    positive: number;
    negative: number;
    neutral: number;
  }> => {
    try {
      const entries = await StorageService.getEntries();
      
      const totalEntries = entries.length;
      const positive = entries.filter((entry) => entry.sentiment === "positive").length;
      const negative = entries.filter((entry) => entry.sentiment === "negative").length;
      const neutral = entries.filter((entry) => entry.sentiment === "neutral").length;

      return {
        totalEntries,
        positive,
        negative,
        neutral,
      };
    } catch (error) {
      console.error("Error getting statistics:", error);
      throw new Error("Failed to load statistics. Please try again.");
    }
  },

  getUserProfile: async (): Promise<UserProfile> => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (!stored) {
        return {
          name: "DailyUser",
          email: "user@dailysense.ai",
        };
      }
      return JSON.parse(stored);
    } catch (error) {
      console.error("Error getting user profile:", error);
      return {
        name: "DailyUser",
        email: "user@dailysense.ai",
      };
    }
  },

  saveUserProfile: async (profile: UserProfile): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error("Error saving user profile:", error);
      throw new Error("Failed to save profile. Please try again.");
    }
  },
};
