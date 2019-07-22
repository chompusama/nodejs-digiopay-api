const router = require('express').Router();
const verify = require('./verifyToken');
const User = require("../models/userModels");

router.post('/', verify, (req, res) => {

    const _id = req.body._id;

    User.findOne({ _id: _id }, function (err, docs) {
        if (docs == null || docs == "") {
            res.json({
                status: 'error',
                message: '_id is invalid',
            });
            return null;
        }
        else {
            // var urlString = docs.income_qrcode_url
            res.json({
                data: docs
            })
        }
    });
    // res.send(req.user);
});

module.exports = router;