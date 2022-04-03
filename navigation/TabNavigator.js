import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SavedEvents from "../client/components/SavedEvents";
import Home from "../client/components/Home";
import EventMap from "../client/components/EventMap";
import Profile from "../client/components/Profile";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import FriendChatStack from "./FriendChatStack";
import SavedEventsStack from "./SavedEventsStack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Empty() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "black" }}>Hello</Text>
    </View>
  );
}
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home1"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "black" }}
      initialRouteName="Home"
      screenOptions={
        ({route}) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'ios-heart' : 'ios-heart-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'ios-chatbubble-ellipses' : 'ios-chatbubble-ellipses-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          } 
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused, color, position }) => {
          return <Text style={{fontSize: 11,color:"white"}}>{focused ? route.name : ""}</Text>
        },
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#c4b4f4',
        tabBarStyle: { backgroundColor: "#003566" }
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={EventMap}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={SavedEventsStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={FriendChatStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
