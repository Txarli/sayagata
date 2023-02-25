import P5, { Vector, Element, Renderer } from "p5";

export const sketch = (p5: P5) => {
  let hexagonRadius: number;
  let layerNumber: number;
  let znoise = 0;

  let radiusSlider: Element;
  let canvas: Renderer;

  p5.setup = function () {
    canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);

    radiusSlider = p5.createSlider(5, 60, 41, 0.5);
    radiusSlider.position(p5.width - 200, p5.height - 50);
    radiusSlider.style("width", "80px");
  };

  p5.draw = function () {
    p5.background(255);
    p5.text(`hexagon radius: ${hexagonRadius}`, p5.width - 200, p5.height - 60);

    p5.translate(p5.width / 2, p5.height / 2);

    hexagonRadius = radiusSlider.value() as number;
    layerNumber = p5.floor((700 - hexagonRadius) / (4 * hexagonRadius));

    drawHexagon(0, 0);

    for (let layer = 1; layer < layerNumber; layer++) {
      for (let angle = 0; angle < p5.TWO_PI; angle += p5.TWO_PI / (6 * layer)) {
        const r =
          (2 * layer * hexagonRadius) /
          p5.cos((1 / 3) * p5.asin(p5.sin(3 * angle - p5.HALF_PI)));
        const vector = Vector.fromAngle(angle).setMag(r);
        drawHexagon(vector.x, vector.y);
      }
    }

    drawFrontierHexagon(0, 0);

    znoise += 0.006;
  };

  p5.keyPressed = function () {
    if (p5.keyCode === 32) {
      p5.save(canvas, `beeHiveHive-${p5.millis()}.png`);
    }
  };

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    radiusSlider.position(p5.width - 200, p5.height - 50);
  };

  function drawHexagon(x: number, y: number) {
    const randomColor = p5.color(105, 105, 105);
    const rotation = p5.HALF_PI;
    p5.stroke(randomColor);
    p5.fill(randomColor);

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
        (hexagonRadius * 2) / 5,
        hexagonRadius * 1.4
      );
      const sx = x + p5.cos(angle) * radius;
      const sy = y + p5.sin(angle) * radius;
      p5.vertex(sx, sy);
    }
    p5.endShape(p5.CLOSE);
  }

  function drawFrontierHexagon(x: number, y: number) {
    const randomColor = p5.color(105, 105, 105);
    const rotation = 0;
    p5.stroke(randomColor);
    p5.noFill();

    p5.beginShape();
    for (
      let angle = rotation;
      angle < p5.TWO_PI + rotation;
      angle += p5.TWO_PI / 6
    ) {
      const radius = 350;
      const sx = x + p5.cos(angle) * radius;
      const sy = y + p5.sin(angle) * radius;
      p5.vertex(sx, sy);
    }
    p5.endShape(p5.CLOSE);
  }
};
