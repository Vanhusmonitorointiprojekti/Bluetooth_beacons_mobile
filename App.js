import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Beacon_info from "./src/www/pages/beacon_info";
import Beacon_locations from "./src/www/pages/beacon_locations";



const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Beacon locations" component={Beacon_locations} />
          <Tab.Screen name="Beacon Info" component={Beacon_info} />
          
        </Tab.Navigator>
      </NavigationContainer>
  );
}