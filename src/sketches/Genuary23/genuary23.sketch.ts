import type P5 from "p5";

export const sketch = (p5: P5) => {
  const circleDiameter = 130;
  const circleOffset = 10;
  let zoffset = 0;

  p5.setup = function () {
    p5.pixelDensity(1);
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = function () {
    p5.background(255);
    p5.strokeWeight(1);
    p5.noFill();

    for (let x = circleDiameter / 2; x < p5.width; x += circleDiameter) {
      for (let y = circleDiameter / 2; y < p5.width; y += circleDiameter) {
        for (let d = circleOffset; d < circleDiameter * 2; d += circleOffset) {
          p5.circle(x, y, d);
          const movement = p5.map(
            p5.noise(x, y, zoffset),
            0,
            1,
            -1.5 * circleOffset,
            1.5 * circleOffset
          );

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
