import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet, FlatList,CheckBox
} from 'react-native';
import { Card } from 'react-native-elements'
import socketIOClient from "socket.io-client";
import { Avatar } from 'react-native-elements';
import { Container, Header, Content,  CardItem, Thumbnail,  Button, Icon, Left, Body, Right,Title } from 'native-base';


export default function beacon_halyt() {

    const [tieto, setTieto] = useState([]);
    const [endpoint, setEndpoint] = useState("http://127.0.0.1:4001")
    const [isSelected, setSelection] = useState(false);  
    
    useEffect (() => {
        //Fetching backend service url to get data from database. Put your Ipv4 address here for example http://000.000.0.0:4000/beacon_locations_average
        fetch('http://localhost:4000/beacon_locations_average')
            .then((response) => response.json())
            .then(responseJson => {
                setTieto(...tieto, responseJson)

                // Put your Ipv4 address here for example http://000.000.0.0:4001
                this.socket = socketIOClient("http://127.0.0.1:4001:4001");
                this.socket.on("emitSocket", data =>  {
                setTieto(...tieto, data);
                
                });
            });
        
    }, []);


        return (
            <View style={styles.container}>
              
            <FlatList style={{}}
                data={tieto}    
                renderItem={({item}) => {

                    if (item.location_type == "red" && item.beacon_user == "Ranneke1") {
                        return  <View>
                            <Card>    
                            <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          
        />
                        <CardItem style={{height: 78,borderBottomWidth:1,borderColor: '#dadddf'}}>
                            <Left>
                            <Thumbnail source={require('./img/beaconuser1.jpg')} style={[styles.thumbnail]} />
                            <Body>
                            <Text style={styles.uploaderName}> {item.beacon_user}</Text>
                          </Body>
                             </Left>
                    <Right>
                        <Text style={[styles.textFlatlistStyle, {backgroundColor: "red"}]}> {item.receiver_location}</Text>
                        
          
       
                    </Right>
                    </CardItem>
                    </Card>
                  </View>
                    }

                    else if (item.location_type == "red" && item.beacon_user == "Ranneke2") {
                        return <View>
                        <Card>

                        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          
        />  
                     <CardItem style={{height: 78,borderBottomWidth:1,borderColor: '#dadddf'}}>
                    <Left>
                    <Thumbnail source={require('./img/beaconuser2.jpg')} style={[styles.thumbnail]} />
                    <Body>
                    <Text style={styles.uploaderName}> {item.beacon_user}</Text>
                
                    </Body>
                    </Left>
                    <Right>
                            <Text style={[styles.textFlatlistStyle, {backgroundColor: "red"}]}>{item.receiver_location}</Text>
                            
                    </Right>
                    </CardItem>
                    </Card>
                </View>
                            
                    }

                    else if (item.location_type == "red" && item.beacon_user == "Ranneke3") {
                        return <View>
                            <Card>
                            <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          
        />  
                            <CardItem style={{height: 78,borderBottomWidth:1,borderColor: '#dadddf'}}>
                    <Left>
                    <Thumbnail source={require('./img/beaconuser3.jpg')} style={[styles.thumbnail]} />
                    <Body>
                    <Text style={styles.uploaderName}> {item.beacon_user}</Text> 
                    </Body>
                    </Left>
                    <Right>
                            <Text style={[styles.textFlatlistStyle, {backgroundColor: "red"}]}> {item.receiver_location}</Text>
                            
                    </Right>
                    </CardItem>
                    </Card>
                                 </View>
                    }

                    else if (item.location_type == "red" && item.beacon_user == "Ranneke4") {
                        return <View>
                        <Card>
                        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          
        />  
                        <CardItem style={{height: 78,borderBottomWidth:1,borderColor: '#dadddf'}}>
                <Left>
                <Thumbnail source={require('./img/beaconuser4.jpg')} style={[styles.thumbnail]} />
                <Body>
                <Text style={styles.uploaderName}> {item.beacon_user}</Text>
                
                </Body>
                </Left>
                <Right>
                        <Text style={[styles.textFlatlistStyle, {backgroundColor: "red"}]}>{item.receiver_location}</Text>
                        
                </Right>
                </CardItem>
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
        paddingTop: 50,
        backgroundColor:'rgb(178, 223, 219)'
       
    },

    textFlatlistStyle: {
        flex: 1,
        padding:15,
        fontSize: 13,
        backgroundColor: '#DFDFDF',
        paddingHorizontal: 10,
        borderRadius:  10,
        textAlign: "center",
        fontWeight: 'bold'
        
    },

    thumbnail:{
        height:60,
        width: 60
    }
})