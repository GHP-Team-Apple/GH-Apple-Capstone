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
  RefreshControl, SafeAreaView,
} from "react-native";
import {
  deleteDoc,
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {getSavedEventsByUserId} from "../services/events"

const SavedEvents = () => {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const userId = "13ByjS5Rcc9MgJAv2ZZj";
  const userId1 ="mNBpiFdzucPgNIWnrAtuVJUUsUM2"

  async function fetchSavedEvents() {
    const userId1 ="mNBpiFdzucPgNIWnrAtuVJUUsUM2"
    const eventArr = await getSavedEventsByUserId(userId1)
      setEvents(eventArr);
  }

  useEffect(
      async()=>{await fetchSavedEvents()},[]
  );

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(async() => {
    await fetchSavedEvents();
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView 
    style={styles.container}
    contentContainerStyle={styles.scrollView}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />}
    >
      {events.length === 0
      ?(
          <View><Text>No Events Saved</Text></View>
      )
      :(
        events.map((event, idx) => (
            <TouchableHighlight
              key={idx}
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => alert("Pressed!")}
            >
              <MyComponent event={event} fetchSavedEvents={fetchSavedEvents}/>
            </TouchableHighlight>
          ))
          )
        }
        </ScrollView>
        </SafeAreaView>
  );
};

const MyComponent = (props) => {
  console.log(props.event);

  async function handleCheckIn(id) {
    await updateDoc(doc(db, "SavedEvents", id), {
      checkIn: true,
    });
    await props.fetchSavedEvents();
  }

  async function handleRemoveCheckIn(id) {
    await updateDoc(doc(db, "SavedEvents", id), {
      checkIn: deleteField(),
    });
    await props.fetchSavedEvents();
  }

  async function handleDelete(id) {
    await deleteDoc(doc(db, "SavedEvents", id));
    await props.fetchSavedEvents();
  }

  const IconButton = ({ title, onPress, icon }) => (
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
      {icon}
      <Text style={{fontSize:12}}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.event}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          {props.event.name}
        </Text>
        <Image
        style={styles.image}
        source={{
          uri: props.event.image,
        }}
      />
      </View>
      {/* <IconButton onPress={() => handleDelete(props.event.id)} name="favorite-outline"
//   backgroundColor="#3b5998"
  >
      </IconButton> */}
      {props.event.checkIn ? (
        <View style={styles.buttons}>
          <IconButton
            title={"Remove"}
            onPress={() => handleDelete(props.event.id)}
            icon={<AntDesign name="delete" size={24} color="black" />}
          />
          <IconButton
            title={"Checked In"}
            onPress={() => handleRemoveCheckIn(props.event.id)}
            icon={
              <MaterialCommunityIcons
                name="map-marker-check"
                size={24}
                color="black"
              />
            }
          />
        </View>
      ) : (
        <View style={styles.buttons}>
          <IconButton
            title={"Remove"}
            onPress={() => handleDelete(props.event.id)}
            icon={<AntDesign name="delete" size={24} color="black" />}
          />
          <IconButton
            title={"Check In"}
            onPress={() => handleCheckIn(props.event.id)}
            icon={
              <MaterialCommunityIcons
                name="map-marker-check-outline"
                size={24}
                color="black"
              />
            }
          />
        </View>
      )}
    </>
  );
};

const dateFormatter = (dateStr) => {
  return `${new Date(Date.parse(dateStr))}`.slice(0, 24);
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    flexDirection: "column",
    margin: 0,
    borderBottomColor: "black"
  },
  event: {
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: 350,
    height: 210,
    borderRadius: 8,
    margin: 5,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-around",
  },
});

export default SavedEvents;
