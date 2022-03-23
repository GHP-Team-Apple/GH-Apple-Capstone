import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { getUserById, getFollowing, getIsFollowing } from '../services/users';
import { getUsers } from '../../firebase';

const FriendList = () => {
    const [user, setUser] = useState({});
    const [following, setFollowing] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(async () => {
        // const userFromDB = await getUserById("AeJL2gCPw5DK2fHA5szw");
        // setUser(userFromDB);

        const followingFromDB = await getFollowing("AeJL2gCPw5DK2fHA5szw");
        setFollowing(followingFromDB);

        // const followingStatus = await getIsFollowing("AeJL2gCPw5DK2fHA5szw", "X0JSZAYLnMUlh5DLdpMP");
        // setIsFollowing(followingStatus);
    }, [])

    // useEffect(async () => {
    //     console.log('CURRENT USER ----->', user);
    // }, [user]);

    // useEffect(async () => {
    //     console.log('IS FOLLOWING', isFollowing);
    // }, [isFollowing]);

    useEffect(async () => {
        console.log('FOLLOWING', following);
    }, [following]);

    return (
        <Text>Hello</Text>
    )
}

export default FriendList;