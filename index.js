'use strict';

const noble = require('noble');

const serviceUUIDs = [];
const allowDuplicates = true;
const errorHandler = err => {
    if (err) {
        console.error(err);
    }
}
const stateHandler = state => {
    if (noble.state === "poweredOn") {
        noble.startScanning(serviceUUIDs, allowDuplicates, errorHandler);
    }
}
class Display {
    constructor(peripheral) {
        this.name = peripheral.advertisement.localName;
        this.rssi = peripheral.rssi;
        this.addr = peripheral.address;
    }
}
const discoverHandler = peripheral => {
    if (peripheral !== undefined ||
        peripheral !== null) {
        console.log(new Display(peripheral));
    }
}
noble.on('stateChange', stateHandler);
noble.on('discover', discoverHandler);

// Exit after 5 sec
setTimeout(() => {
   noble.stopScanning();
   process.exit();
}, 5000);