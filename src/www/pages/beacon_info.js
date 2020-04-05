import React, { Component, useState, useEffect } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet, Dimensions, FlatList
} from 'react-native';




export default function Beacon_info() {

    const [tieto, setTieto] = useState([]);



    delete_beacon = (beacon_id) => {
        fetch('http://localhost:4000/delete/' + beacon_id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState(prevState => ({
                    tieto: prevState.tieto.filter(beacon =>
                        beacon.beacon_id !== beacon_id)
                }));
            })
    };

    showEmpty = () => {
        return (
            <View>
                <Text>Ei näy huppista keikkaa!</Text>
            </View>
        )

    }

    useEffect (() => {
        fetch('http://localhost:4000/beacon_info')
            .then((response) => response.json())
            .then(responseJson => {
                setTieto(...tieto, responseJson)
                console.log(tieto)
            })
    }, []);


        return (
           
            <View style={styles.container}>
                
                <FlatList
                    data={tieto}
                    
                    renderItem={({item}) =>(<View>
                        <Text style={styles.textFlatlistStyle}>Beacon User: {item.beacon_user} </Text>
                        <Text style={styles.textFlatlistStyle}>Beacon ID: {item.beacon_id}</Text>
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