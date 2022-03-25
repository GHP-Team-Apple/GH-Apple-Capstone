import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { getUserById, getFollowing, getIsFollowing, addFollowing } from '../services/users';
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
        await checkFriendship();
    }, [followingArr])


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

    return (
        <ScrollView style={styles.container}>
            <Text style={{ fontSize: 25, margin: 10 }}>Friends:</Text>
            {
                friends.map(friend => {
                    const image = getImage(friend.profilePicture);
                    return (
                        <View key={friend.id} style={styles.friend}>
                        <Image source={image} style={{ width: 50, height: 50, marginRight: 10 }}/>
                        <Text style={{ fontSize: 20}}>{friend.username}</Text>
                    </View>
                    )
                })
            }
        </ScrollView>
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
        marginTop: 30,
        alignContent: 'center',
        padding: 20
    }, 
    friend: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    }
})

export default FriendList;