const mysql = require('mysql');

var exports = {};

const host = "seproject.clwivtvb39ox.us-east-2.rds.amazonaws.com";
const database = "SEProject";
const user = "SEProject";
const password = "seproject";

exports.connectToRDS = function() {
  var connection = mysql.createConnection({
    host: host,
    database: database,
    user: user,
    password: password,
    port: 3306
  });
  return connection;
};

exports.login = function(connection, email, password, completeWithStatus) {
  connection.query("SELECT * FROM Student WHERE email=? AND password=?", [email.toString(), password.toString()], (err, results, fields) => {
    if(err) return completeWithStatus(500);
    if(results.length == 0) return completeWithStatus(404);
    else return completeWithStatus(200);
  });
};

module.exports = exports;
