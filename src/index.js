let numberOfCells = 100;
let canvasWidth = 800;
let canvasHeight = 400;
let cellSize = canvasWidth / numberOfCells;

const getRandomGrid = () => {
  let grid = new Array(numberOfCells);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(numberOfCells);
    for (let j = 0; j < grid.length; j++) {
      grid[i][j] = (Math.floor(Math.random() * 2));
    }
  }
  return grid;
}

const fillCells = (ctx, grid) => {
  for (let i = 0; i < numberOfCells; i++) {
    for (let j = 0; j < numberOfCells; j++) {
      let x = i * cellSize;
      let y = j * cellSize;
      if (grid[i][j] == 1) {
        ctx.fillStyle = "#000";
        ctx.fillRect(x, y, cellSize-1, cellSize-1);
      }
    }
  }
}

const getNextGenerationGrid = (grid) => {
  const nextGrid = new Array(grid.length);
  for (let i = 0; i < grid.length; i++) {
    nextGrid[i] = new Array(grid.length)
    for (let j = 0; j < nextGrid[i].length; j++) {
      const state = grid[i][j];
      const neighbors = countNeigbors(grid, i, j);
      if (state == 0 && neighbors == 3) {
        nextGrid[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        nextGrid[i][j] = 0;
      } else {
        nextGrid[i][j] = state;
      }
    }
  }
  return nextGrid;
}

const countNeigbors = (grid, x, y) => {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let row = (i + x + grid.length) % grid.length;
      let col = (j + y + grid.length) % grid.length;
      sum += grid[row][col];
    }
  }
  sum -= grid[x][y];
  return sum;
}

const generation = (ctx, grid) => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  fillCells(ctx, grid);
  const nextGenerationGrid = getNextGenerationGrid(grid);
  setTimeout(() => {
    requestAnimationFrame(() => generation(ctx, nextGenerationGrid));
  }, 100);

}

const setCanvasSize = (canvasWidth, canvasHeight) => {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
}

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.querySelector("#canvas");
  setCanvasSize(canvasWidth, canvasHeight)

  const ctx = canvas.getContext('2d');
  const grid = getRandomGrid();
  generation(ctx, grid);
});
