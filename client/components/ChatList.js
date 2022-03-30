import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
} from "react-native";
import {
  getUserById,
  getFollowing,
  getIsFollowing,
  addFollowing,
} from "../services/users";
import { getUsers } from "../../firebase";
import FriendChat from "../components/FriendChat";

export default function ChatList({ navigation }){
 
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
    //fresh the screen
      const onRefresh = React.useCallback(async() => {
        const userArr = await fetchSuggestedUsers(myUserId)
        setContacts(userArr);
        const followingUserArr = await fetchNoFriendshipFollowers(myUserId)
        setFollowingContacts(followingUserArr)
        setRefreshing(true)
        wait(2000).then(() => setRefreshing(false));
      }, []);

    useEffect(async () => {
        // grab user data 
        const userFromDB = await getUserById(userId);
        setUser(userFromDB);

        // grab array of following data
        const followingFromDB = await getFollowing(userId);
        setFollowingArr(followingFromDB);
    }, []);

    useEffect(async () => {
        await checkFriendship();
    }, [followingArr])

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
        <Text>Chats</Text>

      <FriendCard/>

    </ScrollView>
  </SafeAreaView>
  );
};

function FriendCard(props) {
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

const getImage = (image) => {
  switch (image) {
    case "alpaca.png":
      return require("../../assets/alpaca.png");
    case "rabbit.png":
      return require("../../assets/rabbit.png");
    case "chameleon.png":
      return require("../../assets/chameleon.png");
    case "dog.png":
      return require("../../assets/dog.png");
    case "koala.png":
      return require("../../assets/koala.png");
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignContent: "center",
    padding: 20,
  },
  friend: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
});

