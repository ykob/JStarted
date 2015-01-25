// =========================================================
//
//  common.js
//  全ページ共通で利用するjavascriptを記載
//
// =========================================================

var width  = document.body.clientWidth;
var height = 440;
var canvas = document.getElementById('back-wave');
var ctx = canvas.getContext('2d');
var fps = 60;
var frameTime = 1000 / fps;
var wavePointArr = [];
var lastTime = +new Date();

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

var backWave = function() {
  this.spy = height * 0.4;
  this.epy = height * 0.45;
  
  var wavePoint = function(x, y) {
    this.k = getRandomInt(1, 10) / 5500;
    this.x = x;
    this.y = y;
    this.py = y;
    this.ay = 0;
    this.vy = 0.5;
  };

  wavePoint.prototype.move = function() {
    this.ay = (this.py - this.y) * this.k;
    this.vy += this.ay;
    this.y += this.vy;
  };
  
  wavePointArr[0] = new wavePoint(width * 0.2, height * 0.6);
  wavePointArr[1] = new wavePoint(width * 0.8, height * 0.2);
};

backWave.prototype.render = function() {
  for (var i = 0; i < wavePointArr.length; i++) {
    wavePointArr[i].move();
  }
  
  ctx.fillStyle = '#42403D';
  
  ctx.beginPath();
  ctx.moveTo(-100, 0);
  ctx.lineTo(-100, this.spy);
  for (var i = 0; i < wavePointArr.length; i++) {
    if (i == wavePointArr.length - 1) {
      ctx.quadraticCurveTo(wavePointArr[i].x, wavePointArr[i].y, width + 100, this.epy);
    } else {
      ctx.quadraticCurveTo(wavePointArr[i].x, wavePointArr[i].y, (wavePointArr[i + 1].x + wavePointArr[i].x) / 2, (wavePointArr[i + 1].y + wavePointArr[i].y) / 2);
    }
  }
  ctx.lineTo(width + 100, 0);
  ctx.lineTo(0, 0);
  ctx.fill();
  ctx.closePath();
};

var render = function() {
  ctx.clearRect(0, 0, width, height);
  backWave.render();
};

var renderloop = function() {
  var now = +new Date();
  
  requestAnimationFrame(renderloop);
  if (now - lastTime < frameTime) {
    return;
  }
  render();
};
renderloop();

var backWave = new backWave();
