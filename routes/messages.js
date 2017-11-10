var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

var Message = require('../models/message');





router.get('/', function (req,res,next) {
    Message.find()
        .populate('user','firstName')
        .exec(function (err,messages) {
            if(err){
                return res.status(500).json({
                    title: 'An error occred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Succes',
                obj: messages
            })
        });
});

router.use('/', function(req, res, next){
    jwt.verify(req.query.token,'secret', function (err, decoded) {
        if(err){
            return res.status(401).json({
                title : 'Not Authenticated',
                error : err
            });
        }
        next();
    })
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    var user_id = decoded.user._id;
    User.findById(user_id, function (err, user) {
        if(err){
            return res.status(500).json({
                title : 'An error occurred',
                error: err
            })
        }

        var message = new Message({
            content: req.body.content,
            user: user
        });

        message.save(function (err, result) {
            if(err){
                return res.status(500).json({
                    title: 'An error occred',
                    error: err
                });

            }
            user.messages.push(result._id);
            user.save();
            res.status(201).json({
                message : 'Saved message',
                obj : result
            });
        })
    })


});

router.patch('/:id', function (req,res,next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        if(message.user != decoded.user._id){
            return res.status(401).json({
                title : 'Not Authenticated',
                error : {message : 'Users do not match'}
            });
        }
        message.content = req.body.content;
        message.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated message',
                obj: result
            });
        });
    });

})

router.delete('/:id', function (req,res,next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        if(message.user != decoded.user._id){
            return res.status(401).json({
                title : 'Not Authenticated',
                error : {message : 'Users do not match message.user '+message.user+ ' decoded.user._id '+decoded.user._id}
            });
        }
       message.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Removed message',
                obj: result
            });
        });
    });

})


module.exports = router;
