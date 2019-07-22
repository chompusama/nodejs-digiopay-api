/**
 *  POST : check password
 *  
 *  Created by CPU on 12/7/19
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/userModels")

router.post("/:phone_number", (req, res, next) => {  
  const phoneNumber = req.params.phone_number;
  var passwordInput = req.body.password;

  User.findOne({ phone_number: phoneNumber }, function (err, docs) {
    console.log(docs);
    if (docs == null || docs == "") {
      res.json({
        status: 'error',
        res_code: '0002',
        message: 'This phone number has not been registered.',
      });
      return null;
    }
    else {
      var passwordFromDB = docs.password;
      if(bcrypt.compareSync(passwordInput, passwordFromDB)) {
        res.json({
            status: 'success',
            res_code: '0000',
            message: 'match!',
          });
       } else {
        res.json({
            status: 'error',
            res_code: '0003',
            message: 'dont match!',
          });
       }
    }
  });
});

module.exports = router;