var express = require('express');
var router = express.Router();

var Message = require('../models/message');


router.get('/', function (req,res,next) {
    Message.find()
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
})

router.post('/', function (req, res, next) {

    var message = new Message({
        content: req.body.content
    });

    message.save(function (err, result) {
        if(err){
            return res.status(500).json({
                title: 'An error occred',
                error: err
            });

        }
        res.status(201).json({
            message : 'Saved message',
            obj : result
        });
    })

});

router.patch('/:id', function (req,res,next) {
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
    /*
    Message.findById(req.params.id, function (err, message) {
        if(err){
            return res.status(500).json({
                title: 'An error occred',
                error: err
            });

        }
        if(!message){
            return res.status(500).json({
                title: 'No Message found!',
                error : {
                    message : 'Message not found'
                }
            })
        }
        message.content = req.body.content;
        message.save(function (err, result) {
            console.log('save message !!!');
            if(err){
                console.log('error occured !!!');
                return res.status(500).json({
                    title: 'An error occred',
                    error: err
                });

            }
            console.log('message is updated !!!');
            res.status(200).json({
                message: 'Updated message',
                obj: result
            })
        });
    })*/
})


module.exports = router;
