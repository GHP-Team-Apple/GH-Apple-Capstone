import React, { useState, useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { StyleSheet, View, Dimensions, Text } from "react-native";
// import { getColor } from "../data";
// import CircleMarker from "./CircleMarker";

const FriendsMap = (props) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 35.7128,
          longitude: -104.006,
          latitudeDelta: 38,
          longitudeDelta: 38,
        }}
      >
        <Marker
          coordinate={{ latitude: 33.76712, longitude: -84.3958  }}
          image={require("./dog.png")}
        >
          <Callout>
            <Text>Attending Event: Bubble Tea Tasting</Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: 40.733, longitude: -73.985 }}
          image={require("./rabbit.png")}
        >
          <Callout>
            <Text>Attending Event: Beginner's Coding Workshop</Text>
          </Callout>
        </Marker>

      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default FriendsMap;

{
  /* <Marker coordinate={{ latitude: 35.7128, longitude: -104.006 }}>
image={require('./dog.png')}  style={{ width: 20, height: 20 }} */
}
{
  /* <Callout>
      <Text>Attending Event: Bubble Tea Tasting</Text>
  </Callout>
<Image
  source={require("./dog.png")}
/>
</Marker> */
}
