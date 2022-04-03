import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { getLocalEvents } from '../services/events';

export default function Home() {
	const [localEvent, setLocalEvent] = useState([]);

	useEffect(async () => {
		const localEventsFromDb = await getLocalEvents('NYC');
		setLocalEvent(localEventsFromDb);
	}, []);

	return (
		<View style={{ backgroundColor: 'white' }}>
			<ScrollView>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ paddingBottom: 10, paddingTop: 10, fontSize: 24 }}>
						Suggested Events
					</Text>
					{localEvent.length > 0
						? localEvent.map((event) => {
								return (
									<View key={event.id}>
										<View
											style={{
												alignItems: 'center',
												backgroundColor: '#c4b4f445',
												width: 375,
												borderRadius: 5,
												marginBottom: 5,
												paddingTop: 10,
												paddingBottom: 10,
												justifyContent: 'center',
											}}
										>
											<Image
												style={styles.image}
												source={{ uri: event.imageUrl }}
											/>
											<Text style={{ ...styles.text, fontWeight: 'bold' }}>{event.name}</Text>
											<View
												style={{
													flexDirection: 'row',
													padding: 10,
												}}
											>
												<Text style={styles.text}>{`City: ${event.city}`}</Text>
											</View>
											<Text style={styles.text}>{event.description}</Text>
										</View>
									</View>
								);
						  })
						: null}
				</View>
			</ScrollView>
		</View>
	);
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
		margin: 5,
		borderRadius: 5,
		borderColor: 'black',
		borderWidth: 2,
	},
	text: {
		marginLeft: 5,
		alignItems: 'center',
		width: 200,
		fontWeight: '500',
		justifyContent: 'center',
		textAlign: 'center'
	},
	icon: {
		alignSelf: 'flex-end',
		marginRight: 0,
	},
});
