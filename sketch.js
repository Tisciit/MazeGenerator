let ROWS = 50;
let COLS = 50;
let SIZE = 10;

let cells = [];
let current;
let stack = [];

function setup() {

  createCanvas(SIZE * COLS, SIZE * ROWS)

  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      cells.push(new Cell(x, y));
    }
  }

  current = cells[0];
  current.available = false;

  
}

function keyPressed(){
  draw();
}

function draw() {

  for (let c of cells) {
    c.draw(SIZE);
  }
  current.highlight(SIZE);

  let neighbour = current.getNeighbours();
  if (neighbour) {
    current.removeWalls(neighbour);
    stack.push(current);
    current = neighbour;
    current.available = false;

  } else if (stack.length > 0) {
    current = stack.pop();
  }
}