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
