var express = require('express');
var router = express.Router();

var userModel = require('../models/users');

// Security dependencies
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', async function(req, res, next) {

  var salt = uid2(32);
  var password = SHA256(req.body.password + salt).toString(encBase64);

  await userModel.findOne({email: req.body.email}, function(error, findUser){
    if(findUser) {
      res.json({result: true, user: findUser})
    } else {
      var newUser = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: password,
        salt: salt
      });
      newUser.save(function(error, user) {
        error ? console.log(error) : res.json({result: false, user: user})
      })
    }
  })
});

router.get('/signin/:email/:password', async function(req, res, next) {
  await userModel.findOne({email: req.params.email}, function(error, findUser){
    if (findUser) {

      var pwd = SHA256(req.params.password + findUser.salt).toString(encBase64)

      findUser.password === pwd
      ? res.json({result: true, user: findUser})
      : res.json({result: false, error: 'mauvais mot de passe...'})
    } else {
      res.json({result: false, error: 'email introuvable en BDD...'})
    }
  })
})

module.exports = router;
