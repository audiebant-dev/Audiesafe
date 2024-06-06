import { Link, Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarStyle: { display: "none" },
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
      
        }}
      />

<Tabs.Screen
        name="home"
        options={{
          tabBarStyle: { display: "none" },
          title: "",
          
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
      
        }}
      />

<Tabs.Screen
        name="lockdown"
        options={{
          tabBarStyle: { display: "none" },
          title: "",
          
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
      
        }}
      />

<Tabs.Screen
        name="notifications"
        options={{
          headerShown: true,
          headerLeft: () => (
            <Link href="/home">
              <MaterialCommunityIcons
                name={"chevron-left"}
                size={40}
                color="#017ac3"
              />
            </Link>
          ),
          tabBarStyle: { display: "none" },
          title: "Notifications",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />




      <Tabs.Screen
        name="forget"
        options={{
          headerShown: true,
          headerLeft: () => (
            <Link href="/">
              <MaterialCommunityIcons
                name={"chevron-left"}
                size={40}
                color="#017ac3"
              />
            </Link>
          ),
          
          tabBarStyle: { display: "none" },
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
