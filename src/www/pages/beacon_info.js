import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet, Dimensions
} from 'react-native';

export default class Beacon_info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tieto: [],
            navigate: false,

        }
    }


    componentDidMount = () => {
        fetch('http://localhost:4000/beacon_info')
            .then((response) => response.json())
            .then(responseJson => {
                this.setState({tieto: responseJson})

            })
    }

    handlePress = () => {
        this.setState({navigate: true});
    }


    delete_beacon = (beacon_id) => {
        fetch('http://localhost:4000/delete/' + beacon_id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState(prevState => ({
                    tieto: prevState.tieto.filter(beacon =>
                        beacon.beacon_id !== beacon_id)
                }));
            })
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Hello!</Text>


            </View>

        );

    }

}