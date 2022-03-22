import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Nav from "./client/components/Nav"
// import Chat from "./client/components/Chat";
// import EventMap from "./client/components/EventMap"
// import FriendsMap from './client/components/FriendsMap';

export default function App() {
  return (
      <View style={styles.container}>
        <Text style={styles.header}>Hi Team Apple! This is the start of our App!!</Text>
        {/* <EventMap /> */}
        {/* <Chat /> */}
        <Nav />
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    marginTop: 50,
    marginBottom: 30,
    width: Dimensions.get("window").width,
  },
  header:{
      alignSelf: "center",
  }
});

// import React, {useState, useEffect, useContext} from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { onAuthStateChanged } from 'firebase/auth'
// import {auth} from './firebase' 
// import { Text, View } from 'react-native';
// import SignIn from './component/auth/SignIn';
// import ContextWrapper from './context/ContextWrapper';
// import Context from './context/Context';
// import Profile from './component/auth/Profile';
// import Home from './component/auth/Home'

// const Stack = createStackNavigator();

// function App() {
//   const [currUser, setCurrUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const {theme: {colors}} = useContext(Context)
//   useEffect(()=>{
//     const unsubscribe = onAuthStateChanged(auth, user => {
//       setLoading(false)
//       if(user){
//         setCurrUser(user)
//       }
//     })
//     return () => unsubscribe()
//   }, []) 

//   if(loading){
//     return <Text>Loading...</Text>
//   }
// 	return (
//     <NavigationContainer >
//       {!currUser ? (
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="signIn" component={SignIn} />
//       </Stack.Navigator>
//       ):  <Stack.Navigator screenOptions={{ headerStyle:{ backgroundColor: colors.foreground, shadowOpacity: 0,
//       elevation: 0.5},
//       headerTintColor: colors.white
//       }}>
//         {currUser.displayName && (
//       <Stack.Screen name="pro" component={Profile} />
//         )}
//         <Stack.Screen name="home" component={Home} options={{title: "The Collective"}}/>
//     </Stack.Navigator>}
   

//   </NavigationContainer>
// 	);
// }


// function Main (){
//   return (< ContextWrapper>
//         <App/> 
//        </ContextWrapper> )
// }

// export default Main
