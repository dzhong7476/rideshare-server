var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rideshareofficial@gmail.com',
    pass: 'Rideshare99'
  }
});

var mailOptions = {
  from: 'rideshareofficial.com',
  to: 'zhongdai.sw@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};
var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080
