// game object module pattern
const game = (function () {
  // game board
  const gameboard = [];
  gameboard.length = 9;

  const players = ['player 1', 'player 2'];

  // cache DOM
  let grid = document.querySelector('.square-container');
  //get squares in grid
  let squares = grid.children;
  //   console.log(grid);
  //   console.log(squares.length);

  // render gameboard array on screen
  render();

  function render() {
    for (let i = 0; i < squares.length; i++) {
      //   console.log(squares[i]);
      //   console.log(gameboard[i]);
      squares[i].textContent = gameboard[i];
    }
  }

  return {};
})();
