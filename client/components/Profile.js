import {
	View,
	Text,
	TextInput,
	Button,
	TouchableOpacity,
	ScrollView,
	Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import Constants from 'expo-constants';
import Context from '../../context/Context';
import * as Location from 'expo-location';
import { auth, db } from '../../firebase';
import { updateProfile } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Interest from './Interest';

export default function Profile({ navigation }) {
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [currUserData, setCurrUserData] = useState(null);
	const [number, setNumber] = useState();

	const image = require('../../assets/dog.png');

	navigation = useNavigation();
	const {
		theme: { colors },
	} = useContext(Context);

	async function handlePress() {
		const user = auth.currentUser;
		const userData = {
			username,
			firstName,
			lastName,
			number,
			email: user.email,
		};
		const thePromise = await Promise.all([
			updateProfile(user, userData),
			setDoc(doc(db, 'Users', user.uid), { ...userData, uid: user.uid }),
		]);
		setCurrUserData({ ...userData, uid: user.uid });

		navigation.navigate('Home');
	}

	const getUserInfo = async () => {
		const userInfo = await getDoc(doc(db, 'User', auth.currentUser.uid));
	};
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	if (
		!auth.currentUser.username &&
		!auth.currentUser.firstName &&
		!auth.currentUser.lastName
	) {
		return (
			<React.Fragment>
				<StatusBar style="auto" />

				<View
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						flex: 1,
						marginTop: 10,
					}}
				>
					<Text style={{ fontSize: 22, color: colors.foreground }}>
						Profile
					</Text>
					<TouchableOpacity
						style={{
							marginTop: 15,
							marginBottom: 20,
							borderRadius: 120,
							width: 120,
							height: 120,
							backgroundColor: '#184e77',
							alignItems: 'center',
							justifyContent: 'center',
							
						}}
					>
						<Image source={image} style={{ width: 90, height: 90 }} />
					</TouchableOpacity>
					<TextInput
						placeholder="Enter First Name"
						value={firstName}
						onChangeText={setFirstName}
						style={{
							borderBottomColor: '#b29ef8',
							marginTop: 10,
							borderBottomWidth: 3,
							width: '90%',
							fontSize: 16,
							backgroundColor: '#c4b4f445',
							paddingTop: 15,
							borderRadius: 5,
							paddingLeft: 5,
						}}
					/>
					<TextInput
						placeholder="Enter Last Name"
						value={lastName}
						onChangeText={setLastName}
						style={{
							borderBottomColor: '#b29ef8',
							marginTop: 10,
							borderBottomWidth: 3,
							width: '90%',
							fontSize: 16,
							backgroundColor: '#c4b4f445',
							paddingTop: 15,
							borderRadius: 5,
							paddingLeft: 5,
						}}
					/>
					<TextInput
						placeholder="Enter Username"
						value={username}
						onChangeText={setUsername}
						style={{
							borderBottomColor: '#b29ef8',
							marginTop: 10,
							borderBottomWidth: 3,
							width: '90%',
							fontSize: 16,
							backgroundColor: '#c4b4f445',
							paddingTop: 15,
							borderRadius: 5,
							paddingLeft: 5,
						}}
					/>
					<TextInput
						placeholder="Phone Number"
						value={number}
						onChangeText={setNumber}
						style={{
							borderBottomColor: '#b29ef8',
							marginTop: 10,
							borderBottomWidth: 3,
							width: '90%',
							fontSize: 16,
							backgroundColor: '#c4b4f445',
							paddingTop: 15,
							borderRadius: 5,
							paddingLeft: 5,
						}}
					/>

					<ScrollView>
						<Interest />
					</ScrollView>

					<View style={{ marginTop: 'auto', width: 80 }}>
						<Button title="Next" color="#184e77" onPress={handlePress} />
					</View>
				</View>
			</React.Fragment>
		);
	} else {
		getUserInfo();
		return (
			<React.Fragment>
				<StatusBar style="auto" />
				<View
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						flex: 1,
					}}
				>
					<Text style={{ fontSize: 22, color: colors.foreground }}>
						{auth.currentUser.providerData[0].displayName}
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
					></TouchableOpacity>
					<Text
						style={{
							marginTop: 40,
							width: '100%',
							fontSize: 14,
						}}
					>
						{auth.currentUser.providerData[0].firstName}
					</Text>
					<Text
						style={{
							marginTop: 40,
							width: '100%',
							fontSize: 14,
						}}
					>
						{auth.currentUser.providerData[0].lastName}
					</Text>
					<Text
						style={{
							marginTop: 40,
							fontSize: 14,
							width: '100%',
						}}
					>
						{auth.currentUser.providerData[0].displayName}
					</Text>
					<Text
						style={{
							marginTop: 40,
							fontSize: 14,
							width: '100%',
						}}
					>
						{auth.currentUser.providerData[0].phoneNumber}
					</Text>
					<View>
						<Interest user={currUserData} />
					</View>
				</View>
			</React.Fragment>
		);
	}
}
