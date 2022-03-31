// @refresh reset

import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { db } from "../../firebase";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { makeStyles } from "@mui/styles";
import {createMessage} from "../services/channel"
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useStyles = makeStyles((theme) => ({
  customHoverFocus: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "yellow" },
  },
}));

export default function FriendChat({ route, navigation }) {
  const { myUser, chatUser, chatId, channelId } = route.params;
  const [user, setUser] = useState({
    _id: `${myUser.uid}${chatId}`,
    name: `${myUser.firstName}`,
  });
  const [messages, setMessages] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const chatsRef = collection(db, "Channel", channelId, "Chats")
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
     await createMessage(channelId,messages)
  }

  const IconButton = ({ onPress, icon }) => (
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
      {icon}
      {/* <Text style={{ fontSize: 12 }}>{title}</Text> */}
    </TouchableOpacity>
  );
  
  // console.log("user",route.params)
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
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
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
  text:{
    fontSize:20,
    marginLeft: 132,
  },
  subcontainer:{
    display:"flex",
    marginTop:10,
    flexDirection: "row",
  },
});
