import {
	View,
	Text,
	Image,
	TextInput,
	Button,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';
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
				style={{ width: '100%', height: '100%', position: 'absolute' }}
			>
				<View style={{ marginTop: 50, flexDirection: 'row', justifyContent: 'center',  }}>
					<Text
						style={{
							color: 'white',
							fontSize: 40,
							marginBottom: 20,
							backgroundColor: 'black',
							opacity: 0.65,
							padding: 15,
							paddingTop: 5, 
							paddingBottom: 5,
						}}>
						Ripple
					</Text>
				</View>
			</ImageBackground>

			<View
				style={{
					marginTop: 30,
					backgroundColor: 'white',
					opacity: 0.65,
					borderColor: colors.white,
					borderWidth: 2,
					borderRadius: 3,
				}}>
				<TextInput
					placeholder="Email"
					placeholderTextColor={'grey'}
					value={email}
					onChangeText={setEmail}
					style={{

						width: 200,
						height: 27,
					}}
				/>
			</View>
			<View style={{ marginTop: 10 }}>
				<TextInput
					placeholder="Password"
					placeholderTextColor={'grey'}
					value={password}
					onChangeText={setPassword}
					secureTextEntry={true}
					style={{
						borderColor: colors.white,
						borderWidth: 2,
						borderRadius: 3,
						width: 200,
						height: 30,
						marginTop: 15,
						marginBottom: 10,
						backgroundColor: 'white', opacity: 0.65
					}}
				/>
			</View>
			<View>
				<View
					style={{
						flexDirection: 'row',
						marginBottom: 20,
						justifyContent: 'center',
					}}
				>
					<Checkbox
						disabled={false}
						value={isSelected}
						onValueChange={setSelection}
						color={isSelected ? '#4630EB' : undefined}
						style={{
							alignSelf: 'center',
							marginTop: 6,
						}}
					/>
					<Text
						style={{
							marginTop: 9,
							marginLeft: 5,
							color: colors.white,
						}}
					>
						18 & Over?
					</Text>
				</View>
				<Text style={{ color: colors.white }}>
					Is CheckBox selected: {isSelected ? '👍' : '👎'}
				</Text>
			</View>
			<View
				style={{
					marginTop: 20,
					alignItems: 'center',
					backgroundColor: '#000',
					borderRadius: 5,
					width: 100,
					padding: 5,
				}}
			>
				<Button
					title={mode === 'signUp' ? 'Sign Up' : 'Login'}
					disabled={!password || !email}
					color={colors.white}
					onPress={handlePress}
				/>
			</View>

			<TouchableOpacity
				style={{
					marginTop: 15,
					alignItems: 'center',
					color: colors.white,
					backgroundColor: '',
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
