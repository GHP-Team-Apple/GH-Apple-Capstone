import React, { useState, useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { StyleSheet, View, Dimensions, Text } from "react-native";

const FriendsMap = (props) => {
  return (
    <View style={styles.container}>
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
        <Marker
          coordinate={{ latitude: 33.76418473401285, longitude: -84.39513125767164  }} 
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
