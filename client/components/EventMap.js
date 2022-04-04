import React, { useState, useEffect, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text, Pressable, Dimensions, Switch } from 'react-native';
import * as Location from "expo-location";
import getEventsFromSeatGeek from '../resources/seatgeek';
import { getLocalEvents, getSavedEventsByUserId } from '../services/events';
import EventList from './EventList';
import SingleEvent from './SingleEvent';
import {
    AntDesign,
    Ionicons,
    MaterialCommunityIcons,
    FontAwesome5,
    Entypo,
    FontAwesome,
    MaterialIcons
} from "@expo/vector-icons";
import { LocalEventObj } from '../templates/localEvents';
import { auth } from '../../firebase';
import Filter from "./Filter";
const categories = require("../data/categories");
const cities = require("../data/cities");
import { getDistance } from "../services/distance";
import FriendsMap from './FriendsMap';

const EventMap = () => {
    const userId = auth.currentUser.uid;
    const [seatGeekEvents, setSeatGeekEvents] = useState([]);
    const [localEvents, setLocalEvents] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [savedEventsIDArr, setSavedEventsIDArr] = useState([]);
    const [eventView, setEventView] = useState(true);
    const seatGeekCat = [
        'concert', 
        'theater', 
        'comedy', 
        'dance_performance_tour', 
        'broadway_tickets_national',
        'sports',
        'family',
        'film',
        'literacy'
    ]

    //Integrating Filter
    const [filterPage, setFilterPage] = useState(false);
    const [categoryList, setCategoryList] = useState(categories);
    const [cityList, setCityList] = useState(cities);
    const [isFreeChecked, setIsFreeChecked] = useState(false);
    const [filteredCat, setFilteredCat] = useState([]);
    const [filteredCity, setFilteredCity] = useState([]);
    const [maxDistance, setMaxDistance] = useState([2]);
    let events;

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            // set map to current location
            const currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced, });
            setLocation(currentLocation);

            // get Seat Geek events near current location
            if (filteredCat.length !== 0) {
                const filteredSeatGeek = filteredCat.filter(cat => seatGeekCat.includes(cat));
                events = await getEventsFromSeatGeek(filteredSeatGeek, currentLocation.coords.latitude, currentLocation.coords.longitude, maxDistance[0]);
            } else {
                events = await getEventsFromSeatGeek(['concert'], currentLocation.coords.latitude, currentLocation.coords.longitude, maxDistance[0]);
            }

            setSeatGeekEvents(events);
            await loadLocalEvents()

        })();
    }, []);

    useEffect(async () => {
        const savedEvents = await getSavedEventsByUserId(userId);
        const eventsIDArr = savedEvents.map(event => event.eventId);
        setSavedEventsIDArr(eventsIDArr);
    }, [])

    useEffect(async () => {
        if (currentRegion) {
            const { latitude, longitude } = currentRegion;
            if (filteredCat.length !== 0) {
                const filteredSeatGeek = filteredCat.filter(cat => seatGeekCat.includes(cat));
                events = await getEventsFromSeatGeek(filteredSeatGeek, currentRegion.latitude, currentRegion.longitude, maxDistance[0]);
            } else {
                events = await getEventsFromSeatGeek(['concert'], currentRegion.latitude, currentRegion.longitude, maxDistance[0]);
            }
            setSeatGeekEvents(events);
        }
    }, [currentRegion]);

    useEffect(async () => {
        if (currentRegion) {
            if (filteredCat.length !== 0) {
                const filteredSeatGeek = filteredCat.filter(cat => seatGeekCat.includes(cat));
                events = await getEventsFromSeatGeek(filteredSeatGeek, currentRegion.latitude, currentRegion.longitude, maxDistance[0]);
            } else {
                events = await getEventsFromSeatGeek(['concert'], currentRegion.latitude, currentRegion.longitude, maxDistance[0]);
            }
            setSeatGeekEvents(events);
        }
    }, [filteredCat, maxDistance])

    const loadLocalEvents = async () => {
        try {
            // Local events
            const local = await getLocalEvents('NYC');
            setLocalEvents(local);

        } catch (err) {
            console.log('error: ', err);
        }
    }

    const handleRegionChange = (region) => {
        setCurrentRegion(region);
    }

    const handleSelectEvent = (event) => {
        if (event && event.hostId) {
            const eventObj = LocalEventObj(event)
            setSelectedEvent(eventObj);
        } else if (event) {
            const eventObj = {
                id: event.id,
                name: event.performers[0].name,
                date: event.datetime_utc,
                visible: event.visible_until_utc,
                venue: {
                    name: event.venue.name,
                    address: event.venue.address,
                    extended_address: event.venue.extended_address,
                    location: {
                        lat: event.venue.location.lat,
                        lon: event.venue.location.lon
                    }
                },
                imageUrl: event.performers[0].image,
                type: event.type,
                eventUrl: event.url

            }
            setSelectedEvent(eventObj);
        } else {
            setSelectedEvent(null);
        }
    }

    const updateSaveEventID = (arr) => {
        setSavedEventsIDArr(arr);
    }

    //=====================================================

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
        setIsFreeChecked(false)
    };

    const handleCat = (catId) => {
        for (let i = 0; i < categoryList.length; i++) {
            if (categoryList[i].id === catId) {
                const isChecked = categoryList[i].isChecked;
                categoryList[i].isChecked = !isChecked;
                const newStatus = categoryList[i].isChecked;
            }
        }

        const selectedCat = categoryList.filter(cat => cat.isChecked).map(catObj => catObj.value);
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

    //=====================================================

    const filterLocalEvents = (eventArr) => {
        if (currentRegion) {
            return eventArr.filter(event => {
                const eventIsFree = event.isFree ? event.isFree : false;
                const eventLat = event.location.lat;
                const eventLon = event.location.lon;
                const myLat = currentRegion.latitude;
                const myLon = currentRegion.longitude;
                const category = event.type.toLowerCase();
                const city = event.city;
                const distanceFromEvent = getDistance(
                    myLat,
                    eventLat,
                    myLon,
                    eventLon
                ); // mi
                if (
                    (filteredCat.includes(category) || filteredCat.length === 0) &&
                    (filteredCity.includes(city) || filteredCity.length === 0)
                    && (distanceFromEvent <= maxDistance)
                    && (eventIsFree === isFreeChecked || isFreeChecked === false)
                )
                    return event;
            });
        }
        
    }

    const setEventViewStatus = () => {
        const status = eventView; // true or false
        setEventView(!status);
    }

    if (eventView) {
        return location ? (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05
                        }}
                        onRegionChangeComplete={(region) => handleRegionChange(region)}
                    >
                        {seatGeekEvents ?
                            seatGeekEvents.map((event, idx) => (
                                <Marker
                                    key={`sg-${idx}`}
                                    coordinate={{
                                        latitude: Number(event.venue.location.lat),
                                        longitude: Number(event.venue.location.lon)
                                    }}
                                    onPress={() => handleSelectEvent(event)}
                                >
                                    {CustomMarker(event.type.toLowerCase())}
                                </Marker>
                            ))
                            : null
                        }
                        { (localEvents && currentRegion) ?
                            localEvents.map((event, idx) => {
                                const eventIsFree = event.isFree ? event.isFree : false;
                                const eventLat = event.location.lat;
                                const eventLon = event.location.lon;
                                const myLat = currentRegion.latitude;
                                const myLon = currentRegion.longitude;
                                const category = event.type;
                                const city = event.city;
                                const distanceFromEvent = getDistance(
                                    myLat,
                                    eventLat,
                                    myLon,
                                    eventLon
                                ); // mi
                                if (
                                    (filteredCat.includes(category) || filteredCat.length === 0) &&
                                    (filteredCity.includes(city) || filteredCity.length === 0)
                                    && (distanceFromEvent <= maxDistance)
                                    && (eventIsFree === isFreeChecked || isFreeChecked === false)
                                )
                                    return (
                                        <Marker
                                            key={`le-${idx}`}
                                            coordinate={{
                                                latitude: Number(event.location.lat),
                                                longitude: Number(event.location.lon),
                                            }}
                                            onPress={() => handleSelectEvent(event)}
                                        >
                                            {CustomMarker(event.type.toLowerCase())}
                                        </Marker>)
                            })
                            : null
                        }
                    </MapView>
                    <View style={styles.switch}>
                        <Switch
                            trackColor={{ false: "#b29ef8", true: "#b29ef8" }}
                            thumbColor={eventView ? "#003566" : "#003566"}
                            onValueChange={() => setEventViewStatus()}
                            value={!eventView}
                        />
                    </View>
                    <View style={styles.selection}>
                        <Pressable
                            style={styles.icon}
                            onPress={() => handleFilterPage(true)}
                        >
                            <Ionicons name="options" size={20} color="#b29ef8" />
                        </Pressable>


                    </View>
                </View>
                {
                    filterPage ? (
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
                    ) : null
                }
                <EventList
                    seatGeek={seatGeekEvents}
                    localEvents={filterLocalEvents(localEvents)}
                    handleSelectEvent={handleSelectEvent}
                    updateSaveEventID={updateSaveEventID}
                    savedEventsIDArr={savedEventsIDArr}
                />
                {
                    selectedEvent ?
                        <SingleEvent
                            event={selectedEvent}
                            handlePress={handleSelectEvent}
                            updateSaveEventID={updateSaveEventID}
                            savedEventsIDArr={savedEventsIDArr}
                        />
                        : null
                }
            </View >
        )
            : null
    } else {
        return (<FriendsMap eventView={eventView} setEventViewStatus={setEventViewStatus} />)
    }
}

const CustomMarker = (eventType) => {
    switch (eventType.split('_')[0]) {
        case "concert":
        case "music":
            return <Entypo name="music" size={28} color="#304795" />
        case "theater":
        case "broadway":
        case "classical":
            return <FontAwesome5 name="theater-masks" size={27} color="#B93D46" />
        case "dance":
        case "social activities":
            return <FontAwesome5 name="user-friends" size={23} color="#185ADB" />
        case "comedy":
            return <FontAwesome5 name="laugh-squint" size={26} color="#EA5455" />
        case "family":
            return <MaterialIcons name="family-restroom" size={32} color="#185ADB" />
        case "film":
            return <MaterialCommunityIcons name="filmstrip" size={30} color="#5800FF" />
        case "literacy":
            return <FontAwesome name="book" size={28} color="#116530" />
        case "tech":
            return <Entypo name="laptop" size={26} color="#A9333A" />
        case "food & drink":
            return <MaterialIcons name="fastfood" size={28} color="#FF4848" />
        case "business":
            return <MaterialIcons name="business-center" size={30} color="#6B4F4F" />
        case "travel & outdoor":
            return <FontAwesome5 name="mountain" size={22} color="#125C13" />
        case "fashion":
            return <Ionicons name="ios-shirt" size={26} color="#FF3D68" />
        default:
            // return <FontAwesome name="star" size={28} color="#FFD124" />
            return <MaterialIcons name="sports-football" size={30} color="#BB371A" />
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        margin: 0
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
        backgroundColor: "#003566",
        borderRadius: 50,
        alignSelf: 'flex-start',
        marginRight: 5
    }
});

export default EventMap;