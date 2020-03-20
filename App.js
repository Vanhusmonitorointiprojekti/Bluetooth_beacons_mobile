import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Beacon_info from "./src/www/pages/beacon_info";



function SettingsScreen() {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Beacon Info" component={Beacon_info} />
          <Tab.Screen name="Beacon Locations" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}