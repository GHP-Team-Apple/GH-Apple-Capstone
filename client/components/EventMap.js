import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import getEventsFromSeatGeek from '../resources/seatgeek';
import getEventsFromTicketmaster from '../resources/ticketmaster';
import { getLocalEvents } from '../services/events';
import EventList from './EventList';

const EventMap = () => {
    const [seatGeekEvents, setSeatGeekEvents] = useState([]);
    const [ticketmasterEvents, setTicketmasterEvents] = useState([]);
    const [localEvents, setLocalEvents] = useState([]);

    useEffect(async () => {
        await loadEvents();
    }, []);

    useEffect(() => {
        console.log('SEAT GEEK EVENTS IN MAPS: ---->', seatGeekEvents.length);
    }, [seatGeekEvents]);

    useEffect(() => {
        console.log('TICKET MASTER EVENTS IN MAPS: ---->', ticketmasterEvents.length);
    }, [ticketmasterEvents]);

    useEffect(() => {
        console.log('LOCAL EVENTS IN MAPS: ---->', localEvents.length);
    }, [localEvents]);

    const loadEvents = async () => {
        try {
            // Seat Geek  events
            const seatgeek = await getEventsFromSeatGeek('10003', 1);
            setSeatGeekEvents(seatgeek);

            // Ticketmaster events
            const ticketmaster = await getEventsFromTicketmaster('11221', 5);
            setTicketmasterEvents(ticketmaster);

            // Local events
            const local = await getLocalEvents('NYC');
            setLocalEvents(local);

        } catch (err) {
            console.log('error: ', err);
        }
    }

    return (
        <View>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 40.7128,
                    longitude: -74.0060,
                    latitudeDelta: 0.21,
                    longitudeDelta: 0.2
                }}
            >
                {
                    seatGeekEvents.map((event, idx) => (
                        <Marker
                            key={`sg-${idx}`}
                            pinColor={'red'}
                            coordinate={{ latitude: event.venue.location.lat, longitude: event.venue.location.lon }}
                            title={`${event.performers[0].name} (${event.type.split('_')[0]})`}
                            description={`${event.venue.address}\n${event.venue.extended_address}`}
                        />
                    ))
                }
                {
                    ticketmasterEvents.map((event, idx) => (
                        <Marker
                            key={`tm-${idx}`}
                            pinColor={'blue'}
                            coordinate={{ 
                                latitude: Number(event['_embedded'].venues[0].location.latitude), 
                                longitude: Number(event['_embedded'].venues[0].location.longitude)
                            }}
                            title={event.name}
                        />
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
                        />
                    ))
                }
            </MapView>

            <EventList seatGeek={seatGeekEvents} ticketMaster={ticketmasterEvents} localEvents={localEvents}/>

        </View>

    )
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.5,
        // margin: 10
    }
});

export default EventMap;