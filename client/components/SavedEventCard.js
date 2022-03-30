import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { deleteDoc, doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../firebase";
import {
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";


export default SavedEventCard = (props) => {
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
      <Text style={{ fontSize: 12 }}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.event}>
      <View style={styles.noneImage}>
        <Image
          style={styles.image}
          source={{
            uri: props.event.imageUrl,
          }}
        />
      </View>
      <View>
        <Text style={{fontSize: 20, fontWeight:"bold", marginTop:10}}>{props.event.name}</Text>
        <Text style={{fontSize: 14, color:"gray", marginTop:7}}>{props.event.venueName}</Text>
        <Text style={{fontSize: 14, color:"gray", marginTop:7}}>{props.event.startDate}</Text>
        {props.event.checkIn ? (
          <View style={styles.buttons}>
            <IconButton
              title={"Remove"}
              onPress={() => handleDelete(props.event.id)}
              icon={<AntDesign name="delete" size={22} color="black" />}
            />
            <IconButton
              title={"Checked In"}
              onPress={() => handleRemoveCheckIn(props.event.id)}
              icon={
                <MaterialCommunityIcons
                  name="map-marker-check"
                  size={22}
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
              icon={<AntDesign name="delete" size={22} color="black" />}
            />
            <IconButton
              title={"Check In"}
              onPress={() => handleCheckIn(props.event.id)}
              icon={
                <MaterialCommunityIcons
                  name="map-marker-check-outline"
                  size={22}
                  color="black"
                />
              }
            />
          </View>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  event: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
    // alignItems: "center",
    // margin: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    margin: 5,
    marginBottom: 20
  },
    buttons: {
      display: "flex",
      flexDirection: "row",
      marginTop: 14,
      justifyContent: "space-between",
    },
});