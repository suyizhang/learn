const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function clearCanvas() {
  // context.clearRect(0, 0, canvas.width, canvas.height);
  // context.fillStyle = '#ffffff';
	context.fillRect(0,0,canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();

function mouseDownHandler(e) {
  const x = e.clientX;
  const y = e.clientY;
  fire(x, y);
}

var rid;
function fire(x, y) {
  createFireworks(x, y);
  function tick() {
    context.globalCompositeOperation = 'destination-out';
    context.fillStyle = 'rgba(0,0,0,'+10/100+')';
    context.fillRect(0, 0,canvas.width, canvas.height);
    context.globalCompositeOperation = 'lighter';
    drawFireworks();
    rid = requestAnimationFrame(tick);
  }
  cancelAnimationFrame(rid);
  tick();
}

var particles = [];

function createFireworks(sx, sy) {
  particles = [];

  var hue = Math.floor(Math.random() * 51) + 150;
  var hueVariance = 30;
  var count = 10;
  for (var i = 0; i < count; i++) {
    var p = {};

    var angle = Math.floor(Math.random() * 360);
    p.radians = (angle * Math.PI) / 180;
    p.radius = 1;

    p.sx = sx; // 起始x轴坐标
    p.sy = sy; // 起始y轴坐标

    p.speed = Math.random() * 5 + 0.4; // 飞行速度

    p.size = Math.floor(Math.random() * 3) + 1; // 点大小

    p.hue = Math.floor(Math.random() * (hue + hueVariance - (hue - hueVariance))) + (hue - hueVariance);
    p.brightness = Math.floor(Math.random() * 31) + 50;
    p.alpha = (Math.floor(Math.random() * 61) + 40) / 100;  // 透明度

    particles.push(p);
  }
}

function drawFireworks() {
  clearCanvas();

  for(var i = 0 ;i<particles.length;i++){
      var p = particles[i];
      p.vx = p.sx + Math.cos(p.radians) * p.radius;
      p.vy = p.sy + Math.sin(p.radians) * p.radius + 40;
      p.radius += 0.4 * p.speed;
      // p.radius +=  p.speed/10;
      context.beginPath();
      context.arc(p.vx, p.xy, p.size, 0, Math.PI*2, false);
      context.closePath();

      context.fillStyle = 'hsla('+p.hue+', 100%, '+p.brightness+'%, '+100+')';
      context.fill();
  }
}


document.addEventListener('mousedown', mouseDownHandler, false);
