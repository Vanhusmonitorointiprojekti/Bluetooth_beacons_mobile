import React, { Component, useState, useEffect } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet, Dimensions, FlatList
} from 'react-native';
import socketIOClient from "socket.io-client";






export default function Beacon_locations() {

    const [tieto, setTieto] = useState([]);
    const [endpoint, setEndpoint] = useState("http://127.0.0.1:4001")


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


    getStatusColor = () =>{

        juttuja = tieto.filter(function(tavara) {
            if (tavara.location_type === "green") {
                
                return {backgroundColor: "green"};
            }

            if (tavara.location_type === "red") {
                return "red";
            }

            if (tavara.location_type === "yellow") {
                return "yellow";
            }

        });
  
        

    }


        return (
            <View style={styles.container}>
                
                <FlatList
                    data={tieto}
                    
                    renderItem={({item}) => (<View>
                        
                       <Text style={styles.textFlatlistStyle}>Beacon User: {item.beacon_user} </Text>
                        <Text style={styles.textFlatlistStyle}>Beacon ID: {item.receiver_id}</Text>
                        <Text style={{backgroundColor: getStatusColor(), fontSize: 25, paddingHorizontal: 10}}>{item.location_type}</Text>
                        <Text styles={{padding: 5}}> </Text>
                            </View>)
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