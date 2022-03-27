import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import Context from '../../context/Context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import EventList from './EventList';

const Tab = createBottomTabNavigator();

export default function Home(props) {
	const {
		theme: { colors },
	} = useContext(Context);
    const localEvents = props.localEvents || [];
	return (
		
		<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
			{/* <EventList localEvents={localEvents}/> */}
			<Text>Looking</Text>
		</View>
	);
}
