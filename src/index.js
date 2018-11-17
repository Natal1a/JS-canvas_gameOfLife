function create2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let height = 400;
let width = 400;
let res = 40;

function createGrid() {
  createCanvas(height, width);


  cols = height / res;
  rows = width / res;

  grid = create2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = (Math.floor(Math.random() * 2));
    }
  }
}
createGrid();
fillCells();

function createCanvas(width, height) {
  let canvas = document.createElement('canvas');

  canvas.id = "CursorLayer";
  canvas.width = width;
  canvas.height = height;
  canvas.style.zIndex = 8;
  canvas.style.position = "absolute";
  canvas.style.border = "1px solid";

  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);

}

function fillCells() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * res;
      let y = j * res;
      if (grid[i][j] == 1) {
        var canvas = document.querySelector('canvas');
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, res - 1, res - 1);
      }
    }
  }

  let next = create2DArray(rows, cols);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      if (i == 0 || i == cols - 1 || j == 0 || j == rows - 1) {
        next[i][j] = state;

      } else {
        let sum = 0;
        let neighbours = countNeigbours(grid, i, j);
        console.log(neighbours);
        if (state == 0 && neighbours == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (neighbours == 2 || neighbours == 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
      }
    }
  }

  grid = next;
}

function countNeigbours(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      sum += grid[x + i][y + j];
    }
  }
  sum -= grid[i][j];
  return sum;

}
