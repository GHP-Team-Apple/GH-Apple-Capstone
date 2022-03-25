//If new to the system, create FriendsOnApp Doc and add friend you may know in the Doc
//Add my contact info to other friends' FriendsOnApp

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import * as Contacts from "expo-contacts";
import { FlatList } from "react-native-gesture-handler";
import { db } from "../../firebase";
import { collection, query, where, getDocs, setDoc, doc, addDoc } from "firebase/firestore";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const userId = "13ByjS5Rcc9MgJAv2ZZj";

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      const q = query(collection(db, "Users"), where("number", "!=", null));
      const querySnapshot = await getDocs(q);
      const numArr = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data().number;
        numArr.push(data);
      });

      if (status != "granted") {
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        const filteredData = data.filter((item) => {
          const phoneNumbers = item.phoneNumbers;
          if (phoneNumbers === undefined || phoneNumbers.length === 0) {
            return false;
          }
          return numArr.includes(phoneNumbers[0].number);
        });
        setContacts([...filteredData]);
      }
    })();
  }, []);

  async function handlePress(str, userId) {
    //add the person in the friend array
    const q = query(collection(db, "Users"), where("number", "==", str));
    const friend = await getDocs(q);
    const id = friend.docs[0].id
    await addDoc(collection(db, "Users", userId, "following"), {userRef: doc(db,"Users",id)})
    // send following notification
  }

  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <View>
            <Text>People You May Know</Text>
            <Text>{item.name}</Text>
            <Text>
              {item.phoneNumbers &&
                item.phoneNumbers[0] &&
                item.phoneNumbers[0].number}
            </Text>
            <Button
              style={{ fontSize: 20, color: "green" }}
              styleDisabled={{ color: "red" }}
              onPress={() => handlePress(item.phoneNumbers[0].number, userId)}
              title="Follow"
            >
              Follow
            </Button>
          </View>
        );
      }}
    ></FlatList>
  );
}
