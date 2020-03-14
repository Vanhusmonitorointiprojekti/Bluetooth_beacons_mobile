import React, { Component } from 'react';
import { Paper, Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';
import socketIOClient from "socket.io-client";


class Beacon_locations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tieto: [],
            endpoint: "http://127.0.0.1:4001",
            response: []
        }
    }


    componentDidMount() {
        fetch("http://localhost:4000/beacon_locations")
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ tieto: responseJson });

                const { endpoint } = this.state;
                const socket = socketIOClient(endpoint);
                socket.on("emitSocket", data => this.setState({ tieto: data }));
            });
    }

render() {
        return (
            <div>
                <Paper>
               <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Beacon ID</TableCell>
                            <TableCell>Receiver ID</TableCell>
                            <TableCell>Signal DB</TableCell>
                            <TableCell>Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.tieto.map(member =>
                            <TableRow key={member.receiver_id}>
                            <TableCell>{member.beacon_user}</TableCell>
                            <TableCell>{member.receiver_id}</TableCell>
                                {member.signal_db > -60 &&
                                <TableCell style={{backgroundColor: 'green'}}>{member.signal_db}</TableCell>
                                }
                                {member.signal_db < -59 &&
                                <TableCell style={{backgroundColor: 'red'}}>{member.signal_db}</TableCell>
                                }


                            <TableCell>{member.measument_time}</TableCell>
                            </TableRow>
                            )}
                    </TableBody>
                </Table>
                </Paper>

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

export default Beacon_locations;