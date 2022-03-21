import firestore from "@react-native-firebase/firestore";

firebase.firestore()
  .collection("Users")
  .add({
    firstName: "Ada",
    lastName: "Lovelace",
    email: "alovelace@gh.com",
    password: "123",
    city: "NYC"
  })
  .then(() => {
    console.log("User added!");
  });