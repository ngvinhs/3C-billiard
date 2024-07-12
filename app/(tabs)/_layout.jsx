import { View, Text, Image } from "react-native";
import React from "react";
import { Redirect, Tabs } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const TabIcon = ({ activeIcon, inactiveIcon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center">
      <Image
        source={focused ? activeIcon : inactiveIcon}
        resizeMode="contain"
        // tintColor={color}
        className="w-8 h-8"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const activeHome = require("../../assets/tabicon/Homeactive.png");
  const inactiveHome = require("../../assets/tabicon/Homedisactive.png");
  const activeBooking = require("../../assets/tabicon/Calendaractive.png");
  const inactiveBooking = require("../../assets/tabicon/Calendardisactive.png");
  const activeNotification = require("../../assets/tabicon/Notiactive.png");
  const inactiveNotification = require("../../assets/tabicon/Notidisactive.png");
  const activeProfile = require("../../assets/tabicon/Inforactive.png");
  const inactiveProfile = require("../../assets/tabicon/Infordisactive.png");

  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href="/signin" />;

  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              activeIcon={activeHome}
              inactiveIcon={inactiveHome}
              // color={color}
              name="Trang chủ"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              activeIcon={activeBooking}
              inactiveIcon={inactiveBooking}
              // color={color}
              name="Đặt bàn"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          headerShown: true,
          headerTitle: "Thông báo",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              activeIcon={activeNotification}
              inactiveIcon={inactiveNotification}
              // color={color}
              name="Thông báo"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              activeIcon={activeProfile}
              inactiveIcon={inactiveProfile}
              // color={color}
              name="Cá nhân"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
