import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import AppStack from './AppStack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

import LandingPage from '../client/components/LandingPage';
import SignIn from '../client/components/SignIn';
import Notifications from '../client/components/Notifications';
import { NavigationContainer } from '@react-navigation/native';
import Profile from '../client/components/Profile';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
	const [currUser, setCurrUser] = useState(null);
	// const [loading, setLoading] = useState(false)
	// const {theme: {colors}} = useContext(Context)
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setCurrUser(user);
			}
		});
		return () => unsubscribe();
	}, []);

	//   if(loading){
	//     return <LandingPage />
	//   }
	if (!currUser) {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="Login"
					component={SignIn}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		);
	}
  //  else if (currUser && !currUser.displayName) {
	// 	return (
	// 		<Stack.Navigator>
	// 			<Stack.Screen name="Profile" component={Profile} />
	// 		</Stack.Navigator>
	// 	);
	// } 
  else {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="AppStack"
					component={AppStack}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		);
	}
};

export default AuthStack;
