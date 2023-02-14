// game object module pattern
const game = (function () {
  // game board [3][3]
  let gameboard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  // gameboard.length = 9;

  let winner = '';

  //players have mark x or o and move first or second
  const Player = (mark, move) => {
    mark = mark;
    move = move;
    let name = mark;

    return { mark, move, name };
  };

  const player1 = Player('X', 'first');
  const player2 = Player('O', 'second');
  let currentPlayer = player1;

  // Get player names
  let playerInfo = document.querySelector('.player-info');
  playerInfo.addEventListener('change', getPlayerNames);

  function getPlayerNames(event) {
    console.log(event.target.value);
    console.log(event.target.id);
    if (event.target.id === 'x-name') {
      if (event.target.value === '') {
        player1.name = player1.mark;
      } else {
        player1.name = event.target.value;
      }
    } else if (event.target.id === 'o-name') {
      if (event.target.value === '') {
        player2.name = player2.mark;
      } else {
        player2.name = event.target.value;
      }
    }
  }

  // Get next player to play
  function getNextToPlay() {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  }

  // cache DOM
  let grid = document.querySelector('.square-container');
  grid.addEventListener('click', playMove);
  //get squares in grid
  let squares = grid.children;
  //   console.log(grid);
  //   console.log(squares.length);
  let result = document.querySelector('.result');
  let restart = document.querySelector('#restart');
  restart.addEventListener('click', restartGame);

  // render gameboard [3][3] on screen
  render();

  function render() {
    let squareCounter = 0;
    // loop through each items of the 3 arrays within the gameboard array
    // increment the square counter so it hits correct element on page
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        squares[squareCounter].textContent = gameboard[i][j];
        squareCounter++;
      }
    }
  }

  // play move
  function playMove(event) {
    if (event.target.textContent === '') {
      console.log(event.target.dataset.index);
      gameboard[event.target.dataset.index[0]][event.target.dataset.index[1]] =
        currentPlayer.mark;
      render();
      getNextToPlay();
      console.table(gameboard);
      checkResult(gameboard);
    }
  }

  // get columns, rows and diagonals
  function checkRows(gameboard) {
    // let row1 = gameboard[0][0] + gameboard[0][1] + gameboard[0][2];
    // let row2 = gameboard[1][0] + gameboard[1][1] + gameboard[1][2];
    // let row3 = gameboard[2][0] + gameboard[2][1] + gameboard[2][2];
    let row1 = gameboard[0].join('');
    let row2 = gameboard[1].join('');
    let row3 = gameboard[2].join('');

    if (row1 === 'XXX' || row2 === 'XXX' || row3 === 'XXX') {
      winner = player1.name;
      console.log(`row winner: ${winner}`);
    } else if (row1 === 'OOO' || row2 === 'OOO' || row3 === 'OOO') {
      winner = player2.name;
      console.log(`row winner: ${winner}`);
    }
  }

  function checkColumns(gameboard) {
    let col1 = gameboard[0][0] + gameboard[1][0] + gameboard[2][0];
    let col2 = gameboard[0][1] + gameboard[1][1] + gameboard[2][1];
    let col3 = gameboard[0][2] + gameboard[1][2] + gameboard[2][2];

    if (col1 === 'XXX' || col2 === 'XXX' || col3 === 'XXX') {
      winner = player1.name;
      console.log(`column winner: ${winner}`);
    } else if (col1 === 'OOO' || col2 === 'OOO' || col3 === 'OOO') {
      winner = player2.name;
      console.log(`column winner: ${winner}`);
    }
  }

  function checkDiagonals(gameboard) {
    let diag1 = gameboard[0][0] + gameboard[1][1] + gameboard[2][2];
    let diag2 = gameboard[2][0] + gameboard[1][1] + gameboard[0][2];

    if (diag1 === 'XXX' || diag2 === 'XXX') {
      winner = player1.name;
      console.log(`diagonal winner: ${winner}`);
    } else if (diag1 === 'OOO' || diag2 === 'OOO') {
      winner = player2.name;
      console.log(`diagonal winner: ${winner}`);
    }
  }

  function checkResult(gameboard) {
    checkRows(gameboard);
    checkColumns(gameboard);
    checkDiagonals(gameboard);

    if (winner !== '') {
      result.textContent = `The winner is ${winner}`;
      grid.removeEventListener('click', playMove);
    } else if (
      winner === '' &&
      gameboard.map((arr) => arr.join('')).join('').length === 9
    ) {
      result.textContent = `It's a draw...`;
      grid.removeEventListener('click', playMove);
    }
  }

  function restartGame() {
    gameboard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    render();
    result.textContent = '';
    grid.removeEventListener('click', playMove);
    grid.addEventListener('click', playMove);
    winner = '';
    currentPlayer = player1;
  }

  return {};
})();
