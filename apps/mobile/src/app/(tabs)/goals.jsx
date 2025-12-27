import React from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Target } from "lucide-react-native";

export default function Goals() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="dark" />

      <View
        style={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 24,
          paddingBottom: 20,
          backgroundColor: "#FFFFFF",
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#1B2E54",
          }}
        >
          Goals
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <Target size={64} color="#C7D2FE" style={{ marginBottom: 24 }} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: "#1B2E54",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          Goals Coming Soon
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#5C6F92",
            textAlign: "center",
            lineHeight: 24,
          }}
        >
          This feature is under development. You'll be able to set and track
          your fitness goals here.
        </Text>
      </View>
    </View>
  );
}
