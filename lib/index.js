const express = require('express');
const app = express();

app.get('/',(req,res)=>{
  res.send('Hello World!');
});

var server = app.listen(3000,()=>{
  console.log('Server is listening on port ' + server.address().port);
});
