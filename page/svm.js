'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

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

const drawRoundedRect = (x, y, width, height, radian) => {
  const startX = WIDTH / 2;
  const startY = HEIGHT / 2;
  ctx.beginPath();
  ctx.strokeStyle = 'rgb(0, 200, 0)';
  ctx.lineWidth = 1;
  ctx.moveTo(startX + x + radian, startY - y);
  ctx.lineTo(startX + x + width - radian, startY - y);
  ctx.arcTo(startX + x + width, startY - y, startX + x + width, startY - y + radian, radian);
  ctx.lineTo(startX + x + width, startY - y + height - radian);
  ctx.arcTo(startX + x + width, startY - y + height, startX + x + width - radian, startY - y + height, radian);
  ctx.lineTo(startX + x + radian, startY - y + height);
  ctx.arcTo(startX + x, startY - y + height, startX + x, startY - y + height - radian, radian);
  ctx.lineTo(startX + x, startY - y + radian);
  ctx.arcTo(startX + x, startY - y, startX + x + radian, startY - y, radian);
  ctx.stroke();
};

const drawRect = (x, y, width, height) => {
  const startX = WIDTH / 2;
  const startY = HEIGHT / 2;
  ctx.beginPath();
  ctx.strokeStyle = 'rgb(0, 0, 200)';
  ctx.lineWidth = 1;
  ctx.moveTo(startX + x, startY - y);
  ctx.lineTo(startX + x + width, startY - y);
  ctx.lineTo(startX + x + width, startY - y + height);
  ctx.lineTo(startX + x, startY - y + height);
  ctx.lineTo(startX + x, startY - y);
  ctx.stroke();
};

const drawLine = (sx, sy, ex, ey) => {
  const startX = WIDTH / 2;
  const startY = HEIGHT / 2;
  ctx.beginPath();
  ctx.strokeStyle = 'rgb(200, 0, 0)';
  ctx.lineWidth = 1;
  ctx.moveTo(startX + sx, startY - sy);
  ctx.lineTo(startX + ex, startY - ey);
  ctx.stroke();
};

const render = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // draw axes
  ctx.beginPath();
  ctx.strokeStyle = 'rgb(200, 200, 200)';
  ctx.lineWidth = 1;
  ctx.moveTo(0, HEIGHT / 2);
  ctx.lineTo(WIDTH, HEIGHT / 2);
  ctx.moveTo(WIDTH / 2, 0);
  ctx.lineTo(WIDTH / 2, HEIGHT);
  ctx.stroke();

  // draw object
  drawRoundedRect(20, 150, 100, 50, 10);
  drawRoundedRect(120, 60, 80, 50, 8);

  // draw object
  drawRect(100, 110, 80, 60);

  // draw line
  drawLine(0, 0, 280, 160);
};

timer.update(() => {
  render();
  fpsBoard.tick();
});

timer.start();
