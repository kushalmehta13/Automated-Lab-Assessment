const mysql = require('mysql');

var exports = {};

const host = "seproject.clwivtvb39ox.us-east-2.rds.amazonaws.com";
const database = "SEProject";
const user = "SEProject";
const password = "seproject";
const port = 3306;

exports.connectToRDS = function() {
  var connection = mysql.createConnection({
    host: host,
    database: database,
    user: user,
    password: password,
    port: port
  });
  return connection;
};

exports.getQuestion = function(connection, q_id, complete) {
  connection.query("SELECT Ques_text from Ques WHERE sub_ID=? AND Ques_ID=?", ["14CS01", q_id.toString()], (err, results, fields) => {
    if(err) return complete(null, 500);
    if(results.length == 0) return complete(null, 404);
    else return complete(results[0].Ques_text, 200);
  });
};

exports.login = function(connection, email, password, completeWithStatus) {
  connection.query("SELECT * FROM Student WHERE email=? AND password=?", [email.toString(), password.toString()], (err, results, fields) => {
    if(err) return completeWithStatus(500);
    if(results.length == 0) return completeWithStatus(404);
    else return completeWithStatus(200);
  });
};

module.exports = exports;
