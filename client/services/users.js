import { db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  setDoc
} from "firebase/firestore";

export const getUsers = async () => {
    const usersCollection = collection(db, 'Users');
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return userList;
}

export const getUserById = async (userId) => {
    const userRef = doc(db, 'Users', userId);
    const userSnap = await getDoc(userRef);

    // return a user object with id if user exists
    return userSnap.exists() ? { ...userSnap.data(), id: userSnap.id } : null
}

export const getFollowing = async (userId) => {
    const followingCollection = collection(db, `Users/${userId}/following`);
    const followingSnapshot = await getDocs(followingCollection);

    return Promise.all(followingSnapshot.docs.map(async (doc) => {
        let following = { ...doc.data() };
        if (following.userRef) {
            let userData = await getDoc(following.userRef);
            if (userData.exists()) {
                return { ...userData.data(), id: userData.id }
            }
        }
    }));
}

export const getIsFollowing = async (userId, otherUserId) => {
    const followingRef = doc(db, `Users/${userId}/following/${otherUserId}`);
    const followingDoc = await getDoc(followingRef);
    // return boolean whether userId follows otherUserId
    return followingDoc.exists();
}

export const getUserFromNumbers = async (contactNumbers) => {
  if (contactNumbers.length > 10) {
    contactNumbers = contactNumbers.slice(0, 10);
  }
  const q = query(
    collection(db, "Users"),
    where("number", "in", contactNumbers)
  );
  const querySnapshot = await getDocs(q);
  const contactUsers = [];
  querySnapshot.forEach((doc) => {
    contactUsers.push(doc.data());
  });
  return contactUsers;
};

  export const getUsersByPhoneNumbers = async (numbers) => {
    const q = query(collection(db, "Users"), where("number", "in", numbers));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(item => item.data());
};

export const addFollower = async (myUserId, targetUserId) => {
  // await addDoc(collection(db, "Users", myUserId, "following"), {userRef: doc(db,"Users",id)})
  await setDoc(doc(db, "Users", myUserId, "following", targetUserId), {
    userRef: doc(db, "Users", targetUserId),
  });
};

export const getUsersNumbers = async () => {
  const q = query(collection(db, "Users"), where("number", "!=", null));
  const querySnapshot = await getDocs(q);
  const numArr = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data().number;
    numArr.push(data);
  });
  return numArr;
};

