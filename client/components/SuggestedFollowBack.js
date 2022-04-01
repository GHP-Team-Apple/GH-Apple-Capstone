import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { makeStyles } from "@mui/styles";
import {auth} from "../../firebase"


const useStyles = makeStyles((theme) => ({
  customHoverFocus: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "yellow" },
  },
}));

export default function SuggestContact(props) {
  // const myUserId = "ihzddcHz7WSarDGk6kn3";
  const myUserId = auth.currentUser.uid;
  const [image, setImage] = useState("../../assets/rabbit.png")
  const classes = useStyles();
  const IconButton = ({ title, onPress, icon }) => (
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
      {icon}
      <Text style={{ fontSize: 12 }}>{title}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    const image = getImage(props.contact.profilePicture)
    setImage(image)
  }, [])


  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <Text style={styles.text}>
        {props.contact.firstName},{`\n`}
        followed you {'                      '}   
      </Text>
      <View
        style={{
          justifyContent: "center", //Centered vertically
        }}
      >
        <IconButton
          title={"Follow"}
          onPress={() => props.banana(myUserId, props.contact.uid)}
          icon={<SimpleLineIcons name="user-follow" size={24} color="black" />}
          className={classes.customHoverFocus}
        />
      </View>
    </View>
  );
}

const getImage = (image) => {
    switch(image) {
        case 'alpaca.png':
            return require('../../assets/alpaca.png');
        case 'rabbit.png':
            return require('../../assets/rabbit.png');
        case 'chameleon.png':
            return require('../../assets/chameleon.png');
        case 'dog.png':
            return require('../../assets/dog.png');
        case 'koala.png':
            return require('../../assets/koala.png');
        case "penguin.png":
          return require("../../assets/penguin.png");
        case "panda.png":
          return require("../../assets/panda.png");
        case "elephant.png":
          return require("../../assets/elephant.png");
        case "duck.png":
          return require("../../assets/duck.png");
    }
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