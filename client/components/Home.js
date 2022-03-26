import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import Context from '../../context/Context';
<<<<<<< HEAD
=======
import EventMap from "./EventMap";
import Chat from "./Chat";
import FriendsMap from './FriendsMap';
import SavedEvents from './SavedEvents';
>>>>>>> main



export default function Home({navigation}) {
	const {
		theme: { colors },
	} = useContext(Context);
	return (
<<<<<<< HEAD
		<View><Text>hey</Text></View>
		// <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
		// 	<ScrollView style={{padding: 20}}>
		// 	<View
        //   style={{
        //     flexDirection: 'row',
        //     justifyContent: 'space-between',
        //     marginBottom: 20,
        //   }}>
        //   <Text style={{fontSize: 18}}>
        //     Hello Username
        //   </Text>
        //   <TouchableOpacity onPress={() => navigation.openDrawer()}>
        //     <ImageBackground
        //       source={require('../../assets/dog.png')}
        //       style={{width: 35, height: 35}}
        //       imageStyle={{borderRadius: 25}}
        //     />
        //   </TouchableOpacity>
        // </View>
		// 	</ScrollView>
		// </SafeAreaView>
=======
		 <Tab.Navigator
			barStyle={{ backgroundColor: 'black' }}
			initialRouteName="home">
			{/* <Tab.Screen
				name="home"
				component={Empty}
				options={{
					tabBarIcon: () => <AntDesign name="home" size={24} color="white" />
				}}
			/> */}
			<Tab.Screen
				name="explore"
				component={EventMap}
				options={{
					tabBarIcon: () => 
						<Ionicons name="map-outline" size={24} color="white" />
					
				}}
			/>
			<Tab.Screen
				name="friends map"
				component={FriendsMap}
				options={{
					tabBarIcon: () => <Ionicons name="man-outline" size={24} color="white" />
				}}
			/>
			{/* <Tab.Screen
				name="saved"
				component={SavedEvents}
				options={{
					tabBarIcon: () => <AntDesign name="hearto" size={24} color="white" />
				}}
			/> */}
			{/* <Tab.Screen
				name="profile"
				component={Profile}
				options={{
					tabBarIcon: () => <AntDesign name="user" size={24} color="white" />,
				}}
			/> */}
		</Tab.Navigator>
		// <View>

		// 	<Text>Hello again</Text>
		// </View>
>>>>>>> main
	);
}
