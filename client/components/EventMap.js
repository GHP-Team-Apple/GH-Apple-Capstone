import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import getEventsFromSeatGeek from '../resources/seatgeek';
import getEventsFromTicketmaster from '../resources/ticketmaster';
import { SEAT_GEEK_KEY, TICKETMASTER_KEY } from '@env';

const EventMap = () => {
    const [seatGeekEvents, setSeatGeekEvents] = useState([]);
    const [ticketmasterEvents, setTicketmasterEvents] = useState([]);

    useEffect(async () => {
        await loadEvents();
    }, []);

    useEffect(() => {
        console.log('SEAT GEEK EVENTS IN MAPS: ---->', seatGeekEvents.length);
    }, [seatGeekEvents]);

    useEffect(() => {
        console.log('TICKET MASTER EVENTS IN MAPS: ---->', ticketmasterEvents.length);
    }, [ticketmasterEvents]);

    const loadEvents = async () => {
        try {
            // Seat Geek  events
            const seatgeek = await getEventsFromSeatGeek('10003', 2, SEAT_GEEK_KEY);
            setSeatGeekEvents(seatgeek);

            // Ticketmaster events
            const ticketmaster = await getEventsFromTicketmaster('11221', 5, TICKETMASTER_KEY);
            setTicketmasterEvents(ticketmaster);

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
            </MapView>
        </View>

    )
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.6,
        margin: 10
    }
});

export default EventMap;