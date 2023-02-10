// game object module pattern
const game = (function () {
  // game board
  let gameboard = [];
  gameboard.length = 9;

  let winner = '';

  //players have mark x or o and move first or second
  const Player = (mark, move) => {
    mark = mark;
    move = move;

    return { mark, move };
  };

  const player1 = Player('X', 'first');
  const player2 = Player('O', 'second');
  let currentPlayer = player1;

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

  // render gameboard array on screen
  render();

  function render() {
    for (let i = 0; i < squares.length; i++) {
      //   console.log(squares[i]);
      //   console.log(gameboard[i]);
      squares[i].textContent = gameboard[i];
    }
  }

  // play move
  function playMove(event) {
    if (event.target.textContent === '') {
      console.log(event.target.dataset.index);
      gameboard[event.target.dataset.index] = currentPlayer.mark;
      render();
      getNextToPlay();
      console.table(gameboard);
      checkResult(gameboard);
    }
  }

  // get columns, rows and diagonals
  function checkRows(gameboard) {
    let row1 = gameboard[0] + gameboard[1] + gameboard[2];
    let row2 = gameboard[3] + gameboard[4] + gameboard[5];
    let row3 = gameboard[6] + gameboard[7] + gameboard[8];

    if (row1 === 'XXX' || row2 === 'XXX' || row3 === 'XXX') {
      winner = 'X';
      console.log(`row winner: ${winner}`);
    } else if (row1 === 'OOO' || row2 === 'OOO' || row3 === 'OOO') {
      winner = 'O';
      console.log(`row winner: ${winner}`);
    }
  }

  function checkColumns(gameboard) {
    let col1 = gameboard[0] + gameboard[3] + gameboard[6];
    let col2 = gameboard[1] + gameboard[4] + gameboard[7];
    let col3 = gameboard[2] + gameboard[5] + gameboard[8];

    if (col1 === 'XXX' || col2 === 'XXX' || col3 === 'XXX') {
      winner = 'X';
      console.log(`column winner: ${winner}`);
    } else if (col1 === 'OOO' || col2 === 'OOO' || col3 === 'OOO') {
      winner = 'O';
      console.log(`column winner: ${winner}`);
    }
  }

  function checkDiagonals(gameboard) {
    let diag1 = gameboard[0] + gameboard[4] + gameboard[8];
    let diag2 = gameboard[2] + gameboard[4] + gameboard[6];

    if (diag1 === 'XXX' || diag2 === 'XXX') {
      winner = 'X';
      console.log(`diagonal winner: ${winner}`);
    } else if (diag1 === 'OOO' || diag2 === 'OOO') {
      winner = 'O';
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
    } else if (winner === '' && gameboard.join('').length === 9) {
      result.textContent = `It's a draw...`;
      grid.removeEventListener('click', playMove);
    }
  }

  function restartGame() {
    // for (let i = 0; i < gameboard.length; i++) {
    //   gameboard[i] = '';
    // }

    gameboard = [];
    render();
    result.textContent = '';
    grid.removeEventListener('click', playMove);
    grid.addEventListener('click', playMove);
    winner = '';
  }

  return {};
})();
