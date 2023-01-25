import P5 from "p5";

export const sketch = (p5: P5) => {
  let angle = 0;
  let zoff = 0;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = () => {
    p5.background(255);
    p5.noFill();
    p5.strokeWeight(2);
    const size = 50;
    const across = p5.floor(p5.width / size);
    const down = p5.floor(p5.height / size);
    const acrossStart = (p5.width / size - across) / 2 + 1 / 2;
    const downStart = (p5.height / size - down) / 2 + 1 / 2;

    const maxRotationX = p5.map(p5.sin(angle), -1, 1, acrossStart, across);

    for (let x = acrossStart; x < across; x++) {
      for (let y = downStart; y < down; y++) {
        const plusminus = p5.noise(x, y) < 0.5 ? -1 : 1;
        const rotateAmt = p5.map(
          p5.dist(maxRotationX * size, p5.height / 2, x * size, p5.height / 2),
          0,
          p5.width,
          0,
          p5.PI / 3
        );

        p5.push();
        p5.rectMode(p5.CENTER);
        p5.strokeWeight(p5.noise(x, y, zoff) * 4);
        p5.translate(
          x * size,
          y * size + plusminus * p5.noise(x, y) * (maxRotationX - x)
        );
        p5.rotate(rotateAmt * plusminus);
        p5.rect(0, 0, size, size);
        p5.text(rotateAmt, 0, 0);
        p5.pop();
      }
    }

    p5.strokeWeight(10);

    // p5.point(maxRotationX * size, p5.height / 2);

    angle += 0.02;
    zoff += 0.04;
  };

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};
