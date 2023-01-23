import P5, { Graphics, Vector } from "p5";

export const sketch = (p5: P5) => {
  const circleRadius = 15;
  let znoise = 0;

  let cols: number, rows: number;
  let zoff = 0;
  let yoff: number;
  const scl = 10;
  const inc = 0.1;
  let particles: Particle[] = [];
  let flowGraphics: Graphics;
  let flowfield: Vector[];

  let deadCells: { x: number; y: number }[] = [];

  p5.setup = function () {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    cols = p5.floor(p5.width / scl);
    rows = p5.floor(p5.height / scl);
    flowGraphics = p5.createGraphics(p5.windowWidth, p5.windowHeight);

    flowfield = new Array();

    p5.background(255);
  };

  p5.draw = function () {
    p5.background(255);

    p5.image(flowGraphics, 0, 0);

    for (
      let x = circleRadius * 2;
      x < p5.width - circleRadius;
      x += circleRadius * 3.5
    ) {
      for (
        let y = circleRadius;
        y < p5.height - circleRadius;
        y += circleRadius
      ) {
        if (!deadCells.some((cell) => cell.x === x && cell.y === y)) {
          drawHexagon(x, y);
          if (p5.frameCount > 200 && p5.noise(x, y, znoise) > 0.64) {
            deadCells.push({ x, y });
            particles.push(new Particle(x, y, flowGraphics));
          }
        }
      }
    }

    yoff = 0;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        var index = x + y * cols;
        var angle = p5.noise(xoff, yoff, zoff) * p5.TWO_PI * 4;
        var v = Vector.fromAngle(angle);
        v.setMag(0.8);
        flowfield[index] = v;
        xoff += inc;
      }
      yoff += inc;

      zoff += 0.0003;
    }

    for (var i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].show();

      const particlePosition = particles[i].getPosition();
      if (
        deadCells.some(
          (cell) =>
            cell.x <= particlePosition.x + 1 &&
            cell.x > particlePosition.x - 1 &&
            cell.y <= particlePosition.y + 1 &&
            cell.y > particlePosition.y - 1
        )
      ) {
        const revivingCellIndex = deadCells.findIndex(
          (cell) =>
            cell.x <= particlePosition.x + 1 &&
            cell.x > particlePosition.x - 1 &&
            cell.y <= particlePosition.y + 1 &&
            cell.y > particlePosition.y - 1
        );

        if (p5.random(1) > 0.67) {
          deadCells.splice(revivingCellIndex, 1);
          particles.splice(i, 1);
        }
      }
    }

    if (this.frameCount % 1000 === 0) {
      deadCells = [];
      particles = [];
      flowGraphics.background(255);
    }

    znoise += 0.01;
  };

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  function drawHexagon(x: number, y: number) {
    const randomColor = p5.color(
      p5.noise(x / (p5.width - 100), y / (p5.height - 100), znoise) * 255,
      p5.noise(x, y, znoise) * 32,
      p5.noise(x, y, znoise) * 21
    );
    p5.stroke(randomColor);
    p5.fill(randomColor);

    p5.beginShape();
    for (let angle = 0; angle < p5.TWO_PI; angle += p5.TWO_PI / 6) {
      const radius = p5.map(
        p5.noise(x / (p5.width - 100), y / (p5.height - 100), znoise),
        0,
        1,
        (circleRadius * 1) / 5,
        circleRadius * 1.3
      );
      const sx =
        (y % 2 === 0 ? x : x + 1.75 * circleRadius) + p5.cos(angle) * radius;
      const sy = y + p5.sin(angle) * radius;
      p5.vertex(sx, sy);
    }

    p5.endShape(p5.CLOSE);
  }

  class Particle {
    private graphics: Graphics;
    private pos: Vector;
    private vel: Vector;
    private acc: Vector;
    private maxspeed: number;
    private prevPos: Vector;

    constructor(x: number, y: number, graphics: Graphics) {
      this.graphics = graphics;
      this.pos = p5.createVector(y % 2 === 0 ? x : x + 1.75 * circleRadius, y);
      this.vel = p5.createVector(0, 0);
      this.acc = p5.createVector(0, 0);
      this.maxspeed = 4;
      this.prevPos = this.pos.copy();
    }

    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxspeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }

    follow(vectors: Vector[]) {
      var x = p5.floor(this.pos.x / scl);
      var y = p5.floor(this.pos.y / scl);
      var index = x + y * cols;
      var force = vectors[index];
      this.applyForce(force);
    }

    applyForce(force: Vector) {
      this.acc.add(force);
    }

    show() {
      this.graphics.stroke(220);
      this.graphics.strokeWeight(1);
      this.graphics.line(
        this.pos.x,
        this.pos.y,
        this.prevPos.x,
        this.prevPos.y
      );
      this.updatePrev();
    }

    updatePrev() {
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }

    getPosition() {
      return { x: this.pos.x, y: this.pos.y };
    }
  }
};
