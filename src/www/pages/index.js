import React, { Component, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Admin from './admin.js'
import Beacon_detections from './beacon_detections.js';
import Receiver_info from './receiver_info.js';

class AdminFrontPage extends Component{
  constructor(props){
    super(props);
    this.state = {value: 0};
  }

handleChange = (event, val) => {
  this.setState( {value: val});
}

render(){
  return(
<div>
    <div>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange}>
            <Tab label="Beacon info"  />
            <Tab label="Beacon detections" />
            <Tab label="Receiver info" />
           
          </Tabs>
        </AppBar>
        {this.state.value === 0 && <Admin />}
        {this.state.value === 1 && <Beacon_detections />}
        {this.state.value == 2 && <Receiver_info />}
      </div>
    </div>
  )
}
}

export default AdminFrontPage;