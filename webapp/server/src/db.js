'use strict';
var mysql = require('mysql'),
    utils = require('./utils.js');

console.log("[INFO] Connecting to DB...");

var pool = mysql.createPool({
    connectionLimit: 100,
    host     : 'localhost',
    database : 'hxvote',
    user     : 'root',
    password : 'zde84pzk',
    debug    : false
});

var execQueryWithCallback = function execQueryWithCallback(query, callback){
    console.log("[DB]", query);
    pool.getConnection(function(err, connection){
        if(err) throw err;
        connection.query(query, function(errq, rows, fields) {
            connection.release();
            if (errq) throw errq;
            callback(rows);
        });
    });  
}

var getCategories = function getCategories(callback){
    var query = "SELECT * FROM Category;";
    execQueryWithCallback(query, callback);
}

var getProposals = function getProposals(callback){
    var query = "SELECT * FROM ActionRequest;";
    execQueryWithCallback(query, callback);
}

var getArchivedProposals = function getArchivedProposals(callback){
    var query = "SELECT * FROM ActionRequestArchived;";    
    execQueryWithCallback(query, callback);
}

var saveActionRequest = function saveActionRequest(action, callback){
    var date = utils.getCurrentDate();
    pool.getConnection(function(err, connection){
        if(err) throw err;
        var query = "INSERT INTO ActionRequest (author, description, date) VALUES ("+
        connection.escape(action.author)+","+connection.escape(action.description)+",'"+date+"');";
        console.log("[DB]", query);
        connection.query(query,
            function(errq, rows, fields) {
                connection.release();
                if (errq) {
                    console.log("[DB] Fail !");
                    callback(false);
                    throw err;
                }else{
                    console.log("[DB] Success !");
                    callback(true);
                }
            });
    });
}

var deleteActionRequest = function deleteActionRequest(action, callback){
   var query = "DELETE FROM ActionRequest WHERE id="+action.id;
    console.log("[DB]", query);
    pool.getConnection(function(err, connection){
        if(err) throw err;
        connection.query(query,
            function(errq, rows, fields) {
                connection.release();
                if (errq) {
                    console.log("[DB] Fail !");
                    callback(false);
                    throw err;
                }else{
                    console.log("[DB] Success !");
                    callback(true);
                }
            });
    });
}

var deleteArchivedActionRequest = function deleteArchivedActionRequest(action, callback){
   var query = "DELETE FROM ActionRequestArchived WHERE id="+action.id;
    console.log("[DB]", query);
    pool.getConnection(function(err, connection){
        if(err) throw err;
        connection.query(query,
            function(errq, rows, fields) {
                connection.release();
                if (errq) {
                    console.log("[DB] Fail !");
                    callback(false);
                    throw err;
                }else{
                    console.log("[DB] Success !");
                    callback(true);
                }
            });
    });
}

var archiveActionRequest = function archiveActionRequest(action, callback){
    var date = utils.getCurrentDate();
    pool.getConnection(function(err, connection){
        if(err) throw err;
        var query = "INSERT INTO ActionRequestArchived (author, description, date) VALUES ("+
        connection.escape(action.author)+","+connection.escape(action.description)+",'"+date+"');";
        console.log("[DB]", query);
        connection.query(query,
            function(errq, rows, fields) {
                connection.release();
                if (errq) {
                    console.log("[DB] Fail !");
                    callback(false);
                    throw err;
                }else{
                    console.log("[DB] Success !");
                    callback(true);
                }
            });
    });
}

var getActionsOfCategory = function getActionsOfCategory(category, callback){
    var query = "SELECT a.id, a.category_id, a.label, a.votes, a.archivedVotes FROM Action AS a, Category AS c WHERE a.category_id = c.id AND c.label ='"+category+"';";
    console.log("[DB]", query);
    pool.getConnection(function(err, connection){
        if(err) throw err;
        connection.query(query,
            function(errq, rows, fields) {
                connection.release();
                if (errq) {
                    console.log("[DB] Fail !");
                    callback(rows);
                    throw err;
                }else{
                    console.log("[DB] Success !");
                    callback(rows);
                }
            });
    });
}

var voteForAction = function voteForAction(actionId, callback){
    var query = "UPDATE Action SET votes=votes+1, archivedVotes=archivedVotes+1 WHERE id="+actionId+";";
    console.log("[DB]", query);
    pool.getConnection(function(err, connection){
        if(err) throw err;
        connection.query(query,
            function(errq, rows, fields) {
                connection.release();
                if (errq) {
                    console.log("[DB] Fail !");
                    callback(false);
                    throw err;
                }else{
                    console.log("[DB] Success !");
                    callback(true);
                }
            });
    });
}

var resetActionVotes = function resetActionVotes(callback){
    var query = "UPDATE Action SET votes=0";    
    console.log("[DB]", query);
    pool.getConnection(function(err, connection){
        if(err) throw err;
        connection.query(query,
            function(errq, rows, fields) {
                connection.release();
                if (errq) {
                    console.log("[DB] Fail !");
                    callback(false);
                    throw err;
                }else{
                    console.log("[DB] Success !");
                    callback(true);
                }
            });
    });
}

var getActionsOrderedByVotes = function getActionsOrderedByVotes(order, callback){
    var query = "SELECT a.id, a.label, a.shortLabel, a.votes, a.archivedVotes, c.id as categoryId, c.label AS categoryLabel FROM Action AS a, Category AS c WHERE a.category_id = c.id AND a.votes != 0 ORDER BY c.id ASC, a.votes "+ order +";"
    console.log("[DB]", query);
    pool.getConnection(function(err, connection){
        if(err) throw err;
        connection.query(query,
            function(errq, rows, fields) {
                connection.release();
                if (errq) {
                    console.log("[DB] Fail !");
                    callback(rows);
                    throw err;
                }else{
                    console.log("[DB] Success !");
                    callback(rows);
                }
            });
    });
}

var setAdminParams = function setAdminParams(adminParams, callback){
    var query = "UPDATE Administration SET frontAccessible=" + adminParams.frontAccessible+";";
    console.log("[DB]", query);
    pool.getConnection(function(err, connection){
        if(err) throw err;
        connection.query(query,
            function(errq, rows, fields) {
                connection.release();
                if (errq) {
                    console.log("[DB] Fail !");
                    callback(false);
                    throw err;
                }else{
                    console.log("[DB] Success !");
                    callback(true);
                }
            });
    });
}

var getAdminParams = function getAdminParams(callback){
    var query = "SELECT frontAccessible FROM Administration;";
    console.log("[DB]", query);
    pool.getConnection(function(err, connection){
        if(err) throw err;
        connection.query(query,
            function(errq, rows, fields) {
                connection.release();
                if (errq) {
                    console.log("[DB] Fail !");
                    callback(rows[0]);
                    throw err;
                }else{
                    console.log("[DB] Success !");
                    callback(rows[0]);
                }
            });
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
