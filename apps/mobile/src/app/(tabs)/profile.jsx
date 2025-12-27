import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { User, Settings, LogOut } from "lucide-react-native";
import { useAuth } from "@/utils/auth/useAuth";
import useUser from "@/utils/auth/useUser";

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const { data: user } = useUser();

  const handleSignOut = async () => {
    await signOut();
  };

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
          Profile
        </Text>
      </View>

      <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
        {/* User Info Card */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            padding: 24,
            borderRadius: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 4,
            marginBottom: 24,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: "#1A5DFF",
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 16,
              }}
            >
              <User size={24} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#1B2E54",
                  marginBottom: 4,
                }}
              >
                {user?.name || "User"}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#5C6F92",
                }}
              >
                {user?.email || "user@example.com"}
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 4,
            marginBottom: 24,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#F1F4FB",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#E7F1FF",
                padding: 8,
                borderRadius: 10,
                marginRight: 16,
              }}
            >
              <Settings size={20} color="#1A5DFF" />
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1B2E54",
                flex: 1,
              }}
            >
              Settings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={handleSignOut}
          >
            <View
              style={{
                backgroundColor: "#FFEBEE",
                padding: 8,
                borderRadius: 10,
                marginRight: 16,
              }}
            >
              <LogOut size={20} color="#F44336" />
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#F44336",
                flex: 1,
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: "#FFFFFF",
            padding: 20,
            borderRadius: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#1B2E54",
              marginBottom: 8,
            }}
          >
            About FitTracker
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#5C6F92",
              lineHeight: 20,
            }}
          >
            Track your fitness journey with our comprehensive workout and goal
            tracking app. Version 1.0.0
          </Text>
        </View>
      </View>
    </View>
  );
}
