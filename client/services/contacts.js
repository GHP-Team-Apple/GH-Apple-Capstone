import * as Contacts from "expo-contacts";
import {
  getUserFromNumbers,
  getUserById,
  getFollowing,
} from "../services/users";

export const fetchSuggestedUsers = async (userId) => {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status != "granted") {
    return "Permission Denied";
  }
  const { data } = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.PhoneNumbers],
  });
  if (data.length === 0) {
    return [];
  }
  const contactNumbers = formatPhoneNumber(
    data
      .map((contact) => contact.phoneNumbers) // get Number from contact
      .flat() // some user has multiple numbers so we need to flat them into one array
      .filter((number) => number) // some number may be null
      .map((number) => number.number)
  );
  if (contactNumbers.length === 0) {
    return [];
  }
  // check already followed
  const followingUsers = await getFollowing(userId);
  const followingUserNumbers = formatPhoneNumber(
    followingUsers.map((user) => user.number)
  );
  const unfollowingContactNumber = contactNumbers.filter(
    (number) => !followingUserNumbers.includes(number)
  );
  // To get users who are my contact
  const contactUsers = await getUserFromNumbers(unfollowingContactNumber);
  return contactUsers;
};

function formatPhoneNumber(numbers) {
  return numbers.filter(number => number!== undefined).map((number) => number.replace(/\D/g, ""));
}

export const fetchNoFriendshipFollowers = async (userId) => {
  const followersId = (await getFollowing(userId)).map((user) => user.uid);
  //check already followed
  const unfollowedUser = [];
  for (let i = 0; i < followersId.length; i++) {
    const id = followersId[i];
    const secondDegreeFollowers = (await getFollowing(id)).map(
      (user) => user.uid
    );
    if (!secondDegreeFollowers.includes(userId)) {
      const user = await getUserById(id);
      unfollowedUser.push(user);
    }
  }
  return unfollowedUser;
};
