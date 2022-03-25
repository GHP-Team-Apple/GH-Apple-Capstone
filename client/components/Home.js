import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Profile from './Profile';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Context from '../../context/Context';
import EventMap from "./EventMap";
import Chat from "./Chat";
import FriendsMap from './FriendsMap';
import SavedEvents from './SavedEvents';


function Empty() {
	return <View><Text>hey</Text></View>;
}

const Tab = createMaterialBottomTabNavigator();

export default function Home() {
	const {
		theme: { colors },
	} = useContext(Context);
	return (
		 <Tab.Navigator
			barStyle={{ backgroundColor: 'black' }}
			initialRouteName="home">
			<Tab.Screen
				name="home"
				component={Empty}
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
				component={FriendsMap}
				options={{
					tabBarIcon: () => <Ionicons name="man-outline" size={24} color="white" />
				}}
			/>
			<Tab.Screen
				name="saved"
				component={SavedEvents}
				options={{
					tabBarIcon: () => <AntDesign name="hearto" size={24} color="white" />
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
		// <View>

		// 	<Text>Hello again</Text>
		// </View>
	);
}
