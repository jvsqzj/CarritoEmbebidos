/*var L_red = new pwm.PWM('GPIO18');
var L_black = new pwm.PWM('GPIO23');
var R_red = new pwm.PWM('GPIO24');
var R_black = new pwm.PWM('GPIO25');
var raspi = require('raspi');
var pwm = require('raspi-pwm');

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
  }*/

var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var L_red = new Gpio(4, 'out');
var L_black = new Gpio(5, 'out'); //use GPIO pin 4 as output
var R_red = new Gpio(6, 'out');
var R_black = new Gpio(7, 'out');

function forward(){
  L_red.writeSync(1);
  R_red.writeSync(1);
  L_black.writeSync(0);
  R_black.writeSync(0);
  console.log('Se mueve hacia adelante');
}

function backward(){
  L_red.writeSync(0);
  R_red.writeSync(0);
  L_black.writeSync(1);
  R_black.writeSync(1);
  console.log('Se mueve hacia atrás');
}

function right(){
  L_red.writeSync(1);
  R_red.writeSync(0);
  L_black.writeSync(0);
  R_black.writeSync(0);
  console.log('Se mueve hacia la derecha');
}

function left(){
  L_red.writeSync(0);
  R_red.writeSync(1);
  L_black.writeSync(0);
  R_black.writeSync(0);
  console.log('Se mueve hacia la izquierda');
}

function stop(){
  L_red.writeSync(0);
  R_red.writeSync(0);
  L_black.writeSync(0);
  R_black.writeSync(0);
  console.log('Se detuvo');
}



//forward();

/* function sayHi(){
  console.log('hi');
}

sayHi();

var sayBye = function(){
  console.log('bye');
}

sayBye(); */

/* var counter = function(arr){
  return 'There are ' + arr.length + ' elements in this array';
};

console.log(counter(['shkjhk', 'fsfadf', 'rqwerq'])); */