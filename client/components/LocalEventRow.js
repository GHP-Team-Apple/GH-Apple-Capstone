import React, { useState, useEffect } from 'react';
import { ScrollView, Pressable, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome5, Entypo } from "@expo/vector-icons";
import { saveEvent, unsaveEvent } from '../services/events';
import { auth, db } from '../../firebase';


const LocalEventRow = (props) => {
    const userId = auth.currentUser.uid;
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
            name: event.name,
            type: event.type,
            startDate: event.startDate,
            visibleUntil: event.visibleUntil,
            venueName: event.venueName,
            venueAddress: event.venueAddress,
            location: {
                lat: event.location.lat,
                lon: event.location.lon
            },
            checkIn: false,
            imageUrl: event.imageUrl
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
                    uri: event.imageUrl,
                }}
            />
            <View style={styles.text}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', alignContent: 'stretch' }}>{event.name}</Text>
                <Text style={{ fontSize: 15 }}>{dateFormatterLocal(event.startDate)}</Text>
                <Text style={{ fontSize: 15 }}>{event.venueName}</Text>

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

const dateFormatterLocal = (timestamp) => {
    return `${new Date(timestamp * 1000)}`.slice(0, 21);
  };

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

export default LocalEventRow;
