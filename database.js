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

module.exports = exports;
