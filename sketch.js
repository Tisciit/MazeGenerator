let ROWS = 100;
let COLS = 120;
let SIZE = 10;
let STEP = 100;

let cells = [];
let current;
let stack = [];


function setup() {

  Cell.setGlobals(SIZE, COLS, ROWS);
  createCanvas(SIZE * COLS, SIZE * ROWS)
  cells = Cell.getArray();

  current = cells[5580];
  current.available = false;

  for (let c of cells) {
    c.draw();
  }

  frameRate(120);
}

function draw() {

  //Provide ability to draw faster
  for (let n = 0; n < STEP; n++) {
    let neighbour = current.getNeighbour(false);
    if (neighbour) {
      current.removeWalls(neighbour);
      current.draw();
      neighbour.draw();
      stack.push(current);
      current = neighbour;
      current.available = false;
      current.highlight();

    } else if (stack.length > 0) {
      current.draw();
      current = stack.pop();
      current.highlight();
    }
    else {
      current.draw();
      noLoop();
    }
  }
}