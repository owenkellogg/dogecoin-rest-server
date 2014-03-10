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
  gateway.getExternalAccount({ name: req.param.dogecoin_address }, function(err, account){
    if (err) {
      res.send(500, { error: err }); 
    } else {
      gateway.getRippleAddress({ user_id: account.user_id }, function(err, ripple_address){
        if (err) {
          res.send(500, { error: err }); 
        } else {
          res.send({ 
            ripple_address: ripple_address.address,
            dogecoin_address: req.param.dogecoin_address 
          });
        }
      });
    }
  });
});

app.get('/bridges/ripple/:ripple_address', function(req, res){
  gateway.getRippleAddress({ ripple_address, req.param.ripple_address }, function(err, address){
    if (err) {
      res.send(500, { error: err });
    } else {
      gateway.getExternalAccount({ user_id: address.user_id }, function(err, account){
        if (err) {
          res.send(500, { error: err });
        } else {
          res.send({ 
            dogecoin_address: account.name,
            ripple_address: req.param.ripple_address 
          });
        }
      });
    }
  });
});

app.listen(5000);
