import { View, Text, Image, TextInput, Button } from 'react-native';
import React, { useContext, useState } from 'react';
import Context from '../../context/Context';
import { signIn, signUp } from '../../firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState('signUp');
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
			<Text
				style={{ color: colors.foreground, fontSize: 24, marginBottom: 20 }}
			>
				Appining
			</Text>
			<Image
				source={{ uri: 'https://cdn.logojoy.com/wp-content/uploads/2018/05/30163918/1241-768x591.png' }}
				style={{ width: 180, height: 180 }}
				resizeMode="cover"
			/>
			<View style={{ marginTop: 30 }}>
				<TextInput
					placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
					style={{
						borderBottomColor: colors.primary,
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
						borderBottomColor: colors.primary,
						borderBottomWidth: 2,
						width: 200,
						marginTop: 20,
					}}
				/>
			</View>
			<View style={{ marginTop: 20 }}>
				<Button title={mode === 'signUp' ? "Sign Up" : "Login"} 
                disabled={!password || !email} color={colors.secondary} onPress={handlePress}/>
			</View>
            <TouchableOpacity style={{marginTop: 15}} onPress={() => mode === 'signUp' ? setMode('signIn'): setMode('signUp')}>
                <Text style={{color: colors.secondaryText}}>{mode === 'signUp' ? 'Already have an account? Sign In' : "Don't have an account Sign Up"} </Text>
            </TouchableOpacity>
		</View>
	);
}
