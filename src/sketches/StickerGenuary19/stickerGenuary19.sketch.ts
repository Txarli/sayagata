import type P5 from "p5";
import { Graphics, Image, Renderer, Vector } from "p5";

export const sketch = (p5: P5) => {
  let angle = 0;
  const angleJump = 263;
  let x: number, y: number;
  let particle: Particle;
  let cols: number, rows: number;

  const scl = 30;
  const inc = 0.1;
  let xoff, yoff;
  let zoff = 0;

  let hexagonMask: Graphics;
  let background: Graphics;

  let canvas: Renderer;

  p5.setup = function () {
    canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.frameRate(33);
    cols = p5.floor(p5.width / scl);
    rows = p5.floor(p5.height / scl);
    particle = new Particle(p5.width / 2, p5.height / 2);

    hexagonMask = p5.createGraphics(p5.windowWidth, p5.windowHeight);
    background = p5.createGraphics(p5.windowWidth, p5.windowHeight);

    p5.fill(0);
    drawFrontierHexagon(p5.width / 2, p5.height / 2, hexagonMask);
  };

  p5.draw = function () {
    background.background(255);
    background.strokeWeight(0);

    const flowField = getFlowField();

    particle.follow(flowField);
    particle.update();
    particle.edges();

    x = particle.getPos().x;
    y = particle.getPos().y;

    paintGrid(x, y, 0, 0);
    paintHorizontalGrid(p5.width - x, y, x, 0);
    paintHorizontalGrid(x, p5.height - y, 0, y);
    paintGrid(p5.width - x, p5.height - y, x, y);

    angle += p5.TWO_PI / angleJump;

    const image = background.get();
    image.mask(hexagonMask.get());
    p5.image(image, 0, 0);
  };

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.keyPressed = function () {
    if (p5.keyCode === 32) {
      p5.save(canvas, `blackAndWhite-${p5.millis()}.png`);
    }
  };

  function getFlowField() {
    let flowfield = new Array();

    yoff = 0;
    for (var y = 0; y < rows; y++) {
      xoff = 0;
      for (var x = 0; x < cols; x++) {
        var index = x + y * cols;
        var angle = p5.noise(xoff, yoff, zoff) * p5.TWO_PI * 4;
        var v = Vector.fromAngle(angle);
        v.setMag(0.3);
        flowfield[index] = v;
        xoff += inc;
      }
      yoff += inc;

      zoff += 0.0003;
    }

    return flowfield;
  }

  function paintGrid(
    customWidth: number,
    customHeight: number,
    initialX: number,
    initialY: number
  ) {
    const distance = customWidth / 4;
    const yDistance = customHeight / 4;
    let currentColumn = 0;
    for (let x = initialX; x < initialX + customWidth; x += distance) {
      for (let y = initialY; y < initialY + customHeight; y += yDistance) {
        background.fill(0);
        background.stroke(0);
        if (currentColumn % 2) {
          background.rect(
            x,
            y,
            distance + 1,
            background.abs(offsetCos(angle)) * yDistance + 1
          );
        } else {
          background.rect(
            x,
            y,
            distance + 1,
            background.abs(offsetCos(angle / 2)) * yDistance + 1
          );
        }
      }

      currentColumn += 1;
    }
  }

  function paintHorizontalGrid(
    customWidth: number,
    customHeight: number,
    initialX: number,
    initialY: number
  ) {
    const distance = customWidth / 4;
    const yDistance = customHeight / 4;
    let currentColumn = 0;

    for (let y = initialY; y < initialY + customHeight; y += yDistance) {
      for (let x = initialX; x < initialX + customWidth; x += distance) {
        background.fill(0);
        background.strokeWeight(0);
        if (currentColumn % 2) {
          background.rect(
            x,
            y,
            background.abs(offsetSin(angle)) * distance,
            yDistance + 1
          );
        } else {
          background.rect(
            x,
            y,
            background.abs(offsetSin(angle / 2)) * distance,
            yDistance + 1
          );
        }
      }

      currentColumn += 1;
    }
  }

  // Daniel Shiffman
  // http://codingtra.in
  // http://patreon.com/codingtrain
  // Code for: https://youtu.be/BjoM9oKOAKY
  class Particle {
    private pos: Vector;
    private vel: Vector;
    private acc: Vector;
    private maxspeed: number;
    private prevPos: Vector;

    constructor(x: number, y: number) {
      this.pos = p5.createVector(x, y);
      this.vel = p5.createVector(0, 0);
      this.acc = p5.createVector(0, 0);
      this.maxspeed = 2;
      this.prevPos = this.pos.copy();
    }

    getPos() {
      return this.pos;
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

    updatePrev() {
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }

    edges() {
      const leftEdge = (p5.width - 700) / 2;
      const rightEdge = (p5.width - 700) / 2 + 700;
      const topEdge = (p5.height - 700) / 2;
      const bottomEdge = (p5.height - 700) / 2 + 700;

      if (this.pos.x > rightEdge) {
        this.vel.x = -this.vel.x;
        this.updatePrev();
      }
      if (this.pos.x < leftEdge) {
        this.vel.x = -this.vel.x;
        this.updatePrev();
      }
      if (this.pos.y > topEdge) {
        this.vel.y = -this.vel.y;
        this.updatePrev();
      }
      if (this.pos.y < bottomEdge) {
        this.vel.y = -this.vel.y;
        this.updatePrev();
      }
    }
  }

  function offsetSin(rads: number) {
    const value = p5.abs(p5.sin(rads)) * 1.1 - 0.1;
    return value > 0 ? value : 0;
  }

  function offsetCos(rads: number) {
    const value = p5.abs(p5.cos(rads)) * 1.1;
    return value < 1 ? value : 1;
  }
};

function drawFrontierHexagon(x: number, y: number, p5: Graphics) {
  p5.stroke(0);
  p5.strokeWeight(2);

  p5.beginShape();
  for (let angle = 0; angle < p5.TWO_PI; angle += p5.TWO_PI / 6) {
    const radius = 350;
    const sx = x + p5.cos(angle) * radius;
    const sy = y + p5.sin(angle) * radius;
    p5.vertex(sx, sy);
  }
  p5.endShape(p5.CLOSE);
}
