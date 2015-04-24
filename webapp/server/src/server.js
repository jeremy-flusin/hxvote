'use strict';
var koa = require('koa'),
    serve = require('koa-static'),
    http = require('http'),
    path = require("path"),
    io = require('socket.io'),
    db = require('./db.js');

var port = process.argv[2] || 8888;

console.log("[INFO] Launching HX Vote Server...");
var app = koa();

app.use(function*(next){
    console.log("[INFO] starting serving : " + this.originalUrl );
    yield next;
    console.log("[INFO] ending serving");    
});

app.use(serve(path.resolve(__dirname, '../../client/')));
app.listen(port);

console.log("[INFO] \t... Static file server running at http://localhost:" + port + "/");

var server = http.Server(app.callback()),
ioserver = io(server);

ioserver.on('connection', function(socket) {
    console.log("[INFO] \t... Incoming connection");
    socket.on('getCategories', function() {
      	db.getCategories(function(result){
           socket.emit('getCategories_result', result); 
        });
    });    
    socket.on('getActionsOfCategory', function(category) {
      	db.getActionsOfCategory(category, function(result){
           socket.emit('getActionsOfCategory_result', result); 
        });
    });    
    socket.on('getActionsOrderedByVotes', function() {
      	db.getActionsOrderedByVotes(function(result){
           socket.emit('getActionsOrderedByVotes_result', result); 
        });
    });
    socket.on('propose', function(action) {
        db.saveActionRequest(action, function(bool){
            socket.emit('propose_result', bool);
        });
    });
    socket.on('getProposals', function() {
      	db.getProposals(function(result){
           socket.emit('getProposals_result', result); 
        });
    });
    socket.on('vote', function(actionId) {
        db.voteForAction(actionId, function(bool){
            socket.emit('vote_result', bool);
        });
    });
});
server.listen(++port);

console.log("[INFO] \t... Socket connections at http://localhost:" + port + "/");
console.log("[INFO] \t ...Listening on websockets.");

