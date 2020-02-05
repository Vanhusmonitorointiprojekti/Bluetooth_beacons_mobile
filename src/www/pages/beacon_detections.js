import React, { Component } from 'react';


class Beacon_detections extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tieto: []
        }
    }


    componentDidMount = () => {
        fetch('http://localhost:4000/beacon_detections')
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
                            <th>Beacon ID</th>
                            <th>Signal DB</th>
                            <th>Time</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tieto.map(member =>
                            <tr key={member.beacon_id}>
                            <td>{member.receiver_id}</td>
                            <td>{member.beacon_id}</td>
                            <td>{member.signal_db}</td>
                            <td>{member.measument_time}</td>
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

export default Beacon_detections;