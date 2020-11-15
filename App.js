import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Asukas_info from "./src/www/pages/asukas_tiedot";
import Locations_info from "./src/www/pages/beacon_locations";
import Beacon_test from "./src/www/pages/beacontest";
import Beacon_halyt from "./src/www/pages/beacon_halyt";
import Asukastietoja from './src/www/pages/asukastietoja'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import { Image } from 'native-base';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    
      <NavigationContainer>
        <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({  color, size }) => {
                    let iconName;
        
                    if (route.name === 'Sijaintitiedot') {
                      iconName =  'location-on'
                        ;
                    } else if (route.name === 'Asukas tiedot') {
                      iconName =  'account-circle';
                    }
                    else if (route.name === 'Asukassijainnit') {
                      iconName =  'person-pin-circle';
                    }
                    else if (route.name === 'Hälytykset') {
                      iconName =  'warning';
                    }
                    else if (route.name === 'Asukastietoja') {
                      iconName =  'account-circle';
                    }
                    return <MaterialIcons name={iconName} size={size} color={color} />;
                  },
                })}
                tabBarOptions={{
                  activeTintColor: 'rgb(124, 77, 255)',
                  inactiveTintColor: 'rgb(0, 150, 136)',
                }}
              >
          <Tab.Screen name="Sijaintitiedot" component={Locations_info} />
          <Tab.Screen name="Asukas tiedot" component={Asukas_info} />
          <Tab.Screen name="Asukassijainnit" component={Beacon_test} />
          <Tab.Screen name="Hälytykset" component={Beacon_halyt} />
          <Tab.Screen name="Asukastietoja" component={Asukastietoja} />
        </Tab.Navigator>
      </NavigationContainer>
      
  );
}