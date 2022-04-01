import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SavedEvents from '../client/components/SavedEvents';
import Home from '../client/components/Home';
import EventMap from '../client/components/EventMap';
import Profile from '../client/components/Profile';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import FriendChatStack from "./FriendChatStack"
import SavedEventsStack from "./SavedEventsStack"


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Empty() {
	return (
	
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<Text style={{color: 'black'}}>Hello</Text>
		</View>
	
	)
}
const HomeStack = () => {
	return (
	  <Stack.Navigator>
		<Stack.Screen
		  name="home1"
		  component={Home}
		  options={{headerShown: false}}
		/>
	  </Stack.Navigator>
	);
  };

export default function TabNavigator() {
  return (
    <Tab.Navigator
			barStyle={{ backgroundColor: 'black' }}
			initialRouteName="home2"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {backgroundColor: '#AD40AF'},
                tabBarInactiveTintColor: '#fff',
                tabBarActiveTintColor: 'yellow',
              }}>
			<Tab.Screen
				name="home2"
				component={HomeStack}
				options={{
					tabBarIcon: () => <AntDesign name="home" size={24} color="white" />
				}}
			/>
			<Tab.Screen
				name="explore"
				component={EventMap}
				options={{
					tabBarIcon: () => 
						<Ionicons name="map-outline" size={24} color="white" />
				}}
			/>
			<Tab.Screen
				name="friends map"
				component={FriendChatStack}
				options={{
					tabBarIcon: () => <AntDesign name="message1" size={24} color="white" />,
				}}
				// screenOptions={{ headerShown: false }}
			/>
			<Tab.Screen
				name="saved"
				component={SavedEventsStack}
				options={{
					tabBarIcon: () => <AntDesign name="hearto" size={24} color="white" />,
					// headerShown: true,
				}}
			/>
			<Tab.Screen
				name="profile"
				component={Profile}
				options={{
					tabBarIcon: () => <AntDesign name="user" size={24} color="white" />,
				}}
			/>
		</Tab.Navigator>
		
  )
}