import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Beacon_info from "./src/www/pages/beacon_info";
import beacon_locations from "./src/www/pages/beacon_locations";
import beacon_locations_cards from "./src/www/pages/beacon_locations_cards";
import avatars from "./src/www/pages/avatars";


const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Beacon Info" component={Beacon_info} />
          <Tab.Screen name="Beacon Locations" component={beacon_locations} />
          <Tab.Screen name="Cards" component={beacon_locations_cards} />
          <Tab.Screen name="Avatars" component={avatars} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}