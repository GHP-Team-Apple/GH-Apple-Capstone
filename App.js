import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import EventMap from './client/components/EventMap';

export default function App() {
  return (
      <View style={styles.container}>
        <Text>Hi Team Apple! This is the start of our App!!</Text>
        <EventMap />
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30
  },
});
