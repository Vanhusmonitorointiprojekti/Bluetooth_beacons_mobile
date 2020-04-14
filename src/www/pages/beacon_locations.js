import React, { Component, useState, useEffect } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet, Dimensions, FlatList, Modal, Alert
} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import socketIOClient from "socket.io-client";







export default function Beacon_locations() {

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
                        
                        <Text style={[styles.textFlatlistStyle, {backgroundColor: "green"}]}>Beacon User: {item.beacon_user} </Text>
                         <Text style={[styles.textFlatlistStyle, {backgroundColor: "green"}]}>Beacon ID: {item.receiver_id}</Text>
                         <Text style={{fontSize: 25, backgroundColor: "green", padding: 10}}>{item.location_type}</Text>
                         <Text styles={{padding: 5}}> </Text>
                             </View>
                    }
                    else if (item.location_type == "red") {
                        return <View>
                        
                            <Text style={[styles.textFlatlistStyle, {backgroundColor: "red"}]}>Beacon User: {item.beacon_user} </Text>
                             <Text style={[styles.textFlatlistStyle, {backgroundColor: "red"}]}>Beacon ID: {item.receiver_id}</Text>
                             <Text style={{fontSize: 25, backgroundColor: "red", padding: 10}}>{showAlert(item.location_type)}{item.location_type}</Text>
                             <Text styles={{padding: 5}}> </Text>
                                 </View>
                    }

                    else  {
                        return <View>
                        
                            <Text style={[styles.textFlatlistStyle, {backgroundColor: "yellow"}]}>Beacon User: {item.beacon_user} </Text>
                             <Text style={[styles.textFlatlistStyle, {backgroundColor: "yellow"}]}>Beacon ID: {item.receiver_id}</Text>
                             <Text style={{fontSize: 25, backgroundColor: "yellow", padding: 10}}>{item.location_type}</Text>
                             <Text styles={{padding: 5}}> </Text>
                                 </View>
                    }
                    
                    }
                    
                    }
                    keyExtractor={item => item.beacon_user}
                />
                
                <AwesomeAlert
          show={showWarning}
          showProgress={false}
          title="Warning"
          message="Beacon detected inside yellow/red zone!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Understood!"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
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