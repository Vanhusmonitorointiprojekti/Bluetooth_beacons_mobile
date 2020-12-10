import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import All_Asukassijainti from "./src/www/pages/locations_info";
import Asukastietoja from './src/www/pages/asukastietoja';
import Häly from './src/www/pages/hälytys'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef } from 'react';
import {  Platform } from 'react-native';


const Tab = createBottomTabNavigator();
// Put your Ipv4 address here for example http://000.000.0.0:4000/api/push_notification/push_token
const PUSH_ENDPOINT = 'http://000.000.0.0:4000/api/push_notification/push_token';

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
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
    console.log('post token', token)
    return token;
  }
  return (
    
      <NavigationContainer>
        <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({  color, size }) => {
                    let iconName;
        
                    if (route.name === 'Asukassijainnit') {
                      iconName =  'person-pin-circle'
                        ;
                    } else if (route.name === 'Asukastiedot') {
                      iconName =  'account-circle';
                    }
                    else if (route.name === 'Hälytykset') {
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
          <Tab.Screen name="Asukastiedot" component={Asukastietoja} />
          <Tab.Screen name="Asukassijainnit" component={All_Asukassijainti} />
          <Tab.Screen name="Hälytykset" component={Häly} />
        </Tab.Navigator>
      </NavigationContainer>
      
  );
}