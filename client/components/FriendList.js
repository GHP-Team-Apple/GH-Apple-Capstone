import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, TouchableOpacity } from 'react-native';
import { getUserById, getFollowing, getIsFollowing, addFollowing } from '../services/users';
import { getUsers } from '../../firebase';
import FriendChat from "../components/FriendChat"

const FriendList = ({navigation}) => {
    const userId = "mNBpiFdzucPgNIWnrAtuVJUUsUM2";
    const [user, setUser] = useState({});
    const [followingArr, setFollowingArr] = useState([]);
    const [friends, setFriends] = useState([]);
    const [chatUser,setChatUser] = useState(null)
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
    }, [followingArr])


    const handlePress = (friendId, friendName,userId) => {
        // const channelId = `${friendId}${userId}`
        // setChannelId(channelId)
        console.log(friendId, friendName,userId)
        const friend = {"_id":`${friendId}${userId}`,"name":friendName}
        setChatUser(friend);
        console.log("===",friend)
        console.log("===",chatUser)
        navigation.navigate('FriendChat', {
            chatUser:friend, myUser:user, chatId:friendId
          })
    }

    const backToFriendList = () => {
        setChatUser(null);
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

    // console.log('chatUser before return',friends)
    return (
        //    chatUser !== null
        //     ? (<FriendChat chatUser={chatUser} user={user} handleBack={backToFriendList}/>)
        //     : (<>
                <ScrollView style={styles.container}>
                <Text style={{ fontSize: 25, margin: 10 }}>Friends:</Text>
                {
                    friends.map(friend => {
                        const image = getImage(friend.profilePicture);
                        return (
                            <TouchableOpacity key={friend.id} style={styles.friend} onPress={() =>
                                handlePress(friend.uid, friend.firstName, userId)
                            } >
                            <Image source={image} style={{ width: 50, height: 50, marginRight: 10 }}/>
                            <Text style={{ fontSize: 20, marginLeft:30}}>{friend.firstName}</Text>
                        </TouchableOpacity>
                        )
                    })
                }
                </ScrollView>
                // </>)
    )
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
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        alignContent: 'center',
        padding: 20
    }, 
    friend: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        justifyContent:"flex-start",
    }
})

export default FriendList;