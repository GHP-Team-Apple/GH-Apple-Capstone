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
                tabBarStyle: {backgroundColor: '#003566' },
                tabBarInactiveTintColor: '#fff',
                tabBarActiveTintColor: 'yellow',
              }}>
			<Tab.Screen
				name="home2"
				component={HomeStack}
				options={{
					tabBarIcon: () => <AntDesign name="home" size={24} color='#b29ef8' />
				}}
			/>
			<Tab.Screen
				name="explore"
				component={EventMap}
				options={{
					tabBarIcon: () => 
<<<<<<< HEAD
						<Ionicons name="map-outline" size={24} color="white" />
=======
						<Ionicons name="map-outline" size={24} color="#b29ef8" />
					
>>>>>>> main
				}}
			/>
			<Tab.Screen
				name="friends map"
				component={FriendChatStack}
				options={{
<<<<<<< HEAD
					tabBarIcon: () => <AntDesign name="message1" size={24} color="white" />,
=======
					tabBarIcon: () => <Ionicons name="md-add-circle-outline" size={30} color="white" />
>>>>>>> main
				}}
				// screenOptions={{ headerShown: false }}
			/>
			<Tab.Screen
				name="saved"
				component={SavedEventsStack}
				options={{
<<<<<<< HEAD
					tabBarIcon: () => <AntDesign name="hearto" size={24} color="white" />,
					// headerShown: true,
=======
					tabBarIcon: () => <AntDesign name="hearto" size={24} color="#b29ef8" />
>>>>>>> main
				}}
			/>
			<Tab.Screen
				name="profile"
				component={Profile}
				options={{
					tabBarIcon: () => <AntDesign name="user" size={24} color="#b29ef8" />,
				}}
			/>
		</Tab.Navigator>
		
  )
}