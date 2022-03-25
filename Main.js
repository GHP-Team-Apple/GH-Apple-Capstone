import React, {useState, useEffect, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from './firebase' 
import { Text} from 'react-native';
import SignIn from './client/components/SignIn';
import Context from './context/Context';
import Profile from './client/components/Profile';
import Home from './client/components/Home'

const Stack = createStackNavigator();

export default function Main() {
  const [currUser, setCurrUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const {theme: {colors}} = useContext(Context)
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, user => {
      setLoading(false)
      if(user){
        setCurrUser(user)
      }
    })
    return () => unsubscribe()
  }, []) 

//   if(loading){
//     return <Text>Loading...</Text>
//   }
	return (
    <NavigationContainer >
      {!currUser ? (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signIn" component={SignIn} />
      </Stack.Navigator>
      ):  <Stack.Navigator screenOptions={{ headerStyle:{ backgroundColor: colors.foreground, shadowOpacity: 0,
      elevation: 0.5},
      headerTintColor: colors.white
      }}>
        {!currUser.displayName && (
      <Stack.Screen name="Profile" component={Profile} />
        )}
        <Stack.Screen name="home" component={Home} options={{title: "Appining"}}/>
    </Stack.Navigator>}
   

  </NavigationContainer>
	);
}
