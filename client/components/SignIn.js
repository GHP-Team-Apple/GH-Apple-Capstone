import { View, Text, Image, TextInput, Button, TouchableOpacity, ImageBackground } from 'react-native';
import Checkbox from 'expo-checkbox';
import React, { useContext, useState } from 'react';
import Context from '../../context/Context';
import { signIn, signUp } from '../../firebase';


export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState('signUp');
	const [isSelected, setSelection] = useState(false);
	const {
		theme: { colors },
	} = useContext(Context);

	async function handlePress() {
		if (mode === 'signUp') {
			await signUp(email, password);
		}
		if (mode === 'signIn') {
			await signIn(email, password);
		}
	}
	return (

		<View
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				flex: 1,
				backgroundColor: colors.background,
			}}
			
		>
			

			<ImageBackground 
				source={require('../../assets/loop.gif')} 
				style={{width: '100%', height: '100%', position: "absolute"}}>
					<Text
						style={{ color: colors.white, fontSize: 24, marginBottom: 20 }}
					>
						Ripple
					</Text>
			</ImageBackground>

			<View style={{ marginTop: 30 }}>
				<TextInput
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
					style={{
						borderBottomColor: colors.white,
						borderBottomWidth: 2,
						width: 200,
					}}
				/>
			</View>
			<View style={{ marginTop: 15 }}>
				<TextInput
					placeholder="Password"
					value={password}
					onChangeText={setPassword}
					secureTextEntry={true}
					style={{
						borderBottomColor: colors.white,
						borderBottomWidth: 2,
						width: 200,
						marginTop: 20,
					}}
				/>
			</View>
			<View>
				<View
					style={{
						flexDirection: 'row',
						marginBottom: 20,
					}}
				>
					<Checkbox
						disabled={false}
						value={isSelected}
						onValueChange={setSelection}
						style={{
							alignSelf: 'center',
						}}
					/>
					<Text
						style={{
							margin: 8,
							color: colors.white
						}}
					>
						18 & Over?
					</Text>
				</View>
				<Text style={{color: colors.white}}>Is CheckBox selected: {isSelected ? '👍' : '👎'}</Text>
			</View>
			<View style={{ marginTop: 20, alignItems: "center",
				backgroundColor: "#000",
				borderRadius: 5,
				width: 120,
				padding: 10  }}>
				<Button
					title={mode === 'signUp' ? 'Sign Up' : 'Login'}
					disabled={!password || !email}
					color={colors.white}
					onPress={handlePress}
					
				/>
			</View>
			
			<TouchableOpacity
				style={{ marginTop: 15, alignItems: "center",
				backgroundColor: "#000",
				borderRadius: 5,
				padding: 10,
				 }}
				onPress={() =>
					mode === 'signUp' ? setMode('signIn') : setMode('signUp')
				}
			>
				<Text style={{ color: colors.white, fontWeight: 'bold' }}>
					{mode === 'signUp'
						? 'Already have an account? Sign In'
						: "Don't have an account Sign Up"}{' '}
				</Text>
			</TouchableOpacity>
			</View>
	
	);
}

