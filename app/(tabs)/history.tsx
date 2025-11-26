import EntryCard from "@/components/history/EntryCard";
import { StorageService } from "@/services/storage";
import { Entry } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, FlatList, View } from "react-native";
import { Button, Surface, Text } from "react-native-paper";

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

  const handleDeleteEntry = async (id: string) => {
    Alert.alert("Delete Entry", "Are you sure you want to delete this entry?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await StorageService.deleteEntry(id);
            await loadEntries();
          } catch (error) {
            console.error("Failed to delete entry:", error);
            Alert.alert("Error", "Failed to delete entry. Please try again.");
          }
        },
      },
    ]);
  };

  const handleClearAll = () => {
    Alert.alert("Clear All Entries", "Are you sure you want to delete all entries? This action cannot be undone.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Clear All",
        style: "destructive",
        onPress: async () => {
          try {
            await StorageService.clearAllEntries();
            await loadEntries();
          } catch (error) {
            console.error("Failed to clear entries:", error);
            Alert.alert("Error", "Failed to clear entries. Please try again.");
          }
        },
      },
    ]);
  };

  // Reload entries when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [])
  );

  return (
    <Surface className="flex-1 bg-dark-bg" style={{ backgroundColor: "#0f0f0f", minHeight: "100%", marginBottom: 200 }}>
      {loading && (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f0f0f" }}>
          <ActivityIndicator size="large" color="#7c3aed" />
          <Text variant="bodyMedium" className="text-gray-400 mt-4">
            Loading entries...
          </Text>
        </View>
      )}

      {!loading && entries.length === 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 32,
            marginTop: -150,
          }}
        >
          <MaterialCommunityIcons name="history" size={80} color="#374151" />
          <Text
            variant="headlineSmall"
            style={{ color: "white", fontWeight: "bold", textAlign: "center", marginTop: 10, marginBottom: 8 }}
          >
            No Entries Yet
          </Text>
          <Text variant="bodyMedium" style={{ color: "#9ca3af", textAlign: "center" }}>
            Start by analyzing your first thought on the Home screen
          </Text>
        </View>
      )}

      {!loading && entries.length !== 0 && (
        <>
          {entries.length > 0 && (
            <View style={{ padding: 20, paddingBottom: 12, marginBottom: 5 }}>
              <Button
                mode="outlined"
                onPress={handleClearAll}
                textColor="#ef4444"
                icon="delete-sweep"
                style={{ borderColor: "#ef4444" }}
              >
                Clear All Entries
              </Button>
            </View>
          )}
          <FlatList
            data={entries}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 40,
              paddingTop: entries.length > 0 ? 0 : 20,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <EntryCard
                id={item.id}
                text={item.text}
                sentiment={item.sentiment}
                sentimentScore={item.sentimentScore}
                summary={item.summary}
                suggestion={item.suggestion}
                date={item.date}
                onDelete={handleDeleteEntry}
              />
            )}
          />
        </>
      )}
    </Surface>
  );
}
