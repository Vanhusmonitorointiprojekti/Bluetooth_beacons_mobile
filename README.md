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
