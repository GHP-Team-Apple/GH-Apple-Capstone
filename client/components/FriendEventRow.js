import React, { useState, useEffect } from 'react';
import { ScrollView, Pressable, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome5, Entypo } from "@expo/vector-icons";
import { saveEvent, unsaveEvent } from '../services/events';
import { auth, db } from '../../firebase';


const FriendEventRow = (props) => {
    // const userId = "mNBpiFdzucPgNIWnrAtuVJUUsUM2";
    const userId = auth.currentUser.uid;
    const event = props.event;
    const handlePress = props.handlePress;

    return (
        <Pressable
            style={styles.event}
            onPress={() => handlePress(event)}
        >
            <Image
                style={styles.image}
                source={{
                    uri: event.userProfilePic,
                }}
            />
            <Text>{event.username}</Text>

            <View style={styles.text}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', alignContent: 'stretch' }}>{event.performers[0].name}</Text>
                <Text style={{ fontSize: 15 }}>{dateFormatter(event.startDate.seconds)}</Text>
                <Text style={{ fontSize: 15 }}>{event.venue.name}</Text>
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

export default FriendEventRow;