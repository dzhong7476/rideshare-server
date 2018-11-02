var nodemailer = require('nodemailer');
var express = require('express')
var mailOptions = {
  from: 'rideshareofficial.com',
  to: 'zhongdai.sw@gmail.com',
  subject: 'Sending Email using Node.js',
  text: ''
};
var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rideshareofficial@gmail.com',
    pass: 'Rideshare99'
  }
  
});


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
// http.createServer(function (req, res) {
//   let body = [];
//   req.on('data', (chunk) => {
//     body.push(chunk);
//   }).on('end', () => {
//     body = Buffer.concat(body).toString();
//     parsing(body)
//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });
//     // at this point, `body` has the entire request body stored in it as a string
//   });
//
//
//   res.end(); //end the response
// }).listen(443); //the server object listens on port 8080
