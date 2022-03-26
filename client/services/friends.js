import { getUserById, getFollowing, getIsFollowing } from "./users";

export const getFriends = async (userId) => {
  // get users you are following:
  const followingArr = await getFollowing(userId);
  // check if you both are friends:
  const currentFriends = [];
  for (let i = 0; i < followingArr.length; i++) {
    let following = followingArr[i];
    let isFollowing = await getIsFollowing(following.id, userId);
    if (isFollowing) {
      currentFriends.push(following);
    }
  }
  return currentFriends;
};
