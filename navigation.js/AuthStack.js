import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { View,Text } from "react-native";
import AppStack from './AppStack';

import LandingPage from '../client/components/LandingPage'
import SignIn from '../client/components/SignIn';
import Notifications from '../client/components/Notifications';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  // const [currUser, setCurrUser] = useState(null)
  // const [loading, setLoading] = useState(true)
  // const {theme: {colors}} = useContext(Context)
  // useEffect(()=>{
  //   const unsubscribe = onAuthStateChanged(auth, user => {
  //     setLoading(false)
  //     if(user){
  //       setCurrUser(user)
  //     }
  //   })
  //   return () => unsubscribe()
  // }, []) 

//   if(loading){
//     return <Text>Loading...</Text>
//   }
  return (
      <Stack.Navigator >
      {/* <Stack.Screen name="Onboarding" component={LandingPage} /> */}
      {/* <Stack.Screen name="Login" component={SignIn} /> */}
      <Stack.Screen name='hi' component={Notifications}/>
      <Stack.Screen
          name="AppStack"
          component={AppStack}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
    // <View>
    // {!currUser ? (
    //         <Stack.Navigator screenOptions={{ headerShown: false }}>
    //           <Stack.Screen name="signIn" component={SignIn} />
    //         </Stack.Navigator>
    //         ):  <Stack.Navigator screenOptions={{ headerStyle:{ backgroundColor: colors.foreground, shadowOpacity: 0,
    //         elevation: 0.5},
    //         headerTintColor: colors.white
    //         }}>
    //           {!currUser.displayName && (
    //         <Stack.Screen name="Profile" component={Profile} />
    //           )}
    //           <Stack.Screen name="home" component={Home} options={{title: "Appining"}}/>
    //       </Stack.Navigator>}
    //      <Stack.Navigator>
    //          <SideNav/>
    //      </Stack.Navigator>
    //      </View>
  );
};

export default AuthStack;