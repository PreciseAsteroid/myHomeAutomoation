var request = require('request');
var parser = require('./parser');
const player = require('play-sound')();

var buttons_ds_hardcopy = {
  "buttons": [
    {
      "_id": "5b145578d179c0e3b3839e32",
      value: "door bell button",
      MAC: "fc:65:de:7b:a2:1c",
      active: true,
      actions: [
        {
          "_id": "5b145578d179c0e3b3839e33",
          type: "ifttt",
          key: "cT6lm_RqMdNT3IoJfLbUCY",
          active: true
        }, {
          "_id": "5b145578d179c0e3b3839e34",
          type: "ifttt",
          key: "dquuU8uBMFHupi7Jincbjk",
          active: false
        }
      ]
    }
  ]

};

function buttons() {
  this.activeButtons = [];

}

buttons.prototype.execute = function(msg) {
  console.log("Executing with execution at buttons.prototype.execute");
  var key = this.getKey(msg)
  if (key == -1) {
    return console.log("Not a valid call");
  };
  console.log("Executing with key:", key);
  var filteredButtons = this.fetch(key); // get from DB
  if (filteredButtons.length > 0) { // only in case there are relevant entries
    console.log("Button exit with key: ", key);
    for (var j in filteredButtons[0].actions) {
      if (filteredButtons[0].actions[j].active == true) {
        this.triggerAction(filteredButtons[0].actions[j].type, filteredButtons[0].actions[j].key);
      }
    }
  }else{ console.log("No button with key: ", key);}

};

buttons.prototype.getKey = function(msg) {
  var obj = parser.parse(msg);
  if (
      typeof obj == 'undefined' ||
      typeof obj.options == 'undefined' || 
      typeof obj.options.clientIdentifier == 'undefined' ||
      typeof obj.options.clientIdentifier.address == 'undefined' || this.activeButtons.indexOf(obj.options.clientIdentifier.address) != -1) {
    return -1;
  }
  this.activeButtons.push(obj.options.clientIdentifier.address)
  setTimeout(() => {
    // remove the item from the array
    var index = this.activeButtons.indexOf(obj.options.clientIdentifier.address);
    if (index > -1) {
      this.activeButtons.splice(index, 1);
    }
  }, 5000)
  return obj.options.clientIdentifier.address;

}

buttons.prototype.fetch = function(key) {
  var buttons = buttons_ds_hardcopy.buttons; // TODO: replace with call to DB
  var results = [];
  // console.log(buttons[0]);
  for (var i in buttons) {
    if (buttons[i].active == true && buttons[i].MAC == key) {
      results.push(buttons[i]);
    }
  }
  return results;
};
buttons.prototype.triggerAction = function(type, key) {
  console.log("reached triggerAction with: ", key);

  switch (type) {
    case "ifttt":
      this.ifttt(key);
      break;
    case "play":
      this.play();
      break;
    default:

  }
};
buttons.prototype.ifttt = function(key) {
  var amirsID = "cT6lm_RqMdNT3IoJfLbUCY"
  var url = "https://maker.ifttt.com/trigger/button_pressed/with/key/"
  request.post(url + amirsID, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      console.log("message sent");
    } else {
      console.log("message could not be sent: ", err);

    }
  })

};
buttons.prototype.play = function(path) {};

module.exports = buttons;
