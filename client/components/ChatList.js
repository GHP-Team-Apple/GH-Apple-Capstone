import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import {
  getUserById,
  getFollowing,
  getIsFollowing,
} from "../services/users";
import { getChannelId, getFriendByChannelId, createChannel } from "../services/channel";
import {
  collection,
  getDocs,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import { set } from "react-native-reanimated";

export default function ChatList({ navigation }) {
  const userId = "mNBpiFdzucPgNIWnrAtuVJUUsUM2";
  const [refreshing, setRefreshing] = React.useState(false);
  const [user, setUser] = useState({});
  const [followingArr, setFollowingArr] = useState([]);
  const [friends, setFriends] = useState([]);
  const [chatedFriend, setChatedFriend] = useState([]);
  const [chatUser,setChatUser] = useState(null);
  const [message,setMessage] = useState(null)

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
  }, [followingArr]);

  useEffect(async () => {
    await hasConversation();
  }, [friends])

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  //fresh the screen
  const onRefresh = React.useCallback(async () => {
    const chatedFriendArr = await hasConversation();
    set(chatedFriendArr)
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const handlePress = async(friendId, friendName,userId, friendImage) => {
    const friend = {"_id":`${friendId}${userId}`,"name":friendName, avatar:"https://expertphotography.b-cdn.net/wp-content/uploads/2018/10/cool-profile-pictures-retouching-1.jpg"}
    setChatUser(friend);
    const channelId = await createChannel(friendId, userId)
    navigation.navigate('FriendChat', {
        chatUser:friend, myUser:user, chatId:friendId, channelId:channelId
      })
}

  const checkFriendship = async () => {
    const currentFriends = [];
    for (let i = 0; i < followingArr.length; i++) {
      let following = followingArr[i];
      let isFollowing = await getIsFollowing(following.uid, userId);
      if (isFollowing) {
        currentFriends.push(following);
      }
    }
    setFriends(currentFriends);
  };

  //check if conversation with this friend
  const hasConversation = async () => {
    const arr = [];
    const friendsId = friends.map((friend) => friend.uid);
    for (let i = 0; i < friendsId.length; i++) {
      //get friend if has existing channel
      const channelId = getChannelId([friendsId[i], userId]);
      const friend = await getFriendByChannelId(channelId, userId);
      if (friend === undefined) {
        continue;
      }
      //get most recent message
      const message = undefined;
      const chatRef = collection(db, "Channel", channelId, "Chats");
      const q = query(chatRef, orderBy("createdAt", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        message = querySnapshot.docs[0].data();
      }
      if (message !== undefined) {
        setMessage(message)
        friend["lastMessage"] = message;
        arr.push(friend);
      }
    }
    setChatedFriend(arr);
  };

  const handle = async () => {
    await hasConversation();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TouchableOpacity onPress={() => handle()}>
        <Text style={{ fontSize: 25, margin: 10 }}>Chat</Text>
        </TouchableOpacity>
        {chatedFriend.map((friend) => {
          const image = getImage(friend.profilePicture);
          const dateTime = getDateTime(
            friend.lastMessage.createdAt.seconds * 1000
          );
          return (
            <TouchableOpacity
              key={friend.id}
              style={styles.friend}
              onPress={() =>
                handlePress(
                  friend.uid,
                  friend.firstName,
                  userId,
                  friend.profilePicture
                )
              }
            >
              <Image
                source={image}
                style={{ width: 50, height: 50, marginRight: 10 }}
              />
              <View style={styles.noneImage}>
                <Text style={{ fontSize: 20, marginLeft: 30 }}>
                  {friend.firstName}
                </Text>
                <View style={styles.message}>
                  <Text style={{ fontSize: 14, marginLeft: 30, color: "gray" }}>
                    {friend.lastMessage.text}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "gray",
                      flexGrow: 1,
                      textAlign: "right",
                    }}
                  >
                    {dateTime}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
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

const getDateTime = (timestamp) => {
  const date = new Date(timestamp);
  // return `${date.getMonth() + 1} ${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return date.toLocaleTimeString();
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    alignContent: "center",
    padding: 20,
  },
  friend: {
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
    height: 60,
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 1,
  },
  noneImage: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  message: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
});
