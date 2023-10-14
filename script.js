const game = (function () {
  const playerX = createPlayer('playerX');
  const playerO = createPlayer('playerO');

  function play(board, displayController) {
    
  };

  return { play };
})();

const gameBoard = (function () {
  const board = [[null, null, null], 
                 [null, null, null], 
                 [null, null, null]];
    
  function placeMarker(r, c, marker) {
    if (!board[r][c]) {
      board[r][c] = marker;
    }
  }

  return { board, placeMarker };
})();

const displayController = (function () {
  function renderGame(board){
    const boardDiv = document.querySelector('div');
    board.forEach((row, r) => {
      row.forEach((val, c) => {
        console.log(r,c);
        const valDiv = document.createElement('div');
        valDiv.setAttribute('data-row', r);
        valDiv.setAttribute('data-col', c);
        valDiv.innerText = val || '';
        boardDiv.appendChild(valDiv);
      })
    });
  }

  return { renderGame }
})();

function createPlayer(name) {
  return { name };
}



displayController.renderGame(gameBoard.board);
