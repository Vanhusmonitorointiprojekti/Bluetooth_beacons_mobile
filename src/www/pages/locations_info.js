
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet, FlatList
} from 'react-native';
import { Container, Header, Content,  CardItem, Thumbnail,  Button, Icon, Left, Body, Right,Card } from 'native-base';
import { Avatar } from "react-native-elements";
import axios from 'axios';
import socketIOClient from "socket.io-client";

export default function Locations_info() {

  const [tieto, setTieto] = useState([]);


  useEffect (() => {
        let newArray = []
      // Put your Ipv4 address here for example http://000.000.0.0:4000/statuses
        axios.get('http://000.000.0.0:4000/statuses')
          .then((response) => {
                setTieto(response.data)
                newArray = response.data
        })
        console.log('tieto alussa', tieto)
        // Put your Ipv4 address here for example http://000.000.0.0:4002
        const socket = socketIOClient("http://000.000.0.0:4002");
        
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
                <Text style={[styles.textFlatlistStyle, {backgroundColor: "red"}]}> {item.location}</Text>
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
                    <Text style={[styles.textFlatlistStyle, {backgroundColor: "red"}]}>{item.location}</Text>
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
                    <Text style={[styles.textFlatlistStyle, {backgroundColor: "red"}]}> {item.location}</Text>
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
                <Text style={[styles.textFlatlistStyle, {backgroundColor: "red"}]}>{item.location}</Text>
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
                <Text style={[styles.textFlatlistStyle, {backgroundColor: "yellow"}]}> {item.location}</Text>
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
                <Text style={[styles.textFlatlistStyle, {backgroundColor: "yellow"}]}>{item.location}</Text>
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
                <Text style={[styles.textFlatlistStyle, {backgroundColor: "yellow"}]}>{item.location}</Text>
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
                <Text style={[styles.textFlatlistStyle, {backgroundColor: "yellow"}]}> {item.location}</Text>
        </Right>
        </CardItem>
        </Card>
                     </View>

            }
            else if (item.status == "ok" && item.tenant_id == "2020TNT1") {
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
              <Text style={[styles.textFlatlistStyle, {backgroundColor: "green"}]}> {item.location}</Text>
      </Right>
      </CardItem>
      </Card>
                   </View>
          }
          else if (item.status == "ok" && item.tenant_id == "2020TNT2") {
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
              <Text style={[styles.textFlatlistStyle, {backgroundColor: "green"}]}>{item.location}</Text>
      </Right>
      </CardItem>
      </Card>
                   </View>
          }

          else if (item.status == "ok" && item.tenant_id == "2020TNT3") {
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
              <Text style={[styles.textFlatlistStyle, {backgroundColor: "green"}]}>{item.location}</Text>
      </Right>
      </CardItem>
      </Card>
                   </View>
          }

          else if (item.status == "ok" && item.tenant_id == "2020TNT4") {
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
              <Text style={[styles.textFlatlistStyle, {backgroundColor: "green"}]}> {item.location}</Text>
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
}
})