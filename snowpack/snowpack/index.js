import { helloWorld } from './hello-world.js';
import confetti from 'canvas-confetti';

// confetti.create(document.getElementById('canvas'), {
//   resize: true,
//   useWorker: true,
//  })({ particleCount: 200, spread: 200, angle: 0 });




 var duration = 15 * 1000;
 var animationEnd = Date.now() + duration;
 var skew = 1;
 
 function randomInRange(min, max) {
   return Math.random() * (max - min) + min;
 }
 
 (function frame() {
   var timeLeft = animationEnd - Date.now();
   var ticks = Math.max(200, 500 * (timeLeft / duration));
   skew = Math.max(0.8, skew - 0.001);
 
   confetti({
     particleCount: 1,
     startVelocity: 0,
     ticks: ticks,
     gravity: 0.5,
     origin: {
       x: Math.random(),
       // since particles fall down, skew start toward the top
       y: (Math.random() * skew) - 0.2
     },
    colors: [
      '#26ccff',
      // '#a25afd',
      // '#ff5e7e',
      // '#88ff5a',
      // '#fcff42',
      // '#ffa62d',
      // '#ff36ff'
    ],
     shapes: ['circle'],
     scalar: randomInRange(0.4, 1)
   });
   confetti({
    particleCount: 1,
    startVelocity: 0,
    ticks: ticks,
    gravity: 0.5,
    origin: {
      x: Math.random(),
      // since particles fall down, skew start toward the top
      y: (Math.random() * skew) - 0.2
    },
   colors: [
    //  '#26ccff',
     '#a25afd',
     // '#ff5e7e',
     // '#88ff5a',
     // '#fcff42',
     // '#ffa62d',
     // '#ff36ff'
   ],
    shapes: ['circle'],
    scalar: randomInRange(0.4, 1)
  });

  confetti({
    particleCount: 1,
    startVelocity: 0,
    ticks: ticks,
    gravity: 0.5,
    origin: {
      x: Math.random(),
      // since particles fall down, skew start toward the top
      y: (Math.random() * skew) - 0.2
    },
   colors: [
    //  '#26ccff',
    //  '#a25afd',
     // '#ff5e7e',
     '#88ff5a',
     // '#fcff42',
     // '#ffa62d',
     // '#ff36ff'
   ],
    shapes: ['circle'],
    scalar: randomInRange(0.4, 1)
  });
 
  //  if (timeLeft > 0) {
     requestAnimationFrame(frame);
  //  }
 }());
// var end = Date.now() + (15 * 1000);

// var colors = ['#ff36ff', '#fcff42'];
//  (function frame() {
//   confetti({
//     particleCount: 2,
//     angle: 60,
//     spread: 55,
//     origin: { x: 0 },
//     colors: colors
//   });
//   confetti({
//     particleCount: 2,
//     angle: 120,
//     spread: 55,
//     origin: { x: 1 },
//     colors: colors
//   });

//   if (Date.now() < end) {
//     requestAnimationFrame(frame);
//   }
// }());
helloWorld();