import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  Clipboard
} from "react-native";
import { getSavedEventsByUserId } from "../services/events";
import SavedEventCard from "./SavedEventCard";
import SingleSavedEvent from "./SingleSavedEvent";
import { auth, db } from "../../firebase";
import Toast from 'react-native-toast-message'

const SavedEvents = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  async function fetchSavedEvents() {
    // const userId1 = "mNBpiFdzucPgNIWnrAtuVJUUsUM2";
    // const userId = "WalEUjuIy6nEp2DvzVdd";
    const userId = auth.currentUser.uid;
    const eventArr = await getSavedEventsByUserId(userId);
    setEvents(eventArr);
  }

  useEffect(async () => {
    await fetchSavedEvents();
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(async () => {
    await fetchSavedEvents();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const showEventCard = (event) => {
    if (event && event.hostId) {
      const eventObj = LocalEventObj(event);
      setSelectedEvent(eventObj);
    } else {
      setSelectedEvent(event);
    }
  };

  const handleShare = (eventUrl) => {
    if (eventUrl === null || eventUrl === undefined) {
      return;
    }
    Clipboard.setString(`Check out this event:\n${eventUrl}`);
    Toast.show({
      type: 'info',
      text1: 'Event link has been copied to clipboard.'
    });
    navigation.navigate("FriendList");
    setSelectedEvent(null);
  };
  // console.log('MY ID: ', auth.currentUser.uid);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={{ fontSize: 30 }}>My Events</Text>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >

        {events.length === 0 ? (
          <View>
            <Text>No Events Saved</Text>
          </View>
        ) : (
          events.map((event, idx) => (
            <TouchableHighlight
              key={idx}
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => showEventCard(event)}
              style={styles.savedEvents}
            >
              <SavedEventCard
                event={event}
                fetchSavedEvents={fetchSavedEvents}
              />
            </TouchableHighlight>
          ))
        )}
        {selectedEvent ? (
          <SingleSavedEvent
            event={selectedEvent}
            handlePress={showEventCard}
            handleShare={handleShare}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.85,
    marginTop: 10
  },
  savedEvents: {
    display: "flex",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    margin: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15
  }
});

export default SavedEvents;
