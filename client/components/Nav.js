// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// import { AntDesign, Ionicons } from '@expo/vector-icons';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// // Screens
// import EventMap from "./EventMap";
// import Chat from "./Chat";
// import FriendsMap from './FriendsMap';
// import Home from './Home';
// import Profile from './Profile'

// //Screen names
// const eventMap = "EventMap";
// const chat = "Chat";
// const friendsMap = "FriendsMap"

// // const Tab = createBottomTabNavigator();
// const Tabs = createMaterialBottomTabNavigator();

// function MainContainer() {
//   return (
    
//        <Tabs.Navigator barStyle={{
//         activeTintColor: 'tomato',
//         inactiveTintColor: 'grey',
//         labelStyle: { paddingBottom: 10, fontSize: 10 },
//         style: { padding: 10, height: 70}
//       }} initialRouteName='home'>

// <Tabs.Screen name="home" component={Home} options={{
//   tabBarIcon: () => 
//     <AntDesign name="search1" size={24} color="black" />
// }} />
// <Tabs.Screen
// 				name="explore"
// 				component={EventMap}
// 				options={{
// 					tabBarIcon: () => 
// 						<Ionicons name="map" size={24} color="black" />
					
// 				}}
// 			/>
// 			<Tabs.Screen
// 				name="friendMap"
// 				component={FriendsMap}
// 				options={{
// 					tabBarIcon: () => <AntDesign name="hearto" size={24} color="black" />
// 				}}
// 			/>
// 			<Tabs.Screen
// 				name="saved"
// 				component={Empty}
// 				options={{
// 					tabBarIcon: () => <AntDesign name="hearto" size={24} color="black" />
// 				}}
// 			/>
// 			<Tabs.Screen
// 				name="profile"
// 				component={Profile}
// 				options={{
// 					tabBarIcon: () => <AntDesign name="user" size={24} color="black" />,
// 				}}
// 			/>
   
// </Tabs.Navigator>
//     /* <NavigationContainer>
//       <Tab.Navigator
//         initialRouteName={Home}
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//             let rn = route.name;

//             if (rn === eventMap) {
//               iconName = focused ? 'map' : 'map-outline';

//             } else if (rn === chat) {
//               iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';

//             } else if (rn === friendsMap) {
//               iconName = focused ? 'man' : 'man-outline';

//             }
//              else if (rn === Home) {
//               iconName = focused ? 'man' : 'man-outline';

//             }

//             // return any component that you like here
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: 'tomato',
//           inactiveTintColor: 'grey',
//           labelStyle: { paddingBottom: 10, fontSize: 10 },
//           style: { padding: 10, height: 70}
//         }}>

       
//         <Tab.Screen name={eventMap} component={EventMap} />
//         <Tab.Screen name={chat} component={Chat} />
//         <Tab.Screen name={friendsMap} component={FriendsMap} />

//       </Tab.Navigator>
//     </NavigationContainer>
//     </View> */
//   );
// }

// export default MainContainer;
