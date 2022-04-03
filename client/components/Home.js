import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	ImageBackground,
	Pressable,
	StyleSheet,
	Image,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import Context from '../../context/Context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import LocalEventRow from './LocalEventRow';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { saveEvent, unsaveEvent } from '../services/events';
import { getLocalEvents } from '../services/events';

export default function Home() {
	const [localEvent, setLocalEvent] = useState([]);
	// console.log(props)
	// const {
	// 	theme: { colors },
	// } = useContext(Context);
	// const userId = auth.currentUser.uid;
	// const event = props.event;
	// const handlePress = props.handlePress;
	// const savedEventsIDArr = props.savedEventsIDArr;
	// const [isSaved, setIsSaved] = useState(false);

	useEffect(async () => {
		const localEventsFromDb = await getLocalEvents('NYC');
		setLocalEvent(localEventsFromDb);
	}, []);

	return (
		<View>
			<ScrollView>
				<View style={{ justifyContent: 'center', alignItems: 'center'}}>
			<Text style={{paddingBottom: 10, paddingTop: 10, fontSize: 24}}>Suggested Events</Text>
			{localEvent.length > 0
				? localEvent.map((event) => {
						return (
							<View key={event.id}>
								<Image style={styles.image} source={{ uri: event.imageUrl }} />
								<Text>{event.name}</Text>
								<View
									style={{
										flexDirection: 'row',
										padding: 10,
									}}
								>
									<Text
										style={{
											marginRight: 10,
										}}
									>
										{event.city}
									</Text>
								</View>
									<Text style={{alignItems: 'center', marginLeft: 5,}}>{event.description}</Text>
							</View>
						);
				  })
				: null}
				</View>
				</ScrollView>
		</View>
	);

	// const handleSaveOrUnsaveEvent = async (isSaved) => {
	//     const savedEvent = {
	//         userId: userId,
	//         id: event.id,
	//         name: event.name,
	//         type: event.type,
	//         startDate: event.startDate,
	//         visibleUntil: event.visibleUntil,
	//         venueName: event.venueName,
	//         venueAddress: event.venueAddress,
	//         location: {
	//             lat: event.location.lat,
	//             lon: event.location.lon
	//         },
	//         checkIn: false,
	//         // imageUrl: event.imageUrl
	//     }

	//     if (!isSaved) {
	//         await saveEvent(userId, savedEvent)
	//         setIsSaved(true);
	//         props.updateSaveEventID([...props.savedEventsIDArr, event.id])
	//     } else {
	//         await unsaveEvent(userId, savedEvent)
	//         setIsSaved(false);
	//         const newIDArr = props.savedEventsIDArr.filter(id => id !== event.id);
	//         props.updateSaveEventID(newIDArr);
	//     }
	// }

	// return (
	//     <Pressable
	//         style={styles.event}
	//         onPress={() => handlePress(event)}
	//     >
	//         <Image
	//             style={styles.image}
	//             // source={{
	//             //     uri: event.imageUrl,
	//             // }}
	//         />
	//         <View style={styles.text}>
	//             <Text style={{ fontSize: 18, fontWeight: 'bold', alignContent: 'stretch' }}>{event.name}</Text>
	//             <Text style={{ fontSize: 15 }}>{dateFormatterLocal(event.startDate.seconds)}</Text>
	//             <Text style={{ fontSize: 15 }}>{event.venueName}</Text>

	//             <Pressable
	//                 style={styles.icon}
	//                 onPress={() => handleSaveOrUnsaveEvent(isSaved)}
	//             >
	//                 {!isSaved
	//                     ? (<Ionicons name="heart-outline" size={28} color="black" />)
	//                     : (<Ionicons name="heart-sharp" size={28} color="black" />)
	//                 }
	//             </Pressable>
	//         </View>

	//     </Pressable>
	// )
}

const dateFormatterLocal = (timestamp) => {
	return `${new Date(timestamp * 1000)}`.slice(0, 21);
};

const styles = StyleSheet.create({
	event: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 5,
	},
	image: {
		width: 200,
		height: 200,
		margin: 2,
	},
	text: {
		width: 220,
		padding: 2,
		alignItems: 'stretch',
		marginLeft: 5,
	},
	icon: {
		// flexDirection: 'row',
		// justifyContent: 'flex-end',
		alignSelf: 'flex-end',
		marginRight: 0,
	},
});
