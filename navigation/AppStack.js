import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Notifications from '../client/components/Notifications';
import CustomDrawer from '../client/components/CustomDrawer';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import TabNavigator from './TabNavigator';

import SignIn from '../client/components/SignIn';
import AddEvent from '../client/components/AddEvent';

const Drawer = createDrawerNavigator();

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
				name="Ripple"
				component={TabNavigator}
				options={{
					drawerIcon: () => <AntDesign name="home" size={22} color="black" />,
					headerShown: true,
				}}
			/>
			<Drawer.Screen
				name="Add Event"
				component={AddEvent}
				options={{
					drawerIcon: () => (
						<MaterialIcons name="add-box" size={22} color="black" />
					),
					headerShown: false,
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
}
