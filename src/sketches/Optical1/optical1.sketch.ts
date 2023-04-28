import P5 from "p5";

export const sketch = (p5: P5) => {
  const tileSize = 245;
  const ondulationAmplitude = 3;

  let xStartOffset: number;
  let yStartOffset: number;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    xStartOffset = p5.random(0, 20);
    yStartOffset = p5.random(0, 20);

    p5.noLoop();
  };

  p5.draw = () => {
    p5.background(255);

    p5.fill(0);
    let row = 0;
    let column = 0;
    for (
      let y = tileSize / 2 - yStartOffset;
      y < p5.height + tileSize / 2;
      y += tileSize
    ) {
      for (
        let x = tileSize / 2 - xStartOffset;
        x < p5.width + tileSize / 2;
        x += tileSize
      ) {
        if (
          (row % 2 === 0 && column % 2 !== 0) ||
          (row % 2 !== 0 && column % 2 === 0)
        ) {
          drawOndulatedSquare(x, y);
        }

        column++;
      }

      column = 0;
      row++;
    }
  };

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  function drawOndulatedSquare(x: number, y: number) {
    p5.push();
    p5.translate(x, y);

    p5.beginShape();
    drawVerticalOndulatedLine(-tileSize / 2, tileSize / 2, -tileSize / 2);
    drawHorizontal(-tileSize / 2, -tileSize / 2, tileSize / 2);
    drawVerticalOndulatedLine(tileSize / 2, -tileSize / 2, tileSize / 2);
    drawHorizontal(tileSize / 2, tileSize / 2, -tileSize / 2);
    p5.endShape(p5.CLOSE);

    p5.fill(255);
    p5.strokeWeight(4);
    p5.stroke(255);

    p5.line(-tileSize / 2, -tileSize / 2, tileSize / 2, tileSize / 2);

    p5.pop();
  }

  function drawVerticalOndulatedLine(x: number, yStart: number, yEnd: number) {
    const direction = yEnd - yStart >= 0 ? 1 : -1;
    const hasToDraw = (y: number) => (direction === 1 ? y < yEnd : y > yEnd);

    for (let y = yStart; hasToDraw(y); y += direction * 10) {
      p5.vertex(
        x -
          direction *
            ondulationAmplitude *
            p5.sin(p5.map(y, yStart, yEnd, 0, p5.TWO_PI)),
        y
      );
    }
  }

  function drawHorizontal(y: number, xStart: number, xEnd: number) {
    const direction = xEnd - xStart >= 0 ? 1 : -1;
    const hasToDraw = (x: number) => (direction === 1 ? x < xEnd : x > xEnd);

    for (let x = xStart; hasToDraw(x); x += direction * 10) {
      p5.vertex(
        x,
        y +
          direction *
            ondulationAmplitude *
            p5.sin(p5.map(x, xStart, xEnd, 0, p5.TWO_PI))
      );
    }
  }
};
