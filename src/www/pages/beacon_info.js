import React, { Component } from 'react';
import { Paper, Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';

class Beacon_info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tieto: []
        }
    }


    componentDidMount = () => {
        fetch('http://localhost:4000/beacon_info')
        .then((response) => response.json())
        .then(responseJson => {
            this.setState({tieto: responseJson})
            
        })
        
            
        }

render() {
        return (
            <div>
                <Paper>
               <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Beacon User</TableCell>
                            <TableCell>Beacon ID</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.tieto.map(member =>
                            <TableRow key={member.beacon_id}>
                            <TableCell>{member.beacon_user}</TableCell>
                            <TableCell>{member.beacon_id}</TableCell>
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

export default Beacon_info;