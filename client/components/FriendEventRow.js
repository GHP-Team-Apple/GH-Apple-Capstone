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
    const image = getImage(event.userProfilePic);
    return (
        <Pressable
            style={styles.event}
            onPress={() => handlePress(event)}
        >
            <View style={styles.userInfo}>
                <Image
                    style={styles.image}
                    source={image}
                />
                <Text style={{ fontSize: 18, fontWeight: 'bold', alignContent: 'stretch' }}>{event.username}</Text>
            </View>

            <View style={styles.text}>
                <Text style={{ fontSize: 15 }}>Attending:</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', alignContent: 'stretch' }}>{event.name}</Text>
                {/* <Text style={{ fontSize: 15 }}>{dateFormatterLocal(event.startDate.seconds)}</Text> */}
                <Text style={{ fontSize: 15 }}>@ {event.venueName}</Text>
            </View>

        </Pressable>
    )
}

const dateFormatterLocal = (timestamp) => {
    return `${new Date(timestamp * 1000)}`.slice(0, 21);
  };

const getImage = (image) => {
    switch (image) {
        case "alpaca.png":
            return require("../../assets/alpaca.png");
        case "rabbit.png":
            return require("../../assets/rabbit.png");
        case "dog.png":
            return require("../../assets/dog.png");
        case "chameleon.png":
            return require("../../assets/chameleon.png");
        case "koala.png":
            return require("../../assets/koala.png");
    }
};

const styles = StyleSheet.create({
    event: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    image: {
        width: 50,
        height: 50,
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
    },
    userInfo: {
        alignItems: 'center',
        width: 130,
        height: 80,
        margin: 5,
    }
});

export default FriendEventRow;