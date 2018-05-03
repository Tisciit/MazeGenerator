class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.walls = [true, true, true, true];
        this.available = true;
    }

    removeWalls(target) {
        if (this.x - target.x == 1) {
            this.walls[3] = false;
            target.walls[1] = false;
        } else if (this.x - target.x == -1) {
            this.walls[1] = false;
            target.walls[3] = false;
        }

        if (this.y - target.y == 1) {
            this.walls[0] = false;
            target.walls[2] = false;
        } else if (this.y - target.y == -1) {
            this.walls[2] = false;
            target.walls[0] = false;
        }
    }

    getNeighbours() {
        let n = [];

        let t = cells[Cell.getIndex(this.x, this.y - 1)];
        let b = cells[Cell.getIndex(this.x, this.y + 1)];
        let l = cells[Cell.getIndex(this.x - 1, this.y)];
        let r = cells[Cell.getIndex(this.x + 1, this.y)];

        if (t && t.available == true) { n.push(t); }
        if (b && b.available == true) { n.push(b); }
        if (l && l.available == true) { n.push(l); }
        if (r && r.available == true) { n.push(r); }

        for (let ne of n) {
            ne.highlight2(SIZE);
        }

        let rnd = floor(random(0, n.length));
        return n[rnd];

    }

    static getIndex(x, y) {
        if (x < 0 || y < 0 || x > COLS - 1 || y > ROWS - 1) {
            return -1;
        }
        return y + x * COLS;
    }


    draw(size) {
        noStroke();

        if (this.available) {
            fill(255, 0, 0, 100);
        } else {
            fill(150);
        }

        let drawX = this.x * size;
        let drawY = this.y * size;
        rect(drawX, drawY, size, size);

        //Draw Lines
        stroke(0);

        //Top, Right, Bottom, Left
        if (this.walls[0]) {
            line(drawX, drawY, drawX + size, drawY);
        }
        if (this.walls[1]) {
            line(drawX + size, drawY, drawX + size, drawY + size);
        }
        if (this.walls[2]) {
            line(drawX, drawY + size, drawX + size, drawY + size);
        }
        if (this.walls[3]) {
            line(drawX, drawY, drawX, drawY + size);
        }
    }

    highlight(size) {
        noStroke();
        fill(255, 255, 0);
        let drawX = this.x * size;
        let drawY = this.y * size;
        rect(drawX, drawY, size, size);
    }

    highlight2(size) {
        noStroke();
        fill(255, 255, 255);
        let drawX = this.x * size;
        let drawY = this.y * size;
        rect(drawX, drawY, size, size);
    }
}