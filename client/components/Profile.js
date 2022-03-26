import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import Constants from 'expo-constants';
import Context from '../../context/Context';
import * as Location from 'expo-location';
import { auth, db } from '../../firebase';
import { updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';


export default function Profile() {
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	// const [selectedImage, setSelectedImage] = useState(null);
    const navigation = useNavigation()
	const {
		theme: { colors },
	} = useContext(Context);

     async function handlePress(){
        const user = auth.currentUser
        const userData = {
            username,
			firstName,
			lastName,
            email: user.email
        }
        // if(photoURL){
        //     userData.photoURL = photoURL
        // }
		console.log('hello')
        const thePromise = await Promise.all([
            updateProfile(user, userData),
            setDoc(doc(db, "Users", user.uid), {... userData, uid: user.uid})
        ])
		console.log(thePromise)
        navigation.navigate("home")

    }
    const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }
	return (
		<React.Fragment>
			<StatusBar style="auto" />
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
					paddingTop: Constants.statusBarHeight + 20,
					padding: 20,
				}}
			>
				<Text style={{ fontSize: 22, color: colors.foreground }}>
					Profile Info
				</Text>
				<Text style={{ fontSize: 14, color: 'black', marginTop: 20 }}>
					Please provide displayName
				</Text>
				<TouchableOpacity
					style={{
						marginTop: 30,
						borderRadius: 120,
						width: 120,
						height: 120,
						backgroundColor: 'green',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{/* {!selectedImage ? (
            <MaterialCommunityIcons
              name="camera-plus"
              color={colors.iconGray}
              size={45}
            />
          ) : (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: "100%", height: "100%", borderRadius: 120 }}
            />
          )} */}
				</TouchableOpacity>
				<TextInput
					placeholder="Enter First Name"
					value={firstName}
					onChangeText={setFirstName}
					style={{
						borderBottomColor: 'gold',
						marginTop: 40,
						borderBottomWidth: 2,
						width: '100%',
					}}
				/>
				<TextInput
					placeholder="Enter Last Name"
					value={lastName}
					onChangeText={setLastName}
					style={{
						borderBottomColor: 'green',
						marginTop: 40,
						borderBottomWidth: 2,
						width: '100%',
					}}
				/>
					<TextInput
						placeholder="Enter Username"
						value={username}
						onChangeText={setUsername}
						style={{
							borderBottomColor: 'gold',
							marginTop: 40,
							borderBottomWidth: 2,
							width: '100%',
						}}
					/>
				<View style={{ marginTop: 'auto', width: 80 }}>
					<Button
						title="Next"
						color='green'
						onPress={handlePress}
						// disabled={!displayName}
					/>
				</View>
			</View>
		</React.Fragment>
	);
}
