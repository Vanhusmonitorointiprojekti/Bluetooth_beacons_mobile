import React, { Component } from 'react';


class AdminFrontPage extends Component {

render() {
        return (
            <div style={styles.headerStyle}>
                <h1>Bluetooth beacons admin -page</h1>
                    <p>Tervetuloa admin käyttöliittymän etusivulle</p>
                    <p>Tällä sivulta pystyt hallinnoimaan kaikkia laitteita</p>
                    <button style={styles.buttonstyle}>Test button hello</button>
                    <button style={styles.buttonstyle}>Test button hello</button>
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

export default AdminFrontPage;