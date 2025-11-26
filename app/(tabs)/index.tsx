import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    // Will be implemented in Step 4
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 1000);
  };

  return (
    <ScrollView className="flex-1 bg-dark-bg">
      <View className="p-5">
        <Text>DailySenceAI</Text>
      </View>
    </ScrollView>
  );
}
