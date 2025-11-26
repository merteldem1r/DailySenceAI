import { Entry } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface ResultModalProps {
  visible: boolean;
  onDismiss: () => void;
  entry: Entry | null;
}

const sentimentConfig = {
  positive: {
    color: "#22c55e",
    bgColor: "rgba(34, 197, 94, 0.2)",
    icon: "emoticon-happy-outline" as const,
    label: "Positive",
  },
  neutral: {
    color: "#f97316",
    bgColor: "rgba(249, 115, 22, 0.2)",
    icon: "emoticon-neutral-outline" as const,
    label: "Neutral",
  },
  negative: {
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.2)",
    icon: "emoticon-sad-outline" as const,
    label: "Negative",
  },
};

export default function ResultModal({
  visible,
  onDismiss,
  entry,
}: ResultModalProps) {
  if (!entry) return null;

  const config = sentimentConfig[entry.sentiment];

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <Dialog.Title>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: config.bgColor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name={config.icon}
                size={28}
                color={config.color}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                variant="titleLarge"
                className="text-white font-bold"
                style={{ color: "white" }}
              >
                Analysis Complete
              </Text>
              <Text
                variant="bodySmall"
                style={{ color: config.color, fontWeight: "600" }}
              >
                {config.label} Sentiment
              </Text>
            </View>
          </View>
        </Dialog.Title>

        <Dialog.Content style={{ gap: 16, paddingTop: 16 }}>
          {/* User's Text */}
          <View>
            <Text
              variant="labelSmall"
              className="text-accent font-semibold mb-2"
              style={{ color: "#a78bfa" }}
            >
              Your Entry
            </Text>
            <View
              style={{
                backgroundColor: "#0f0f0f",
                padding: 12,
                borderRadius: 12,
                borderLeftWidth: 3,
                borderLeftColor: config.color,
              }}
            >
              <Text variant="bodyMedium" style={{ color: "#d1d5db" }}>
                {entry.text}
              </Text>
            </View>
          </View>

          {/* AI Summary */}
          <View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <MaterialCommunityIcons
                name="lightbulb-outline"
                size={18}
                color="#a78bfa"
              />
              <Text
                variant="labelSmall"
                className="text-accent font-semibold"
                style={{ color: "#a78bfa" }}
              >
                AI Summary
              </Text>
            </View>
            <Text variant="bodyMedium" style={{ color: "#d1d5db", lineHeight: 22 }}>
              {entry.summary}
            </Text>
          </View>

          {/* Suggestion */}
          <View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <MaterialCommunityIcons
                name="head-lightbulb-outline"
                size={18}
                color="#a78bfa"
              />
              <Text
                variant="labelSmall"
                className="text-accent font-semibold"
                style={{ color: "#a78bfa" }}
              >
                Suggestion
              </Text>
            </View>
            <Text variant="bodyMedium" style={{ color: "#d1d5db", lineHeight: 22 }}>
              {entry.suggestion}
            </Text>
          </View>
        </Dialog.Content>

        <Dialog.Actions>
          <Button
            mode="contained"
            onPress={onDismiss}
            buttonColor="#7c3aed"
            textColor="white"
          >
            Got it!
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
