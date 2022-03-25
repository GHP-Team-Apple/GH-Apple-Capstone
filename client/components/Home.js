import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import Context from '../../context/Context';



export default function Home({navigation}) {
	const {
		theme: { colors },
	} = useContext(Context);
	return (
		<View><Text>hey</Text></View>
		// <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
		// 	<ScrollView style={{padding: 20}}>
		// 	<View
        //   style={{
        //     flexDirection: 'row',
        //     justifyContent: 'space-between',
        //     marginBottom: 20,
        //   }}>
        //   <Text style={{fontSize: 18}}>
        //     Hello Username
        //   </Text>
        //   <TouchableOpacity onPress={() => navigation.openDrawer()}>
        //     <ImageBackground
        //       source={require('../../assets/dog.png')}
        //       style={{width: 35, height: 35}}
        //       imageStyle={{borderRadius: 25}}
        //     />
        //   </TouchableOpacity>
        // </View>
		// 	</ScrollView>
		// </SafeAreaView>
	);
}
