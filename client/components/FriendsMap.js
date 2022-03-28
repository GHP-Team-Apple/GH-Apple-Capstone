import React, { useState, useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  StyleSheet,
  Pressable,
  View,
  Dimensions,
  Text,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import * as Location from "expo-location";
import { getFriendEvents } from "../services/events";
import { saveEvent } from "../services/events";
import SingleEvent from "./SingleEvent";
import EventList from "./EventList";
import { LocalEventObj } from '../templates/localEvents';

const FriendsMap = (props) => {
  const userId = "tGBFjYBpoZWCO9lyycynXwlVVza2"; // should use auth.currentUser?
  const [location, setLocation] = useState(null);
  const [friendEvents, setFriendEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  // const [myCategory, setMyCategory] = useState([]);
  // const [myCity, setMyCity] = useState([]);
  // const navigation = useNavigation();

  // useEffect(async () => {
  //   try {
  //     const categoryList = require("../data/category");
  //     setMyCategory(categoryList);
  //     const cityList = require("../data/city");
  //     setMyCity(cityList);
  //   } catch (err) {
  //     console.log("error: ", err);
  //   }
  // }, []);

  useEffect(async () => {
    try {
      const friendEvents = await getFriendEvents(userId);
      setFriendEvents(friendEvents);
    } catch (err) {
      console.log("error: ", err);
    }
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // check savedEvent format
  const handlePress = (event) => {
    if (event && event.hostId) {
      const eventObj = LocalEventObj(event)
      setSelectedEvent(eventObj); 
  } else {
      setSelectedEvent(event);
    }
  };

  // const goToFilter = () => {
  //   navigation.navigate("FilterEvents");
  // };

  return (
    <View style={styles.container}>
      {/* <Pressable onPress={goToFilter}>
        <Ionicons name="options" size={28} />
      </Pressable> */}

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 35.7128,
          longitude: -104.006,
          latitudeDelta: 38,
          longitudeDelta: 38,
        }}
      >
        {location ? (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          >
            <Callout>
              <Text>Working at Google</Text>
            </Callout>
          </Marker>
        ) : null}

        {friendEvents.map((event) => {
          const now = new Date().getTime() / 1000;
          const startTime = event.startDate.seconds;
          const endTime = event.visibleUntil.seconds;
          const category = event.type;
          
          if (now >= startTime && now <= endTime && myCategory.includes(category)) {
            return (
              <Marker
                pinColor={"green"}
                key={event.id}
                coordinate={{
                  latitude: event.location.lat,
                  longitude: event.location.lon,
                }}
                // image={image}
              >
                <Callout>
                  <Button
                    onPress={() => handlePress(event)}
                    style={styles.event}
                    title={event.name}
                  />
                </Callout>
              </Marker>
            );
          }
        })}
      </MapView>
      {/* {selectedEvent ? (
        <SingleEvent event={selectedEvent} handlePress={handlePress} />
      ) : null} */}
      {/* <EventList friendEvents={friendEvents}/> */}
    </View>
  );
};

// const getImage = (image) => {
//   switch (image) {
//     case "alpaca.png":
//       return require("../../assets/alpaca.png");
//     case "rabbit.png":
//       return require("../../assets/rabbit.png");
//     case "dog.png":
//       return require("../../assets/dog.png");
//     case "chameleon.png":
//       return require("../../assets/chameleon.png");
//     case "koala.png":
//       return require("../../assets/koala.png");
//   }
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.75,
  },
  event: {
    flexDirection: "row",
    // flexWrap: 'wrap',
    alignItems: "center",
    margin: 5,
  },
});

export default FriendsMap;
