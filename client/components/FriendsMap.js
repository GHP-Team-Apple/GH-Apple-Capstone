import React, { useState, useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, Pressable, View, Dimensions, Text } from "react-native";
import * as Location from "expo-location";
import { getFriendEvents } from "../services/events";
import { getDistance } from "../services/distance";
import AttendingEvents from "./AttendingEvent";
import Filter from "./Filter";
import { LocalEventObj } from "../templates/localEvents";
const categories = require("../data/categories");
const cities = require("../data/cities");
import { auth, db } from "../../firebase";

const FriendsMap = (props) => {
  const userId = "tGBFjYBpoZWCO9lyycynXwlVVza2"; // auth.currentUser.uid;
  const [location, setLocation] = useState(null);
  const [friendEvents, setFriendEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterPage, setFilterPage] = useState(false);
  const [categoryList, setCategoryList] = useState(categories);
  const [cityList, setCityList] = useState(cities);
  // need to test
  const [isFreeChecked, setIsFreeChecked] = useState(false);
  const [filteredCat, setFilteredCat] = useState([]);
  const [filteredCity, setFilteredCity] = useState([]);
  // need to test
  const [maxDistance, setMaxDistance] = useState(2);
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

  const handlePress = (event) => {
    if (event) {
      const eventObj = LocalEventObj(event);
      setSelectedEvent(eventObj);
    } else {
      setSelectedEvent(event);
    }
  };

  const handleFilterPage = (boolean) => {
    setFilterPage(boolean);
  };

  const handleNoFilter = () => {
    const catArray = [];
    for (let i = 0; i < categoryList.length; i++) {
      categoryList[i].isChecked = false;
    }
    setCategoryList(categoryList);
    setFilteredCat(catArray);
    const cityArray = [];
    for (let i = 0; i < cityList.length; i++) {
      cityList[i].isChecked = false;
    }
    setCityList(cityList);
    setFilteredCity(cityArray);
    setMaxDistance(2);
    setIsFreeChecked(false)
  };

  const handleCat = (catId) => {
    const catArray = [];
    for (let i = 0; i < categoryList.length; i++) {
      if (categoryList[i].id === catId) {
        const isChecked = categoryList[i].isChecked;
        categoryList[i].isChecked = !isChecked;
        const newStatus = categoryList[i].isChecked;
        const tmp = categoryList[i].type;
        if (newStatus) {
          const type = tmp.toLowerCase();
          catArray.push(type);
        }
      }
    }
    setCategoryList(categoryList);
    setFilteredCat(catArray);
  };

  const handleCity = (cityId) => {
    for (let i = 0; i < cityList.length; i++) {
      if (cityList[i].id === cityId) {
        const isChecked = cityList[i].isChecked;
        cityList[i].isChecked = !isChecked;
      }
    }
    setCityList(cityList);

    const filtCity = cityList.map((city) => {
      if (city.isChecked) {
        return city.city;
      }
    });
    setFilteredCity(filtCity);
  };

  const handleMaxDistance = (distance) => {
    // NEED TO TEST THIS:
    setMaxDistance(distance);
  };

  // need to test:
  const handleIsFreeChecked = () => {
    setIsFreeChecked(!isFreeChecked);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => handleFilterPage(true)}>
        <Ionicons name="options" size={28} />
      </Pressable>

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

        {location
          ? friendEvents.map((event) => {
              const now = new Date().getTime() / 1000;
              const startTime = event.startDate.seconds;
              const endTime = event.visibleUntil.seconds;
              const checkIn = event.checkIn;
              const eventIsFree = event.isFree ? event.isFree : false;
              const eventLat = event.location.lat;
              const eventLon = event.location.lon;
              const myLat = location.coords.latitude;
              const myLon = location.coords.longitude;
              const category = event.type;
              const city = event.city;
              const distanceFromEvent = getDistance(
                myLat,
                eventLat,
                myLon,
                eventLon
              ); // mi

              if (
                now >= startTime &&
                now <= endTime &&
                checkIn &&
                (filteredCat.includes(category) || filteredCat.length === 0) &&
                (filteredCity.includes(city) || filteredCity.length === 0)

                /* 
                && (distanceFromEvent <= maxDistance) 
                && (eventIsFree === isFreeChecked || isFreeChecked === false) 
                */
              ) {
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
                    <Callout
                      onPress={() => handlePress(event)}
                      style={styles.event}
                    >
                      <Text>{event.name}</Text>
                    </Callout>
                  </Marker>
                );
              }
            })
          : null}
      </MapView>
      {selectedEvent ? (
        <AttendingEvents event={selectedEvent} handlePress={handlePress} />
      ) : null}
      {filterPage ? (
        <Filter
          categoryList={categoryList}
          cityList={cityList}
          handleFilterPage={handleFilterPage}
          handleNoFilter={handleNoFilter}
          handleCat={handleCat}
          handleCity={handleCity}
          handleMaxDistance={handleMaxDistance}
          handleIsFreeChecked={handleIsFreeChecked}
          isFreeChecked={isFreeChecked}
        />
      ) : null}
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
