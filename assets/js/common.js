// =========================================================
//
//  common.js
//  全ページ共通で利用するjavascriptを記載
//
// =========================================================

var width  = document.body.clientWidth;
var height = document.body.clientHeight;
var canvas = document.getElementById('backgroundCanvas');
var ctx = canvas.getContext('2d');
var fps = 60;
var frameTime = 1000 / fps;
var objArr = [];
var instanceNum = 0;
var lastTimeRender = +new Date();
var lastTimePushObj = +new Date();

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var debounce = function(object, eventType, callback){
  var timer;

  object.addEventListener(eventType, function() {
    clearTimeout(timer);
    timer = setTimeout(function(){
      callback();
    }, 500);
  }, false);
};

var canvasResize = function() {
  ctx.clearRect(0, 0, width, height);
  width  = document.body.clientWidth;
  canvas.width = width;
  canvas.height = height;
};

debounce(window, 'resize', function(){
  canvasResize();
});

canvasResize();

var motionObj = function(x, y) {
  this.r = getRandomInt(4, 20);
  this.g = getRandomInt(5, 10) / 1000 / fps;
  this.t = 0;
  this.k = getRandomInt(1, 5) / 1000;
  this.x = x;
  this.px = x;
  this.ax = 0;
  this.vx = 0.5;
  this.hsl = getRandomInt(60, 120) + ', 45%, 80%';
  this.alpha = getRandomInt(30, 50);
  this.y = y;
};

motionObj.prototype.move = function () {
  this.t += frameTime;
  this.ax = (this.px - this.x) * this.k;
  this.vx += this.ax;
  this.x += this.vx;
  this.y = 1 / 2 * this.g * this.t * this.t - this.r * 3;
};

motionObj.prototype.fadeAway = function () {
  if (this.t < 1500) return;
  this.alpha -= 0.5;
};

motionObj.prototype.render = function (){
  ctx.beginPath();
  ctx.fillStyle = 'hsla(' + this.hsl + ', ' + (this.alpha / 100) + ')';
  ctx.arc(this.x, this.y, this.r, 0, 360 * Math.PI/180, false);
  ctx.fill();
  ctx.closePath();
};

motionObj.prototype.isLast = function (){
  if (this.alpha < 0) {
    return true;
  } else {
    return false;
  }
};

var render = function() {
  ctx.clearRect(0, 0, width, height);
  instanceNum = 0;
  for (var i = 0; i < objArr.length; i++) {
    if(objArr[i]) {
      instanceNum++;
      objArr[i].move();
      objArr[i].fadeAway();
      objArr[i].render();
      if (objArr[i].isLast()) {
        delete objArr[i];
      }
    }
  }
};

var renderloop = function() {
  var now = +new Date();
  requestAnimationFrame(renderloop);
  if (now - lastTimeRender > frameTime) {
    render();
    lastTimeRender = +new Date();
  }
  
  if (now - lastTimePushObj > 250) {
    for (var i = 0; i < 10; i++) {
      objArr.push(new motionObj(Math.random() * width, 0));
    }
    lastTimePushObj = +new Date();
  }
};
renderloop();
