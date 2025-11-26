import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";

interface InputCardProps {
  inputText: string;
  onInputChange: (text: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  error?: string | null;
}

export default function InputCard({ inputText, onInputChange, onAnalyze, isAnalyzing, error }: InputCardProps) {
  const MIN_CHARS = 20;
  const isValid = inputText.trim().length >= MIN_CHARS;
  const charCount = inputText.length;

  return (
    <Card className="bg-dark-card" mode="elevated" elevation={5} style={{ marginBottom: 20 }}>
      <Card.Content style={{ gap: 8 }}>
        {/* Label Section */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <MaterialCommunityIcons name="pencil" size={20} color="#a78bfa" />
            <Text variant="titleMedium" className="text-gray-300 font-semibold">
              Today's Entry
            </Text>
          </View>
          <View
            style={{
              backgroundColor: isValid ? "rgba(124, 58, 237, 0.15)" : "rgba(249, 115, 22, 0.15)",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 6,
            }}
          >
            <Text
              variant="labelSmall"
              style={{
                color: isValid ? "#a78bfa" : "#f97316",
                fontSize: 11,
                fontWeight: "600",
              }}
            >
              {charCount}/{MIN_CHARS} chars
            </Text>
          </View>
        </View>

        {/* Text Input */}
        <TextInput
          mode="outlined"
          placeholder="I'm feeling excited about today's challenges, but also a bit anxious about the presentation..."
          value={inputText}
          onChangeText={onInputChange}
          multiline
          numberOfLines={6}
          className="bg-dark-bg"
          style={{ minHeight: 150 }}
          outlineColor="#2a2a2a"
          activeOutlineColor="#7c3aed"
          textColor="white"
          placeholderTextColor="#6b7280"
        />

        {/* Error Message */}
        {error && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <MaterialCommunityIcons name="alert-circle" size={16} color="#ef4444" />
            <Text variant="bodySmall" style={{ color: "#ef4444", flex: 1 }}>
              {error}
            </Text>
          </View>
        )}

        {/* Analyze Button */}
        <Button
          mode="contained"
          onPress={onAnalyze}
          loading={isAnalyzing}
          disabled={!isValid || isAnalyzing}
          className="rounded-xl"
          buttonColor={!isValid || isAnalyzing ? "#374151" : "#7c3aed"}
          contentStyle={{ paddingVertical: 8 }}
          icon={() => (
            <MaterialCommunityIcons name={isAnalyzing ? "loading" : "star-four-points"} size={20} color="white" />
          )}
        >
          <Text className="font-bold">{isAnalyzing ? "Analyzing..." : "Analyze with AI"}</Text>
        </Button>
      </Card.Content>
    </Card>
  );
}
