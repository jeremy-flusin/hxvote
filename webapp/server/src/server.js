'use strict';
var koa = require('koa'),
    router = require('koa-router')(),
    auth = require('koa-basic-auth'),
    mount = require('koa-mount'),
    serve = require('koa-static'),
    http = require('http'),
    path = require("path"),
    io = require('socket.io'),
    db = require('./db.js'),
    player = require('./player.js');

var username = "admin";
var password = "zde84pzk";

var port = process.argv[2] || 8888;

console.log("[INFO] Launching HX Vote Server...");
var app = koa();

router.get('/front', function*(next){
    console.log("[INFO] Serving : " + this.originalUrl );
    yield next; 
});
router.get('/admin', function*(next){
    console.log("[INFO] Serving : " + this.originalUrl );
    yield next; 
});
router.get('/back', function*(next){
    console.log("[INFO] Serving : " + this.originalUrl );
    yield next; 
});

router.all('/', function *() {
  console.log("REDIRECTING");  
  this.redirect('/front/index.html');
  this.status = 301;  
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(function *(next){
  try {
    yield next;
  } catch (err) {
    if (401 == err.status) {
      this.status = 401;
      this.set('WWW-Authenticate', 'Basic');
      this.body = 'Acces refuse.';
    } else {
      throw err;
    }
  }
});
app.use(mount('/admin', auth({ name: username, pass: password })));
app.use(mount('/back', auth({ name: username, pass: password })));
app.use(serve(path.resolve(__dirname, '../../client')));
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
    socket.on('getActionsOrderedByVotes', function(order) {
      	db.getActionsOrderedByVotes(order, function(result){
           socket.emit('getActionsOrderedByVotes_result', result, order); 
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
    socket.on('deleteProposal', function(action){
         db.deleteActionRequest(action, function(bool){
            socket.emit('deleteProposal_result', bool);
         });
    });   
    socket.on('archiveActionRequest', function(action){
         db.archiveActionRequest(action, function(bool){
            socket.emit('archiveActionRequest_result', bool);
         });
    });
    socket.on('getArchivedProposals', function() {
         db.getArchivedProposals(function(result){
           socket.emit('getArchivedProposals_result', result); 
        });
    });
    socket.on('deleteArchivedProposal', function(action){
         db.deleteArchivedActionRequest(action, function(bool){
            socket.emit('deleteArchivedProposal_result', bool);
         });
    });   
    socket.on('vote', function(actionId) {
        db.voteForAction(actionId, function(bool){
            socket.emit('vote_result', bool);
        });
    });   
    socket.on('resetVotes', function() {
        db.resetActionVotes(function(bool){
            socket.emit('resetVotes_result', bool);
        });
    });
    socket.on('getAdminParams', function() {
        db.getAdminParams(function(result){
            socket.emit('getAdminParams_result', result);
        });
    });
    socket.on('setAdminParams', function(adminParams) {
        db.setAdminParams(adminParams, function(bool){
            socket.emit('setAdminParams_result', bool);
        });
    });
    socket.on('saveNewCategory', function(category) {
        db.saveNewCategory(category, function(bool){
            socket.emit('saveNewCategory_result', bool);
        });
    });
    socket.on('play-sound', function(shortLabel) {
       player.play(shortLabel);       
    });
    socket.on('stop-play', function() {
       player.stop();       
    });
});
server.listen(++port);

console.log("[INFO] \t... Socket connections at http://localhost:" + port + "/");
console.log("[INFO] \t ...Listening on websockets.");
console.log("[INFO] Admin et BackEnd pages can be accessed with:");
console.log("[INFO] \t Username:  "+username+"     Password:  "+password);