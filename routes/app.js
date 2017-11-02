var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res, next) {
    User.findOne({}, function(error,doc){
        if(error){
            return res.send('Error!');
        }
        res.render('node', {email:doc.email });
    })

});



router.post('/', function (req,res,next) {
    var email = req.body.email;
    var user = new User({
    firstName: 'ahmed',
    lastName: 'ben',
    password: 'secret',
    email: email
    });
    user.save(function(data){
        console.log(data);
    });
    res.redirect('/');
});
module.exports = router;
