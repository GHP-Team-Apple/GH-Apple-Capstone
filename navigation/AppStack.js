import { View, Text } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Chat from '../client/components/Chat';
import Notifications from '../client/components/Notifications';
import FriendsMap from '../client/components/FriendsMap';
import CustomDrawer from '../client/components/CustomDrawer';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import TabNavigator from './TabNavigator';
import { useDrawerStatus } from '@react-navigation/drawer';

// ...


const Drawer = createDrawerNavigator();

export default function AppStack() {
	console.log('hello')
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: () => (
            <AntDesign name="home" size={22} color="white" />
          ),
        }}
      />
      <Drawer.Screen
        name="Messages"
        component={Chat}
        options={{
          drawerIcon: () => (
            <AntDesign name="message1" size={22} color="white" />
          ),
        }}
      />
      <Drawer.Screen
        name="Friends Map"
        component={FriendsMap}
        options={{
          drawerIcon: () => (
            <Ionicons name="timer-outline" size={22} color="white" />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{
          drawerIcon: () => (
            <AntDesign name="notification" size={22} color="white" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
	// return (
	// 	<Drawer.Navigator
	// 		drawerContent={(props) => <CustomDrawer {...props} />}
	// 		screenOptions={{
	// 			headerShown: false,
	// 			drawerActiveBackgroundColor: '#001d3d',
	// 			drawerActiveTintColor: '#fff',
	// 			drawerInactiveTintColor: '#333',
	// 			drawerLabelStyle: {
	// 				marginLeft: -25,
	// 			},
	// 		}}
	// 	>
	// 		{/* <Stack.Screen name="landing" component={LandingPage}  options={{ headerShown: false }}/> */}
	// 		{/* <Stack.Screen name="signIn" component={SignIn}  options={{ headerShown: false }}/> */}
	// 		<Drawer.Screen
	// 			component={TabNavigator}
	// 			name="Home2"
	// 			options={{
	// 				drawerIcon: ({ color }) => (
	// 					<AntDesign name="home" size={22} color={color} />
	// 				),
	// 			}}
	// 		/>
	// 		<Drawer.Screen
	// 			component={Chat}
	// 			name="Chat"
	// 			options={{
	// 				drawerIcon: ({ color }) => (
	// 					<AntDesign name="message1" size={22} color={color} />
	// 				),
	// 			}}
	// 		/>
	// 		<Drawer.Screen
	// 			component={Notifications}
	// 			name="Notifications"
	// 			options={{
	// 				drawerIcon: () => (
	// 					<AntDesign name="notifications" size={24} color="white" />
	// 				),
	// 			}}
	// 		/>
	// 		<Drawer.Screen
	// 			name="Friends Map"
	// 			component={FriendsMap}
	// 			options={{
	// 				drawerIcon: () => (
	// 					<Ionicons name="man-outline" size={24} color="white" />
	// 				),
	// 			}}
	// 		/>
	// 	</Drawer.Navigator>
	// );
}
