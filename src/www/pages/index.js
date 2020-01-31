import React, { Component, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Admin from './admin.js'

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
            <Tab label="Admin page"  />
            <Tab label="Test" />
           
          </Tabs>
        </AppBar>
        {this.state.value === 0 && <Admin />}
        {this.state.value === 1 && <Admin />}
      </div>
    </div>
  )
}
}

export default AdminFrontPage;