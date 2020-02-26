import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import { Paper, Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';

class Socket extends Component {
  constructor() {
      super();
      this.state = {
          response: [],
          endpoint: 'http://127.0.0.1:4001'
      };
  }

  componentDidMount() {
      const {endpoint} = this.state;
      //connect io client to specified endpoint
      const socket = socketIOClient(endpoint);
      //listen data -> set to state
      socket.on("outgoing data", data => this.setState({response: data.num}));
  }

  render() {
      const {response} = this.state;
      return (
          <div style={{textAlign: "center"}}>
              <Paper>
                  <h1 style={{fontSize: 20}} value={response}>{this.state.response}</h1>
                  <h2>Currently only counts to 100 </h2>
                  <h3>TODO: Do not overwrite values, add to list to display detections</h3>
                  <h4>Start socketio.js to start counting or reset it</h4>
                  </Paper>
      
          </div>
      )
  }
}

export default Socket;