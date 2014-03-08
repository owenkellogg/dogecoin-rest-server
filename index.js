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

app.listen(5000);
