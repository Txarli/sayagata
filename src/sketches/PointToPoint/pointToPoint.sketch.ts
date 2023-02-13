import P5, { Color, Vector } from "p5";

interface PointCoordinates {
  x: number;
  y: number;
}

type ColoredPoint = {
  id: string;
  position: Vector;
  color: Color;
  velocity: Vector;
  stroke: number;
  mass: number;
};

export const sketch = (p5: P5) => {
  let grid: ColoredPoint[] = [];

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noStroke();

    console.log("color grey", p5.color(182).toString());

    grid = getGrid(p5.width, p5.height).map(({ x, y }, index) => {
      const stroke = 20 + p5.random() * 35;
      return {
        id: `${index}`,
        position: p5.createVector(x, y),
        color: p5.color(182),
        stroke,
        mass: stroke * 3,
        velocity: Vector.fromAngle(p5.random() * p5.TWO_PI, 1.87),
      };
    });

    for (let i = 0; i < p5.floor(grid.length / 10) + 1; i++) {
      const index1 = p5.floor(p5.random(0, grid.length - 1));
      const index2 = p5.floor(p5.random(0, grid.length - 1));
      const velocity = Vector.sub(
        grid[index1].position,
        grid[index2].position
      ).rotate(p5.PI);
      velocity.setMag(2.8);

      grid[index1].velocity = velocity;
      grid[index1].color = p5.color(
        p5.noise(
          grid[index1].position.x / (p5.width - 100),
          grid[index1].position.y / (p5.height - 100)
        ) * 255,
        p5.noise(grid[index1].position.x, grid[index1].position.y) * 32,
        p5.noise(grid[index1].position.x, grid[index1].position.y) * 21
      );
      grid[index1].stroke = 35;
      grid[index1].mass = 30;
    }
  };

  p5.draw = () => {
    p5.background(255);

    grid.forEach(({ position, color, velocity, stroke, mass, id }, index) => {
      grid[index].position = Vector.add(position, velocity);

      if (position.x < stroke / 2) {
        grid[index].position = p5.createVector(stroke / 2 + 2, position.y);

        const horizontal = p5.createVector(1, 0);
        velocity.reflect(horizontal);
      }

      if (position.x > p5.width - stroke / 2) {
        grid[index].position = p5.createVector(
          p5.width - stroke / 2 - 2,
          position.y
        );

        const horizontal = p5.createVector(1, 0);
        velocity.reflect(horizontal);
      }

      if (position.y < stroke / 2) {
        const correctionFactor = 1.01;
        grid[index].position = p5.createVector(
          position.x,
          stroke / 2 + correctionFactor
        );

        const vertical = p5.createVector(0, 1);
        velocity.reflect(vertical);
      }

      if (position.y > p5.height - stroke / 2) {
        grid[index].position = p5.createVector(
          position.x,
          p5.height - stroke / 2 - 2
        );

        const vertical = p5.createVector(0, 1);
        velocity.reflect(vertical);
      }

      const collisionPointIndex = grid.findIndex((point) => {
        if (point.id === id) {
          return false;
        }
        return (
          Vector.dist(point.position, position) < point.stroke / 2 + stroke / 2
        );
      });
      if (collisionPointIndex > -1) {
        const distance = Vector.sub(
          position,
          grid[collisionPointIndex].position
        );
        distance.setMag(grid[collisionPointIndex].stroke / 2 + stroke / 2 + 5);
        grid[index].position = Vector.add(
          grid[collisionPointIndex].position,
          distance
        );

        const { v1, v2 } = calculateCollisionVelocity(
          mass,
          velocity,
          grid[collisionPointIndex].mass,
          grid[collisionPointIndex].velocity
        );
        grid[index].velocity = v1;
        grid[collisionPointIndex].velocity = v2;

        if (color.toString() !== "rgba(182,182,182,1)") {
          grid[collisionPointIndex].color = color;
        }
      }

      p5.fill(color);
      p5.circle(position.x, position.y, stroke);
    });
  };

  function getGrid(width: number, height: number) {
    let grid: PointCoordinates[] = [];

    const distance = 100;
    const xStart =
      distance + (width - p5.floor(width / distance) * distance) / 2;
    const yStart =
      distance + (height - p5.floor(height / distance) * distance) / 2;
    const xEnd = width - xStart;
    const yEnd = height - yStart;

    for (let x = xStart; x <= xEnd; x += distance) {
      for (let y = yStart; y <= yEnd; y += distance) {
        const randomX = x + p5.random(-distance / 3, distance / 3);
        const randomY = y + p5.random(-distance / 3, distance / 3);
        grid.push({ x: randomX, y: randomY });
      }
    }

    return grid;
  }

  function calculateCollisionVelocity(
    m1: number,
    v1: Vector,
    m2: number,
    v2: Vector
  ) {
    const v1aftera = Vector.mult(v1, m1 - m2);
    const v1afterb = Vector.mult(v2, 2 * m2);
    const v1after = Vector.add(v1aftera, v1afterb).div(m1 + m2);

    const v2aftera = Vector.mult(v2, m2 - m1);
    const v2afterb = Vector.mult(v1, 2 * m1);
    const v2after = Vector.add(v2aftera, v2afterb).div(m1 + m2);

    return { v1: v1after, v2: v2after };
  }
};
