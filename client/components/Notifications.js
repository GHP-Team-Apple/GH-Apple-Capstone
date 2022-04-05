import { View, Text, StyleSheet, RefreshControl, SafeAreaView,ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import FriendFromContactList from "./SearchFriend";
import {fetchSuggestedUsers, fetchNoFriendshipFollowers} from "../services/contacts"
import {addFollower} from "../services/users"
import FollowingBackList from "./SearchFollowing"
import {auth} from "../../firebase"

export default function Notifications() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [contacts, setContacts] = useState([]);
  const [followingContacts, setFollowingContacts] = useState([]);
  const myUserIdContact = "ihzddcHz7WSarDGk6kn3";
  const myUserId = auth.currentUser.uid;
  
  //fetchsuggested Users via contactList
  useEffect(async() => {
    const userArr = await fetchSuggestedUsers(myUserIdContact)
    console.log("My contacts:", userArr);
    setContacts(userArr);
    const followingUserArr = await fetchNoFriendshipFollowers(myUserId)
    setFollowingContacts(followingUserArr)
  }, []);

  //Add Follower in the user's subcollection - following
  async function followUser(myUserId, targetUserId) {
    await addFollower(myUserId, targetUserId)
    const updatedContactList = contacts.filter(contact=> contact.uid !== targetUserId)
    setContacts(updatedContactList)
  }

  async function acceptFollowRequest(myUserId, targetUserId) {
    await addFollower(targetUserId, myUserId)
    const updatedFollowingContactList = followingContacts.filter(contact=> contact.uid !== targetUserId)
    setFollowingContacts(updatedFollowingContactList)
  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
//fresh the screen
  const onRefresh = React.useCallback(async() => {
    const userArr = await fetchSuggestedUsers(myUserIdContact)
    setContacts(userArr);
    const followingUserArr = await fetchNoFriendshipFollowers(myUserId)
    setFollowingContacts(followingUserArr)
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
     <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Notifications</Text>
        <FriendFromContactList styles={styles.container} contacts={contacts} handlePress={followUser}/>
        <FollowingBackList styles={styles.container} followingContacts={followingContacts} handlePress={acceptFollowRequest}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignContent: "center",
    padding: 18,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
});

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 20,
//     alignContent: "center",
//     padding: 18,
//   },
// });

// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import React, { useState, useEffect, useRef } from 'react';
// import { Text, View, Button, Platform } from 'react-native';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// export default function App() {
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   useEffect(() => {
//     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

//     // This listener is fired whenever a notification is received while the app is foregrounded
//     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//       setNotification(notification);
//     });

//     // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
//     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log(response);
//     });

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener.current);
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'space-around',
//       }}>
//       <Text>Your expo push token: {expoPushToken}</Text>
//       <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Title: {notification && notification.request.content.title} </Text>
//         <Text>Body: {notification && notification.request.content.body}</Text>
//         <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
//       </View>
//       <Button
//         title="Press to Send Notification"
//         onPress={async () => {
//           await sendPushNotification(expoPushToken);
//         }}
//       />
//     </View>
//   );
// }

// // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { someData: 'goes here' },
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }