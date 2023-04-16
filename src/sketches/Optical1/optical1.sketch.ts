import P5 from "p5";

export const sketch = (p5: P5) => {
  const tileSize = 150;
  const ondulationAmplitude = 3;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    p5.noLoop();
  };

  p5.draw = () => {
    p5.background(255);

    p5.translate(p5.width / 2, p5.height / 2);

    p5.fill(0);
    p5.beginShape();

    drawVerticalOndulatedLine(-tileSize / 2, tileSize / 2, -tileSize / 2);
    p5.vertex(tileSize / 2, -tileSize / 2);
    drawVerticalOndulatedLine(tileSize / 2, -tileSize / 2, tileSize / 2);
    p5.endShape(p5.CLOSE);
    p5.point(0, 0);
  };

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  function drawVerticalOndulatedLine(x: number, yStart: number, yEnd: number) {
    const direction = yEnd - yStart >= 0 ? 1 : -1;
    console.log("Direction", direction);
    const hasToDraw = (y: number) => (direction === 1 ? y <= yEnd : y >= yEnd);

    for (let y = yStart; hasToDraw(y); y += direction * 10) {
      if (direction === 1) {
        console.log("Drawing y", y);
      }
      p5.vertex(
        x -
          direction *
            ondulationAmplitude *
            p5.sin(p5.map(y, yStart, yEnd, 0, p5.TWO_PI)),
        y
      );
    }
  }
};
