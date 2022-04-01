import React, { useCallback, useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
  Linking,
} from "react-native";
import Modal from "react-native-modal";
import { saveEvent } from "../services/events";
import { getFriendEvents } from "../services/events";
import { getUserById } from "../services/users";

const AttendingEvents = (props) => {
  const userId = "tGBFjYBpoZWCO9lyycynXwlVVza2";
  const event = props.event;
  const supportedUrl = props.event.eventUrl;
  const [friendEvents, setFriendEvents] = useState([]);
  const [friendsAttending, setFriendsAttending] = useState([]);

  useEffect(async () => {
    try {
      const friendEvents = await getFriendEvents(userId);
      setFriendEvents(friendEvents);
    } catch (err) {
      console.log("error: ", err);
    }
  }, []);

  useEffect(async () => {
    const friends = [];
    if (friendEvents.length > 0) {
      for (let i = 0; i < friendEvents.length; i++) {
        let currentEvent = friendEvents[i];
        if (event.id === currentEvent.id && currentEvent.checkIn) {
          let friend = await getUserById(currentEvent.userId);
          friends.push(friend);
        }
      }
      // friendEvents.map(async (friendEvent) => {
      //   // check if another friend is attending the same event
      //   if (event.id === friendEvent.id && friendEvent.checkIn) {
      //     let friend = await getUserById(friendEvent.userId);
      //     console.log('friend attending event');
      //     friends.push(friend);
      //   }
      // });
    }
    console.log("FRIENDS", friends);
    setFriendsAttending(friends);
  }, [friendEvents]);

  const handleLink = useCallback(async () => {
    const supported = await Linking.canOpenURL(supportedUrl);
    if (supported) {
      await Linking.openURL(supportedUrl);
    }
  }, [supportedUrl]);

  const handleSaveEvent = async () => {
    const savedEvent = {
      userId: userId,
      id: event.id,
      name: event.name,
      type: event.type,
      startDate: event.date,
      visibleUntil: event.visible,
      venueName: event.venue.name,
      venueAddress: event.venue.address + ", " + event.venue.extended_address,
      location: {
        lat: event.venue.location.lat,
        lon: event.venue.location.lon,
      },
      checkIn: false,
      imageUrl: event.imageUrl,
    };

    //check if the user has already saved the event
    // if not, then save the event
    await saveEvent(userId, savedEvent);

    //close modal after saving the event
    props.handlePress(null);
  };

  return (
    <Modal isVisible={true}>
      {event.hostId ? (
        <View style={styles.container}>
          <Pressable
            onPress={() => props.handlePress(null)}
            style={{ alignSelf: "flex-end", margin: 10 }}
          >
            <Text>{"[close x]"}</Text>
          </Pressable>

          <Text style={{ fontSize: 25, fontWeight: "bold" }}>{event.name}</Text>
          <Text style={{ fontSize: 20 }}>{event.date}</Text>
          <Text style={{ fontSize: 16 }}>({event.type})</Text>
          <Image source={{ uri: event.imageUrl }} style={styles.image} />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {event.venue.name}
          </Text>
          <Text style={{ marginBottom: 10 }}>
            {`${event.venue.address}, ${event.venue.extended_address}`}
          </Text>

          <Pressable style={{ ...styles.button, backgroundColor: "#4D96FF" }}>
            <Text>More Details</Text>
          </Pressable>

          <ScrollView>
            <Text>Friends Attending:</Text>
            {friendsAttending.length !== 0
              ? friendsAttending.map((friend) => {
                  const image = getImage(friend.profilePicture);
                  return (
                    <View key={friend.uid} style={styles.friend}>
                      <Image
                        source={image}
                        style={{ width: 30, height: 30, marginRight: 5 }}
                      />
                      <Text style={{ fontSize: 15 }}>{friend.username}</Text>
                    </View>
                  );
                })
              : null}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.container}>
          <Pressable
            onPress={() => props.handlePress(null)}
            style={{ alignSelf: "flex-end", margin: 10 }}
          >
            <Text>{"[close x]"}</Text>
          </Pressable>

          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{event.name}</Text>
          <Text style={{ fontSize: 16 }}>{event.date}</Text>
          <Text style={{ fontSize: 14 }}>({event.type})</Text>
          <Image source={{ uri: event.imageUrl }} style={styles.image} />
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            {event.venue.name}
          </Text>
          <Text
            style={{ marginBottom: 10 }}
          >{`${event.venue.address}, ${event.venue.extended_address}`}</Text>

          <Pressable
            style={{ ...styles.button, backgroundColor: "#4D96FF" }}
            onPress={handleLink}
          >
            <Text>Get Tickets</Text>
          </Pressable>

          <ScrollView>
            <Text>Friends Attending:</Text>
            {friendsAttending.length !== 0
              ? friendsAttending.map((friend) => {
                  const image = getImage(friend.profilePicture);
                  return (
                    <View key={friend.uid} style={styles.friend}>
                      <Image
                        source={image}
                        style={{ width: 30, height: 30, marginRight: 5 }}
                      />
                      <Text style={{ fontSize: 15 }}>{friend.username}</Text>
                    </View>
                  );
                })
              : null}
          </ScrollView>
        </View>
      )}
    </Modal>
  );
};

const dateFormatter = (dateStr) => {
  return `${new Date(dateStr + 'Z')}`.slice(0, 21);
};

const dateFormatterLocal = (timestamp) => {
  return `${new Date(timestamp * 1000)}`.slice(0, 21);
};

const getImage = (image) => {
  switch (image) {
    case "alpaca.png":
      return require("../../assets/alpaca.png");
    case "rabbit.png":
      return require("../../assets/rabbit.png");
    case "chameleon.png":
      return require("../../assets/chameleon.png");
    case "dog.png":
      return require("../../assets/dog.png");
    case "koala.png":
      return require("../../assets/koala.png");
    case "penguin.png":
      return require("../../assets/penguin.png");
    case "panda.png":
      return require("../../assets/panda.png");
    case "elephant.png":
      return require("../../assets/elephant.png");
    case "duck.png":
      return require("../../assets/duck.png");
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
    width: 350,
    height: 500,
  },
  image: {
    width: 280,
    height: 120,
    margin: 10,
    borderRadius: 3,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
  },
  friend: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
});

export default AttendingEvents;
