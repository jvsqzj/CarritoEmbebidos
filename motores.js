var L_red = new pwm.PWM('GPIO18');
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
  }