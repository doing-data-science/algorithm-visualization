'use strict';

const fileInput = document.querySelector('#file');
const originCanvas = document.querySelector('#origin');
const grayCanvas = document.querySelector('#gray');
const binaryzationCanvas = document.querySelector('#binaryzation');
const thresholdInput = document.querySelector('#threshold');

const originCanvasCtx = originCanvas.getContext('2d');
const grayCanvasCtx = grayCanvas.getContext('2d');
const binaryzationCanvasCtx = binaryzationCanvas.getContext('2d');

const Timer = window.monitor.Timer;
const FPSBoard = window.monitor.FPSBoard;

const fpsBoard = new FPSBoard({
  container: '#boards',
  boardColor: '#000',
  textColor: '#5bfcff',
  containerStyles: {
    position: 'absolute'
  }
});

const timer = new Timer({
  fps: 50
});

const render = () => {
};

const grayFilter = (imageData) => {
  const data = imageData.data;
  for (let i = 0, len = data.length; i < len; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // const a = data[i + 3];
    const result = parseInt((r + g + b) / 3, 10);
    imageData.data[i] = result;
    imageData.data[i + 1] = result;
    imageData.data[i + 2] = result;
    // imageData.data[i + 3] = a;
  }
  return imageData;
};

const binaryzationFilter = (imageData, threshold = 128) => {
  const data = imageData.data;
  for (let i = 0, len = data.length; i < len; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // const a = data[i + 3];
    imageData.data[i] = r > threshold ? 255 : 0;
    imageData.data[i + 1] = g > threshold ? 255 : 0;
    imageData.data[i + 2] = b > threshold ? 255 : 0;
    // imageData.data[i + 3] = a;
  }
  return imageData;
};

const copyImageData = imagedata => {
  return new ImageData(new Uint8ClampedArray(imagedata.data), imagedata.width, imagedata.height);
};

function Renderer() {
  this.img = null;
  this.imageData = null;
  this.init();
  this.bindEvent();
}

Renderer.prototype.init = function() {
  const defaultImage = './page/test.png';
  this.loadImage(defaultImage, () => {
    this.resolveImage();
  });
  this.bindEvent();
};

Renderer.prototype.resolveImage = function(threshold) {
  const img = this.img;
  const imageData = copyImageData(this.imageData);
  let data = grayFilter(imageData);
  grayCanvasCtx.putImageData(data, 0, 0, 0, 0, img.width, img.height);
  data = binaryzationFilter(data, threshold);
  binaryzationCanvasCtx.putImageData(data, 0, 0, 0, 0, img.width, img.height);
};

Renderer.prototype.loadImage = function(src, callback) {
  const img = new Image();
  img.onload = () => {
    originCanvasCtx.drawImage(img, 0, 0, img.width, img.height);
    this.imageData = originCanvasCtx.getImageData(0, 0, img.width, img.height);
    callback();
  };
  img.src = src;
  this.img = img;
};

Renderer.prototype.bindEvent = function() {
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const result = e.target.result;
      this.loadImage(result, () => {
        this.resolveImage();
      });
    };
  }, false);

  thresholdInput.addEventListener('change', (e) => {
    const value = e.target.value;
    const currentValue = 256 / 100 * value;
    document.querySelector('#threshold-label').innerText = currentValue;
    this.resolveImage(currentValue);
  }, false);
};

new Renderer();

timer.update(() => {
  render();
  fpsBoard.tick();
});

timer.start();
