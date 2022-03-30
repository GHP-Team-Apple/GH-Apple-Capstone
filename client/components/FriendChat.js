// @refresh reset

import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { db } from "../../firebase";
import {
  collection,
  query,
  deleteDoc,
  doc,
  updateDoc,
  deleteField,
  onSnapshot,
  where,
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  customHoverFocus: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "yellow" },
  },
}));

export default function FriendChat({ route, navigation }) {
  const { myUser, chatUser, chatId } = route.params;
  const [user, setUser] = useState({
    _id: `${myUser.uid}${chatId}`,
    name: `${myUser.firstName}`,
  });
  const [messages, setMessages] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const chatsRef = query(
      collection(db, "Chats"),
      where("user", "in", [user, chatUser])
    );
    const unsubscribe = onSnapshot(chatsRef, (querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m));
    await Promise.all(writes);
  }

  const IconButton = ({ onPress, icon }) => (
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
      {icon}
      {/* <Text style={{ fontSize: 12 }}>{title}</Text> */}
    </TouchableOpacity>
  );
  
  console.log("user",route.params)
  return (
    chatUser !== null
    ? (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
      <IconButton
          // title={"Back"}
          onPress={() => navigation.goBack()}
          icon={<Ionicons name="chevron-back" size={24} color="black" />}
          className={classes.customHoverFocus}
        />
      {/* <Button
        title="Back"
        onPress={() => navigation.goBack()}
        style={styles.button}
        /> */}
        <Text style={styles.text}>{chatUser.name}</Text>
        </View>
      <GiftedChat messages={messages} user={user} onSend={handleSend} />
    </View>
    )
    : null
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
    flexDirection: "column",
    // marginBottom: 10
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: "gray",
  },
  text:{
    fontSize:24,
    marginLeft: 132,
  },
  subcontainer:{
    display:"flex",
    marginTop:10,
    flexDirection: "row",
  },
});
