'use strict';
var exec = require('exec');
var path = require('path'); 

var child_process = require('child_process');


var play = function play(shortLabel){
    var filePath = '/home/jflusin/Applications/hxvote/webapp/server/resources/';
    
    path.exists(filePath+shortLabel+'.mp3', function(exists) { 
        if (exists) {  
                child_process.exec('exec vlc '+filePath+shortLabel+'.mp3', 
                function(error, stdout, stderr){
                    console.log(stdout);
                });
          }else {
            path.exists(filePath+shortLabel+'.avi', function(exists2) {
                if (exists2) { 
                    child_process.exec('exec vlc -f '+filePath+shortLabel+'.avi', 
                    function(error, stdout, stderr){
                        console.log(stdout);
                    });
                }else{
                    console.log('No media file found for action', shortLabel);
                }
            });
          }
    }); 
}

var stop = function stop(){
    child_process.exec('killall -9 vlc', 
    function(error, stdout, stderr){
        console.log(stdout);
    });
}

module.exports = {
    play: play,
    stop: stop
};
