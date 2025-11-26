import EditProfileModal from "@/components/profile/EditProfileModal";
import StatisticsCard from "@/components/profile/StatisticsCard";
import { StorageService } from "@/services/storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Avatar, Card, IconButton, Surface, Text } from "react-native-paper";

export default function ProfileScreen() {
  const [statistics, setStatistics] = useState({
    totalEntries: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
  });
  const [userName, setUserName] = useState("DailyUser");
  const [userEmail, setUserEmail] = useState("user@dailysense.ai");
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [stats, profile] = await Promise.all([StorageService.getStatistics(), StorageService.getUserProfile()]);
      setStatistics(stats);
      setUserName(profile.name);
      setUserEmail(profile.email);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (name: string, email: string) => {
    try {
      await StorageService.saveUserProfile({ name, email });
      setUserName(name);
      setUserEmail(email);
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <Surface className="flex-1 bg-dark-bg" style={{ backgroundColor: "#0f0f0f" }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 40, minHeight: "100%", backgroundColor: "#0f0f0f" }}
        showsVerticalScrollIndicator={false}
      >
        {loading && (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f0f0f" }}>
            <ActivityIndicator size="large" color="#7c3aed" />
            <Text variant="bodyMedium" className="text-gray-400 mt-4">
              Loading statistics...
            </Text>
          </View>
        )}

        {/* Profile Header Card */}
        {!loading && (
          <>
            <Card className="bg-dark-card" mode="elevated" elevation={3} style={{ marginBottom: 20 }}>
              <Card.Content style={{ gap: 16, alignItems: "center", paddingVertical: 24 }}>
                <View style={{ position: "relative" }}>
                  <Avatar.Icon size={80} icon="account" style={{ backgroundColor: "#a78bfa" }} />
                  <IconButton
                    icon="pencil"
                    size={20}
                    iconColor="white"
                    containerColor="#7c3aed"
                    style={{
                      position: "absolute",
                      bottom: -15,
                      right: -8,
                    }}
                    onPress={() => setEditModalVisible(true)}
                  />
                </View>
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
            <StatisticsCard
              totalEntries={statistics.totalEntries}
              positive={statistics.positive}
              neutral={statistics.neutral}
              negative={statistics.negative}
            />
          </>
        )}
      </ScrollView>

      {/* Edit Profile Modal */}
      <EditProfileModal
        visible={editModalVisible}
        onDismiss={() => setEditModalVisible(false)}
        currentName={userName}
        currentEmail={userEmail}
        onSave={handleSaveProfile}
      />
    </Surface>
  );
}
