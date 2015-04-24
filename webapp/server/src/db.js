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

var getActionsOfCategory = function getActionsOfCategory(category, callback){
    var query = "SELECT a.id, a.category_id, a.label, a.votes FROM Action AS a, Category AS c WHERE a.category_id = c.id AND c.label ='"+category+"';";
    console.log("[DB]", query);
    connection.query(query, function(err, rows, fields) {
        if (err) throw err;
        callback(rows);
    });
}

var voteForAction = function voteForAction(actionId, callback){
    var query = "UPDATE Action SET votes=votes+1 WHERE id="+actionId+";";
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

var getActionsOrderedByVotes = function getActionsOrderedByVotes(callback){
    var query = "SELECT a.id, a.label, a.votes, c.id as categoryId, c.label AS categoryLabel FROM Action AS a, Category AS c WHERE a.category_id = c.id ORDER BY a.votes";
    console.log("[DB]", query);
    connection.query(query, function(err, rows, fields) {
        if (err) throw err;
        callback(rows);
        console.log(rows);
    });
}

module.exports = {
    getCategories: getCategories,
    getActionsOfCategory: getActionsOfCategory,
    getActionsOrderedByVotes: getActionsOrderedByVotes,
    getProposals: getProposals,
    voteForAction: voteForAction,
    saveActionRequest: saveActionRequest
};
