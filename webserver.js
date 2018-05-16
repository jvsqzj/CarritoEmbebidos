var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4 as output
var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
var cssHeaders = {'Content-Type': 'text/css'};
var commonHeaders = {'Content-Type': 'text/html'};
//var L_red = new Gpio(0, 'out');
//var L_black = new Gpio(2, 'out');
//var R_red = new Gpio(3, 'out');
//var R_black = new Gpio(5, 'out');


function css(request, response) {
  if (request.url === '/styles.css') {
    response.writeHead(200, {'Content-type' : 'text/css'});
    var fileContents = fs.readFileSync('./views/styles.css', {encoding: 'utf8'});
    response.write(fileContents);
  }
}  

http.listen(8080, '172.21.255.90'); //listen to port 80
function handler (req, res) { //create server
  router.css(request, response);
  fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
}

io.sockets.on('connection', function (socket) {// WebSocket Connection
  var lightvalue = 0; //static variable for current status
  pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton
    if (err) { //if an error
      console.error('There was an error', err); //output error message to console
      return;
    }
    lightvalue = value;
    socket.emit('light', lightvalue); //send button status to client
  });
  socket.on('light', function(data) { //get light switch status from client
    lightvalue = data;
    if (lightvalue != LED.readSync()) { //only change LED if status has changed
      LED.writeSync(lightvalue); //turn LED on or off
    }
  });
});

process.on('SIGINT', function () { //on ctrl+c
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport LED GPIO to free resources
  pushButton.unexport(); // Unexport Button GPIO to free resources
  process.exit(); //exit completely
});

function forward(){
  raspi.init(() => {
    L_red.write(1);
    R_red.write(1);
    L_black.write(0);
    R_black.write(0);
  })
}

function backward(){
  raspi.init(() => {
    L_red.write(0);
    R_red.write(1);
    L_black.write(0);
    R_black.write(1);
  })
}

function right(){
  raspi.init(() => {
    L_red.write(1);
    R_red.write(0);
    L_black.write(0);
    R_black.write(1);   //  o ponerlo en cero
  })
}

function left(){
  raspi.init(() => {
    L_red.write(0);
    R_red.write(1);
    L_black.write(1);   //  o ponerlo en cero
    R_black.write(0);   
  })
}

function stop(){
  raspi.init(() => {
    L_red.write(0);
    R_red.write(0);
    L_black.write(0);   //  o ponerlo en cero
    R_black.write(0);   
  })
}