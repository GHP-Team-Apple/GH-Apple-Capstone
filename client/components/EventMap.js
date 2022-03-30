import React, { useState, useEffect, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text, Pressable, Dimensions } from 'react-native';
import * as Location from "expo-location";
import getEventsFromSeatGeek from '../resources/seatgeek';
import { getLocalEvents, getSavedEventsByUserId } from '../services/events';
import EventList from './EventList';
import SingleEvent from './SingleEvent';
import { AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome5, Entypo } from "@expo/vector-icons";
import { LocalEventObj } from '../templates/localEvents';
import { Picker } from '@react-native-picker/picker';

const EventMap = () => {
    const userId = "mNBpiFdzucPgNIWnrAtuVJUUsUM2";
    const [seatGeekEvents, setSeatGeekEvents] = useState([]);
    const [localEvents, setLocalEvents] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedEventType, setSelectedEventType] = useState('concert');
    const [selectedMaxRadius, setSetlectedMaxRadius] = useState(2);
    const [isEventTypeOpen, setIsEventTypeOpen] = useState(false);
    const [isMaxRadiusOpen, setIsMaxRadiusOpen] = useState(false);
    const [savedEventsIDArr, setSavedEventsIDArr] = useState([]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            // set map to current location
            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);

            // get Seat Geek events near current location
            const events = await getEventsFromSeatGeek(selectedEventType, currentLocation.coords.latitude, currentLocation.coords.longitude, selectedMaxRadius);

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
            const events = await getEventsFromSeatGeek(selectedEventType, currentRegion.latitude, currentRegion.longitude, selectedMaxRadius);
            setSeatGeekEvents(events);
        }
    }, [currentRegion]);

    useEffect(async () => {
        if (currentRegion) {
            const events = await getEventsFromSeatGeek(selectedEventType, currentRegion.latitude, currentRegion.longitude, selectedMaxRadius);
            setSeatGeekEvents(events);
        }
    }, [selectedEventType, selectedMaxRadius])

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

    const CustomMarker = (eventType) => {
        switch (eventType) {
            case "concert":
            case "music_festival":
                return <Entypo name="music" size={32} color="#304795" />
            case "theater":
            case "broadway_tickets_national":
                return <FontAwesome5 name="theater-masks" size={28} color="#B93D46" />
            case "dance_performance_tour":
                return <FontAwesome5 name="user-friends" size={28} color="#B95821" />
            case "comedy":
                return <FontAwesome5 name="laugh-squint" size={30} color="#EA5455" />
            default:
                return <Ionicons name="heart-circle" size={33} color="#E06268" />
        }
    }

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
                    {
                        seatGeekEvents.map((event, idx) => (
                            <Marker
                                key={`sg-${idx}`}
                                coordinate={{ latitude: event.venue.location.lat, longitude: event.venue.location.lon }}
                                onPress={() => handleSelectEvent(event)}
                            >
                                {CustomMarker(event.type)}
                            </Marker>
                        ))
                    }
                    {
                        localEvents.map((event, idx) => (
                            <Marker
                                key={`le-${idx}`}
                                pinColor={'green'}
                                coordinate={{
                                    latitude: event.location.lat,
                                    longitude: event.location.lon,
                                }}
                                title={event.name}
                                onPress={() => handleSelectEvent(event)}
                            />
                        ))
                    }
                </MapView>
                <View style={styles.selection}>
                    <Pressable
                        style={styles.icon}
                        onPress={() => {
                            const maxRadiusPicker = !isMaxRadiusOpen;
                            setIsMaxRadiusOpen(maxRadiusPicker);
                        }}
                    >
                        <MaterialCommunityIcons name="map-marker-distance" size={20} color="white" />
                    </Pressable>
                    <Pressable
                        style={styles.icon}
                        onPress={() => {
                            const eventTypePicker = !isEventTypeOpen;
                            setIsEventTypeOpen(eventTypePicker);
                        }}
                    >
                        <AntDesign name="search1" size={20} color="white" />
                    </Pressable>
                </View>

            </View>
            {isEventTypeOpen
                ? (<View>
                    <Picker
                        selectedValue={selectedEventType}
                        onValueChange={value => {
                            setSelectedEventType(value);
                            setIsEventTypeOpen(false);
                        }}
                    >
                        <Picker.Item label='Concert' value='concert' />
                        <Picker.Item label='Theater' value='theater' />
                        <Picker.Item label='Comedy' value='comedy' />
                        <Picker.Item label='Dance' value='dance_performance_tour' />
                        <Picker.Item label='Classical' value='classical' />
                        <Picker.Item label='Broadway' value='broadway_tickets_national' />
                        <Picker.Item label='Sports' value='sports' />

                    </Picker>
                </View>)
                : null}

            {isMaxRadiusOpen
                ? (<View>
                    <Picker
                        selectedValue={selectedEventType}
                        onValueChange={value => {
                            setSetlectedMaxRadius(value);
                            setIsMaxRadiusOpen(false);
                        }}
                    >
                        <Picker.Item label='1 mile' value={1} />
                        <Picker.Item label='2 miles' value={2} />
                        <Picker.Item label='3 miles' value={3} />
                        <Picker.Item label='4 miles' value={4} />
                        <Picker.Item label='5 miles' value={5} />
                    </Picker>
                </View>)
                : null}


            <EventList
                seatGeek={seatGeekEvents}
                localEvents={localEvents}
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

        </View>
    )
        : null

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        margin: 0
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.65,
    },
    selection: {
        position: 'absolute',
        alignSelf: 'flex-end',
        padding: 5,
        flexDirection: 'column',
    },
    icon: {
        padding: 7,
        backgroundColor: "#AD40AF",
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 5
    }
});

export default EventMap;