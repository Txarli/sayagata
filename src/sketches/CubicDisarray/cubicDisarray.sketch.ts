import P5 from "p5";

const multiplier = 0.77 * 30;

let angle = 0;

export const sketch = (p5: P5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.angleMode(p5.DEGREES);
  };

  p5.draw = () => {
    p5.background(255);
    p5.noFill();
    p5.strokeWeight(2);
    const size = 50;
    const across = p5.floor(p5.width / size);
    const down = p5.floor(p5.height / size);
    const acrossStart = (p5.width / size - across) / 2;
    const downStart = (p5.height / size - down) / 2;

    console.log("starting x", acrossStart);

    const maxRotationX = p5.map(p5.sin(angle), -1, 1, acrossStart, across);

    for (let x = acrossStart; x < across; x++) {
      const rotateAmt = p5.randomGaussian(maxRotationX) * x;
      p5.point(x*size, p5.randomGaussian(maxRotationX)*size)

      for (let y = downStart; y < down; y++) {
        p5.push();
        p5.translate(x * size, y * size);
        p5.rotate(rotateAmt);
        p5.rect(0, 0, size, size);
        p5.pop();
      }
    }

    p5.strokeWeight(10);

    p5.point(maxRotationX * size, 150);


    angle += 0.2;
  };
};
