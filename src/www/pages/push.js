// https://docs.expo.io/versions/latest/sdk/notifications/, lisätty sendNotification-funktio
// joka käynnistyy painettaessa nappia schedulePushNotification-funktion sijaan!

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Text, View, Button, Platform,Linking, } from 'react-native';
import axios from 'axios';



const PUSH_ENDPOINT = 'http://192.168.1.197:3000/api/push_notification/push_token';
const PUSH_ENDPOINT2 = "http://192.168.1.197:3000/api/push_notification/message"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
 
  return (
    
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
     
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
         // await schedulePushNotification();
          await sendNotification();
        }}
      />
      <Button
          title="Avaa url sivu"
          onPress={_handleOpenWithLinking}
       
        />
      <OpenURLButton url={Halytyssivut}>Avaa app</OpenURLButton>
    </View>
    
  );
}


const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

const Halytyssivut = "spotify://open" //exp://192.168.1.197:19000

async function _handleOpenWithLinking() {
   Linking.openURL('https://www.hel.fi/helsinki/fi');
};


async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

{/*
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
*/}
const sendNotification = async () => {
  const title = "joku karkaamassa"
  const body = "Hälytys, joku karkaamassa!"
  const badge = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fpreviews.123rf.com%2Fimages%2Ffaysalfarhan%2Ffaysalfarhan1711%2Ffaysalfarhan171111804%2F89277371-alarm-bell-icon-isolated-on-red-square-button-reflected-abstract-illustration.jpg&imgrefurl=https%3A%2F%2Fwww.123rf.com%2Fphoto_89277371_stock-illustration-alarm-bell-icon-isolated-on-red-square-button-reflected-abstract-illustration.html&tbnid=yPGanPxBJjSJGM&vet=12ahUKEwiflZSp_I7tAhVBgosKHUBmCDAQMygQegUIARDSAQ..i&docid=c_YpPGrTWsRr3M&w=1089&h=1300&q=alarm&ved=2ahUKEwiflZSp_I7tAhVBgosKHUBmCDAQMygQegUIARDSAQ"
   
  const req = await axios.post(PUSH_ENDPOINT2, {
    title,
    body
  })
}
