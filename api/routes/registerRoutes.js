/**
 *  POST : for create new account
 *       : check if users don't fill all edittext
 *       : check if firstname and lastname are duplicated
 * 
 *  Created by CPU on 11/7/19
 */

/**
 * 0000 register/login/logout successfully
 * 0001 account is exists (data duplicated)
 * 0002 phone number has not been registered (loging in)
 * 0003 icorrect password
 */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModels")

router.post("/", (req, res, next) => {

    var phone_number = req.body.phone_number;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var citizen_id = req.body.citizen_id;
    var userData;

    // check input 
    if (phone_number == null || phone_number == "" ||
        first_name == null || first_name == "" ||
        last_name == null || last_name == "" ||
        citizen_id == null || citizen_id == "" ||
        req.body.password == null || req.body.password == "") {
        res.json({
            status: 'error',
            res_code: '',
            message: 'please fill all information'
        });
        return null;
    }

    bcrypt.hash(req.body.password, 10, function(err, hash) {
        userData = new User({
            _id: new mongoose.Types.ObjectId(),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            citizen_id: req.body.citizen_id,
            password: hash,
            link_account: "false"
        });
    });

    //check if account is exists
    User.find({ citizen_id: req.body.citizen_id }, function (err, docs) {

        if (docs == "") {
            console.log('new account!');

            //save in userModel
            userData.save().then(result => {
                console.log(result);
                res.status(201).json({
                    res_code: "0000",
                    message: "new account success!",
                });
            })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });

        }
        else {
            res.json({
                res_code: '0001',
                status: 'ok',
                message: 'has this account already'
            });
        }

    });

});

module.exports = router;