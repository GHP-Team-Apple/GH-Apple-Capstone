import React, { useState, useEffect, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
	StyleSheet,
	Pressable,
	View,
	Dimensions,
	Text,
	Switch,
} from 'react-native';
import * as Location from 'expo-location';
import { getFriendEvents } from '../services/events';
import { getDistance } from '../services/distance';
import AttendingEvents from './AttendingEvent';
import Filter from './Filter';
import { LocalEventObj } from '../templates/localEvents';
const categories = require('../data/categories');
const cities = require('../data/cities');
import { auth, db } from '../../firebase';
import FilteredFriendsList from './FilteredFriendsList';
import FriendEventList from './FriendEventList';
import { getUserById } from '../services/users';

const FriendsMap = (props) => {
	const userId = 'tGBFjYBpoZWCO9lyycynXwlVVza2'; // auth.currentUser.uid;
	const [location, setLocation] = useState(null);
	const [friendEvents, setFriendEvents] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [filterPage, setFilterPage] = useState(false);
	const [categoryList, setCategoryList] = useState(categories);
	const [cityList, setCityList] = useState(cities);
	const [isFreeChecked, setIsFreeChecked] = useState(false);
	const [filteredCat, setFilteredCat] = useState([]);
	const [filteredCity, setFilteredCity] = useState([]);
	const [maxDistance, setMaxDistance] = useState([2]);
	const setEventViewStatus = props.setEventViewStatus;
	const eventView = props.eventView;
	const [filteredFriendEvents, setFilteredFriendEvents] =
		useState(friendEvents);

	useEffect(async () => {
		try {
			const friendEvents = await getFriendEvents(userId);
			setFriendEvents(friendEvents);

			await filterFriendEvents(friendEvents);
		} catch (err) {
			console.log('error: ', err);
		}
	}, []);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.Balanced,
			});
			setLocation(location);
		})();
	}, []);

	useEffect(async () => {
		await filterFriendEvents(friendEvents);
	}, [filteredCat, maxDistance]);

	const filterFriendEvents = async (friendEvents) => {
		const friendEventArr = [];
		// console.log("friendEvents", friendEvents)
		// const friendEventsFilted = friendEvents.filter(event => event.city !== undefined)
		for (let i = 0; i < friendEvents.length; i++) {
			const event = friendEvents[i];
			const now = new Date().getTime() / 1000;
			const startTime = event.startDate.seconds;
			const endTime = event.visibleUntil.seconds;
			const checkIn = event.checkIn;
			const eventIsFree = event.isFree ? event.isFree : false;
			const eventLat = event.location.lat;
			const eventLon = event.location.lon;
			// const myLat = location.coords.latitude;
			// const myLon = location.coords.longitude;
			const myLat = 40.600181082122;
			const myLon = -73.98549203006156;
			const category = event.type;
			const city = event.city;
			const distanceFromEvent = getDistance(myLat, eventLat, myLon, eventLon); // mi
			// console.log("city", city)
			if (
				now >= startTime &&
				now <= endTime &&
				checkIn &&
				(filteredCat.includes(category) || filteredCat.length === 0) &&
				(filteredCity.includes(city) ||
					filteredCity.length === 0 ||
					city !== undefined) &&
				distanceFromEvent <= maxDistance &&
				(eventIsFree === isFreeChecked || isFreeChecked === false)
			) {
				const friend = await getUserById(event.userId); // returns user object
				const profilePicture = friend.profilePicture;
				const username = friend.username;
				const firstName = friend.firstName;
				friendEventArr.push({
					...event,
					userProfilePic: profilePicture,
					username: username,
					firstName: firstName,
				});
			}
		}
		setFilteredFriendEvents(friendEventArr);
		// return friendEventArr;
	};

	// const handleFilterFriendEvent = (filteredFriendEvents) => {
	//   setFilteredFriendEvents(filteredFriendEvents);
	// };

	const handlePress = (event) => {
		if (event) {
			const eventObj = LocalEventObj(event);
			setSelectedEvent(eventObj);
		} else {
			setSelectedEvent(event);
		}
	};

	const handleFilterPage = (boolean) => {
		setFilterPage(boolean);
	};

	const handleNoFilter = () => {
		const catArray = [];
		for (let i = 0; i < categoryList.length; i++) {
			categoryList[i].isChecked = false;
		}
		setCategoryList(categoryList);
		setFilteredCat(catArray);
		const cityArray = [];
		for (let i = 0; i < cityList.length; i++) {
			cityList[i].isChecked = false;
		}
		setCityList(cityList);
		setFilteredCity(cityArray);
		setMaxDistance(2);
		setIsFreeChecked(false);
	};

	const handleCat = (catId) => {
		const catArray = [];
		for (let i = 0; i < categoryList.length; i++) {
			if (categoryList[i].id === catId) {
				const isChecked = categoryList[i].isChecked;
				categoryList[i].isChecked = !isChecked;
				const newStatus = categoryList[i].isChecked;
			}
		}
		const selectedCat = categoryList
			.filter((cat) => cat.isChecked)
			.map((catObj) => catObj.value);
		setCategoryList(categoryList);
		setFilteredCat(selectedCat);
	};

	const handleCity = (cityId) => {
		for (let i = 0; i < cityList.length; i++) {
			if (cityList[i].id === cityId) {
				const isChecked = cityList[i].isChecked;
				cityList[i].isChecked = !isChecked;
			}
		}
		setCityList(cityList);

		const filtCity = cityList.map((city) => {
			if (city.isChecked) {
				return city.city;
			}
		});
		setFilteredCity(filtCity);
	};

	const handleMaxDistance = (distance) => {
		setMaxDistance(distance);
	};

	// need to test:
	const handleIsFreeChecked = () => {
		setIsFreeChecked(!isFreeChecked);
	};

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.container}>
				{location ? (
					<MapView
						style={styles.map}
						provider={PROVIDER_GOOGLE}
						initialRegion={{
							latitude: 0 || location.coords.latitude,
							longitude: 0 || location.coords.longitude,
							latitudeDelta: 0.05,
							longitudeDelta: 0.05,
						}}
					>
						{/* {location ? ( */}
						<Marker
							coordinate={{
								latitude: location.coords.latitude,
								longitude: location.coords.longitude,
							}}
						>
							<Callout>
								<Text>Working at Google</Text>
							</Callout>
						</Marker>

						{location ? (
							<FilteredFriendsList
								friendEvents={friendEvents}
								filteredFriendEvents={filteredFriendEvents}
								handlePress={handlePress}
							/>
						) : // filterFriendEventsAndMap(friendEvents)
						null}
					</MapView>
				) : null}
				<View style={styles.switch}>
					<Switch
						trackColor={{ false: '#b29ef8', true: '#b29ef8' }}
						thumbColor={eventView ? '#003566' : '#003566'}
						onValueChange={() => setEventViewStatus()}
						value={!eventView}
					/>
				</View>
				<View style={styles.selection}>
					<Pressable style={styles.icon} onPress={() => handleFilterPage(true)}>
						<Ionicons name="options" size={20} color="#b29ef8" />
					</Pressable>
				</View>

				{selectedEvent ? (
					<AttendingEvents event={selectedEvent} handlePress={handlePress} />
				) : null}
				{filterPage ? (
					<Filter
						categoryList={categoryList}
						cityList={cityList}
						handleFilterPage={handleFilterPage}
						handleNoFilter={handleNoFilter}
						handleCat={handleCat}
						handleCity={handleCity}
						handleMaxDistance={handleMaxDistance}
						handleIsFreeChecked={handleIsFreeChecked}
						isFreeChecked={isFreeChecked}
						maxDistance={maxDistance}
					/>
				) : null}
			</View>
			{/* <View style={styles.friendsList}> */}
			<FriendEventList
				filteredFriendEvents={filteredFriendEvents}
				handlePress={handlePress}
			/>
			{/* </View> */}
		</View>
	);
};

const getImage = (image) => {
	switch (image) {
		case 'alpaca.png':
			return require('../../assets/alpaca.png');
		case 'rabbit.png':
			return require('../../assets/rabbit.png');
		case 'chameleon.png':
			return require('../../assets/chameleon.png');
		case 'dog.png':
			return require('../../assets/dog.png');
		case 'koala.png':
			return require('../../assets/koala.png');
		case 'penguin.png':
			return require('../../assets/penguin.png');
		case 'panda.png':
			return require('../../assets/panda.png');
		case 'elephant.png':
			return require('../../assets/elephant.png');
		case 'duck.png':
			return require('../../assets/duck.png');
	}
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// backgroundColor: "#fff",
		// alignItems: "center",
		// justifyContent: "center",
		justifyContent: 'flex-end',
		margin: 0,
	},
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height * 0.55,
	},
	switch: {
		position: 'absolute',
		alignSelf: 'flex-end',
		padding: 5,
	},
	selection: {
		position: 'absolute',
		alignSelf: 'flex-start',
		padding: 5,
		flexDirection: 'column',
	},
	icon: {
		padding: 7,
		backgroundColor: '#003566',
		borderRadius: 50,
		alignSelf: 'flex-start',
		marginRight: 5,
	},
	event: {
		flexDirection: 'row',
		// flexWrap: 'wrap',
		alignItems: 'center',
		margin: 5,
	},
	friendsList: {
		// container
	},
});

export default FriendsMap;
