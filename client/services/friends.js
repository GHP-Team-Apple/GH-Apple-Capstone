import { getUserById, getFollowing, getIsFollowing } from "./users";

export const getFriends = async (userId) => {
  // get users you are following:
  const followingArr = await getFollowing(userId);
  // check if you both are friends:
  const currentFriends = [];
  for (let i = 0; i < followingArr.length; i++) {
    // everyone you are following:
    let following = followingArr[i];
    // everyone following you:
    let isFollowing = await getIsFollowing(following.id, userId);
    // check if people you follow are following you back;
    // if true, the person is your current friend:
    if (isFollowing) {
      currentFriends.push(following);
    }
  }
  return currentFriends;
};

export const unfollow = async (myUserId, otherUserId) => {
  const followingRef = doc(db, `Users/${myUserId}/following/${otherUserId}`);
  await deleteDoc(followingRef);
};
