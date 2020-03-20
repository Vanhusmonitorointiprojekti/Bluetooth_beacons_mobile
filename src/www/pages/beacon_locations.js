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

                const {endpoint} = this.useState;
                this.socket = socketIOClient("http://127.0.0.1:4001");
                this.socket.on("emitSocket", data =>  {
                    this.setState({tieto: [...this.state.tieto, data]

                    });
                });
            });
        
    }, []);


        return (
            <View style={styles.container}>
                
                <FlatList
                    data={tieto}
                    
                    renderItem={({item}) =>(<View>
                        <Text style={styles.textFlatlistStyle}>Beacon User: {item.beacon_user} </Text>
                        <Text style={styles.textFlatlistStyle}>Beacon ID: {item.receiver_id}</Text>
                        <Text style={styles.textFlatlistStyle}>{item.signal_db}</Text>
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
        backgroundColor: 'orange',
        paddingHorizontal: 10
    }
})