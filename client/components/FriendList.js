import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { getUserById, getFollowing, getIsFollowing } from '../services/users';
import { getUsers } from '../../firebase';

const FriendList = () => {
    const userId = "mNBpiFdzucPgNIWnrAtuVJUUsUM2";
    const [user, setUser] = useState({});
    const [followingArr, setFollowingArr] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(async () => {
        // grab user data 
        // const userFromDB = await getUserById(userId);
        // setUser(userFromDB);

        // grab array of following data
        const followingFromDB = await getFollowing(userId);
        setFollowingArr(followingFromDB);

    }, []);

    useEffect(async () => {
        // console.log('total following: ', followingArr.length);
        await checkFriendship();
    }, [followingArr])

    useEffect(() => {
        console.log('FRIENDS -----> ', friends);
    }, [friends])

    const checkFriendship = async () => {
        const currentFriends = [];
        for (let i = 0; i < followingArr.length; i++) {
            let following = followingArr[i];
            let isFollowing = await getIsFollowing(following.id, userId);
            if (isFollowing) {
                currentFriends.push(following);
            }
        }
        setFriends(currentFriends);
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>FRIENDS:</Text>
            {
                friends.map(friend => {
                    const image = getImage(friend.profilePicture);
                    return (
                        <View key={friend.id} style={styles.friend}>
                        <Image source={image} />
                        <Text style={{ fontSize: 20}}>{friend.username}</Text>
                    </View>
                    )
                })
            }
        </View>
    )
}

const getImage = (image) => {
    switch(image) {
        case "alpaca.png":
            return require('../../assets/alpaca.png');
        case "rabbit.png":
            return require('../../assets/rabbit.png')
    }
}



const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        alignContent: 'center',
        padding: 20
    }, 
    friend: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    }
})

export default FriendList;