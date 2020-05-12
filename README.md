# Bluetooth beacons mobile

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [How to use](#how-to-use)
  * [Mobile client](#mobile-client)
  * [Logic](#logic)
* [Known issues and future developments](#known-issues-and-future-developments)
* [License](#license)


<!-- ABOUT THE PROJECT -->
## About the project

Bluetooth beacons

This project is directed towards helping people that are suffering from memory disorders. One of the ways this project accomplishes that is by tracking the patients, granting them some freedom from nursing staff. Patients wear bluetooth wristlets that send signals that are tracked by Rasperry Pis installed inside the nursing facility. The system is created to allow them more freedom of movement inside the areas they are permitted to access and to send alarms to nurses/staff via web or mobile client if patients wander outside the designated areas.

This is the mobile version of Bluetooth_beacons that can be found here: https://github.com/Marski96/Bluetooth_beacons
This version uses an older version of the same backend node server that the web version uses.

### Built With
* [MySQL](https://www.mysql.com/)
* [Socket.io](https://socket.io/)
* [React Native](https://reactjs.org/)
* [Node.js](https://nodejs.org/en/)
* [MQTT](http://mqtt.org/)

<!-- GETTING STARTED -->
## Getting Started

Make sure that you have node.js and Expo CLI installed.
You can install node from here: https://nodejs.org/en/
You can find expo installation instructions here: https://docs.expo.io/get-started/installation/

### Prerequisites

1. Download the application .zip
2. Unzip the file to destination you like
3. With Powershell, navigate to unzipped application folder `pushd ..\Bluetooth_beacons_mobile`

### Installation

1. Using Powershell, install all required libraries by running `npm install`
2. Make sure that all libraries are installed by navigating to detect folder using Powershell and running application's backend file called detection.js.
```sh
..\Bluetooth_beacons_mobile\src\detection
```
```sh
node detect.js
```
3. If program starts with infotext "Socket.io is running on port 4001"... your installation is succesful.
4. If there is problem with some library for example mysql, install the required library: `npm install mysql`

   For the app to run succesfully using the expo's built in emulator the app requires the user to enter their Ipv4 address to both beacon_locations.js and beacon_info.js files inside the pages folder.
   
   Here is an example of the required code to be modified.
   
         useEffect (() => {
           // Put your Ipv4 address here for example http://000.000.0.0:4000/beacon_locations
           fetch('http://000.000.0.0:4000/beacon_locations')
               .then((response) => response.json())
               .then(responseJson => {
                   setTieto(...tieto, responseJson)

                // Put your Ipv4 address here for example http://000.000.0.0:4001
                this.socket = socketIOClient("http://000.000.0.0:4001");
                this.socket.on("emitSocket", data =>  {
                setTieto(...tieto, data);
                
                });
            });
        
          }, []);


5. Start front-end by opening another instance of Powershell and navigating to application folder:
```sh
 ..\Bluetooth_beacons_mobile
```

& run start:

```sh
npm start
```
Follow on screen expo directions to launch the app on the device of your choice.

6. Both backend and frontend should be running in order for the application to work.

<!-- How to use -->
## How to use

<!-- mobile client -->
### Mobile client


#### Beacon locations is the main page of the application and it shows if becons have been detected outside the green zone.
<img src="https://github.com/Marski96/Bluetooth_beacons_mobile/blob/master/IMG/beacon_locations.png" height="500" />


#### Beacon info page shows who is wearing the beacon and their mac addresses
<img src="https://github.com/Marski96/Bluetooth_beacons_mobile/blob/master/IMG/beacon_info.png" height="500" />


<!-- Logic -->
### Logic

 App uses an older version of the backend used in https://github.com/Marski96/Bluetooth_beacons. App has been created using react native and expo. It uses react native's useEffect to fetch data from the node backend and socketio to keep fetching the data.
 
 For a more detailed description of the logic and for the backend details check Bluetooth beacons repository.

<!-- Known issues and future developments -->
## Known issues and future developments

See the [open issues](https://github.com/Marski96/Bluetooth_beacons_mobile/issues) for a list of proposed features (and known issues).

<!-- License -->
## License
Licensed under MIT -license.
https://opensource.org/licenses/MIT
