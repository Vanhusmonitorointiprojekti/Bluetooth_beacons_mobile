
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet, FlatList, TouchableOpacity
} from 'react-native';
import {  CardItem, Thumbnail, Left, Body, Right,Card } from 'native-base';
import socketIOClient from "socket.io-client";
import axios from 'axios';


const PUSH_ENDPOINT3= "http://192.168.1.197:3000/api/push_notification/checked"

export default function Locations_info() {

  const [tieto, setTieto] = useState([]);
  
  const sendChecked = async () => {
    const data = "Herra Einstein on kuitattu" 
    const req =await axios.post(PUSH_ENDPOINT3, {
      data
    },
    console.log('Viesti:', data))
    
  }

  
  

  const sendTenantID = async(data) =>{
    const req =await axios.post(PUSH_ENDPOINT3, {
        data
      },
      console.log('Viesti:', data))
  }

  useEffect (() => {
      
      fetch('https://www.vanhusmonitorointi.tk/statuses')
          .then((response) => response.json())
          .then(responseJson => {
              setTieto(...tieto, responseJson)
              console.log(tieto)

              const socket = socketIOClient("https://www.vanhusmonitorointi.tk/changes");
                socket.on("emitSocket", data =>  {
                setTieto(...tieto, data);
                
            });
        });
    
}, []);


  return (
    <View style={styles.container}>
        
    <FlatList style={{}}
        data={tieto}    
        renderItem={({item}) => {

            if (item.status == "alarm" && item.tenant_id == "2020TNT1") {
                return  <View>
                    <Card>    
                     <CardItem style={{height: 78,borderBottomWidth:1,borderColor: '#dadddf'}}>
                     <Left>
                     <Thumbnail source={require('./img/einstein.jpg')} style={[styles.thumbnail]} />
                     <Body>
                         <Text style={styles.uploaderName}> {item.firstname} {item.lastname}</Text>
                     </Body>
                     </Left>
                     <Right>
                     <TouchableOpacity style={styles.button} onPress={()=>{sendTenantID(item.tenant_id)}}>
                            <Text style={{color:'white'}}>Kuittaa hälytys</Text>
                    </TouchableOpacity>
                    </Right>
                    </CardItem>
                    </Card>
                </View>
            }

            else if (item.status == "alarm" && item.tenant_id == "2020TNT2") {
                return <View>
                <Card>
                    <CardItem style={{height: 78,borderBottomWidth:1,borderColor: '#dadddf'}}>
                    <Left>
                    <Thumbnail source={require('./img/curie.jpg')} style={[styles.thumbnail]} />
                    <Body>
                    <Text style={styles.uploaderName}> {item.firstname} {item.lastname}</Text>
                    </Body>
                    </Left>
                    <Right>
                    <TouchableOpacity style={styles.button} onPress={()=>{sendTenantID(item.tenant_id)}}>
                        <Text style={{color:'white'}}>Kuittaa hälytys</Text>
                    </TouchableOpacity>
                    </Right>
                    </CardItem>
                </Card>
                </View>
                    
            }

            else if (item.status == "alarm" && item.tenant_id == "2020TNT3") {
                return <View>
                    <Card>

                    <CardItem style={{height: 78,borderBottomWidth:1,borderColor: '#dadddf'}}>
            <Left>
            <Thumbnail source={require('./img/darwin.jpg')} style={[styles.thumbnail]} />
            <Body>
            <Text style={styles.uploaderName}> {item.firstname} {item.lastname}</Text>
            </Body>
            </Left>
            <Right>
            <TouchableOpacity style={styles.button} onPress={()=>{sendTenantID(item.tenant_id)}}>
                <Text style={{color:'white'}}>Kuittaa hälytys</Text>
            </TouchableOpacity>
            </Right>
            </CardItem>
            </Card>
                         </View>
            }

            else if (item.status == "alarm" && item.tenant_id == "2020TNT4") {
               
                console.log("Koe",item.tenant_id)
                return <View>
                <Card>

                <CardItem style={{height: 78,borderBottomWidth:1,borderColor: '#dadddf'}}>
        <Left>
        <Thumbnail source={require('./img/mgm.jpg')} style={[styles.thumbnail]} />
        <Body>
        <Text style={styles.uploaderName}> {item.firstname} {item.lastname}</Text>
      
        </Body>
        </Left>
        <Right>
            <TouchableOpacity style={styles.button} onPress={()=>{sendTenantID(item.tenant_id)}}>
                <Text style={{color:'white'}}>Kuittaa hälytys</Text>
            </TouchableOpacity>
        </Right>
        </CardItem>
        </Card>
                     </View>
            }

            else if (item.status == "go check" && item.tenant_id == "2020TNT1") {
                return <View>
                <Card>

                <CardItem style={{height: 78,borderBottomWidth:1,borderColor: '#dadddf'}}>
        <Left>
        <Thumbnail source={require('./img/einstein.jpg')} style={[styles.thumbnail]}/>
        <Body>
        <Text style={styles.uploaderName}> {item.firstname} {item.lastname}</Text>
        </Body>
        </Left>
        <Right>
        <TouchableOpacity style={styles.button} onPress={()=>{sendTenantID(item.tenant_id)}}>
                <Text style={{color:'white'}}>Kuittaa hälytys</Text>
            </TouchableOpacity>
        </Right>
        </CardItem>
        </Card>
                     </View>
            }
            else if (item.status == "go check" && item.tenant_id == "2020TNT2") {
                return <View>
                <Card>

                <CardItem style={{height: 78,borderBottomWidth:1,borderColor: '#dadddf'}}>
        <Left>
        <Thumbnail source={require('./img/curie.jpg')} style={[styles.thumbnail]} />
        <Body>
        <Text style={styles.uploaderName}> {item.firstname} {item.lastname}</Text>
        </Body>
        </Left>
        <Right>
        <TouchableOpacity style={styles.button} onPress={()=>{sendTenantID(item.tenant_id)}}>
                <Text style={{color:'white'}}>Kuittaa hälytys</Text>
            </TouchableOpacity>
        </Right>
        </CardItem>
        </Card>
                     </View>
            }

            else if (item.status == "go check" && item.tenant_id == "2020TNT3") {
                return <View>
                <Card>
                <CardItem style={{height: 78,borderBottomWidth:1,borderColor: '#dadddf'}}>
                <Left>
                <Thumbnail source={require('./img/darwin.jpg')} style={[styles.thumbnail]} />
                <Body>
                     <Text style={styles.uploaderName}> {item.firstname} {item.lastname}</Text>
                </Body>
                </Left>
                <Right>
                    <TouchableOpacity style={styles.button} onPress={sendChecked}>
                        <Text style={{color:'white'}}>Kuittaa hälytys</Text>
                    </TouchableOpacity>
                </Right>
                </CardItem>
        
                </Card>
            </View>
            }

            else if (item.status == "go check" && item.tenant_id == "2020TNT4") {
                return <View>
                <Card>

                <CardItem style={{height: 78,borderBottomWidth:1,borderColor: '#dadddf'}}>
        <Left>
        <Thumbnail source={require('./img/mgm.jpg')} style={[styles.thumbnail]} />
        <Body>
        <Text style={styles.uploaderName}> {item.firstname} {item.lastname}</Text>
        </Body>
        </Left>
        <Right>
        <TouchableOpacity style={styles.button} onPress={()=>{sendTenantID(item.tenant_id)}}>
                <Text style={{color:'white'}}>Kuittaa hälytys</Text>
            </TouchableOpacity>
        </Right>
        </CardItem>
        </Card>
                     </View>

            }
            
        }
            
        }
        keyExtractor={item => item.tenant_id}
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
},
button: {
    alignItems: "center",
    backgroundColor: "rgb(0, 150, 136)",
    padding: 10
  },
})