import { View, Text, Button } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Chat from '../client/components/Chat';
import Notifications from '../client/components/Notifications';
import FriendsMap from '../client/components/FriendsMap';
import CustomDrawer from '../client/components/CustomDrawer';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import FriendChatStack from './FriendChatStack';
import TabNavigator from './TabNavigator';
import FriendList from '../client/components/FriendList';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../client/components/SignIn';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function AppStack() {
	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawer {...props} />}
			screenOptions={{
				headerShown: false,
				drawerActiveBackgroundColor: '#b29ef8',
				drawerActiveTintColor: '#fff',
				drawerInactiveTintColor: '#333',
				drawerLabelStyle: {
					marginLeft: -25,
					fontSize: 15,
				},
			}}
		>
			<Drawer.Screen
				name="Home"
				component={TabNavigator}
				options={{
					drawerIcon: () => <AntDesign name="home" size={22} color="black" />,
					headerShown: true,
					title: 'Ripple',
				}}
			/>
			{/* <Stack.Screen name="Messages" component={FriendList} options={{
          drawerIcon: () => (
            <AntDesign name="message1" size={22} color="white" />
          ),
		  headerShown: true
        }}/> */}
			<Drawer.Screen
				name="Messages"
				component={FriendChatStack}
				options={{
					drawerIcon: () => (
						<AntDesign name="message1" size={22} color="black" />
					),
					headerShown: false,
				}}
			/>
			<Drawer.Screen
				name="Friends Map"
				component={FriendsMap}
				options={{
					drawerIcon: () => (
						<Ionicons name="timer-outline" size={22} color="black" />
					),
				}}
			/>
			<Drawer.Screen
				name="Notifications"
				component={Notifications}
				options={{
					drawerIcon: () => (
						<AntDesign name="notification" size={24} color="black" />
					),
				}}
			/>
			<Drawer.Screen name="Y" component={SignIn} />
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
