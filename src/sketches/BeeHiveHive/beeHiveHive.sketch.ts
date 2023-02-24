import P5, { Vector } from "p5";

export const sketch = (p5: P5) => {
  const circleRadius = 27;
  let layerNumber: number;
  let znoise = 0;

  p5.setup = function () {
    p5.createCanvas(680, 680);

    layerNumber = p5.width / (4 * circleRadius) - 1;
  };

  p5.draw = function () {
    p5.background(255);
    p5.translate(p5.width / 2, p5.height / 2);

    drawHexagon(0, 0);

    for (let layer = 1; layer < layerNumber; layer++) {
      for (let angle = 0; angle < p5.TWO_PI; angle += p5.TWO_PI / (6 * layer)) {
        const r =
          (2 * layer * circleRadius) /
          p5.cos((1 / 3) * p5.asin(p5.sin(3 * angle - p5.HALF_PI)));
        const vector = Vector.fromAngle(angle).setMag(r);
        drawHexagon(vector.x, vector.y);
      }
    }

    znoise += 0.01;
  };

  function drawHexagon(x: number, y: number) {
    const randomColor = p5.color(105, 105, 105);
    const rotation = p5.HALF_PI;
    p5.stroke(randomColor);
    p5.fill(randomColor);

    p5.point(x, y);

    p5.beginShape();
    for (
      let angle = rotation;
      angle < p5.TWO_PI + rotation;
      angle += p5.TWO_PI / 6
    ) {
      const radius = p5.map(
        p5.noise(p5.width + x / 100, p5.height + y / 100, znoise),
        0,
        1,
        (circleRadius * 2) / 5,
        circleRadius * 1.4
      );
      const sx = x + p5.cos(angle) * radius;
      const sy = y + p5.sin(angle) * radius;
      p5.vertex(sx, sy);
    }
    p5.endShape(p5.CLOSE);
  }
};
