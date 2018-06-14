
var express = require('express');
var socket = require('socket.io');
var os = require('os');
var replacestream = require('replacestream');
var fs = require('fs');
var path = require('path');
var car = require('./motores.js').init();
var bot = require('./bot.js');

//var mail = require('nodemailer');

//Read server ip
var ifaces=os.networkInterfaces();
var ips = [];
for (var dev in ifaces) {
  var alias=0;
  ifaces[dev].forEach(function(details){
    if (details.family=='IPv4') {
      ips.push(details.address);
      ++alias;
    }
  });
}
var ip = ips.filter(function(d) {
  return d != '127.0.0.1';
})[0];
var port = 8080;

//App setup
var app = express();

var server = app.listen(8080, ip, function(){
    console.log('listenting to requests on: '+ ip +':'+port);
});

function handler (req, res) {
    res.writeHead(200);
    var readStream = fs.createReadStream(__dirname + '/public/index.html')
      .pipe(replacestream('<<IP>>', ip ))
      .pipe(res);
  }

//Static files
app.use(express.static('public'));


const spawn = require('threads').spawn;
var status = 0;

const thread = spawn(function(status, done) {
    // Everything we do here will be run in parallel in another execution context.
    // Remember that this function will be executed in the thread's context,
    // so you cannot reference any value of the surrounding code.
    //var sens = require('./sensor.js');
    var sens = require('./sensor.js');
    while(true){
    /*
        INSERTAR RUTINA DE LEER SENSOR
    */
    var cercania = sens.dist;
        if(cercania < 0.09){
            sem.take(status, function(){
                status = 0;
                sem.leave();
            });
        };
    };
    done({ string : input.string, integer : parseInt(input.string) });
});
 
const thread = spawn(function(status, done) {
    // Everything we do here will be run in parallel in another execution context.
    // Remember that this function will be executed in the thread's context,
    // so you cannot reference any value of the surrounding code.
    while(true){
        switch(status){
            case 0:
                car.stop();
            case 1:
                car.right();
            case 2:
                car.left();
            case 3:
                car.forward();
            case 4:
                car.backward();
        };
    };
    done({ string : input.string, integer : parseInt(input.string) });
});
 
thread
  .send({ string : '123' })
  // The handlers come here: (none of them is mandatory)
  .on('message', function(response) {
    console.log('123 * 2 = ', response.integer * 2);
    thread.kill();
  })
  .on('error', function(error) {
    console.error('Worker errored:', error);
  })
  .on('exit', function() {
    console.log('Worker has been terminated.');
  });


var io = socket(server);

// Make two lists of writable streams, one for the motions of all
// connected devices, and one for the orientations
var streams = {
    'motion': {},
    'orientation': {}
  };
  
  // getStream('faceup','motion') will return a write stream
  // for the faceup-motion.txt file in the data directory.
  // If stream is already open, add it to the global variable
  // 'streams'. If not, create the stream and add it to the list.
  var getStream = function (name, tp) {
    if (typeof streams[tp][name] !== 'undefined') {
      return streams[tp][name];
    } else {
      var stream = fs.createWriteStream(path.join('data',name+'-'+tp+'.txt'));
      streams[tp][name] = stream;
      return stream;
    }
  };  

io.on('connection', function(socket){
    console.log('New socket connection made at', socket.id);
    socket.on('ip', function(data){
        console.log(data);
        socket.emit('update', data);
    });

    socket.on('break', function(data){
        console.log(data);
    });

    socket.on('fwd', function(){
        status = 3;
    });

    socket.on('back', function(){
        status = 4;
    });

    socket.on('orientation',function(data){
        var stream = getStream(data.sender,'orientation');
        //console.log(' ' + data.beta + "\n");
        if(data.beta < -10){
            status = 2;
        }
        else if (data.beta > 10){
            status = 1;
        }
    });
});





