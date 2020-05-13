import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet, FlatList, ScrollView
} from 'react-native';


export default function Beacon_info() {

    const [tieto, setTieto] = useState([]);


    useEffect (() => {
        // Put your Ipv4 address here for example http://000.000.0.0:4000/beacon_info
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
        paddingHorizontal: 10,
        color: 'black'

    }
})
