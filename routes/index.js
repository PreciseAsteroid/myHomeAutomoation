var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=>{
  res.send('im the index route of express');
  // res.render('index', { title: 'Express' });
});

// router.get('/:name',(req,res)=>{
//   var name = req.params.name;
//   res.render('index', {title: name})
// })

module.exports = router;
