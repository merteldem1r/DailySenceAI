import InputCard from "@/components/home/InputCard";
import ResultModal from "@/components/home/ResultModal";
import { useAnalyze } from "@/hooks/useAnalyze";
import { Entry } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Card, Surface, Text } from "react-native-paper";

export default function HomeScreen() {
  const [inputText, setInputText] = useState("");
  const [resultEntry, setResultEntry] = useState<Entry | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { isAnalyzing, error, analyzeText } = useAnalyze();

  const handleAnalyze = async () => {
    const entry = await analyzeText(inputText);
    
    if (entry) {
      // Show modal with results
      setResultEntry(entry);
      setModalVisible(true);
      
      // Clear input text after successful analysis
      setInputText("");
    }
  };

  const handleModalDismiss = () => {
    setModalVisible(false);
    setResultEntry(null);
  };

  return (
    <Surface className="flex-1 bg-dark-bg" style={{ backgroundColor: "#0f0f0f" }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 40, minHeight: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <Card className="bg-dark-card" mode="elevated" elevation={3} style={{ marginBottom: 24 }}>
          <Card.Content className="items-center py-6">
            <View className="w-16 h-16 bg-primary rounded-full items-center justify-center mb-4">
              <MaterialCommunityIcons name="brain" size={32} color="white" />
            </View>
            <Text variant="headlineMedium" className="text-white font-bold text-center mb-2">
              Daily Check-in
            </Text>
            <Text variant="bodyMedium" className="text-gray-400 text-center leading-6">
              Share your thoughts and emotions. Our AI will analyze your mood and provide personalized insights.
            </Text>
          </Card.Content>
        </Card>

        {/* Input Card */}
        <InputCard
          inputText={inputText}
          onInputChange={setInputText}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          error={error}
        />

        {/* Quick Tip Card */}
        <Card className="bg-dark-card/60" mode="outlined">
          <Card.Content>
            <View className="flex-row items-center mb-3">
              <MaterialCommunityIcons name="lightbulb-outline" size={20} color="#a78bfa" />
              <Text variant="titleSmall" className="text-accent ml-2 font-semibold">
                Quick Tip
              </Text>
            </View>
            <Text variant="bodySmall" className="text-gray-400 leading-5">
              Be honest and detailed about your feelings. The more context you provide, the better insights you'll
              receive.
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Result Modal */}
      <ResultModal
        visible={modalVisible}
        onDismiss={handleModalDismiss}
        entry={resultEntry}
      />
    </Surface>
  );
}
