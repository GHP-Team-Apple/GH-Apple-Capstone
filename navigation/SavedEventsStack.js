import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FriendList from "../client/components/FriendList";
import FriendChat from "../client/components/FriendChat";
import SavedEvents from "../client/components/SavedEvents";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native";

export const Tab = createMaterialTopTabNavigator();
export const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Saved Events"
          component={SavedEvents}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FriendList"
          component={FriendList}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="FriendChat" component={FriendChat} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </SafeAreaView>
  );
}
