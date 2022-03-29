import React, { useState, useEffect, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text, Pressable, Dimensions } from 'react-native';
import * as Location from "expo-location";
import getEventsFromSeatGeek from '../resources/seatgeek';
import getEventsFromTicketmaster from '../resources/ticketmaster';
import { getLocalEvents } from '../services/events';
import EventList from './EventList';
import SingleEvent from './SingleEvent';
import { AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome5, Entypo } from "@expo/vector-icons";
import { LocalEventObj } from '../templates/localEvents';
import { Picker } from '@react-native-picker/picker';


const EventMap = () => {
    const [seatGeekEvents, setSeatGeekEvents] = useState([]);
    const [localEvents, setLocalEvents] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedEventType, setSelectedEventType] = useState('concert'); 
    const [isOpen, setIsOpen] = useState(false);

    const eventType = 'concert';

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
            const events = await getEventsFromSeatGeek(selectedEventType, currentLocation.coords.latitude, currentLocation.coords.longitude, 2);

            setSeatGeekEvents(events);
            await loadLocalEvents()

        })();
    }, []);

    useEffect(async () => {
        if (currentRegion) {
            const { latitude, longitude } = currentRegion;
            const events = await getEventsFromSeatGeek(selectedEventType, currentRegion.latitude, currentRegion.longitude, 2);
            setSeatGeekEvents(events);
        }
    }, [currentRegion]);

    useEffect(async () => {
        const events = await getEventsFromSeatGeek(selectedEventType, currentRegion.latitude, currentRegion.longitude, 2);
        setSeatGeekEvents(events);
    }, [selectedEventType])

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

    const CustomMarker = (eventType) => {
        switch (eventType) {
            case "concert":
            case "music_festival":
                return <Entypo name="music" size={33} color="#304795" />
            case "theater":
            case "broadway":
                return <FontAwesome5 name="theater-masks" size={30} color="#B93D46" />
            case "dance_performance_tour":
                return <FontAwesome5 name="user-friends" size={30} color="#B95821" />
            default:
                return <Ionicons name="heart-circle" size={33} color="#E06268" />
        }
    }

    return location ? (
        <View>
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
                            >
                                {CustomMarker(event.type)}
                                <Callout
                                    style={styles.callout}
                                    onPress={() => handleSelectEvent(event)}
                                >
                                    <Text style={{ fontSize: 16, textAlign: 'center' }}>{event.performers[0].name}</Text>
                                </Callout>
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
                <Pressable
                    style={styles.selection}
                    onPress={() => {
                        const picker = !isOpen;
                        setIsOpen(picker);
                    }}
                >
                    <MaterialCommunityIcons name="account-heart" size={40} color="#B83B5E" />
                </Pressable>
            </View>
            {isOpen ?
                        <View>
                            <Picker
                                selectedValue={selectedEventType}
                                onValueChange={value => {
                                    setSelectedEventType(value);
                                    setIsOpen(false);
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
                        </View>
                        : null}

            <EventList seatGeek={seatGeekEvents} localEvents={localEvents} handleSelectEvent={handleSelectEvent} />

            {
                selectedEvent ? <SingleEvent event={selectedEvent} handlePress={handleSelectEvent} /> : null
            }

        </View>
    )
        : null

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.65,
    },
    callout: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selection: {
        position: 'absolute',
        alignSelf: 'flex-end',
        padding: 5,
        paddingRight: 10
    }
});

export default EventMap;