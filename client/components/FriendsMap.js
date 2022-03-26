import React, { useState, useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { StyleSheet, View, Dimensions, Text, Button } from "react-native";
import * as Location from "expo-location";
import { getFriendEvents } from "../services/events";
import { getUserById } from "../services/users";
import { saveEvent } from "../services/events";

const FriendsMap = (props) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [friendMarkers, setFriendsMarkers] = useState(<View></View>);
  const userId = "tGBFjYBpoZWCO9lyycynXwlVVza2"; // should use auth.currentUser?

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

  // useEffect(async () => {
  //   let friendEventsArr = await getFriendEvents(userId);

  //   let friendMarkers = await Promise.all(friendEventsArr.map( async (event) => {
  //     let now = new Date();
  //     let startTime = event.start ? event.start : event.startDate;
  //     let endTime = event.end ? event.end : event.visibleUntil;
  //     let profileUrl = await getUserById(event.userId).profilePicture;
  //     console.log(">>>>>>>", profileUrl)

  //     if (now >= startTime && now <= endTime) {
  //       return (
  //         <Marker
  //           key={event.eventId}
  //           coordinate={{
  //             latitude: event.location.lat,
  //             longitude: event.location.lon,
  //           }}
  //           // image={image}
  //         >
  //           <Callout>
  //             <Text>{event.name}</Text>
  //           </Callout>
  //         </Marker>
  //       );
  //     }
  //   }));

  //   setFriendsMarkers(friendMarkers);
  // },[]);


  // THE LOAD MARKER HANDLER:
  // const loadMarkers = async () => {

  //   let friendEventsArr = await getFriendEvents(userId);

  //   let friendMarkers = await Promise.all(
  //     friendEventsArr.map(async (event) => {
  //       //   let now = new Date();
  //       //   let startTime = event.start ? event.start : event.startDate;
  //       //   let endTime = event.end ? event.end : event.visibleUntil;
  //       // let image = await getImage(getUserById(event.userId).profilePicture);
  //       //   // console.log("CHIRP", image)

  //       //   if (now >= startTime && now <= endTime) {
  //       return (
  //         <Marker
  //           key={event.eventId}
  //           coordinate={{
  //             latitude: event.location.lat,
  //             longitude: event.location.lon,
  //           }}
  //           pinColor={'green'}
  //           // image={require(image)}
  //         >
  //           <Callout>
  //             <Text>{event.name}</Text>
  //           </Callout>
  //         </Marker>
  //       );
  //       // }
  //     })
  //   );
  //   setFriendsMarkers(friendMarkers);
  // };

  let text = "Loading...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      {/* <Button title="Load Markers" onPress={loadMarkers} /> */}

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
        {/* <Marker
          coordinate={{
            latitude: 33.76418473401285,
            longitude: -84.39513125767164,
          }}
          image={require("../../assets/dog.png")}
        >
          <Callout>
            <Text>Attending Event: Bubble Tea Tasting</Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: 40.733, longitude: -73.985 }}
          image={require("../../assets/rabbit.png")}
        >
          <Callout>
            <Text>Attending Event: Beginner's Coding Workshop</Text>
          </Callout>
        </Marker> */}

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

        {/* {friendMarkers} */}
      </MapView>
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
    height: Dimensions.get("window").height * 0.5,
  },
});

export default FriendsMap;
