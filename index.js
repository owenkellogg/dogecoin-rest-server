var app = require('express')(); 
var dogecoin = require("node-dogecoin")();

dogecoin.auth(process.env.DOGECOIND_USER, process.env.DOGECOIND_PASSWORD);

app.get('/wallet/new', function(req, res){
  dogecoin.getNewAddress(function(err, address){
    if (err) { res.send(500, { error: err }); return };
    if (req.query.key) {
      dogecoin.dumpPrivKey(address, function(err, key){
        if (err) { res.send(500, { error: err }); return };
	      res.send({ address: address, key: key });
      });
    } else {
      res.send({ address: address });
    }
  });
});

app.post('/bridges', function(req, res){
  /* 
    link a dogecoin address to a ripple address
    - create a user with email, password
    - generate a dogecoin address
    - create an external account for user with dogecoin address as name
    - create a ripple address belong to the user
  */
});

app.get('/bridges/dogecoin/:dogecoin_address', function(req, res){
  // look up the connected ripple address given a dogecoin address
});

app.get('/bridges/ripple/:ripple_address', function(req, res){
  // look up the connected dogecoin address given a ripple address
});

app.listen(5000);
