var socket = io('flusin.ovh:8890');

var users = 0;
var usersMax = 250;
var userIncrement = 50;

var category = {
   id : 1
};

var action = {
   id : 1
}

var proposal = {
   author: "Gremlins",
   description: "Gnark Gnark Gnark"
}
console.log("Max users:", usersMax);
console.log("Increment:", userIncrement);

while(users < usersMax){
   console.log("Go for " + users + "user(s)");
   for(var i=0; i<users; i++){
      socket.emit("getCategories");
      socket.emit("getActionsOfCategory", category);      
      socket.emit("getCategories");
      socket.emit("getActionsOfCategory", category);      
      socket.emit("vote", 1);      
      socket.emit("vote", 2);
      socket.emit("getCategories");
      socket.emit("getActionsOfCategory", category);
      socket.emit("getCategories");
      socket.emit("getActionsOfCategory", category);
      socket.emit("vote", 1);
      socket.emit("vote", 2);
      socket.emit("propose", proposal);
   }
   users += userIncrement;
}