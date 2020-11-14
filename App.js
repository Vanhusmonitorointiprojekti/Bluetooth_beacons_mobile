import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Asukas_info from "./src/www/pages/asukas_tiedot";
import Locations_info from "./src/www/pages/beacon_locations";
import Beacon_test from "./src/www/pages/beacontest";
import Beacon_halyt from "./src/www/pages/beacon_halyt";
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
                    else if (route.name === 'Sijainnit') {
                      iconName =  'person-pin-circle';
                    }
                    else if (route.name === 'Hälyt') {
                      iconName =  'warning';
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
          <Tab.Screen name="SijainnitKESKEN" component={Beacon_test} />
          <Tab.Screen name="HälytKESJEN" component={Beacon_halyt} />
        </Tab.Navigator>
      </NavigationContainer>
      
  );
}