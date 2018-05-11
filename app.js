
var express = require('express');
var pressController = require('./controllers/pressController');
var socket = require('socket.io');

//App setup
var app = express();

var server = app.listen(8080,'192.168.1.9', function(){
    console.log('listenting to requests on port 8080');
});


//Static files
app.use(express.static('public'));

var io = socket(server);

io.on('connection', function(socket){
    console.log('New socket connection made at', socket.id);
});





