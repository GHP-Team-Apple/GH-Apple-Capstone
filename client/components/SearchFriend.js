//If new to the system, create FriendsOnApp Doc and add friend you may know in the Doc
//Add my contact info to other friends' FriendsOnApp

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import * as Contacts from "expo-contacts";
import { FlatList } from "react-native-gesture-handler";
import getUsers, {db} from "../../firebase"
import { collection, query, where, getDocs } from "firebase/firestore";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const numArr =[];

  async function getUsersNum () {
    const q = query(collection(db, "Users"), where("number", "!=", null));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data().number
      numArr.push(data)
    });
  }
           
  

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const filteredData = data.filter((item) => {
            const phoneNumbers = item.phoneNumbers;
            if (phoneNumbers === undefined || phoneNumbers.length === 0) {
              return false;
            }
            console.log('numArr', numArr)
            return numArr.includes(phoneNumbers[0].number);
          });
          setContacts([...contacts, ...filteredData]);
        }
      }
    })();
  }, []);

  if (contacts.length === 0 || contacts === undefined) {
    return (
      <View>
        <Text>No Friends Yet</Text>
      </View>
    );
  }

  if(numArr.length ===0){
    getUsersNum();
  }
  
  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => {
        item.id + "contact";
      }}
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
              onPress={() => this._handlePress()}
              title="Add Friend"
            >
              Follow
            </Button>
          </View>
        );
      }}
    ></FlatList>
  );
}