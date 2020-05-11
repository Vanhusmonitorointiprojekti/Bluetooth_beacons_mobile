# Bluetooth_beacons_mobile


### About this project
This is the direct mobile version of Bluetooth_beacons that can be found here https://github.com/Marski96/Bluetooth_beacons.
Mobile version uses an old version of the same backend node server that the web version uses.

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
Follow on screen expo directions to launch the app the device of your choice.

6. Both backend and frontend should be running in order for the application to work.



<!-- Webclient -->
### Mobile


#### Beacon locations is the main page of the application and it shows if becons have been detected outside the green zone.
![Beacon locations](https://github.com/Marski96/Bluetooth_beacons_mobile/blob/master/IMG/beacon_locations.png)

#### Beacon info page shows who is wearing the beacon and their mac addresses
![Beacon info](https://github.com/Marski96/Bluetooth_beacons_mobile/blob/master/IMG/beacon_info.png)


<!-- Logic -->
### Logic

 App uses an older version of the backend used in https://github.com/Marski96/Bluetooth_beacons. App has been created using react native and expo. It uses react native's useEffect to fetch data from the node backend and socketio to keep fetching the data.
 
 For more detailed description of the logic and for the backend details check Bluetooth beacons repository.

