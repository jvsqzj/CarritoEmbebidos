//import { loadavg } from "os";

//Make connection

var serverip = document.URL;
console.log(serverip);
var socket = io.connect(serverip);

//Query DOM

var ip = document.getElementById('videoid'),
    enter = document.getElementById('enter'),
    video = document.getElementById('video');

//Emit event
enter.addEventListener('click', function(){
    socket.emit('ip', ip.value);
});

document.onload(function(){
    
});

socket.on('update', function(data){
    video.src = 'http://' + data + ':4747/video';
    document.getElementById('gather').remove();
});

document.addEventListener('DOMContentLoaded', function(){
//var socket = io.connect('http://<<IP>>');
var streaming = true;
//var status = document.getElementById('status');
//var sendingId = document.getElementById('sending-id');


if (window.DeviceMotionEvent !== undefined) {
 /*   window.ondevicemotion = function(e) {
    if (!streaming) return false;
    socket.emit('motion', {
        //'sender':sendingId.value,
        'acceleration':e.accelerationIncludingGravity,
        'interval':e.interval,
        'rotationRate':e.rotationRate        
    });
    };*/
    window.ondeviceorientation = function(e) {
    if (!streaming) return false;
    socket.emit('orientation', {
        //'sender':sendingId.value,
        'alpha': e.alpha,
        'beta': e.beta,
        'gamma': e.gamma
        });
      };
    } else {
      //status.style.display = 'block';
      //status.innerHTML = 'Unfortunately, this device does not have the right sensors.';
    }
  });