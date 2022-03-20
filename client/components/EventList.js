import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const EventList = (props) => {
    const events = props.events || [];

    return (
        <ScrollView style={styles.container}>
            {
                events.map((event, idx) => (
                    <View key={idx} style={styles.event}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: event.performers[0].image,
                            }}
                        />
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{event.performers[0].name}</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{event.venue.name}</Text>
                        <Text>{event.venue.address}</Text>
                        <Text>{event.venue.extended_address}</Text>
                        <Text style={{ fontWeight: 'bold' }}>{dateFormatter(event.datetime_utc)}</Text>
                    </View>
                ))
            }
        </ScrollView>
    )

}

const dateFormatter = (dateStr) => {
    return `${new Date(Date.parse(dateStr))}`.slice(0, 24);
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        flexDirection: 'column',
        margin: 0,
    },
    event: {
        alignItems: 'center',
        margin: 10, 
    },
    image: {
        width: 280,
        height: 210,
        borderRadius: 8,
        margin: 5
    }
});

export default EventList;
