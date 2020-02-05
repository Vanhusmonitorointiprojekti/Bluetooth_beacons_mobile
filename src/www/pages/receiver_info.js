import React, { Component } from 'react';


class Receiver_info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tieto: []
        }
    }


    componentDidMount = () => {
        fetch('http://localhost:4000/receiver_info')
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
                            <th>Receiver ID</th>
                            <th>Receiver Location</th>
                            <th>Location type</th>
                            

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tieto.map(member =>
                            <tr key={member.receiver_id}>
                            <td>{member.receiver_id}</td>
                            <td>{member.receiver_location}</td>
                            <td>{member.location_type}</td>
                            
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

export default Receiver_info;