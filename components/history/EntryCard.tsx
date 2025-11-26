import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View } from "react-native";
import { Card, Chip, IconButton, Text } from "react-native-paper";

interface EntryCardProps {
  id: string;
  text: string;
  sentiment: "positive" | "neutral" | "negative";
  sentimentScore: number;
  summary: string;
  suggestion: string;
  date: string;
  onDelete?: (id: string) => void;
}

const sentimentConfig = {
  positive: {
    color: "#22c55e",
    bgColor: "rgba(34, 197, 94, 0.1)",
    icon: "emoticon-happy-outline" as const,
    label: "Positive",
    emoji: "😊",
  },
  neutral: {
    color: "#f97316",
    bgColor: "rgba(249, 115, 22, 0.1)",
    icon: "emoticon-neutral-outline" as const,
    label: "Neutral",
    emoji: "😐",
  },
  negative: {
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.1)",
    icon: "emoticon-sad-outline" as const,
    label: "Negative",
    emoji: "😔",
  },
};

export default function EntryCard({
  id,
  text,
  sentiment,
  sentimentScore,
  summary,
  suggestion,
  date,
  onDelete,
}: EntryCardProps) {
  const config = sentimentConfig[sentiment];
  const scorePercentage = Math.round(sentimentScore * 100);
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [suggestionExpanded, setSuggestionExpanded] = useState(false);

  return (
    <Card
      className="bg-dark-card"
      mode="elevated"
      elevation={3}
      style={{ marginBottom: 16, position: "relative", paddingBottom: 35 }}
    >
      <Card.Content style={{ gap: 12 }}>
        {/* Header with Date and Sentiment */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <MaterialCommunityIcons name="calendar-outline" size={16} color="#9ca3af" />
            <Text variant="bodySmall" className="text-gray-400">
              {date}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Chip
              style={{ backgroundColor: config.bgColor }}
              textStyle={{ color: config.color, fontSize: 12, fontWeight: "600" }}
              icon={() => <MaterialCommunityIcons name={config.icon} size={16} color={config.color} />}
            >
              {config.label} %{scorePercentage}
            </Chip>
          </View>
        </View>

        {/* User's Entry Text */}
        <View
          style={{
            backgroundColor: "#0f0f0f",
            padding: 12,
            borderRadius: 12,
            borderLeftWidth: 3,
            borderLeftColor: config.color,
          }}
        >
          <Text variant="bodyMedium" className="text-white leading-5">
            {text}
          </Text>
        </View>

        {/* AI Analysis Section */}
        <View style={{ gap: 8 }}>
          {/* Summary Accordion */}
          <View
            style={{
              backgroundColor: "rgba(167, 139, 250, 0.1)",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "rgba(167, 139, 250, 0.2)",
              overflow: "hidden",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 12,
              }}
              onTouchEnd={() => setSummaryExpanded(!summaryExpanded)}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <MaterialCommunityIcons name="lightbulb-outline" size={18} color="#a78bfa" />
                <Text variant="labelSmall" style={{ color: "#a78bfa", fontWeight: "600" }}>
                  AI Summary
                </Text>
              </View>
              <MaterialCommunityIcons
                name={summaryExpanded ? "chevron-up" : "chevron-down"}
                size={20}
                color="#a78bfa"
              />
            </View>
            {summaryExpanded && (
              <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
                <Text variant="bodySmall" style={{ color: "#d1d5db", lineHeight: 20 }}>
                  {summary}
                </Text>
              </View>
            )}
          </View>

          {/* Suggestion Accordion */}
          <View
            style={{
              backgroundColor: "rgba(167, 139, 250, 0.1)",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "rgba(167, 139, 250, 0.2)",
              overflow: "hidden",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 12,
              }}
              onTouchEnd={() => setSuggestionExpanded(!suggestionExpanded)}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <MaterialCommunityIcons name="head-lightbulb-outline" size={18} color="#a78bfa" />
                <Text variant="labelSmall" style={{ color: "#a78bfa", fontWeight: "600" }}>
                  Suggestion
                </Text>
              </View>
              <MaterialCommunityIcons
                name={suggestionExpanded ? "chevron-up" : "chevron-down"}
                size={20}
                color="#a78bfa"
              />
            </View>
            {suggestionExpanded && (
              <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
                <Text variant="bodySmall" style={{ color: "#d1d5db", lineHeight: 20 }}>
                  {suggestion}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Card.Content>

      {/* Delete Button */}
      {onDelete && (
        <IconButton
          icon="delete-outline"
          size={20}
          iconColor="#ef4444"
          style={{
            position: "absolute",
            bottom: -25,
            right: 12,
            margin: 0,
          }}
          onPress={() => onDelete(id)}
        />
      )}
    </Card>
  );
}
