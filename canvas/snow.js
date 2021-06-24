function convert(val, transform) {
  return transform ? transform(val) : val;
}

function isOk(val) {
  return !(val === null || val === undefined);
}

function onlyPositiveInt(number) {
  return number < 0 ? 0 : Math.floor(number);
}

function colorsToRgb(colors) {
  return colors.map(hexToRgb);
}

function hexToRgb(str) {
  var val = String(str).replace(/[^0-9a-f]/gi, '');

  if (val.length < 6) {
    val = val[0] + val[0] + val[1] + val[1] + val[2] + val[2];
  }

  return {
    r: toDecimal(val.substring(0, 2)),
    g: toDecimal(val.substring(2, 4)),
    b: toDecimal(val.substring(4, 6)),
  };
}

function toDecimal(str) {
  return parseInt(str, 16);
}


function getCanvas(zIndex) {
  var canvas = document.createElement('canvas');

  canvas.style.position = 'fixed';
  canvas.style.top = '0px';
  canvas.style.left = '0px';
  canvas.style.pointerEvents = 'none';
  // canvas.style.zIndex = zIndex;

  return canvas;
}

const defaults = {
  particleCount: 50,
  angle: 90,
  spread: 45,
  startVelocity: 45,
  decay: 0.9,
  gravity: 1,
  ticks: 200,
  // x: 0.5,
  // y: 0.5,
  // shapes: ['square', 'circle'],
  // zIndex: 100,
  colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'],
  // // probably should be true, but back-compat
  // disableForReducedMotion: false,
  scalar: 1
};

function prop(options, name, transform) {
  return convert(options && isOk(options[name]) ? options[name] : defaults[name], transform);
}

function setCanvasWindowSize(canvas) {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
}

function setCanvasRectSize(canvas) {
  var rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}

function randomPhysics(opts) {
  var radAngle = opts.angle * (Math.PI / 180);
  var radSpread = opts.spread * (Math.PI / 180);
  return {
    x: opts.x,
    y: opts.y,
    angle2D: -radAngle + (0.5 * radSpread - Math.random() * radSpread),
    wobble: Math.random() * 10, // 晃动
    wobbleX: 0,
    wobbleY: 0,
    tick: 0,
    totalTicks: opts.ticks,
    velocity: opts.startVelocity * 0.5 + Math.random() * opts.startVelocity,
    color: opts.color,
    shape: opts.shape,
    random: Math.random() + 5,
    decay: opts.decay,
    scalar: opts.scalar,
    tiltAngle: Math.random() * Math.PI,
    tiltSin: 0,
    tiltCos: 0,
    gravity: opts.gravity * 3,
  };
}

function updateFetti(context, fetti) {
  // fetti.x += Math.cos(fetti.angle2D) * fetti.velocity;
  fetti.y += fetti.gravity;
  fetti.wobble += 0.1;
  fetti.velocity *= fetti.decay;
  fetti.random = Math.random() + 5;
  fetti.wobbleX = fetti.x + 10 * fetti.scalar * Math.cos(fetti.wobble);
  fetti.wobbleY = fetti.y + 10 * fetti.scalar * Math.sin(fetti.wobble);

  fetti.tiltAngle += 0.1;
  fetti.tiltSin = Math.sin(fetti.tiltAngle);
  fetti.tiltCos = Math.cos(fetti.tiltAngle);

  var progress = fetti.tick++ / fetti.totalTicks;

  var x1 = fetti.x + fetti.random * fetti.tiltCos;
  var y1 = fetti.y + fetti.random * fetti.tiltSin;
  var x2 = fetti.wobbleX + fetti.random * fetti.tiltCos;
  var y2 = fetti.wobbleY + fetti.random * fetti.tiltSin;

  context.fillStyle = 'rgba(' + fetti.color.r + ', ' + fetti.color.g + ', ' + fetti.color.b + ', ' + (1 - progress) + ')';
  context.beginPath();

  context.moveTo(Math.floor(fetti.x), Math.floor(fetti.y));
  context.lineTo(Math.floor(fetti.wobbleX), Math.floor(y1));
  context.lineTo(Math.floor(x2), Math.floor(y2));
  context.lineTo(Math.floor(x1), Math.floor(fetti.wobbleY));

  context.closePath();
  context.fill();

  return fetti.tick < fetti.totalTicks;
}

function animate(canvas, fettis, resizer, size, done) {
  let animatingFettis = fettis.slice();
  const context = canvas.getContext('2d');
  let animationFrame;
  let destroy;

  const prom = new Promise((resolve) => {
    function onDone() {
      animationFrame = destroy = null;

      context.clearRect(0, 0, size.width, size.height);

      done();
      resolve();
    }

    function update() {
      if (!size.width && !size.height) {
        resizer(canvas);
        size.width = canvas.width;
        size.height = canvas.height;
      }

      context.clearRect(0, 0, size.width, size.height);

      animatingFettis = animatingFettis.filter((fetti) => {
        return updateFetti(context, fetti);
      });

      if (animatingFettis.length) {
        animationFrame = window.requestAnimationFrame(update);
      } else {
        onDone();
      }
    }

    animationFrame = window.requestAnimationFrame(update);
    destroy = onDone;
  });

  return {
    addFettis: function (fettis) {
      animatingFettis = animatingFettis.concat(fettis);

      return prom;
    },
    canvas: canvas,
    promise: prom,
    reset: function () {
      if (animationFrame) {
        raf.cancel(animationFrame);
      }

      if (destroy) {
        destroy();
      }
    },
  };
}

function confettiCannon(canvas, globalOpts) {
  const isLibCanvas = !canvas;
  const allowResize = !!prop(globalOpts || {}, 'resize');
  const resizer = isLibCanvas ? setCanvasWindowSize : setCanvasRectSize;
  let animationObj;

  function fireLocal(options, size, done) {
    const colors = prop(options, 'colors', colorsToRgb);
    const spread = prop(options, 'spread', Number);
    const decay = prop(options, 'decay', Number);
    const gravity = prop(options, 'gravity', Number);
    const ticks = prop(options, 'ticks', Number);
    const startVelocity = prop(options, 'startVelocity', Number); // 启动速度
    const scalar = prop(options, 'scalar');
    const angle = prop(options, 'angle', Number);
    const particleCount = prop(options, 'particleCount', onlyPositiveInt);
    let fettis = [];
    let temp = particleCount;

    while (temp--) {
      const startX = canvas.width * Math.random();
      const startY = canvas.height * Math.random();
      fettis.push(
        randomPhysics({
          x: startX,
          y: startY,
          color: colors[temp % colors.length],
          scalar: scalar,
          angle: angle,
          startVelocity: startVelocity,
          spread: spread,
          ticks: ticks,
          gravity: gravity,
          decay: decay,
        })
      );
    }

    if (animationObj) {
      return animationObj.addFettis(fettis);
    }

    animationObj = animate(canvas, fettis, resizer, size, done);

    return animationObj.promise;
  }

  function fire(options) {
    if (isLibCanvas && animationObj) {
      // use existing canvas from in-progress animation
      canvas = animationObj.canvas;
    } else if (isLibCanvas && !canvas) {
      // create and initialize a new canvas
      canvas = getCanvas();
      document.body.appendChild(canvas);
    }
    if (allowResize) {
      // initialize the size of a user-supplied canvas
      resizer(canvas);
    }

    const size = {
      width: canvas.width,
      height: canvas.height,
    };

    function onResize() {
        resizer(obj);
      // don't actually query the size here, since this
      // can execute frequently and rapidly
      // size.width = size.height = null;
    }


    function done() {
      animationObj = null;

      if (allowResize) {
        window.removeEventListener('resize', onResize);
      }

      if (isLibCanvas && canvas) {
        document.body.removeChild(canvas);
        canvas = null;
        initialized = false;
      }
    }

    if (allowResize) {
      window.addEventListener('resize', onResize, false);
    }

    return fireLocal(options, size, done);
  }

  fire.reset = function () {
    if (worker) {
      worker.reset();
    }

    if (animationObj) {
      animationObj.reset();
    }
  };

  return fire;
}

const Confetti = confettiCannon(null, { resize: true });

module.exports = Confetti;

// export default Confetti;
