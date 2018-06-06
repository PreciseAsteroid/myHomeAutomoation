const dgram = require('dgram');
var parser = require('./parser');
var request = require('request');
const player = require('play-sound')();



function Server() {
  this._readyForNextMsg = true
  _this = this;
  this.server = dgram.createSocket('udp4');
  this.server.on('message', (msg) => {
    console.log('message arrived');
    console.log('current state of this._readyForNextMsg: ', this._readyForNextMsg);

    if (this._readyForNextMsg) {
      console.log('message received: ',msg);
      obj = parser.parse(msg);
      if(obj.options.clientIdentifier.address == 'fc:65:de:7b:a2:1c'){
        this._readyForNextMsg = false;
        console.log('found you and sending');
        player.play('./rsc/338.mp3', (err) => {
          if (err) console.log(`Could not play sound: ${err}`);
        });

        // Amir
        request.post(
            'https://maker.ifttt.com/trigger/button_pressed/with/key/cT6lm_RqMdNT3IoJfLbUCY', { json: { key: 'value' } },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body)
                }
                console.log(response);
            }
        );
        // Maya
        request.post(
            'https://maker.ifttt.com/trigger/button_pressed/with/key/dquuU8uBMFHupi7Jincbjk', { json: { key: 'value' } },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body)
                }
                console.log(response);
            }
        );


        setTimeout(() =>{
          this._readyForNextMsg = true;
          console.log('just set the state of this._readyForNextMsg: ', this._readyForNextMsg);
        },5000);
    }else{
      console.log('not the MAC address you are after ');
    }

    }else {
      console.log('i think i am still in timeout: ',this._readyForNextMsg);
    }

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
