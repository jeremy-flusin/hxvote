'use strict';
var mysql = require('mysql'),
    utils = require('./utils.js');

console.log("[INFO] Connecting to DB...");

var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'hxvote',
    user     : 'root',
    password : 'root'
});

connection.connect();

var getCategories = function getCategories(callback){
    connection.query('SELECT * FROM Category', function(err, rows, fields) {
        if (err) throw err;
        callback(rows);
    });
    
}

var getProposals = function getProposals(callback){
    connection.query('SELECT * FROM ActionRequest', function(err, rows, fields) {
        if (err) throw err;
        callback(rows);
    });
    
}

var saveActionRequest = function saveActionRequest(action, callback){
    var date = utils.getCurrentDate();
    var query = "INSERT INTO ActionRequest (author, description, date) VALUES ('"+action.author+"','"+action.description+"','"+date+"');";
    console.log("[DB]", query);
    connection.query(query,
        function(err, rows, fields) {
            if (err) {
                console.log("[DB] Fail !");
                callback(false);
                throw err;
            }else{
                console.log("[DB] Success !");
                callback(true);
            }
    });
}

module.exports = {
    getCategories: getCategories,
    getProposals: getProposals,
    saveActionRequest: saveActionRequest
};
