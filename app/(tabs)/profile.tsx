import { StorageService } from "@/services/storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Avatar, Card, Divider, Surface, Text } from "react-native-paper";

export default function ProfileScreen() {
  const [statistics, setStatistics] = useState({
    totalEntries: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
  });
  const [loading, setLoading] = useState(true);

  const loadStatistics = async () => {
    setLoading(true);
    try {
      const stats = await StorageService.getStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error("Failed to load statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadStatistics();
    }, [])
  );

  const userName = "DailyUser";
  const userEmail = "user@dailysense.ai";

  if (loading) {
    return (
      <Surface className="flex-1 bg-dark-bg" style={{ backgroundColor: "#0f0f0f" }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#7c3aed" />
          <Text variant="bodyMedium" className="text-gray-400 mt-4">
            Loading statistics...
          </Text>
        </View>
      </Surface>
    );
  }

  return (
    <Surface className="flex-1 bg-dark-bg" style={{ backgroundColor: "#0f0f0f" }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 40, minHeight: "100%", backgroundColor: "#0f0f0f" }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header Card */}
        <Card className="bg-dark-card" mode="elevated" elevation={3} style={{ marginBottom: 20 }}>
          <Card.Content style={{ gap: 16, alignItems: "center", paddingVertical: 24 }}>
            <Avatar.Icon size={80} icon="account" style={{ backgroundColor: "#7c3aed" }} />
            <View style={{ gap: 4, alignItems: "center" }}>
              <Text variant="headlineSmall" className="text-white font-bold">
                {userName}
              </Text>
              <Text variant="bodyMedium" className="text-gray-400">
                {userEmail}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Statistics Card */}
        <Card className="bg-dark-card" mode="elevated" elevation={4} style={{ marginBottom: 20 }}>
          <Card.Content style={{ gap: 16 }}>
            <Text variant="titleLarge" className="text-white font-bold">
              Statistics
            </Text>
            <Divider />
            <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 8 }}>
              <View style={{ gap: 8, alignItems: "center" }}>
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: "rgba(124, 58, 237, 0.2)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons name="text-box-outline" size={28} color="#7c3aed" />
                </View>
                <Text variant="headlineSmall" className="text-white font-bold">
                  {statistics.totalEntries}
                </Text>
                <Text variant="bodySmall" className="text-gray-400">
                  Entries
                </Text>
              </View>

              <View style={{ gap: 8, alignItems: "center" }}>
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: "rgba(34, 197, 94, 0.2)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons name="emoticon-happy-outline" size={28} color="#22c55e" />
                </View>
                <Text variant="headlineSmall" className="text-white font-bold">
                  {statistics.positive}
                </Text>
                <Text variant="bodySmall" className="text-gray-400">
                  Positive
                </Text>
              </View>

              <View style={{ gap: 8, alignItems: "center" }}>
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: "rgba(249, 115, 22, 0.2)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons name="emoticon-neutral-outline" size={28} color="#f97316" />
                </View>
                <Text variant="headlineSmall" className="text-white font-bold">
                  {statistics.neutral}
                </Text>
                <Text variant="bodySmall" className="text-gray-400">
                  Neutral
                </Text>
              </View>

              <View style={{ gap: 8, alignItems: "center" }}>
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: "rgba(239, 68, 68, 0.2)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons name="emoticon-sad-outline" size={28} color="#ef4444" />
                </View>
                <Text variant="headlineSmall" className="text-white font-bold">
                  {statistics.negative}
                </Text>
                <Text variant="bodySmall" className="text-gray-400">
                  Negative
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </Surface>
  );
}
