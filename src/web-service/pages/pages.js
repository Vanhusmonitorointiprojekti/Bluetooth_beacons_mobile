import React, { Component } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function AdminFrontPage(props) {
    const{children, value, index} = props;

return(
<Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}



function tabs(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
  export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Admin page" {...tabs(0)} />
            <Tab label="Test" {...tabs(1)} />
           
          </Tabs>
        </AppBar>
        <AdminFrontPage value={value} index={0}>
        <div style={styles.headerStyle}>
                <h1>Bluetooth beacons admin -page</h1>
                    <p>Tervetuloa admin käyttöliittymän etusivulle</p>
                    <p>Tällä sivulta pystyt hallinnoimaan kaikkia laitteita</p>
                    <button>Test button hello</button>
                    <button>Test button hello</button>
            </div>
        </AdminFrontPage>
        <AdminFrontPage value={value} index={1}>
          Test test 123
        </AdminFrontPage>
        
      </div>
    );
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