import React, { useState, useEffect } from 'react';
import { ScrollView, Pressable, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import AttendingEvents from './AttendingEvent';
import FriendEventRow from './FriendEventRow';

const FriendEventList = (props) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const filteredFriendEvents = props.filteredFriendEvents || [];
    const handlePress = props.handlePress;

    return (
        <ScrollView style={styles.container}>
            {
                filteredFriendEvents.map((event) => (
                    <FriendEventRow
                        key={event.id}
                        event={event}
                        handlePress={handlePress}
                       />
                ))
            }
            {
                selectedEvent
                    ? <AttendingEvents
                        event={selectedEvent}
                        handlePress={handlePress}
                    />
                    : null
            }
        </ScrollView>
    )

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

export default FriendEventList;
