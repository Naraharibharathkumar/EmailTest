var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//API FOR Sending email
router.post('/sendEmail', function (req, res, next) {
    var emailId = req.body.EmailId;
    var type = req.body.Type;
    var transporter = nodemailer.createTransport('smtps://archerlml277@gmail.com:081152016@smtp.gmail.com');
    if(type=='Notification'){
        var mailOptions = {
            from: '"Archer Lucy ?" <archerlml277@gmail.com>', // sender address
            to: emailId+', '+emailId, // list of receivers
            subject: 'Report Status Changed', // Subject line
            text: 'The Status of the report you submitted has been changed, Please login to the app to check the updates', // plaintext body
            html: '<b>The Status of the report you submitted has been changed, Please login to the app to check the updates</b>' // html body
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                res.status(204);
                res.end();
            }
            else {
                res.status(200);
                res.end();
            }
        });
    }
    else if(type=='Confirmation'){
        var mailOptions = {
            from: '"Archer Lucy ?" <archerlml277@gmail.com>', // sender address
            to: emailId+', '+emailId, // list of receivers
            subject: 'Report Resolved', // Subject line
            text: 'The Report you submitted has been resolved', // plaintext body
            html: '<b>The Report you submitted has been resolved</b>' // html body
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                res.status(204);
                res.end();
            }
            else{
                res.status(200);
                res.end();
            }
            console.log('Message sent: ' + info.response);
        });
    }
});

module.exports = router;
