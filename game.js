let gameScreen = document.querySelector('.game-div');
let cube = document.createElement('div');
let gameOverEl = document.querySelector('.game-over');
let linesEl = document.querySelector('.lines');
let nextPieceEl = document.querySelector('.next-piece');

let random = Math.floor(Math.random() * 4);
let lines = 0;
let board = [];
let boardEl = [];
let colors = ['green', 'red', 'blue', 'yellow'];
let currentColor = colors[Math.floor(Math.random() * 3)];
let running = true;
let shape = '';
let nextShape = '';
let nextColor = colors[Math.floor(Math.random() * 3)];

const fillBoard = () => {
  let yCurrent = 0;
  for (let i = 0; i < 20; i++) {
    let xCurrent = 0;
    board[i] = [];
    for (let j = 0; j < 10; j++) {
      board[i][j] = { x: xCurrent, y: yCurrent, filled: false, color: 'black' };
      xCurrent += 20;
    }
    yCurrent += 20;
  }
};

const renderBoard = () => {
  for (let i = 0; i < 20; i++) {
    boardEl[i] = [];
    for (let j = 0; j < 10; j++) {
      let cube = document.createElement('div');
      cube.classList.add('cube');
      cube.style.top = board[i][j].y + 'px';
      cube.style.left = board[i][j].x + 'px';
      boardEl[i][j] = cube;
      boardEl[i][j].style.background = board[i][j].color;
      gameScreen.appendChild(cube);
    }
  }
};

let shapes = [
  {
    rotation: 0,
    position: '',
    reset: function () {
      this.position = [
        [
          { y: 2, x: 3 },
          { y: 3, x: 3 },
          { y: 2, x: 4 },
          { y: 2, x: 5 },
        ],
        [
          { y: 1, x: 4 },
          { y: 2, x: 4 },
          { y: 3, x: 4 },
          { y: 3, x: 5 },
        ],
        [
          { y: 2, x: 3 },
          { y: 2, x: 4 },
          { y: 2, x: 5 },
          { y: 1, x: 5 },
        ],
        [
          { y: 1, x: 3 },
          { y: 1, x: 4 },
          { y: 2, x: 4 },
          { y: 3, x: 4 },
        ],
      ];
    },
  },
  {
    rotation: 0,
    position: '',
    reset: function () {
      this.position = [
        [
          { y: 2, x: 3 },
          { y: 2, x: 4 },
          { y: 2, x: 5 },
          { y: 2, x: 6 },
        ],
        [
          { y: 1, x: 4 },
          { y: 2, x: 4 },
          { y: 3, x: 4 },
          { y: 4, x: 4 },
        ],
        [
          { y: 2, x: 3 },
          { y: 2, x: 4 },
          { y: 2, x: 5 },
          { y: 2, x: 6 },
        ],
        [
          { y: 1, x: 4 },
          { y: 2, x: 4 },
          { y: 3, x: 4 },
          { y: 4, x: 4 },
        ],
      ];
    },
  },
  {
    rotation: 0,
    position: '',
    reset: function () {
      this.position = [
        [
          { y: 2, x: 3 },
          { y: 2, x: 4 },
          { y: 3, x: 3 },
          { y: 3, x: 4 },
        ],
        [
          { y: 2, x: 3 },
          { y: 2, x: 4 },
          { y: 3, x: 3 },
          { y: 3, x: 4 },
        ],
        [
          { y: 2, x: 3 },
          { y: 2, x: 4 },
          { y: 3, x: 3 },
          { y: 3, x: 4 },
        ],
        [
          { y: 2, x: 3 },
          { y: 2, x: 4 },
          { y: 3, x: 3 },
          { y: 3, x: 4 },
        ],
      ];
    },
  },
  {
    rotation: 0,
    position: '',
    reset: function () {
      this.position = [
        [
          { y: 3, x: 3 },
          { y: 2, x: 4 },
          { y: 3, x: 4 },
          { y: 3, x: 5 },
        ],
        [
          { y: 1, x: 4 },
          { y: 2, x: 4 },
          { y: 2, x: 3 },
          { y: 3, x: 4 },
        ],
        [
          { y: 3, x: 3 },
          { y: 3, x: 4 },
          { y: 3, x: 5 },
          { y: 4, x: 4 },
        ],
        [
          { y: 1, x: 4 },
          { y: 2, x: 4 },
          { y: 2, x: 5 },
          { y: 3, x: 4 },
        ],
      ];
    },
  },
];

document.addEventListener('keydown', (e) => {
  removeShape();
  if (
    e.key === 'ArrowRight' &&
    !collidesRight(shape.position[shape.rotation])
  ) {
    moveRight();
  } else if (
    e.key === 'ArrowLeft' &&
    !collidesLeft(shape.position[shape.rotation])
  ) {
    moveLeft();
  } else if (e.key === 'ArrowDown' && !checkCollision()) {
    moveDown();
  }
  if (e.key === 'Shift') {
    increaseRotation();
  }
  renderShape();
});

const renderNextPiece = (shape) => {
  nextPieceEl.innerHTML = 'NEXT';
  shape.reset();
  let margin = 10 * (shape.position[0][3].x - shape.position[0][0].x) - 3;
  for (let i = 0; i < shape.position[0].length; i++) {
    let cube = document.createElement('div');
    cube.classList.add('cube');
    cube.style.background = nextColor;
    cube.style.top = shape.position[0][i].y * 20 + 'px';
    cube.style.left = shape.position[0][i].x * 20 - margin + 'px';
    nextPieceEl.appendChild(cube);
  }
};

const initiateNextRound = () => {
  renderBoard();
  shape = nextShape;
  random = Math.floor(Math.random() * 4);
  nextShape = shapes[random];
  shape.reset();
  renderNextPiece(nextShape);
};

const moveDown = () => shape.position.forEach((p) => p.forEach((p) => p.y++));
const moveLeft = () => shape.position.forEach((p) => p.forEach((p) => p.x--));
const moveRight = () => shape.position.forEach((p) => p.forEach((p) => p.x++));

const renderShape = () => {
  shape.position[shape.rotation].forEach((s) => {
    board[s.y][s.x].color = currentColor;
    boardEl[s.y][s.x].style.background = currentColor;
  });
};

const removeShape = () => {
  shape.position[shape.rotation].forEach((s) => {
    board[s.y][s.x].color = 'black';
    boardEl[s.y][s.x].style.background = 'black';
  });
};

const collidesLeft = (currentPos) => {
  return (
    currentPos.filter((c) => c.x <= 0 || board[c.y][c.x - 1].filled).length > 0
  );
};

const collidesRight = (currentPos) => {
  return (
    currentPos.filter((c) => c.x >= 9 || board[c.y][c.x + 1].filled).length > 0
  );
};

const collidesNext = (currentPos) => {
  return (
    currentPos.filter(
      (c) =>
        c.x > 9 ||
        c.x < 0 ||
        c.y > 19 ||
        (c.y < 19 && board[c.y][c.x]?.filled) ||
        (c.x < 9 && board[c.y][c.x + 1].filled) ||
        (c.x > 0 && board[c.y][c.x - 1].filled)
    ).length > 0
  );
};

const increaseRotation = () => {
  let nextPos = shape.rotation > 2 ? 0 : shape.rotation + 1;
  if (!collidesNext(shape.position[nextPos])) {
    shape.rotation = nextPos;
  }
};

const checkCollision = () => {
  for (let i = 0; i < shape.position[shape.rotation].length; i++) {
    let y = shape.position[shape.rotation][i].y;
    let x = shape.position[shape.rotation][i].x;
    if (y >= 19 || board[y + 1][x].filled) {
      return true;
    }
  }
  return false;
};

const savePosition = () => {
  shape.position[shape.rotation].forEach((s) => {
    board[s.y][s.x].filled = true;
    board[s.y][s.x].color = currentColor;
  });
};

const removeRow = (row) => {
  for (let i = row; i >= 0; i--) {
    for (let j = 0; j < board[row].length; j++) {
      if (i > 0) {
        board[i][j].color = board[i - 1][j].color;
        board[i][j].filled = board[i - 1][j].filled;
      }
    }
  }
};

const checkRemoveRow = () => {
  for (let i = 0; i < board.length; i++) {
    let countFilled = 0;
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j].filled) {
        countFilled++;
        if (countFilled > 9) {
          lines++;
          linesEl.textContent = 'LINES: ' + lines;
          removeRow(i);
        }
      }
    }
  }
};

const checkGameOver = () => {
  return board[2].filter((b) => b.filled).length > 0;
};

let showGameOver = () => {
  gameOverEl.classList.remove('hide');
  running = false;
};

const run = () => {
  if (running) {
    removeShape();
    renderShape();
  }
};

const moveAuto = () => {
  if (running) {
    if (!checkCollision()) {
      removeShape();
      moveDown();
    } else {
      savePosition();
      checkRemoveRow();
      currentColor = nextColor;
      nextColor = colors[Math.floor(Math.random() * 3)];
      initiateNextRound();
    }
    checkGameOver() && showGameOver();
  }
};

nextShape = shapes[random];
fillBoard();
initiateNextRound();

let gameInterval = setInterval(run, 20);
let tick = setInterval(moveAuto, 400);
