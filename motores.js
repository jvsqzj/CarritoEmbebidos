var gpio = require("gpio");

var _open = function(pin, fn) { return gpio.export(pin, {ready: fn}); };

var _close = function(pin, fn) {
	if(typeof pin === "number") {
		gpio.unexport(pin, fn);
	} else if(typeof pin === "object") {
		pin.unexport(fn);
	}
};

var car = function(opts) {

	opts = opts || {};
	if(typeof opts.L_red !== "number") opts.L_red = 17;
	if(typeof opts.L_black !== "number") opts.L_black = 18;
	if(typeof opts.R_red !== "number") opts.R_red = 22;
	if(typeof opts.R_black !== "number") opts.R_black = 23;

	this.L_red = _open(opts.L_red);
	this.L_black = _open(opts.L_black);
	this.R_red = _open(opts.R_red);
	this.R_black = _open(opts.R_black, opts.ready);
};

car.prototype.forward = function() {
	this.L_red.set();
	this.R_red.set();
	this.L_black.set(0);
	this.R_black.set(0);
	console.log('Se mueve hacia adelante');
};

car.prototype.backward = function() {
  this.L_red.set(0);
  this.R_red.set(0);
  this.L_black.set();
  this.R_black.set();
  console.log('Se mueve hacia atrás');
}

car.prototype.right = function (){
  this.L_red.set();
  this.R_red.set(0);
  this.L_black.set(0);
  this.R_black.set(0);
  console.log('Se mueve hacia la derecha');
}

car.prototype.left = function (){
  this.L_red.set(0);
  this.R_red.set();
  this.L_black.set(0);
  this.R_black.set(0);
  console.log('Se mueve hacia la izquierda');
}

car.prototype.stop = function (){
  this.L_red.set(0);
  this.R_red.set(0);
  this.L_black.set(0);
  this.R_black.set(0);
  console.log('Se detuvo');
}

exports.init = function(opts){ return new car(opts); };