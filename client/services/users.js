import { db } from '../../firebase';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';

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

    // return an array of following userIds
    return followingSnapshot.docs.map(doc => doc.id);
}

export const getIsFollowing = async (userId, otherUserId) => {
    const followingRef = doc(db, `Users/${userId}/following/${otherUserId}`);
    const followingSnap = await getDoc(followingRef);

    // return boolean whether userId follows otherUserId
    return followingSnap.exists();
}

