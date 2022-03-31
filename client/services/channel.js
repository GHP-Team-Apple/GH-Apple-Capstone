import { db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { getUserById } from "./users";

/**
 * To prevent duplicate channel, use sorted participants id to build channel id.
 * For example, if userIds are ['abc', 'def], the channel id will be 'def-abc'
 */
export const getChannelId = (userIds) => {
  return userIds.sort().join("-");
};

export const createChannel = async (friendId, userId) => {
  const channelId = getChannelId([friendId, userId]);
  const docRef = await setDoc(doc(db, "Channel", channelId), {
    user: [friendId, userId],
  });
  return channelId;
};

export const createMessage = async (channelId, messages) => {
  const chatsRef = collection(db, "Channel", channelId, "Chats");
  const writes = messages.map((m) => addDoc(chatsRef, m));
  await Promise.all(writes);
};

export const getFriendByChannelId = async (channelId, userId) => {
  const q = doc(db, "Channel", channelId);
  const docSnap = await getDoc(q);
  if (docSnap.exists()) {
    const friendId = docSnap.data().user.filter(id => id !== userId)[0];
    if (friendId === undefined) {
      return undefined;
    }
    const friend = await getUserById(friendId);
    return friend;
  }
  return undefined;
};
