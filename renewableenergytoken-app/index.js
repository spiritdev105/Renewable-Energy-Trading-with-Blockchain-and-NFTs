var express = require('express');
var app = express();

app.use(express.static('src'));
app.use(express.static('../renewableenergytoken-contract/build/contracts'));

app.get('/', function (req, res) {
  res.render('index.html');
});

app.listen(3000, function () {
  console.log('Renewable Energy Token Dapp listening on port 3000!');
});
