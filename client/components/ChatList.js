import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity
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
    const userId = "mNBpiFdzucPgNIWnrAtuVJUUsUM2";
    const [refreshing, setRefreshing] = React.useState(false);
    const [user, setUser] = useState({});
    const [followingArr, setFollowingArr] = useState([]);
    const [friends, setFriends] = useState([]);
    const [chatUser,setChatUser] = useState(null)

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

      const handlePress = (friendId, friendName,userId, friendImage) => {
        // const channelId = `${friendId}${userId}`
        // setChannelId(channelId)
        console.log(friendId, friendName,userId, friendImage)
        const friend = {"_id":`${friendId}${userId}`,"name":friendName, avatar:"https://expertphotography.b-cdn.net/wp-content/uploads/2018/10/cool-profile-pictures-retouching-1.jpg"}
        setChatUser(friend);
        console.log("===friend",friend)
        console.log("===chatUser",chatUser)
        navigation.navigate('FriendChat', {
            chatUser:friend, myUser:user, chatId:friendId
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
    }

    //check if conversation with this friend
    const hasConversation = async() =>{
     
    }
    //retrieve the message
    const mostRecentMessages = async() => {
       
    }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
        <Text style={{ fontSize: 25, margin: 10 }}>Chats</Text>
        {
            friends.map(friend => {
                const image = getImage(friend.profilePicture);
                return (
                    <TouchableOpacity key={friend.id} style={styles.friend} onPress={() =>
                        handlePress(friend.uid, friend.firstName, userId, friend.profilePicture)
                    } >
                    <Image source={image} style={{ width: 50, height: 50, marginRight: 10 }}/>
                    <Text style={{ fontSize: 20, marginLeft:30}}>{friend.firstName}</Text>
                </TouchableOpacity>
                )
            })
        }
    </ScrollView>
  </SafeAreaView>
  );
};

// function FriendCard(props) {
//     console.log()
//     return(
        
//         //     {props.friends.map(friend => {
//         //     const image = getImage(friend.profilePicture);
//         //     return (
//         //         <TouchableOpacity key={friend.id} style={styles.friend} onPress={() =>
//         //             handlePress(friend.uid, friend.firstName, userId, friend.profilePicture)
//         //         } >
//         //         <Image source={image} style={{ width: 50, height: 50, marginRight: 10 }}/>
//         //         <Text style={{ fontSize: 20, marginLeft:30}}>{friend.firstName}</Text>
//         //     </TouchableOpacity>
//         //     )
//         // }
//         )
//   }

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

