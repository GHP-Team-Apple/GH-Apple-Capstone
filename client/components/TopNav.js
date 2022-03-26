// import { View, Text } from 'react-native'
// import React from 'react'
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
// import Chat from "./Chat";
// import { AntDesign } from '@expo/vector-icons';


// function Empty() {
// 	return <View>
// 		<Text>Hello</Text>
// 		</View>;
// }

// const Tab = createMaterialTopTabNavigator()
// export default function TopNav() {
//   return (
//     <Tab.Navigator>
//     <Tab.Screen name="notification"
//             component={Empty}
//             options={{
//                 tabBarIcon: () => <AntDesign name="notification" size={24} color="white" />
//             }} />
//     <Tab.Screen name="chat"
//             component={Chat}
//             options={{
//                 tabBarIcon: () => <AntDesign name="message1" size={24} color="white" />
//             }}/>
//     </Tab.Navigator>
//   )
// }