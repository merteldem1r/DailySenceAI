import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";

interface EditProfileModalProps {
  visible: boolean;
  onDismiss: () => void;
  currentName: string;
  currentEmail: string;
  onSave: (name: string, email: string) => void;
}

export default function EditProfileModal({
  visible,
  onDismiss,
  currentName,
  currentEmail,
  onSave,
}: EditProfileModalProps) {
  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);

  const handleSave = () => {
    if (name.trim() && email.trim()) {
      onSave(name.trim(), email.trim());
      onDismiss();
    }
  };

  const handleCancel = () => {
    // Reset to current values
    setName(currentName);
    setEmail(currentEmail);
    onDismiss();
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={handleCancel}
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <Dialog.Title>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: "rgba(124, 58, 237, 0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="account-edit"
                size={28}
                color="#7c3aed"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                variant="titleLarge"
                className="text-white font-bold"
                style={{ color: "white" }}
              >
                Edit Profile
              </Text>
              <Text
                variant="bodySmall"
                style={{ color: "#a78bfa", fontWeight: "600" }}
              >
                Update your information
              </Text>
            </View>
          </View>
        </Dialog.Title>

        <Dialog.Content style={{ gap: 16, paddingTop: 16 }}>
          {/* Name Input */}
          <View>
            <Text
              variant="labelSmall"
              style={{ color: "#a78bfa", marginBottom: 8 }}
            >
              Name
            </Text>
            <TextInput
              mode="outlined"
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              outlineColor="#2a2a2a"
              activeOutlineColor="#7c3aed"
              placeholderTextColor="#6b7280"
              textColor="white"
              style={{ backgroundColor: "#0f0f0f" }}
            />
          </View>

          {/* Email Input */}
          <View>
            <Text
              variant="labelSmall"
              style={{ color: "#a78bfa", marginBottom: 8 }}
            >
              Email
            </Text>
            <TextInput
              mode="outlined"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              outlineColor="#2a2a2a"
              activeOutlineColor="#7c3aed"
              placeholderTextColor="#6b7280"
              textColor="white"
              style={{ backgroundColor: "#0f0f0f" }}
            />
          </View>
        </Dialog.Content>

        <Dialog.Actions style={{ gap: 8 }}>
          <Button
            mode="outlined"
            onPress={handleCancel}
            textColor="#9ca3af"
            style={{ borderColor: "#2a2a2a" }}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleSave}
            buttonColor="#7c3aed"
            textColor="white"
            disabled={!name.trim() || !email.trim()}
          >
            Save Changes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
