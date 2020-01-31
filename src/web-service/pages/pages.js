import React, { Component } from 'react';


class AdminFrontPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tieto: []
        }
    }


componentDidMount = () => {
    this.haeTiedot();
    
}

haeTiedot = () => {
    let self = this;
    fetch('localhost:3000'+'/beacon_info', {
        method: "get"
    })
        .then((response) =>  {
            console.log(response)
            var array = Array.from(response.json());
            this.setState({tieto: array});
        })
       .catch((error) => {
          this.setState({error: 'Tietojen haku ei onnistunut'});
    
})
}

render() {
        return (
            <div>
            <div style={styles.headerStyle}>
                <h1>Bluetooth beacons admin -page</h1>
                    <p>Tervetuloa admin käyttöliittymän etusivulle</p>
                    <p>Tällä sivulta pystyt hallinnoimaan kaikkia laitteita</p>
                    <button>Test button hello</button>
                    <button>Test button hello</button>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Beacon id</th>
                            <th>Beacon user</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tieto.map(member =>
                            <tr key={member.beacon_id}>
                            <td>{member.beacon_user}</td>
                            </tr>
                            )}
                    </tbody>
                </table>

            </div>


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