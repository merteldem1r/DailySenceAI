import { ScrollView, Text, View } from "react-native";

export default function ProfileScreen() {
  // Static data - will be enhanced in Step 6
  const userName = "DailyUser";
  const userEmail = "user@dailysense.ai";
  const totalEntries = 0;

  return (
    <ScrollView className="flex-1 bg-dark-bg">
      <View className="p-5">
        {/* Profile Header */}
        <Text>Profile</Text>
      </View>
    </ScrollView>
  );
}
