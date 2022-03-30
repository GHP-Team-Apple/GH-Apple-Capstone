import React, { useState } from 'react';
import { ScrollView, Pressable, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import SingleEvent from './SingleEvent';

const EventList = (props) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const seatGeek = props.seatGeek || [];
    const localEvents = props.localEvents || [];
    const handlePress = props.handleSelectEvent;

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
                                <Text style={{ fontSize: 16, fontWeight: 'bold', alignContent: 'stretch' }}>{event.performers[0].name}</Text>
                                <Text>{event.venue.name}</Text>
                                <Text style={{ fontSize: 13 }}>{event.venue.address}</Text>
                                <Text style={{ fontSize: 13 }}>{event.venue.extended_address}</Text>
                                <Text style={{ fontWeight: 'bold' }}>{dateFormatter(event.datetime_utc)}</Text>
                            </View>
                        </Pressable>
                    ))
                }
                { /* {
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
            } */}
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
        height: Dimensions.get('window').height * 0.25,
        backgroundColor: '#fff',
        margin: 2
    },
    event: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },
    image: {
        width: 150,
        height: 90,
        margin: 2
    },
    text: {
        padding: 2,
        alignItems: 'stretch',
    }
});

export default EventList;
