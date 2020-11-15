
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet, FlatList
} from 'react-native';
import { Container, Header, Content,  CardItem, Thumbnail,  Button, Icon, Left, Body, Right,Card } from 'native-base';
function Item({ item }) {
  return (
    <View>
        <Card>
        <CardItem style={{height: 78,borderBottomWidth:1,borderColor: '#dadddf'}}>
        <Left>
            <Text style={{fontWeight:"bold"}}>{item.firstname} {item.lastname}  </Text>
        </Left>
        <Right>
             <Text>Sijainti: {item.location}</Text>
             <Text> {item.status}</Text>
        </Right>
        </CardItem>
        </Card>
    </View>
  );
}


export default function Locations_info() {

  const [tieto, setTieto] = useState([]);


  useEffect (() => {
      // Put your Ipv4 address here for example http://000.000.0.0:4000/beacon_info
      fetch('https://www.vanhusmonitorointi.tk/statuses')
          .then((response) => response.json())
          .then(responseJson => {
              setTieto(...tieto, responseJson)
              console.log(tieto)
          })
  }, []);


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

  
  listItem:{
      margin:10,
      padding:10,
      backgroundColor:"#FFF",
      width:"80%",
      flex:1,
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:5
    }
})
