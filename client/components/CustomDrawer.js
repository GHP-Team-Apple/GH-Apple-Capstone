import {
	View,
	Text,
	TouchableOpacity,
	ImageBackground,
	Image,
	Pressable,
} from 'react-native';
import React, { useState } from 'react';
import {
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { userSignOut, auth } from '../../firebase';

export default function CustomDrawer(props) {
  const [isSignOut, setSignOut] = useState()
	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView
				{...props}
				contentContainerStyle={{ backgroundColor: '#cca000' }}
			>
				<ImageBackground
					source={{ uri: 'https://wallpaperaccess.com/full/549719.jpg' }}
					style={{ padding: 20 }}
				>
					<Image
						source={require('../../assets/dog.png')}
						style={{
							height: 80,
							width: 80,
							borderRadius: 40,
							marginBottom: 10,
						}}
					/>
					<Text style={{ fontSize: 18 }}>{auth.currentUser.displayName}</Text>
				</ImageBackground>
				<View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
					<DrawerItemList {...props} />
				</View>
			</DrawerContentScrollView>
			<View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
				<TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Ionicons name="share-social-outline" size={22} />
						<Text
							style={{
								fontSize: 15,
								marginLeft: 5,
							}}
						>
							Tell a Friend
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Ionicons name="exit-outline" size={22} />
						{/* <Pressable onPress={() => userSignOut()}> */}
							<Text
								style={{
									fontSize: 15,
									marginLeft: 5,
								}}
							>
								Sign Out
							</Text>
						{/* </Pressable> */}
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}
