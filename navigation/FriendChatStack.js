import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendList from "../client/components/FriendList"
import FriendChat from "../client/components/FriendChat"
import ChatList from "../client/components/ChatList"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native';

export const Tab = createMaterialTopTabNavigator();
export const Stack = createNativeStackNavigator();


function ChatStack () {
  return (
      <Stack.Navigator>
        <Stack.Screen name="FriendChatList" component={ChatList} options={{ headerShown: false }}/>
        <Stack.Screen name="FriendChat" component={FriendChat} options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
};

function FriendStack () {
  return (
      <Stack.Navigator>
        <Stack.Screen name="FriendChatList" component={FriendList} options={{ headerShown: false }}/>
        <Stack.Screen name="FriendChat" component={FriendChat} options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
};

export default function MyStack () {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen
          name="Chats"
          component={ChatStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Friends"
          component={FriendStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
