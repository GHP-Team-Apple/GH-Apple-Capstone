import React from 'react';
import ContextWrapper from './context/ContextWrapper';
import Main from './Main';
import 'react-native-gesture-handler';
import { Text, View, SafeAreaView } from 'react-native';

function App() {
	return (
		<ContextWrapper>
			<Main />
		</ContextWrapper>
	);
}

export default App;

// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View, Dimensions } from "react-native";
// import Nav from "./client/components/Nav"
// // import Chat from "./client/components/Chat";
// // import EventMap from "./client/components/EventMap"
// // import FriendsMap from './client/components/FriendsMap';

// export default function App() {
//   return (
//       <View style={styles.container}>
//         <Text style={styles.header}>Hi Team Apple! This is the start of our App!!</Text>
//         {/* <EventMap /> */}
//         {/* <Chat /> */}
//         <Nav />
//         <StatusBar style="auto" />
//       </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "stretch",
//     marginTop: 50,
//     marginBottom: 30,
//     width: Dimensions.get("window").width,
//   },
//   header:{
//       alignSelf: "center",
//   }
// });
