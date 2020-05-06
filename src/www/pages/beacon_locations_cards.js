import React, { Component, useState, useEffect } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet, Dimensions, FlatList, Modal, Alert, Image
} from 'react-native';
import { Card, ListItem, Button, Icon, CardItem } from 'react-native-elements'

import AwesomeAlert from 'react-native-awesome-alerts';
import socketIOClient from "socket.io-client";








export default function Beacon_locations_cards() {

    const [tieto, setTieto] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [endpoint, setEndpoint] = useState("http://127.0.0.1:4001")
    const [showWarning, setShowWarning] = useState(false);


    showEmpty = () => {
        return (
            <View>
                <Text>Ei näy huppista keikkaa!</Text>
            </View>
        )

    }



    useEffect (() => {
        fetch('http://localhost:4000/beacon_locations')
            .then((response) => response.json())
            .then(responseJson => {
                setTieto(...tieto, responseJson)

                
                this.socket = socketIOClient("http://127.0.0.1:4001");
                this.socket.on("emitSocket", data =>  {
                setTieto(...tieto, data);
                });
            });
        
    }, []);


    showAlert = () => {
        setShowWarning(true);

    }

    hideAlert = () => {
        setShowWarning(false);

    }

        return (
            <View style={styles.container}>
          
          <FlatList
                    data={tieto}
                    
                    renderItem={({item}) => {


                    if (item.location_type == "green") {

                         return <View>
                        <Card>
                        <Image source={require('./jokutyyppixd.jpeg')} style = {{height: 350, width: '100%', resizeMode : 'stretch',}} />
                        <Text style={[styles.textFlatlistStyle, {backgroundColor: "green"}]}>Beacon User: {item.beacon_user} </Text>
                         <Text style={[styles.textFlatlistStyle, {backgroundColor: "green"}]}>Beacon ID: {item.receiver_id}</Text>
                         <Text style={{fontSize: 25, backgroundColor: "green", padding: 10}}>{item.location_type}</Text>
                         <Text styles={{padding: 5}}> </Text>
                         </Card>
                             </View>
                             
                    }
                    else if (item.location_type == "red") {
                        return <View>
                            <Card>
                            <Image source={require('./jokutyyppixd2.jpeg')} style = {{height: 350, width: '100%', resizeMode : 'stretch',}} />
                            <Text style={[styles.textFlatlistStyle, {backgroundColor: "red"}]}>Beacon User: {item.beacon_user} </Text>
                             <Text style={[styles.textFlatlistStyle, {backgroundColor: "red"}]}>Beacon ID: {item.receiver_id}</Text>
                             <Text style={{fontSize: 25, backgroundColor: "red", padding: 10}}>{showAlert()}{item.location_type}</Text>
                             <Text styles={{padding: 5}}> </Text>
                             </Card>
                                 </View>
                    }

                    else  {
                        return <View>
                            <Card>
                            <Image source={require('./jokutyyppixd3.jpeg')} style = {{height: 350, width: '100%', resizeMode : 'stretch',}} />
                            <Text style={[styles.textFlatlistStyle, {backgroundColor: "yellow"}]}>Beacon User: {item.beacon_user} </Text>
                             <Text style={[styles.textFlatlistStyle, {backgroundColor: "yellow"}]}>Beacon ID: {item.receiver_id}</Text>
                             <Text style={{fontSize: 25, backgroundColor: "yellow", padding: 10}}>{item.location_type}</Text>
                             <Text styles={{padding: 5}}> </Text>
                             </Card>
                                 </View>
                    }
                    
                    }
                    
                    }
                    keyExtractor={item => item.beacon_user}
                />
    
            </View>
         

        );





}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingTop: 50
       
    },

    textFlatlistStyle: {
        flex: 1,
        padding:10,
        fontSize: 25,
        backgroundColor: '#DFDFDF',
        paddingHorizontal: 10
    }
})