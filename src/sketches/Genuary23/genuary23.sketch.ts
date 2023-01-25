import type P5 from "p5";

export const sketch = (p5: P5) => {
  const circleDiameter = 130;
  const circleOffset = 10;
  let zoffset = 0;

  const cyan = p5.color("#00DDDD");
  const magenta = p5.color("#DD00DD");
  const yellow = p5.color("#DDDD00");

  p5.setup = function () {
    p5.pixelDensity(1);
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = function () {
    p5.background(255);
    p5.strokeWeight(1);
    p5.noFill();

    const startX = (p5.width - p5.floor(p5.width / circleDiameter) * circleDiameter) / 2;
    const startY = (p5.height - p5.floor(p5.height / circleDiameter) * circleDiameter) / 2;

    for (let x = startX; x < p5.width; x += circleDiameter) {
      for (let y = startY; y < p5.height; y += circleDiameter) {
        for (let d = circleOffset; d < circleDiameter * 2; d += circleOffset) {
          if (x % 3 === 0 && y % 3 === 0) {
            p5.stroke(cyan);
          } else if (x % 3 === 0) {
            p5.stroke(magenta);
          } else {
            p5.stroke(yellow);
          }
          p5.point(x, y);
          p5.circle(x, y, d);

          const noise = p5.noise(x, y, zoffset);
          const movement = p5.map(
            noise,
            0,
            1,
            -1.75 * circleOffset,
            1.75 * circleOffset
          );

          if (x % 3 === 0 && y % 3 === 0) {
            p5.stroke(0, 221, 221, noise * 255);
          } else if (x % 3 === 0) {
            p5.stroke(221, 221, 0, noise * 255);
          } else {
            p5.stroke(221, 0, 221, noise * 255);
          }
          p5.point(movement + x, movement + y);
          p5.circle(movement + x, movement + y, d);
        }
      }
    }

    zoffset += 0.0035;
  };

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};
