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
} from "react-native";
import { getSavedEventsByUserId } from "../services/events";
import SavedEventCard from "./SavedEventCard";
import SingleSavedEvent from "./SingleSavedEvent"


const SavedEvents = () => {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  async function fetchSavedEvents() {
    const userId1 = "mNBpiFdzucPgNIWnrAtuVJUUsUM2";
    const userId = "WalEUjuIy6nEp2DvzVdd";
    const eventArr = await getSavedEventsByUserId(userId1);
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
    console.log("========",event)
    if (event && event.hostId) {
      const eventObj = LocalEventObj(event);
      setSelectedEvent(eventObj);
    } else {
      setSelectedEvent(event);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={{ fontSize: 30, marginLeft: 125, marginBottom: 20 }}>
          {" "}
          My Events{" "}
        </Text>
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
          <SingleSavedEvent event={selectedEvent} handlePress={showEventCard} />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.875,
    marginTop: 30,
  },
  savedEvents: {
    display: "flex",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    margin: 9,
  },
});

export default SavedEvents;
