import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Profile from './Profile';
import { AntDesign } from '@expo/vector-icons';
import Context from '../../context/Context';

const Tab = createMaterialBottomTabNavigator();

function Empty() {
	return <View>hey</View>;
}

export default function Home() {
	const {
		theme: { colors },
	} = useContext(Context);
	return (
		// <Tab.Navigator
		// 	barStyle={{ backgroundColor: 'black' }}
		// 	initialRouteName="home"
		// >
		// 	<Tab.Screen
		// 		name="home"
		// 		component={Empty}
		// 		options={{
		// 			tabBarIcon: () => <AntDesign name="home" size={24} color="white" />
		// 		}}
		// 	/>
		// 	<Tab.Screen
		// 		name="explore"
		// 		component={Empty}
		// 		options={{
		// 			tabBarIcon: () => 
		// 				<AntDesign name="search1" size={24} color="white" />
					
		// 		}}
		// 	/>
		// 	<Tab.Screen
		// 		name="saved"
		// 		component={Empty}
		// 		options={{
		// 			tabBarIcon: () => <AntDesign name="hearto" size={24} color="white" />
		// 		}}
		// 	/>
		// 	<Tab.Screen
		// 		name="profile"
		// 		component={Profile}
		// 		options={{
		// 			tabBarIcon: () => <AntDesign name="user" size={24} color="white" />,
		// 		}}
		// 	/>
		// </Tab.Navigator>
		<Text>Hello again</Text>
	);
}
