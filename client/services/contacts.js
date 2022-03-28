import * as Contacts from "expo-contacts";
import {
  getUsersNumbers,
  getUsersByPhoneNumbers,
  getIsFollowing,
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
  const numArr = await getUsersNumbers();
  if (data.length > 0) {
    const phoneNumbers = data
      .filter(
        (item) =>
          item.phoneNumbers !== undefined && item.phoneNumbers.length > 0
      )
      .map((item) => item.phoneNumbers[0].number)
      .filter((number) => number.length > 0 && numArr.includes(number));
    // Target phone numbers => Target users from Firebase

    if (phoneNumbers.length > 0) {
      const userArr = await getUsersByPhoneNumbers(phoneNumbers);
      //check already followed
      const following = await getFollowing(userId);
      const followingNumber = following.filter(user=>user!==undefined&&user.number!==null).map((user) => user.number);
      const PhoneNumbersNFollowing = phoneNumbers.filter((number) =>
        !followingNumber.includes(number)
      );
      //check if matches my phone number
      const myUserInfo = await getUserById(userId)
      const myPhoneNumber = myUserInfo.number
      const updatedPhoneNumbersArr = PhoneNumbersNFollowing.filter((number) =>
      number!==myPhoneNumber
    )
      //get users
      if (updatedPhoneNumbersArr.length <= 0) {
        return [];
      } else {
        const updatedUserArr = await getUsersByPhoneNumbers(updatedPhoneNumbersArr);
        return updatedUserArr
      }
    }
  }
  ;
};