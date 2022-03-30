//If new to the system, create FriendsOnApp Doc and add friend you may know in the Doc
//Add my contact info to other friends' FriendsOnApp

import React from "react";
import { StyleSheet, Dimensions, TouchableHighlight } from "react-native";
import SuggestContactFollowBack from "./SuggestedFollowBack";

export default function App(props) {
  return props.followingContacts.map((contact, idx) => (
    <TouchableHighlight
      key={idx}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => alert("Pressed!")}
    >
      <SuggestContactFollowBack contact={contact} banana={props.handlePress} />
      
    </TouchableHighlight>
  ));
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "pink",
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: "gray",
  },
});
