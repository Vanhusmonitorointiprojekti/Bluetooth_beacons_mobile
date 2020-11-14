import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet, FlatList
} from 'react-native';

function Item({ item }) {
  return (
    <View style={styles.listItem}>
      
      <View style={{alignItems:"center",flex:1}}>
     
        <Text style={{fontWeight:"bold"}}>{item.tenant_firstname} {item.tenant_lastname}  </Text>
        <Text>Pienkoti: {item.space_name}</Text>
        <Text>Ranneke: {item.beacon_id}</Text>
        
      </View>

    </View>
  );
}
export default function Asukas_info() {

  const [tieto, setTieto] = useState([]);


  useEffect (() => {
      // Put your Ipv4 address here for example http://000.000.0.0:4000/beacon_info
      fetch('https://www.vanhusmonitorointi.tk/tenants')
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
            keyExtractor={item => item.beacon_id}
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
