const dgram = require('dgram');
var request = require('request');
const player = require('play-sound')();
const buttons = require('./buttons');



function Server() {
  var _buttons = new buttons();
  this.server = dgram.createSocket('udp4');
  this.server.on('message', (msg) => {
    _buttons.execute(msg);

  });

  this.server.on('listening', (msg) => {
    console.log('in listening');

  });

};

Server.prototype.bind = function(port) {
  var _this = this;
  this.server.bind(67,function() {
    _this.server.setBroadcast(true);
  })
}




module.exports = Server;
