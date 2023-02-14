// game object module pattern
const game = (function () {
  // game board [3][3]
  let gameboard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  let winner = '';

  //players have mark X or O and move first or second
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
      // console.log(event.target.dataset.index);
      gameboard[event.target.dataset.index[0]][event.target.dataset.index[1]] =
        currentPlayer.mark;
      render();
      // console.table(gameboard);
      checkResult(gameboard);
      getNextToPlay();
      //after player move if there is no winner then play ai move
      if (winner === '') {
        aiPlay();
      }
    }
  }

  // ai plays best move with minimax
  function aiPlay() {
    // get copy of current board state
    let copyGameboard = cloneArray(gameboard);

    /*  set winner back to '' so that it doesn't end game for no reason 
        based on what the minimax was looking at down the tree */
    // winner = '';

    // render the ai's move
    render();

    // check if game now has a winner
    checkResult(gameboard);

    // get the next player to play
    getNextToPlay();
  }

  // find best available move with minimax algorithm
  function minimax(board, player) {
    // let scores = {
    //   X: 1,
    //   O: -1,
    //   tie: 0,
    // };
    // 1) return value if terminal state is found
    // 2) Loop through available spots on the board
    // 3) call the minimax function on each available spot recursively
    // 4) evaluate returning values from function calls
    // 5) return the best value
  }

  // since array only shallow copy I have to create a deep copy clone
  function cloneArray(array) {
    return array.map((item) => (Array.isArray(item) ? cloneArray(item) : item));
  }

  // @@@@@@ check the result for minimax @@@@@@@@@@@@@@@@@@@@@@
  function checkWinner(board) {
    checkRows(board);
    checkColumns(board);
    checkDiagonals(board);

    if (winner !== '') {
      return winner.mark;
    } else if (
      winner === '' &&
      board.map((arr) => arr.join('')).join('').length === 9
    ) {
      return 'tie';
    } else {
      return null;
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
      winner = player1;
      console.log(`row winner: ${winner.mark}`);
    } else if (row1 === 'OOO' || row2 === 'OOO' || row3 === 'OOO') {
      winner = player2;
      console.log(`row winner: ${winner.mark}`);
    }
  }

  function checkColumns(gameboard) {
    let col1 = gameboard[0][0] + gameboard[1][0] + gameboard[2][0];
    let col2 = gameboard[0][1] + gameboard[1][1] + gameboard[2][1];
    let col3 = gameboard[0][2] + gameboard[1][2] + gameboard[2][2];

    if (col1 === 'XXX' || col2 === 'XXX' || col3 === 'XXX') {
      winner = player1;
      console.log(`column winner: ${winner.mark}`);
    } else if (col1 === 'OOO' || col2 === 'OOO' || col3 === 'OOO') {
      winner = player2;
      console.log(`column winner: ${winner.mark}`);
    }
  }

  function checkDiagonals(gameboard) {
    let diag1 = gameboard[0][0] + gameboard[1][1] + gameboard[2][2];
    let diag2 = gameboard[2][0] + gameboard[1][1] + gameboard[0][2];

    if (diag1 === 'XXX' || diag2 === 'XXX') {
      winner = player1;
      console.log(`diagonal winner: ${winner.mark}`);
    } else if (diag1 === 'OOO' || diag2 === 'OOO') {
      winner = player2;
      console.log(`diagonal winner: ${winner.mark}`);
    }
  }

  function checkResult(gameboard) {
    checkRows(gameboard);
    checkColumns(gameboard);
    checkDiagonals(gameboard);

    if (winner !== '') {
      result.textContent = `The winner is ${winner.name}`;
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

/* Broken minimax functions


// ai plays best move with minimax
  function aiPlay() {
    let copyGameboard = cloneArray(gameboard);
    // console.table(copyGameboard);
    // track best score - set it to worst possible score of infinity since we're minimising

    
    let bestScore = Infinity;
    let bestMove;
    console.log(`bestMove is currently = ${bestMove}`);
    // loop through board
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // if spot is available
        if (copyGameboard[i][j] === '') {
          console.log(`copyGameboard[${i}][${j}] === ''`);
          copyGameboard[i][j] = 'O';
          console.log(`enter minimax`);
          let score = minimax(copyGameboard, 0, true);
          copyGameboard[i][j] = '';
          console.log(score);
          if (score < bestScore) {
            bestScore = score;
            console.log('new best move');
            // BEST MOVE IS ONLY SET ONCE!!!!!!!!!! NEED TO BE SET ON EVERY BEST SCORE
            bestMove = { i, j };
            console.log(bestMove);
          }
        }
      }
    }

    // play best move
    console.log(bestMove);
    gameboard[bestMove.i][bestMove.j] = 'O';
  

    winner = '';
    render();
    // console.table(gameboard);
    checkResult(gameboard);
    getNextToPlay();
  }

  // doens't work!!!!!!!!
  function minimax(board, depth, isMaximising) {
    let scores = {
      X: 1,
      O: -1,
      tie: 0,
    };

    let result = checkWinner(board);
    // console.log(result);
    if (result !== null) {
      console.log(`return ${scores[result]}`);
      return scores[result];
    }

    if (isMaximising) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            console.log(`copyGameboard[${i}][${j}] === ''`);
            board[i][j] = 'X';
            console.log(`enter minimax`);
            let score = minimax(board, depth + 1, false);
            board[i][j] = '';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      console.log(`return ${bestScore}`);
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            console.log(`copyGameboard[${i}][${j}] === ''`);
            board[i][j] = 'O';
            console.log(`enter minimax`);
            let score = minimax(board, depth + 1, true);
            board[i][j] = '';
            bestScore = Math.min(score, bestScore);
            console.log(bestScore);
          }
        }
      }
      console.log(`return ${bestScore}`);
      return bestScore;
    }
  }

  // add check winner for minimax
  function checkWinner(board) {
    checkRows(board);
    checkColumns(board);
    checkDiagonals(board);

    if (winner !== '') {
      return winner.mark;
    } else if (
      winner === '' &&
      board.map((arr) => arr.join('')).join('').length === 9
    ) {
      return 'tie';
    } else {
      return null;
    }
  }

*/

/* simple ai controlled moves - finds next available space to play*/

// ai plays move in next available space
// function aiPlayNextAvailable() {
//   // is it better to break out of a nested for loop with labels or
//   // just return
//   exit_loops: for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 3; j++) {
//       if (gameboard[i][j] === '') {
//         gameboard[i][j] = 'O';
//         render();
//         console.table(gameboard);
//         checkResult(gameboard);
//         getNextToPlay();
//         return;
//         // break exit_loops;
//       }
//     }
//   }

//   // render();
//   // console.table(gameboard);
//   // checkResult(gameboard);
//   // getNextToPlay();
// }
