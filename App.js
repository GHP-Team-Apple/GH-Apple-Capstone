import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Need to fix after merge:
import FriendsMap from './move-to-client/move-to-components/FriendsMap';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hi Team Apple! This is the start of our App!</Text>
      <FriendsMap/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
