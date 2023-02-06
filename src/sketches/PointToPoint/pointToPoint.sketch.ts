import P5 from "p5";

interface PointCoordinates {
  x: number;
  y: number;
}

type ColoredPoint = PointCoordinates & { color: number };

export const sketch = (p5: P5) => {
  let z = 0;
  let grid: ColoredPoint[] = [];

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    grid = getGrid(p5.width, p5.height).map((pointCoordinate) => ({
      ...pointCoordinate,
      color: 56,
    }));
  };

  p5.draw = () => {
    p5.background(255);

    grid.forEach(({ x, y, color }, index) => {
      const pointWeight = 5 + p5.noise(x, y, z) * 24;
      p5.strokeWeight(pointWeight);
      p5.stroke(color);
      p5.point(x, y);

      if (pointWeight > 20) {
        grid[index].color = 12;
      }
    });

    z += 0.01;
  };

  function getGrid(width: number, height: number) {
    let grid: PointCoordinates[] = [];

    const distance = 85;
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
};
