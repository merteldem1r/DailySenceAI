import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Button, Card, Chip, Text, TextInput } from "react-native-paper";

interface InputCardProps {
  inputText: string;
  onInputChange: (text: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export default function InputCard({ inputText, onInputChange, onAnalyze, isAnalyzing }: InputCardProps) {
  return (
    <Card className="bg-dark-card" mode="elevated" elevation={5} style={{ marginBottom: 20 }}>
      <Card.Content style={{ gap: 16 }}>
        {/* Label Section */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center" style={{ gap: 8 }}>
            <MaterialCommunityIcons name="pencil" size={20} color="#a78bfa" />
            <Text variant="titleMedium" className="text-gray-300 font-semibold">
              Today's Entry
            </Text>
          </View>
          <Chip className="bg-dark-bg" textStyle={{ color: "#9ca3af", fontSize: 11 }}>
            {inputText.length} chars
          </Chip>
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

        {/* Analyze Button */}
        <Button
          mode="contained"
          onPress={onAnalyze}
          loading={isAnalyzing}
          disabled={!inputText.trim() || isAnalyzing}
          className="rounded-xl"
          buttonColor={!inputText.trim() || isAnalyzing ? "#374151" : "#7c3aed"}
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
