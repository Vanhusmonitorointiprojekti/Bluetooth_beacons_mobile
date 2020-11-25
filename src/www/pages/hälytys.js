
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet, FlatList, TouchableOpacity
} from 'react-native';
import {  CardItem, Thumbnail, Left, Body, Right,Card } from 'native-base';
import socketIOClient from "socket.io-client";
import axios from 'axios';
import { Image, Badge,withBadge, Icon  } from 'react-native-elements'

const PUSH_ENDPOINT3= "http://192.168.1.197:4000/statuses/"

export default function Locations_info() {

  const [tieto, setTieto] = useState([]);
  const [changes, setChanges] = useState([]);
  


  const sendTenantID = async(data) =>{
      let checked = true
      const req = await axios.put(`${PUSH_ENDPOINT3}/${data}`, { checked })
      console.log('Viesti:', data)
  }
  

  useEffect (() => {    
      axios.get('https://www.vanhusmonitorointi.tk/statuses')
          .then((response) => {
            const Array = response.data.filter(tenant => tenant.status == 'alarm')
            
            setTieto(Array)})
        console.log('tieto alussa', tieto)
    
        const socket = socketIOClient("http://195.148.21.28:4002");
        let newArray = []
        let newArray2 =[]
        
        socket.on("updates", async data =>  {
            console.log('update', data)
            newArray = await newArray.filter(t => t.tenant_id !== data.tenant_id).concat(data)        
            console.log('newArray', newArray)
            //newArray2 = await tieto.filter(tenant => tenant.status == 'alarm')
            newArray2 = await newArray.filter(tenant => tenant.status == 'alarm')
            console.log('status=alarm', newArray2)
           
            await setTieto(newArray2 )           
        });
        // CLEAN UP THE EFFECT 
        // https://www.valentinog.com/blog/socket-react/
        return () => socket.disconnect();
}, []);



function Item({ item }) {
    const [badgestatus, setBadgeStatus] = useState('error');
    const [teksti, setTeksti]= useState(['Kuittaa hälytys']);
    const [ikoni, setIkoni]= useState('error');
    
    const ChangeStatus = async() =>{
        setBadgeStatus(badgestatus === 'error' ? 'success' : 'error')
        setTeksti(teksti==='Kuittaa hälytys'? 'Kuittaa hälytys' : 'Hälytys kuitattu')
        setIkoni(ikoni== 'error' ? 'check-circle' : 'error')
        }
      

    return (
        <View>
        <Card>    
         <CardItem style={{height: 78,borderBottomWidth:1,borderColor: '#dadddf'}}>
         <Left>
         <Body>
             <Text style={styles.uploaderName}> {item.firstname} {item.lastname}</Text>
         </Body>
         </Left>
         <Right>
         <TouchableOpacity  style={styles.button} onPress={()=>{sendTenantID(item.tenant_id)}} onPressIn={ChangeStatus}>
            <Text style={{color:'white'}}>{teksti}</Text>
            
        </TouchableOpacity>
        </Right>
        <Icon name={ikoni} containerStyle={{ position: 'relative', top:1 , right: 1 , left: 2, paddingLeft:5}} />
      
        </CardItem>
        </Card>
    </View>
    );
  }

  if (tieto.length <= 0) {
    console.log('testi', tieto.length)
    return (
      <View style={styles.noAlarmContainer}>
        <Card >
        <Image source={require('./img/einstein.jpg')} />
        <Text style={styles.noAlarmText}>Ei hälytyksiä tällä hetkellä</Text>
        </Card>
      </View>
    )
  }
  return (
    
    <View style={styles.container}>
          <FlatList
            style={{flex:1}}
            data={tieto}
            renderItem={({ item }) => <Item item={item}/>}
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
noAlarmText: {
    fontSize: 30,
    color: 'green',
    alignItems: 'center',
    padding:10,
    textAlign:'center'
    
  },
noAlarmContainer:{
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  paddingTop: 50,
  backgroundColor:'rgb(178, 223, 219)'
  },
})