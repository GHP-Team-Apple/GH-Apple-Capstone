import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStack from './AppStack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

import SignIn from '../client/components/SignIn';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
	const [currUser, setCurrUser] = useState(null);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setCurrUser(user);
			}
		});
		return () => unsubscribe();
	}, []);
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
	} else {
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
