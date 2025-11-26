import EntryCard from "@/components/history/EntryCard";
import { StorageService } from "@/services/storage";
import { Entry } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Surface, Text } from "react-native-paper";

export default function HistoryScreen() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEntries = async () => {
    setLoading(true);
    try {
      const savedEntries = await StorageService.getEntries();
      setEntries(savedEntries);
    } catch (error) {
      console.error("Failed to load entries:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reload entries when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [])
  );

  const EmptyState = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
      }}
    >
      <MaterialCommunityIcons name="emoticon-outline" size={80} color="#374151" />
      <View className="flex-1">
        <Text variant="headlineSmall" className="text-white font-bold text-center mt-6 mb-2">
          No Entries Yet
        </Text>
        <Text variant="bodyMedium" className="text-gray-400 text-center">
          Start by analyzing your first thought on the Home screen
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <Surface className="flex-1 bg-dark-bg" style={{ backgroundColor: "#0f0f0f" }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#7c3aed" />
          <Text variant="bodyMedium" className="text-gray-400 mt-4">
            Loading entries...
          </Text>
        </View>
      </Surface>
    );
  }

  return (
    <Surface className="flex-1 bg-dark-bg" style={{ backgroundColor: "#0f0f0f", minHeight: "100%" }}>
      {entries.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <EntryCard
              id={item.id}
              text={item.text}
              sentiment={item.sentiment}
              summary={item.summary}
              suggestion={item.suggestion}
              date={item.date}
            />
          )}
        />
      )}
    </Surface>
  );
}
