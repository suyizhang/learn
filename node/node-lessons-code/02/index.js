const express = require('express');
const utility = require('utility');

const app = express();

app.get('/', function(req, res) {
  const q = req.query.q;

  const md5Value = utility.md5(q);

  res.send(md5Value);
});


app.listen(3000, function(req, res) {
  console.log('app is running at port 3000');
});

