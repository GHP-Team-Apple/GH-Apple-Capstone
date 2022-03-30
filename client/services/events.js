import { db } from "../../firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
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

export const getSavedEventsByUserId = async (userId) => {
  const q = query(collection(db, "SavedEvents"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const obj = doc.data();
    obj.eventId = obj.id;
    obj["id"] = doc.id;
    return obj;
  });
};

export const saveEvent = async (userId, event) => {
  const q = query(
    collection(db, "SavedEvents"),
    where("id", "==", event.id),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length !== 0) {
    console.log("EVENT ALREADY SAVED");
    return;
  } else {
    await addDoc(collection(db, "SavedEvents"), event);
    //console.log('EVENT TO BE SAVED ---->', savedEvent);
  }
};

export const unsaveEvent = async (userId, event) => {
  const q = query(
    collection(db, "SavedEvents"),
    where("id", "==", event.id),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length !== 0) {
    // console.log('QS', querySnapshot.docs[0].id);
    await deleteDoc(doc(db, "SavedEvents", querySnapshot.docs[0].id));
  } else {
    return;
  }
}

