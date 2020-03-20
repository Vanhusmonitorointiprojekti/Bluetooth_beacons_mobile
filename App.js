import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Beacon_info from "./src/www/pages/beacon_info";
import beacon_locations from "./src/www/pages/beacon_locations";


const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Beacon Info" component={Beacon_info} />
          <Tab.Screen name="Beacon Locations" component={beacon_locations} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}