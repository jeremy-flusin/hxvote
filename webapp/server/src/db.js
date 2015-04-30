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

var getArchivedProposals = function getArchivedProposals(callback){
    connection.query('SELECT * FROM ActionRequestArchived', function(err, rows, fields) {
        if (err) throw err;
        callback(rows);
    });
    
}

var saveActionRequest = function saveActionRequest(action, callback){
    var date = utils.getCurrentDate();
    var query = "INSERT INTO ActionRequest (author, description, date) VALUES ("+
        connection.escape(action.author)+","+connection.escape(action.description)+",'"+date+"');";
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

var deleteActionRequest = function deleteActionRequest(action, callback){
   var query = "DELETE FROM ActionRequest WHERE id="+action.id;
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

var deleteArchivedActionRequest = function deleteArchivedActionRequest(action, callback){
   var query = "DELETE FROM ActionRequestArchived WHERE id="+action.id;
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

var archiveActionRequest = function archiveActionRequest(action, callback){
    var date = utils.getCurrentDate();
    var query = "INSERT INTO ActionRequestArchived (author, description, date) VALUES ("+
        connection.escape(action.author)+","+connection.escape(action.description)+",'"+date+"');";
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
    var query = "SELECT a.id, a.category_id, a.label, a.votes, a.archivedVotes FROM Action AS a, Category AS c WHERE a.category_id = c.id AND c.label ='"+category+"';";
    console.log("[DB]", query);
    connection.query(query, function(err, rows, fields) {
        if (err) throw err;
        callback(rows);
    });
}

var voteForAction = function voteForAction(actionId, callback){
    var query = "UPDATE Action SET votes=votes+1, archivedVotes=archivedVotes+1 WHERE id="+actionId+";";
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

var resetActionVotes = function resetActionVotes(callback){
    var query = "UPDATE Action SET votes=0";    
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

var getActionsOrderedByVotes = function getActionsOrderedByVotes(order, callback){
    var query = "SELECT a.id, a.label, a.votes, a.archivedVotes, c.id as categoryId, c.label AS categoryLabel FROM Action AS a, Category AS c WHERE a.category_id = c.id AND a.votes != 0 ORDER BY c.id ASC, a.votes "+ order +";"
    console.log("[DB]", query);
    connection.query(query, function(err, rows, fields) {
        if (err) throw err;
        callback(rows);
        console.log(rows);
    });
}

var setAdminParams = function setAdminParams(adminParams, callback){
    var query = "UPDATE Administration SET frontAccessible=" + adminParams.frontAccessible+";";
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

var getAdminParams = function getAdminParams(callback){
    var query = "SELECT frontAccessible FROM Administration;";
    console.log("[DB]", query);    
    connection.query(query, function(err, rows, fields) {
        if (err) throw err;
        callback(rows[0]);
        console.log(rows[0]);
    });
}

module.exports = {
    getCategories: getCategories,
    getActionsOfCategory: getActionsOfCategory,
    getActionsOrderedByVotes: getActionsOrderedByVotes,
    getProposals: getProposals,
    getArchivedProposals: getArchivedProposals,
    voteForAction: voteForAction,
    resetActionVotes: resetActionVotes,
    saveActionRequest: saveActionRequest,
    deleteActionRequest: deleteActionRequest,
    archiveActionRequest: archiveActionRequest,
    deleteArchivedActionRequest: deleteArchivedActionRequest,
    getAdminParams: getAdminParams,
    setAdminParams: setAdminParams
};
