import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Card, Divider, Text } from "react-native-paper";

interface StatisticsCardProps {
  totalEntries: number;
  positive: number;
  neutral: number;
  negative: number;
}

export default function StatisticsCard({
  totalEntries,
  positive,
  neutral,
  negative,
}: StatisticsCardProps) {
  return (
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
              {totalEntries}
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
              {positive}
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
              {neutral}
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
              {negative}
            </Text>
            <Text variant="bodySmall" className="text-gray-400">
              Negative
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}
