import React, { useCallback } from "react";
import {
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
import { LocalEventView } from "../templates/localEvents";
import { auth, db } from '../../firebase';

const SingleSavedEvent = (props, {navigation}) => {
  // const userId = "mNBpiFdzucPgNIWnrAtuVJUUsUM2";
  const userId = auth.currentUser.uid;
  const event = props.event;
  const supportedUrl = props.event.eventUrl;

  const handleLink = useCallback(async () => {
    const supported = await Linking.canOpenURL(supportedUrl);
    if (supported) {
      await Linking.openURL(supportedUrl);
    }

  }, [supportedUrl]);
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
          <Text style={{ fontSize: 20 }}>{dateFormatter(event.startDate)}</Text>
          <Text style={{ fontSize: 16 }}>({event.type})</Text>

          <Image source={{ uri: event.imageUrl }} style={styles.image} />

          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {event.venueName}
          </Text>

          <Text style={{ marginBottom: 10 }}>{event.venueAddress}</Text>

          <Pressable style={{ ...styles.button, backgroundColor: "#4D96FF" }}>
            <Text>More Details</Text>
          </Pressable>

          <Pressable style={{ ...styles.button,  backgroundColor: "#4D96FF" }} onPress={() => {
            props.handleShare(event.eventUrl);
            }}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Share</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.container}>
          <Pressable
            onPress={() => props.handlePress(null)}
            style={{ alignSelf: "flex-end", margin: 10 }}
          >
            <Text>{"[close x]"}</Text>
          </Pressable>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>{event.name}</Text>
          <Text style={{ fontSize: 20 }}>{dateFormatter(event.startDate)}</Text>
          <Text style={{ fontSize: 16 }}>({event.type})</Text>

          <Image source={{ uri: event.imageUrl }} style={styles.image} />

          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {event.venueName}
          </Text>
          <Text style={{ marginBottom: 10 }}>{event.venueAddress}</Text>

          <Pressable
            style={{ ...styles.button, backgroundColor: "#4D96FF" }}
            onPress={handleLink}
          >
            <Text style={{ color: "white", fontWeight: "bold"}}>Get Tickets</Text>
          </Pressable>

          <Pressable style={{ ...styles.button,  backgroundColor: "#4D96FF" }} onPress={() => {
            props.handleShare(event.eventUrl);
            }}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Share</Text>
          </Pressable>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
    width: 350,
    height: 500,
  },
  image: {
    width: 320,
    height: 180,
    margin: 10,
    borderRadius: 3,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
  },
});

export default SingleSavedEvent;
