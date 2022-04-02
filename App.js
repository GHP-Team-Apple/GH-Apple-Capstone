import React from 'react';
import ContextWrapper from './context/ContextWrapper';
import Main from './Main';
import 'react-native-gesture-handler';
import { Text, View, SafeAreaView, LogBox } from 'react-native';
import SeedEventbrite from './client/SeedEventbrite';
import Toast from 'react-native-toast-message';

function App() {
	LogBox.ignoreLogs([`AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage`]);
	LogBox.ignoreLogs([`Clipboard has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/clipboard' instead of 'react-native'. See https://github.com/react-native-clipboard/clipboard`]);
	return (
		<ContextWrapper>
			<Main />
			<Toast />
		</ContextWrapper>
		// <SeedEventbrite />
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
