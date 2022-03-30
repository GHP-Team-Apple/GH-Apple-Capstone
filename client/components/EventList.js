import React, { useState, useEffect } from 'react';
import { ScrollView, Pressable, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import SingleEvent from './SingleEvent';
import EventRow from './EventRow';
import { getSavedEventsByUserId } from '../services/events';

const EventList = (props) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const seatGeek = props.seatGeek || [];
    const localEvents = props.localEvents || [];
    const handlePress = props.handleSelectEvent;
    const savedEventsIDArr = props.savedEventsIDArr;

    return (
        <ScrollView style={styles.container}>
            {
                seatGeek.map((event, idx) => (
                    <EventRow
                        key={idx}
                        event={event}
                        handlePress={handlePress}
                        savedEventsIDArr={props.savedEventsIDArr}
                        updateSaveEventID={props.updateSaveEventID} />
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
                selectedEvent
                    ? <SingleEvent
                        event={selectedEvent}
                        handlePress={handlePress}
                        savedEventsIDArr={savedEventsIDArr}
                    />
                    : null
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
