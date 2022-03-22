import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import EventMap from "./EventMap";
import Chat from "./Chat";

//Screen names
const eventMap = "EventMap";
const chat = "Chat";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={EventMap}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === eventMap) {
              iconName = focused ? 'map' : 'map-outline';

            } else if (rn === chat) {
              iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';

            }

            // return any component that you like here
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={eventMap} component={EventMap} />
        <Tab.Screen name={chat} component={Chat} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
