import { View, Text, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import Constants from 'expo-constants';
import Context from '../../context/Context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import { auth, db } from '../../firebase';
import { updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
	const [displayName, setDisplayName] = useState('');
	const [selectedImage, setSelectedImage] = useState(null);
    const navigation = useNavigation()
	const {
		theme: { colors },
	} = useContext(Context);

     async function handlePress(){
        const user = auth.currentUser
        const userData = {
            displayName,
            email: user.email
        }
        // if(photoURL){
        //     userData.photoURL = photoURL
        // }
        await Promise.all([
            updateProfile(user, userData),
            setDoc(doc(db, "users", user.uid), {... userData, uid: user.uid})
        ])
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
				<Text style={{ fontSize: 14, color: colors.text, marginTop: 20 }}>
					Please provide displayName
				</Text>
				<TouchableOpacity
					style={{
						marginTop: 30,
						borderRadius: 120,
						width: 120,
						height: 120,
						backgroundColor: colors.background,
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
					placeholder="Type your name"
					value={displayName}
					onChangeText={setDisplayName}
					style={{
						borderBottomColor: colors.primary,
						marginTop: 40,
						borderBottomWidth: 2,
						width: '100%',
					}}
				/>
				<View style={{ marginTop: 'auto', width: 80 }}>
					<Button
						title="Next"
						color={colors.secondary}
						onPress={handlePress}
						disabled={!displayName}
					/>
				</View>
			</View>
		</React.Fragment>
	);
}
