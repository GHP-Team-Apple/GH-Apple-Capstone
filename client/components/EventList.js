import React, { useState } from 'react';
import { ScrollView, Pressable, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import SingleEvent from './SingleEvent';
import { LocalEventObj } from '../templates/localEvents';

const EventList = (props) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const seatGeek = props.seatGeek || [];
    const localEvents = props.localEvents || [];

    const handlePress = (event) => {
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
            setSelectedEvent(event);
        }
    }

    return (
        <ScrollView style={styles.container}>
            {
                seatGeek.map((event, idx) => (
                    <Pressable key={idx} style={styles.event}
                        onPress={() => handlePress(event)}
                    >
                        <Image
                            style={styles.image}
                            source={{
                                uri: event.performers[0].image,
                            }}
                        />
                        <View style={styles.text}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{event.performers[0].name}</Text>
                            <Text style={{ fontWeight: 'bold' }}>{event.venue.name}</Text>
                            <Text>{event.venue.address}</Text>
                            <Text>{event.venue.extended_address}</Text>
                            <Text style={{ fontWeight: 'bold' }}>{dateFormatter(event.datetime_utc)}</Text>
                        </View>
                    </Pressable>
                ))
            }
            {
                localEvents.map((event, idx) => (
                    <Pressable key={`le-${idx}`} style={styles.event}
                        onPress={() => handlePress(event)}
                    >
                        <Image
                            style={styles.image}
                            source={{
                                uri: event.imageUrl,
                            }}
                        />
                        <View style={styles.text}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{event.name}</Text>
                            <Text style={{ fontWeight: 'bold' }}>{event.venueName}</Text>
                            <Text>{event.venueAddress}</Text>
                            <Text style={{ fontWeight: 'bold' }}>{dateFormatterLocal(event.startDate.seconds)}</Text>
                        </View>
                    </Pressable>
                ))
            }
            {
                selectedEvent ? <SingleEvent event={selectedEvent} handlePress={handlePress} /> : null
            }
        </ScrollView>
    )

}

const dateFormatter = (dateStr) => {
    return `${new Date(Date.parse(dateStr))}`.slice(0, 21);
}

const dateFormatterLocal = (timestamp) => {
    return `${new Date(timestamp * 1000)}`.slice(0, 21);
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.38,
    },
    event: {
        flexDirection: 'row',
        // flexWrap: 'wrap',
        alignItems: 'center',
        margin: 5, 
    },
    image: {
        width: 150,
        height: 90,
        margin: 2
    }, 
    text: {
        margin: 2
    }
});

export default EventList;
