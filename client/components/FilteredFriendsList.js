import React, { useState, useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  StyleSheet,
  Pressable,
  View,
  Dimensions,
  Text,
  Switch,
} from "react-native";
import * as Location from "expo-location";
import { getFriendEvents } from "../services/events";
import { getDistance } from "../services/distance";
import AttendingEvents from "./AttendingEvent";
import Filter from "./Filter";
import { LocalEventObj } from "../templates/localEvents";
const categories = require("../data/categories");
const cities = require("../data/cities");
import { auth, db } from "../../firebase";
import { getUserById } from "../services/users";

const FilteredFriendsList = (props) => {
  const friendEvents = props.friendEvents;
  const filteredFriendEvents = props.filteredFriendEvents;

  return filteredFriendEvents
    .filter((event) => event.userProfilePic !== undefined)
    .map((event) => {
      const image = getImage(event.userProfilePic);
      return (
        <Marker
          key={event.id}
          coordinate={{
            latitude: event.location.lat,
            longitude: event.location.lon,
          }}
          image={image}
        >
          <Callout onPress={() => props.handlePress(event)} style={styles.event}>
            <Text>{event.name}</Text>
          </Callout>
        </Marker>
      );
    });
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
    flexDirection: "row",
    // flexWrap: 'wrap',
    alignItems: "center",
    margin: 5,
  },
});

export default FilteredFriendsList;
