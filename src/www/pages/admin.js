import React, { Component } from 'react';


class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tieto: []
        }
    }


    componentDidMount = () => {
        fetch('http://localhost:3000/beacon_info')
        .then((response) => response.json())
        .then(responseJson => {
            this.setState({tieto: responseJson})
            
        })
        
            
        }

render() {
        return (
            <div>
               <table>
                    <thead>
                        <tr>
                            <th>Beacon user</th>
                            <th>Beacon id</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tieto.map(member =>
                            <tr key={member.beacon_id}>
                            <td>{member.beacon_user}</td>
                            <td>{member.beacon_id}</td>
                            </tr>
                            )}
                    </tbody>
                </table>

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