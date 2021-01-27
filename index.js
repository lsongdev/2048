const gridDisplay = document.getElementById('board');
const scoreDisplay = document.getElementById('score');
const resultDisplay = document.getElementById('result');

let score = 0;
let squares = [];

const width = 4

// create the playing board
function createBoard() {
  for (let i = 0; i < width * width; i++) {
    square = document.createElement('div')
    square.innerHTML = 0
    gridDisplay.appendChild(square)
    squares.push(square);
  }
}

// generate a new number
function generate() {
  randomNumber = Math.floor(Math.random() * squares.length)
  if (squares[randomNumber].innerHTML == 0) {
    squares[randomNumber].innerHTML = 2
    checkForGameOver()
  } else generate()
}

function moveRight() {
  for (let i = 0; i < 16; i++) {
    if (i % 4 === 0) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i + 1].innerHTML
      let totalThree = squares[i + 2].innerHTML
      let totalFour = squares[i + 3].innerHTML
      let row = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour)
      ];

      let filteredRow = row.filter(num => num)
      let missing = 4 - filteredRow.length
      let zeros = Array(missing).fill(0)
      let newRow = zeros.concat(filteredRow)

      squares[i].innerHTML = newRow[0]
      squares[i + 1].innerHTML = newRow[1]
      squares[i + 2].innerHTML = newRow[2]
      squares[i + 3].innerHTML = newRow[3]
    }
  }
}

function moveLeft() {
  for (let i = 0; i < 16; i++) {
    if (i % 4 === 0) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i + 1].innerHTML
      let totalThree = squares[i + 2].innerHTML
      let totalFour = squares[i + 3].innerHTML
      let row = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour)
      ]

      let filteredRow = row.filter(num => num)
      let missing = 4 - filteredRow.length
      let zeros = Array(missing).fill(0)
      let newRow = filteredRow.concat(zeros)

      squares[i].innerHTML = newRow[0]
      squares[i + 1].innerHTML = newRow[1]
      squares[i + 2].innerHTML = newRow[2]
      squares[i + 3].innerHTML = newRow[3]
    }
  }
}


function moveUp() {
  for (let i = 0; i < 4; i++) {
    let totalOne = squares[i].innerHTML
    let totalTwo = squares[i + (width * 1)].innerHTML
    let totalThree = squares[i + (width * 2)].innerHTML
    let totalFour = squares[i + (width * 3)].innerHTML
    let column = [
      parseInt(totalOne),
      parseInt(totalTwo),
      parseInt(totalThree),
      parseInt(totalFour)
    ];

    let filteredColumn = column.filter(num => num)
    let missing = 4 - filteredColumn.length
    let zeros = Array(missing).fill(0)
    let newColumn = filteredColumn.concat(zeros)

    squares[i].innerHTML = newColumn[0]
    squares[i + width].innerHTML = newColumn[1]
    squares[i + (width * 2)].innerHTML = newColumn[2]
    squares[i + (width * 3)].innerHTML = newColumn[3]
  }
}

function moveDown() {
  for (let i = 0; i < 4; i++) {
    let totalOne = squares[i].innerHTML
    let totalTwo = squares[i + width].innerHTML
    let totalThree = squares[i + (width * 2)].innerHTML
    let totalFour = squares[i + (width * 3)].innerHTML
    let column = [
      parseInt(totalOne),
      parseInt(totalTwo),
      parseInt(totalThree),
      parseInt(totalFour)
    ];

    let filteredColumn = column.filter(num => num)
    let missing = 4 - filteredColumn.length
    let zeros = Array(missing).fill(0)
    let newColumn = zeros.concat(filteredColumn)

    squares[i].innerHTML = newColumn[0]
    squares[i + width].innerHTML = newColumn[1]
    squares[i + (width * 2)].innerHTML = newColumn[2]
    squares[i + (width * 3)].innerHTML = newColumn[3]
  }
}

function combineRow() {
  for (let i = 0; i < 15; i++) {
    if (squares[i].innerHTML === squares[i + 1].innerHTML) {
      let combinedTotal =
        parseInt(squares[i].innerHTML) +
        parseInt(squares[i + 1].innerHTML);
      squares[i].innerHTML = combinedTotal
      squares[i + 1].innerHTML = 0
      score += combinedTotal
      scoreDisplay.innerHTML = score
    }
  }
  checkForWin()
}

function combineColumn() {
  for (let i = 0; i < 12; i++) {
    if (squares[i].innerHTML === squares[i + width].innerHTML) {
      let combinedTotal =
        parseInt(squares[i].innerHTML) +
        parseInt(squares[i + width].innerHTML)
      squares[i].innerHTML = combinedTotal
      squares[i + width].innerHTML = 0
      score += combinedTotal
      scoreDisplay.innerHTML = score
    }
  }
  checkForWin()
}

function keyRight() {
  moveRight()
  combineRow()
  moveRight()
  generate()
}

function keyLeft() {
  moveLeft()
  combineRow()
  moveLeft()
  generate()
}

function keyUp() {
  moveUp()
  combineColumn()
  moveUp()
  generate()
}

function keyDown() {
  moveDown()
  combineColumn()
  moveDown()
  generate()
}

// assign functions to keyCodes
function control(e) {
  switch (e.keyCode) {
    case 37:
      keyLeft()
      break;
    case 38:
      keyUp();
      break;
    case 39:
      keyRight()
      break;
    case 40:
      keyDown()
      break;
  }
}

// check for the number 2048 in the squares to win
function checkForWin() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].innerHTML == 2048) {
      resultDisplay.innerHTML = 'You WIN';
      setTimeout(() => clear(), 3000);
    }
  }
}

// check if there are no zeros on the board to lose
function checkForGameOver() {
  let zeros = 0
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].innerHTML == 0) {
      zeros++
    }
  }
  if (zeros === 0) {
    resultDisplay.innerHTML = 'You LOSE';
    setTimeout(() => clear(), 3000)
  }
}

// clear timer
function clear() {
  clearInterval(myTimer);
  document.removeEventListener('keyup', control);
}

// add colours
function addColours() {
  const colors = {
    0: '#afa192',
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#ffcea4',
    32: '#e8c064',
    64: '#ffab6e',
    128: '#fd9982',
    256: '#ead79c',
    512: '#76daff',
    1024: '#beeaa5',
    2048: '#d7d4f0',
  };
  for (let i = 0; i < squares.length; i++) {
    const color = colors[squares[i].innerHTML];
    squares[i].style.backgroundColor = color;
  }
}


createBoard()
generate()
generate()
addColours()
document.addEventListener('keyup', control);
var myTimer = setInterval(addColours, 50)

var finger = new Finger(gridDisplay);

finger.on('swipe', function (e) {
  console.log(e);
  switch (e.direction) {
    case 'up':
      keyUp();
      break;
    case 'down':
      keyDown();
      break;
    case 'left':
      keyLeft();
      break;
    case 'right':
      keyRight();
      break;
  }
});