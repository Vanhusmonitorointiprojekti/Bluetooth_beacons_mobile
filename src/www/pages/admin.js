import React, { Component } from 'react';


class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tieto: []
        }
    }

render() {
        return (
            <div>
            <h1>HAAAI</h1>
            Didney worl

            </div>


           
        );
    }


}

const styles =  {
    buttonStyle: {
        width: 80,
        height: 80
    },
    headerStyle: {
        textAlign: 'center'
    }
        
} ;

export default Admin;