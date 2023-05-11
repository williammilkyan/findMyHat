const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(grid) {
    this.grid = grid;
    this.game = true;
  }
  getMaxCol() {
    return this.grid[0].length - 1;
  }
  getMaxRow() {
    return this.grid.length - 1;
  }
  getGameStatus(){
    return this.game;
  }
  print() {
    for (let i = 0; i < this.grid.length; i++) {
      console.log(this.grid[i].join(" "));
    }
  }
loadStartPoint(x, y){
  this.grid[y][x] = "*";
}
  update(x, y) {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] === "*") {
          this.grid[i][j] = "░";
        }
      }
    }
    if (this.grid[x][y] === "O") {
      console.log("you are lost");
      this.game = false;
    } else if (this.grid[x][y] === "^") {
      console.log("you win");
      this.game = false;
    } else {
      this.grid[x][y] = "*";
    }
  }
  static generateField(height, width, percentage){
    let newArr = [];  
    for(let i = 0; i < height; i++){
      let temp = [];
      for(let j = 0; j < width; j++){
       temp.push("░");
      }      
      newArr.push(temp);
    }
    let numOfHole = Math.floor(height * width * percentage * 0.01);
    for(let o = 0; o < numOfHole; o++){
      newArr[Math.floor(Math.random() * height)][Math.floor(Math.random()* width)] = "O";
    }

    newArr[Math.floor(Math.random()*height)][Math.floor(Math.random()*width)] = "^";
    //newArr[Math.floor(Math.random(height))][Math.floor(Math.random(width))] = "*";

  return newArr;
 }
}

const myField = new Field(Field.generateField(8, 8, 10));
//myField.print();
/*const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);*/
const gameOn = () => {
  let gcol = prompt("for this game, how many col do you want:");
  let grow = prompt("for this game, how many row do you want:");
  const myField = new Field(Field.generateField(grow, gcol, 10));
  let row = [Math.floor(Math.random()*grow)];
  let col = [Math.floor(Math.random()*gcol)];
  myField.loadStartPoint(col, row);
  myField.print();
  while (myField.getGameStatus()) {
    let move = prompt("Please enter your move:");
    console.log(`current point(${col}, ${row} )`);
    console.log(`you move ${move}`);

    if (move === "d") {
      row++;
    } else if (move === "r") {
      col++;
    } else if (move === "u") {
      row--;
    } else if (move === "l") {
      col--;
    } else if (move === "end") {
      console.log("give up, game over!");
      break;
    } else {
      console.log("no valid move, retry!");
    }

    if (col < 0) {
      col++;
      console.log("it is border can not go beyond west border!");
    } else if (row < 0) {
      row++;
      console.log("it is border can not go beyond north border!");
    } else if (col > myField.getMaxCol()) {
      col--;
      console.log("it is border can not go beyond east border!");
    } else if (row > myField.getMaxRow()) {
      row--;
      console.log("it is border can not go beyond south border!");
    } else {
      console.log(`move to point(${col}, ${row} )`);
      myField.update(row, col);
    }

    myField.print();
  }
};
gameOn();
