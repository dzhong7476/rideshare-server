var nodemailer = require('nodemailer');
var http = require('http');
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
  text: ''
};
function parsing(msg) {
  var parts = msg.split('\n');
  var paymentMethods = parts[6].split(",");
  var styledpaymentmethods = '';
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
    });
    // at this point, `body` has the entire request body stored in it as a string
  });


  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080
