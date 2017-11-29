const nodemailer = require('nodemailer');

var exports = {};

let transporter = nodemailer.createTransport({
  service : 'gmail',
  auth : {
    user : 'pesuinfo14@gmail.com',
    pass : 'student123'
  }
});

exports.sendMail = (options, callback) => {
  let mailOptions = options;
  transporter.sendMail(mailOptions, (error, info) => {
    if(error) console.log("Didn't send");
    return callback({ id : info.messageId, response : info.response });
  });
};

module.exports = exports;

/*
* Options should be like
* let mailOptions = {
*    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
*    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
*    subject: 'Hello ✔', // Subject line
*    text: 'Hello world ?', // plain text body
*    html: '<b>Hello world ?</b>' // html body
* };
*/
