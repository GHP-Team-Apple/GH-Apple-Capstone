import React from 'react';
import ContextWrapper from './context/ContextWrapper';
import Main from './Main';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';

function App() {
	LogBox.ignoreLogs([
		`AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage`,
	]);
	LogBox.ignoreLogs([
		`Clipboard has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/clipboard' instead of 'react-native'. See https://github.com/react-native-clipboard/clipboard`,
	]);
	return (
		<ContextWrapper>
			<Main />
			<Toast />
		</ContextWrapper>
	);
}

export default App;
