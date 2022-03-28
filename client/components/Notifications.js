import { View, Text, StyleSheet, RefreshControl, SafeAreaView,ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import FriendFromContactList from "./SearchFriend";
import {fetchSuggestedUsers} from "../services/contacts"
import {addFollower} from "../services/users"

export default function Notifications() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [contacts, setContacts] = useState([]);
  const myUserId = "ihzddcHz7WSarDGk6kn3";
  
  //fetchsuggested Users via contactList
  useEffect(async() => {
    const userArr = await fetchSuggestedUsers(myUserId)
    setContacts(userArr);

  }, []);

  //Add Follower in the user's subcollection - following
  async function handlePress(myUserId, targetUserId) {
    await addFollower(myUserId, targetUserId)
    const updatedContactList = contacts.filter(contact=> contact.uid !== targetUserId)
    setContacts(updatedContactList)
  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
//fresh the screen
  const onRefresh = React.useCallback(async() => {
    await fetchSuggestedUsers(myUserId);
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
          <Text>Notifications</Text>
        <FriendFromContactList styles={styles.container} contacts={contacts} handlePress={handlePress}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignContent: "center",
    padding: 18,
  },
});

// import Constants from 'expo-constants';
// import * as Notifications from 'expo-notifications';
// import React, { useState, useEffect, useRef } from 'react';
// import { Text, View, Button, Platform } from 'react-native';
// import * as Device from 'expo-device';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// export default function AppNotification() {
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   useEffect(() => {
//     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

//     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//       setNotification(notification);
//     });

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
//       }}
//     >
//       <Text>Your expo push token: {expoPushToken}</Text>
//       <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Title: {notification && notification.request.content.title} </Text>
//         <Text>Body: {notification && notification.request.content.body}</Text>
//         <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
//       </View>
//       <Button
//         title="Press to schedule a notification"
//         onPress={async () => {
//           await schedulePushNotification();
//         }}
//       />
//     </View>
//   );
// }

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: 'Here is the notification body',
//       data: { data: 'goes here' },
//     },
//     trigger: { seconds: 2 },
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