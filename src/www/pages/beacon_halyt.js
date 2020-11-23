
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet, FlatList, TouchableOpacity
} from 'react-native';
import {  CardItem, Thumbnail, Left, Body, Right,Card } from 'native-base';
import socketIOClient from "socket.io-client";
import axios from 'axios';


const PUSH_ENDPOINT3= "http://192.168.11.35:4000/statuses/"

export default function Locations_info() {

  const [tieto, setTieto] = useState([]);
  const [changes, setChanges] = useState([])
  

  const sendTenantID = async(data) =>{
      let checked = true
      const req = await axios.put(`${PUSH_ENDPOINT3}/${data}`, { checked })
      console.log('Viesti:', data)
  }

  
  useEffect (() => {    
      axios.get('https://www.vanhusmonitorointi.tk/statuses')
          .then((response) => setTieto(response.data))
        console.log('tieto alussa', tieto)
        const socket = socketIOClient("http://195.148.21.28:4002");
        let newArray = []
        socket.on("updates", async data =>  {
            console.log('update', data)
            newArray = await newArray.filter(t => t.tenant_id !== data.tenant_id).concat(data)        
            console.log('newArray', newArray)
            await setTieto(newArray)           
        });
        // CLEAN UP THE EFFECT 
        // https://www.valentinog.com/blog/socket-react/
        return () => socket.disconnect();
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
               
                //console.log("Koe",item.tenant_id)
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
                <TouchableOpacity style={styles.button} onPress={()=>{sendTenantID(item.tenant_id)}}>
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