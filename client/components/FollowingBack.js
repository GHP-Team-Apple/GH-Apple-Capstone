import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
  customHoverFocus: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "yellow" },
  },
}));

export default function FollowingBack(props) {
  const myUserId = "ihzddcHz7WSarDGk6kn3";
  const classes = useStyles();
  const IconButton = ({ title, onPress, icon }) => (
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
      {icon}
      <Text style={{ fontSize: 12 }}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/rabbit.png")} />
      <Text style={styles.text}>
        {props.contact.firstName},{`\n`}
        followed you
      </Text>
      <View
        style={{
          justifyContent: "center", //Centered vertically
        }}
      >
        <IconButton
          title={"Follow Back"}
          onPress={() => props.banana(myUserId, props.contact.uid)}
          icon={<SimpleLineIcons name="user-follow" size={24} color="black" />}
          className={classes.customHoverFocus}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  text: {
    display: "flex",
    alignSelf: "center",
  },
  image: {
    width: 48,
    height: 48,
    margin: 9,
  },
  button: {
    backgroundColor: "red",
  },
});