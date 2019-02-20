var nodemailer = require('nodemailer');
//var express = require('express');

var cors = require('cors');
var http = require('http');
var mailOptions = {
  from: 'XXXXXXXXXXXXX.com',
  to: 'XXXXXXXXXXX@gmail.com',
  subject: 'Sending Email using Node.js',
  text: ''
};
var port = process.env.PORT? process.env.PORT: 5000;


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'XXXXXXXX@gmail.com',
    pass: 'XXXXXXXX'
  }

});


function parsing(msg) {
  var parts = msg.split('\n');
  var paymentMethods = parts[6].split(",");
  var styledpaymentmethods = '';
  var styledemails = '';
  for (var i = 0; i < paymentMethods.length; i++) {
    styledpaymentmethods += paymentMethods[i];
    styledpaymentmethods += " ";
  }
  mailOptions.to = parts[0];
  mailOptions.subject = parts[1];
  mailOptions.text = "Date: " + parts[2] + "\n" +
  "Time: " + parts[3] + "\n" +
  "Start Location: " + parts[4] + "\n" +
  "Destination: " + parts[5] + "\n" +
  "PaymentMethods: " + styledpaymentmethods + "\n" +
  "Cost: " + parts[7] + "\n" +
  "Description: " + parts[8] + "\n";

}

//create a server object:
http.createServer(function (req, res) {
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    parsing(body)
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);

      }
      res.write(); //end the response
      res.end();
    });
    // at this point, `body` has the entire request body stored in it as a string
  });



}).listen(port); //the server object listens on port 8080
