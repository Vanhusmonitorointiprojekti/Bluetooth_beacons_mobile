
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Asukas_info from "./src/www/pages/asukas_tiedot";
import Locations_info from "./src/www/pages/beacon_locations";
import Beacon_test from "./src/www/pages/beacontest";
import Beacon_halyt from "./src/www/pages/beacon_halyt";
import Asukastietoja from './src/www/pages/asukastietoja'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ilmoitus from './src/www/pages/push';
//import { Image } from 'native-base';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Text, View, Button, Platform,Linking, } from 'react-native';
import axios from 'axios';

const Tab = createBottomTabNavigator();
const PUSH_ENDPOINT = 'http://192.168.1.197:3000/api/push_notification/push_token';
const PUSH_ENDPOINT2 = "http://192.168.1.197:3000/api/push_notification/message"

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const url = response.notification.request.content.data.url;
       // const url ='https://www.hel.fi/helsinki/fi'

  useEffect(() => {
    

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      Linking.openUrl(url);
    });

    
  
 
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
      subscription.remove();
    };
  }, []);
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token
    
      }),
    });
  
    return token;
  }
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
                    else if (route.name === 'Ilmoitus') {
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
          <Tab.Screen name="Ilmoitus" component={Ilmoitus} />
        </Tab.Navigator>
      </NavigationContainer>
      
  );
}