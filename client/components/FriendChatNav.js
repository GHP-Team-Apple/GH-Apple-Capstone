import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendList from "./FriendList"
import FriendChat from "./FriendChat"

export const Stack = createNativeStackNavigator();

export default function MyStack () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Friends"
          component={FriendList}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="FriendChat" component={FriendChat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};