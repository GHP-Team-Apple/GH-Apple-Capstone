import { db } from '../../firebase';
import {
    collection,
    query,
    where,
    getDocs,
  } from "firebase/firestore";

export const getSavedEventsByUserId = async (userId) => {
    const q = query(
        collection(db, "SavedEvents"),
        where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
        const obj = doc.data();
        obj["id"] = doc.id;
        return obj;
    });
}
