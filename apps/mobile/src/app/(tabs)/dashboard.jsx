import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "@tanstack/react-query";
import {
  Plus,
  Activity,
  Clock,
  Zap,
  TrendingUp,
  Target,
  ChevronRight,
  Calendar,
} from "lucide-react-native";
import { useAuth } from "@/utils/auth/useAuth";
import useUser from "@/utils/auth/useUser";

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const { isAuthenticated, signIn } = useAuth();
  const { data: user, loading: userLoading } = useUser();

  // Fetch dashboard data
  const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await fetch("/api/dashboard");
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      return response.json();
    },
    enabled: !!user && isAuthenticated,
  });

  // Show sign in screen if not authenticated
  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <StatusBar style="dark" />
        <LinearGradient colors={["#16A085", "#27AE60"]} style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 24,
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Activity size={40} color="#FFFFFF" />
            </View>

            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#FFFFFF",
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              FitTracker
            </Text>

            <Text
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.9)",
                textAlign: "center",
                lineHeight: 24,
                marginBottom: 40,
              }}
            >
              Track your workouts, set goals, and reach your fitness potential
            </Text>

            <TouchableOpacity
              onPress={signIn}
              style={{
                backgroundColor: "#FFFFFF",
                paddingHorizontal: 32,
                paddingVertical: 16,
                borderRadius: 8,
                elevation: 4,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#16A085",
                }}
              >
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }

  // Show loading state if user or dashboard is loading
  if (userLoading || dashboardLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color="#16A085" />
        <Text
          style={{
            marginTop: 16,
            fontSize: 16,
            color: "#5C6F92",
          }}
        >
          Loading your dashboard...
        </Text>
      </View>
    );
  }

  const {
    recentWorkouts = [],
    weeklyStats = {},
    allTimeStats = {},
  } = dashboardData || {};

  const handleLogWorkout = () => {
    Alert.alert("Log Workout", "This feature will be available soon!", [
      { text: "OK", style: "default" },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="dark" />

      {/* Header */}
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
            fontSize: 14,
            color: "#5C6F92",
            marginBottom: 4,
          }}
        >
          Welcome back,
        </Text>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#1B2E54",
          }}
        >
          {user?.name?.split(" ")[0]}! 👋
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Action Button */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <TouchableOpacity
            onPress={handleLogWorkout}
            style={{
              backgroundColor: "#16A085",
              paddingVertical: 16,
              paddingHorizontal: 24,
              borderRadius: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#16A085",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Plus size={20} color="#FFFFFF" />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#FFFFFF",
                marginLeft: 8,
              }}
            >
              Log New Workout
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View
          style={{
            paddingHorizontal: 24,
            marginBottom: 32,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#1B2E54",
              marginBottom: 16,
            }}
          >
            This Month
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <View
              style={{
                flex: 1,
                minWidth: "47%",
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#16A085",
                    padding: 8,
                    borderRadius: 10,
                    marginRight: 12,
                  }}
                >
                  <Activity size={20} color="#FFFFFF" />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "#1B2E54",
                    }}
                  >
                    {allTimeStats.total_workouts || 0}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#5C6F92",
                    }}
                  >
                    Workouts
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                minWidth: "47%",
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#16A085",
                    padding: 8,
                    borderRadius: 10,
                    marginRight: 12,
                  }}
                >
                  <Clock size={20} color="#FFFFFF" />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "#1B2E54",
                    }}
                  >
                    {Math.round(allTimeStats.total_minutes || 0)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#5C6F92",
                    }}
                  >
                    Minutes
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                minWidth: "47%",
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#16A085",
                    padding: 8,
                    borderRadius: 10,
                    marginRight: 12,
                  }}
                >
                  <Zap size={20} color="#FFFFFF" />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "#1B2E54",
                    }}
                  >
                    {Math.round(allTimeStats.total_calories || 0)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#5C6F92",
                    }}
                  >
                    Calories
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                minWidth: "47%",
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#16A085",
                    padding: 8,
                    borderRadius: 10,
                    marginRight: 12,
                  }}
                >
                  <TrendingUp size={20} color="#FFFFFF" />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "#1B2E54",
                    }}
                  >
                    {Math.round(allTimeStats.avg_duration || 0)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#5C6F92",
                    }}
                  >
                    Avg Min
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Workouts */}
        <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#1B2E54",
              }}
            >
              Recent Workouts
            </Text>
            {recentWorkouts.length > 0 && (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "#16A085",
                    fontWeight: "600",
                    marginRight: 4,
                  }}
                >
                  See All
                </Text>
                <ChevronRight size={16} color="#16A085" />
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            {recentWorkouts.length > 0 ? (
              recentWorkouts.slice(0, 3).map((workout, index) => (
                <TouchableOpacity
                  key={workout.id}
                  style={{
                    padding: 20,
                    borderBottomWidth:
                      index < recentWorkouts.slice(0, 3).length - 1 ? 1 : 0,
                    borderBottomColor: "#F1F4FB",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#E7F1FF",
                        padding: 10,
                        borderRadius: 12,
                        marginRight: 16,
                      }}
                    >
                      <Activity size={20} color="#16A085" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#1B2E54",
                          marginBottom: 4,
                        }}
                      >
                        {workout.exercise_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#5C6F92",
                        }}
                      >
                        {new Date(workout.date).toLocaleDateString()} •{" "}
                        {workout.sets} sets × {workout.reps} reps •{" "}
                        {workout.duration} min
                      </Text>
                    </View>
                    <ChevronRight size={20} color="#C7D2FE" />
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View
                style={{
                  padding: 40,
                  alignItems: "center",
                }}
              >
                <Activity
                  size={48}
                  color="#C7D2FE"
                  style={{ marginBottom: 16 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#5C6F92",
                    marginBottom: 8,
                  }}
                >
                  No workouts yet
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#5C6F92",
                    textAlign: "center",
                  }}
                >
                  Start logging your workouts to see your progress here
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Active Goals */}
        <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#1B2E54",
              }}
            >
              Active Goals
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#16A085",
                  fontWeight: "600",
                  marginRight: 4,
                }}
              >
                Add Goal
              </Text>
              <Plus size={16} color="#16A085" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <View
              style={{
                padding: 40,
                alignItems: "center",
              }}
            >
              <Target size={48} color="#C7D2FE" style={{ marginBottom: 16 }} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#5C6F92",
                  marginBottom: 8,
                }}
              >
                No active goals
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#5C6F92",
                  textAlign: "center",
                }}
              >
                Set your first fitness goal to track your progress
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
