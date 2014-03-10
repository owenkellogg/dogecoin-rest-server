var app = require('express')(); 
var dogecoin = require("node-dogecoin")();
var gateway = new (require("ripple-gateway-data-sequelize-adapter");

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

  gateway.createUser({ name: req.body.user, password: req.body.password }, function(err, user){
    if (err) {
      res.send(500, { error: err });  
    } else {
      dogecoin.getNewAddress(function(err, address){
        if (err) {
          res.send(500, { error: err });  
        } else {
          gateway.createExternalAccount({ user_id: user.id, name: address }, function(err, account){
            if (err) {
              res.send(500, { error: err });  
            } else {
              gateway.createRippleAddress({ 
                user_id: user.id, 
                ripple_address: req.body.ripple_address          
              }, function(err, ripple_address){
                if (err) {
                  res.send(500, { error: err });  
                } else {
                  res.send({ 
                    user: user,
                    ripple_address: ripple_address,
                    dogecoin_address: account
                  });
                }                
              });
            } 
          }); 
        } 
      });
    } 
  });
});

app.get('/bridges/dogecoin/:dogecoin_address', function(req, res){
  
  // look up the connected ripple address given a dogecoin address
});

app.get('/bridges/ripple/:ripple_address', function(req, res){
  // look up the connected dogecoin address given a ripple address
});

app.listen(5000);
