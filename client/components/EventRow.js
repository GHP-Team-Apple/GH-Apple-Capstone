import React, { useState, useEffect } from 'react';
import { ScrollView, Pressable, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome5, Entypo } from "@expo/vector-icons";
import { saveEvent, unsaveEvent } from '../services/events';

const EventRow = (props) => {
    const userId = "mNBpiFdzucPgNIWnrAtuVJUUsUM2";
    const event = props.event;
    const handlePress = props.handlePress;
    const savedEventsIDArr = props.savedEventsIDArr;
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (savedEventsIDArr.includes(event.id)) {
            setIsSaved(true);
        }
    }, [savedEventsIDArr]);
    
    const handleSaveOrUnsaveEvent = async (isSaved) => {
        const savedEvent = {
            userId: userId,
            id: event.id,
            name: event.performers[0].name,
            type: event.type,
            startDate: event.datetime_utc,
            visibleUntil: event.visible_until_utc,
            venueName: event.venue.name,
            venueAddress: event.venue.address + ', ' + event.venue.extended_address,
            location: {
                lat: event.venue.location.lat,
                lon: event.venue.location.lon
            },
            checkIn: false,
            imageUrl: event.performers[0].image
        }
        if (!isSaved) {
            await saveEvent(userId, savedEvent)
            setIsSaved(true);
            props.updateSaveEventID([...props.savedEventsIDArr, event.id])
        } else {
            await unsaveEvent(userId, savedEvent)
            setIsSaved(false);
            const newIDArr = props.savedEventsIDArr.filter(id => id !== event.id);
            props.updateSaveEventID(newIDArr);
        }
    }

    return (
        <Pressable
            style={styles.event}
            onPress={() => handlePress(event)}
        >
            <Image
                style={styles.image}
                source={{
                    uri: event.performers[0].image,
                }}
            />
            <View style={styles.text}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', alignContent: 'stretch' }}>{event.performers[0].name}</Text>
                <Text style={{ fontSize: 15 }}>{dateFormatter(event.datetime_utc)}</Text>
                <Text style={{ fontSize: 15 }}>{event.venue.name}</Text>

                <Pressable
                    style={styles.icon}
                    onPress={() => handleSaveOrUnsaveEvent(isSaved)}
                >
                    {!isSaved
                        ? (<Ionicons name="heart-outline" size={28} color="black" />)
                        : (<Ionicons name="heart-sharp" size={28} color="black" />)
                    }
                </Pressable>
            </View>

        </Pressable>
    )
}

const dateFormatter = (dateStr) => {
    return `${new Date(Date.parse(dateStr))}`.slice(0, 21);
}

const styles = StyleSheet.create({
    event: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5
    },
    image: {
        width: 150,
        height: 90,
        margin: 2
    },
    text: {
        width: 220,
        padding: 2,
        alignItems: 'stretch',
        marginLeft: 5
    },
    icon: {
        // flexDirection: 'row',
        // justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginRight: 0
    }
});

export default EventRow;