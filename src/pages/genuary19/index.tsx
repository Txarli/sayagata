import React from "react";
import { useP5Sketch } from "../../useP5Sketch";

import P5, { Vector } from "p5";

const sketch = (p5: P5) => {
  let angle = 0;
  const angleJump = 263;
  let x: number, y: number;
  let particle: Particle;
  let cols: number, rows: number;

  const scl = 30;
  const inc = 0.1;
  let xoff, yoff;
  let zoff = 0;

  p5.setup = function () {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.frameRate(33);
    cols = p5.floor(p5.width / scl);
    rows = p5.floor(p5.height / scl);
    particle = new Particle(p5.width / 2, p5.height / 2);
  };

  p5.draw = function () {
    p5.background(255);
    p5.strokeWeight(0);

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
  };

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
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
        p5.fill(0);
        p5.stroke(0);
        if (currentColumn % 2) {
          p5.rect(x, y, distance + 1, p5.abs(offsetCos(angle)) * yDistance + 1);
        } else {
          p5.rect(
            x,
            y,
            distance + 1,
            p5.abs(offsetCos(angle / 2)) * yDistance + 1
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
        p5.fill(0);
        p5.strokeWeight(0);
        if (currentColumn % 2) {
          p5.rect(x, y, p5.abs(offsetSin(angle)) * distance, yDistance + 1);
        } else {
          p5.rect(x, y, p5.abs(offsetSin(angle / 2)) * distance, yDistance + 1);
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
      if (this.pos.x > p5.width) {
        this.vel.x = -this.vel.x;
        this.updatePrev();
      }
      if (this.pos.x < 0) {
        this.vel.x =  -this.vel.x;
        this.updatePrev();
      }
      if (this.pos.y > p5.height) {
        this.vel.y = -this.vel.y;
        this.updatePrev();
      }
      if (this.pos.y < 0) {
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

const Genuary19: React.FC = () => {
  const ref = useP5Sketch(sketch);

  return <div ref={ref as React.RefObject<HTMLDivElement>} />;
};

export default Genuary19;
