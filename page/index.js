'use strict';

var boardWidth = document.querySelector('#boards').clientWidth;
var WIDTH = boardWidth / 3 - 15;

var isMobile = boardWidth < 500;

var sorting = window.sorting;
var monitor = window.monitor;

if (isMobile) {
  WIDTH = boardWidth;
}

var renderQueue = [];
var comparison = parseInt(WIDTH / 2, 10);

var audioData;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext();
var xml = new XMLHttpRequest();
xml.responseType = 'arraybuffer';
xml.open('GET', './page/piano.wav', true);
xml.onload = function() {
  ctx.decodeAudioData(
    xml.response,
    function(_data) {
      audioData = _data;
      init();
    },
    function(e) {
      alert(e.err);
    }
  );
};
xml.send();

var play = function(rate) {
  if (!audioData) {
    return;
  }
  var bufferSource = ctx.createBufferSource();
  bufferSource.buffer = audioData;
  bufferSource.playbackRate.value = rate || 1;
  bufferSource.connect(ctx.destination);
  bufferSource.start(0);
};

function ShowBoard(options) {
  var opts = options || {};
  opts.width = opts.width || WIDTH;
  opts.height = opts.height || 300;
  opts.text = opts.text || '';
  this.options = opts;
  this.context = null;
  this.buffer = [];
  this.init();
}

ShowBoard.prototype.init = function() {
  var canvas = this.options.container;
  canvas.width = this.options.width;
  canvas.height = this.options.height;
  var context = canvas.getContext('2d');
  this.context = context;
};

ShowBoard.prototype.render = function() {
  var data = this.buffer.shift();
  if (!data) {
    return;
  }
  play(data[1] / 50);
  var context = this.context;
  context.clearRect(0, 0, this.options.width, this.options.height);
  context.font = '12px Arial';
  context.fillText(this.options.text, 2, 14);

  data[0].forEach(function(height, index) {
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = '#fff';
    context.moveTo(index * 2 - 1, this.options.height - height);
    context.lineTo(index * 2 - 1, this.options.height);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.strokeStyle = 'blue';
    context.moveTo(index * 2, this.options.height - height);
    context.lineTo(index * 2, this.options.height);
    context.stroke();
    context.closePath();
  }.bind(this));
};

ShowBoard.prototype.clearBuffer = function() {
  this.buffer = [];
};

ShowBoard.prototype.addToBuffer = function(data, data2) {
  this.buffer.push([data, data2]);
};

var makeRandomArray = function(size) {
  var res = [];
  while (size--) {
    res.push(size / 1.5);
  }
  res = res.sort(function() {
    return 0.5 - Math.random();
  });
  return res;
};

var init = function() {
  Object.keys(sorting).forEach(function(name) {
    var handle = sorting[name];
    var canvas = document.createElement('canvas');
    document.querySelector('#boards').appendChild(canvas);
    var showBoard = new ShowBoard({
      height: 150,
      container: canvas
    });
    canvas.addEventListener('click', function(e) {
      var handle = sorting[name];
      showBoard.clearBuffer();
      handle(makeRandomArray(comparison), function(a, b) {
        return a - b;
      }, function(array, current) {
        showBoard.addToBuffer(array.slice(0), current);
      });
    }, false);
    showBoard.clearBuffer();
    var temp = +new Date();
    handle(makeRandomArray(comparison), function(a, b) {
      return a - b;
    }, function(array, current) {
      showBoard.addToBuffer(array.slice(0), current);
    });
    var temp1 = +new Date();
    var title = name + ' - comparisons: ' + comparison + ' spent: ' + (temp1 - temp) + ' ms';
    canvas.title = title;
    showBoard.options.text = title;
    renderQueue.push(showBoard);
  });

  var Timer = monitor.Timer;
  var FPSBoard = monitor.FPSBoard;

  var fpsBoard = new FPSBoard({
    container: '#boards',
    boardColor: '#000',
    textColor: '#5bfcff',
    containerStyles: {
      position: 'absolute'
    }
  });

  var timer = new Timer({
    fps: 50
  });
  timer.update(function() {
    fpsBoard.tick();
    renderQueue.forEach(function(item) {
      item.render();
    });
  });

  timer.start();

  renderQueue.forEach(function(item) {
    item.render();
    item.clearBuffer();
  });
};

var ajax = function(url, successCallback, failCallback) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        successCallback(this.responseText);
      } else {
        failCallback();
      }
    }
  };
  request.send();
  request = null;
};

ajax('./README.md', function(d) {
  document.querySelector('#readme').innerHTML = marked.parse(d);
});
