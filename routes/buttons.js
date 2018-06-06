const express = require('express');
const router = express.Router();

// const testButtons = require('../rsc/buttons.json')
const Button = require('../models/buttons');

// var testButtons = [{"id": 1,
//     "value": "Door Bell Dash",
//     "Active": true,
//     "MAC": "FC65DE7BA21C"
//   },{"id": 2,
//     "value": "Other Door Bell",
//     "Active": false,
//     "MAC": "FC6SDE7BA21D"
//   }];



// GET
  router.get('/',(req,res)=>{
     Button.find({},(err,buttons)=>{
       if (err) {
         return console.log(err);
       }
       // console.log('result type: ', Object.prototype.toString.call(buttons));
       res.status(200).json(buttons);
     })

  });
// POST
  var newBug;
  router.post('/',(req,res)=>{
    var newButton = new Button(req.body);//req.body;
    // newEntry.id = testButtons.length + 1;
  // console.log('req: ', req.body);
  // testButtons.push(newEntry);
    newButton.save((err,product)=>{
      if (err) { return console.log(err)};
      res.json(product)

    });
  });

  //PUT update
  router.put('/:id',(req,res)=>{
    console.log(req.body);
    var button = {};
    for (var prop in req.body) {
      button[prop] = req.body[prop];
    }
     var updateButton = new Button();
     Button.update({_id: req.params.id},button, (err,product)=>{
       if (err) {
         return console.log(err);
       }
       res.json(product);
     });
  });



module.exports = router;
