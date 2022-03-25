import { db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getFriends } from "./friends";

export const getLocalEvents = async (city) => {
  const eventsCollection = query(
    collection(db, "LocalEvents"),
    where("city", "==", `${city}`)
  );
  const eventSnapshot = await getDocs(eventsCollection);
  const eventList = eventSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return eventList;
};

export const getFriendEvents = async (userId) => {
  const friendsArr = await getFriends(userId);
  const friendEventsArr = []
  
  for (let i = 0; i < friendsArr.length; i++) {
    // double check if main is now updated to uid
    const friendId = friendsArr[i].id;
    const q = query(
      collection(db, "SavedEvents"),
      where("userId", "==", `${friendId}`)
    );
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
        friendEventsArr.push(doc.data());
    });
  }
  return friendEventsArr;
};

// Single Event View should have event params passed down when navigating screens
// userId = auth.currentUser.uid
// import saveEvent to Single Event View
// onPress saveEvent button should invoke:
export const saveEvent = async (event, userId) => {
  const eventsCollection = collection(db, "SavedEvents");
  await addDoc(eventsCollection, { ...event, checkIn: false, userId: userId });
};
