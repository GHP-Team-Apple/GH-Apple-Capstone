import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  getUserById,
  getFollowing,
  getIsFollowing,
  addFollowing,
} from "../services/users";
import { createChannel } from "../services/channel";
import {auth} from "../../firebase"

const FriendList = ({ route, navigation }) => {
//   const userId = "mNBpiFdzucPgNIWnrAtuVJUUsUM2";
console.log("======navigation", navigation)
  const userId = auth.currentUser.uid;
  const [user, setUser] = useState({});
  const [followingArr, setFollowingArr] = useState([]);
  const [friends, setFriends] = useState([]);
  const [chatUser, setChatUser] = useState(null);
  const [eventUrl, setEventUrl] = useState(null);
  // const [channelId, setChannelId] = useState(null)

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

  const handlePress = async (friendId, friendName, userId, friendImage) => {
    const friend = {
      _id: `${friendId}${userId}`,
      name: friendName,
      avatar:
        "https://expertphotography.b-cdn.net/wp-content/uploads/2018/10/cool-profile-pictures-retouching-1.jpg",
    };
    setChatUser(friend);
    const channelId = await createChannel(friendId, userId);
    navigation.navigate("FriendChat", {
      chatUser: friend,
      myUser: user,
      chatId: friendId,
      channelId: channelId,
    });
  };

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

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={{ fontSize: 25, margin: 10 }}>Friends</Text> */}
      {friends.map((friend) => {
        const image = getImage(friend.profilePicture);
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
            <Text style={{ fontSize: 20, marginLeft: 30 }}>
              {friend.firstName}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

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
    margin: 8,
    height: 60,
    justifyContent: "flex-start",
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 1,
  },
});

export default FriendList;
