import { db } from "./Chat";
import React, { useState, useEffect, useCallback } from "react";
// import { GiftedChat } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, TextInput, View, Button, Dimensions } from "react-native";

const chatsRef = db.collection("MyFriendship");

const DisplayFriend = (props) => {
    const userId = "1j382lA";
    const myDisplayName = "Carol";
    async function handlePress() {
        const _id = Math.random().toString(36).substring(7);
        const user = { _id };
        await AsyncStorage.setItem("friend", JSON.stringify(user));
        setUser(user);
      }
  return <View>{myContact.map}</View>;
};

export default function AddFriend() {
  //   const [user, setUser] = useState(null);
  //   const [name, setName] = useState("");
  //   const [messages, setMessages] = useState([]);

  //   const appendFriendship = useCallback(
  //     (messages) => {
  //       setMessages((previousMessages) =>
  //         GiftedChat.append(previousMessages, messages)
  //       );
  //     },
  //     [messages]
  //   );

  //   async function readUser() {
  //     const user = await AsyncStorage.getItem("user");
  //     if (user) {
  //       setUser(JSON.parse(user));
  //     }
  //   }

  //   async function handleSend(messages) {
  //     const writes = messages.map((m) => chatsRef.add(m));
  //     await Promise.all(writes);
  //   }

  //   if (!user) {
  //     return (
  //       <View style={styles.container}>
  //         {/* <SignIn /> */}
  //       </View>
  //     );
  //   }

  const myContact = [
    {
      name: Woramon,
      number: "123456",
    },
    {
      name: Joanne,
      number: "123456",
    },
    {
      name: Jazma,
      number: "123456",
    },
  ];
  
  return (
    <>
      {myContact.map(contact => <DisplayFriend contact={}/>)}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    backgroundColor: "#fff",
    alignItems: "flex-end",
    borderWidth: 2,
    justifyContent: "center",
    padding: 30,
    flexDirection: "column",
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
