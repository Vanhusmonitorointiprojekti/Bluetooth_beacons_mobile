import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet, FlatList, 
} from 'react-native';
import { Container, Header, Content, SafeAreaView, StatusBar,  CardItem, Thumbnail,  Button, Left, Body, Right,Card } from 'native-base';
import {Picker} from '@react-native-picker/picker';

export default function Dropdown() {
    

  const [tieto, setTieto] = useState([]);
    
  const [status, setStatus] = useState('checked');
  const [selectedValue, setSelectedValue] = useState("todo");

  useEffect (() => {
      // Put your Ipv4 address here for example http://000.000.0.0:4000/beacon_info
      fetch('https://www.vanhusmonitorointi.tk/statuses')
          .then((response) => response.json())
          .then(responseJson => {
              setTieto(...tieto, responseJson)
              console.log(tieto)
          })
  }, []);

  const onButtonToggle = value => {
    setStatus(status === 'checked' ? 'unchecked' : 'checked');
  };
  

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
      
                    
            </Right>
            </CardItem>
            </Card>
                         </View>
            }

            else if (item.status == "alarm" && item.tenant_id == "2020TNT4") {
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
    <Picker
        selectedValue={selectedValue}
        style={{ height: 20, width: 130 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        id="4"
      >
        <Picker.Item label="Avoin" value="todo" id="4" />
        <Picker.Item label="Kuitattu" value="doing"id="4"  />
        <Picker.Item label="Hoidettu" value="done" id="4" />
      </Picker>

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
            <Picker
           
        selectedValue={selectedValue}
        style={{ height: 20, width: 130 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        id="5"
      >
        <Picker.Item label="Avoin" value="todo" id ="5"/>
        <Picker.Item label="Kuitattu" value="doing" id ="5" />
        <Picker.Item label="Hoidettu" value="done" id ="5" />
      </Picker>
      
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
fontSize: 15,
backgroundColor: '#DFDFDF',
paddingHorizontal: 10,
borderRadius:  10,
textAlign: "center",
fontWeight: 'bold'

},

thumbnail:{
height:65,
width: 65
},

uploaderName:{
textAlign: "center",
justifyContent: "center"
},

})  