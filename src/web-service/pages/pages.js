import React, { Component } from 'react';


class AdminFrontPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tieto: []
        };
    }


componentDidMount = () => {
    let self = this;
    fetch('http://localhost:3000/beacon_info')
    .then((response) => response.json())
    .then(responseJson => {
        this.setState({tieto: responseJson})
        console.log(this.state.tieto + "Hello")
    })
    
        
    }


render() {
    const TableRow = ({ children }) => children.map(el => <tr key={el}>{el}</tr>)

    
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
                            <td>{member.beacon_id}</td>
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