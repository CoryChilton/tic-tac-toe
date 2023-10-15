const gameBoard = (function () {
  const board = [[null, null, null], 
                 [null, null, null], 
                 [null, null, null]];

  const getBoard = () => board;
    
  function placeMarker(r, c, marker) {
    if (!board[r][c]) {
      board[r][c] = marker;
      return true;
    }
    return false;
  }

  function clear() {
    board.forEach((row, r) => {
      row.forEach((col, c) => {
        board[r][c] = null;
      });
    });
  }

  return { getBoard, placeMarker, clear };
})();

const game = (function () {
  const board = gameBoard;
  let curPlayer = 'X';

  const getCurPlayer = () => curPlayer;

  function playRound(r, c) {
    if (board.placeMarker(r, c, curPlayer)) {
      curPlayer = curPlayer === 'X' ? 'O' : 'X';
    }
    
  }

  function checkWinner(player) {
    board.getBoard().forEach(row => {
      if (row[0] === player && row[0] === row[1] && row[1] === row[2]) {
        alert(`${player} wins!`)
      }
    })
  }

  function clear() {
    board.clear();
    curPlayer = 'X';
  }

  return { getCurPlayer, playRound, clear, getBoard: board.getBoard };
})();

const displayController = (function () {
  const boardDiv = document.getElementById('board');
  const turnH2 = document.getElementById('turn');
  const newGameBtn = document.getElementById('new-game');

  function renderGame(){
    boardDiv.textContent = "";

    const board = game.getBoard();
    const curPlayer = game.getCurPlayer();

    board.forEach((row, r) => {
      row.forEach((val, c) => {
        const valDiv = document.createElement('div');
        valDiv.setAttribute('data-row', r);
        valDiv.setAttribute('data-col', c);
        valDiv.innerText = val || '';
        boardDiv.appendChild(valDiv);
      })
    });

    turnH2.innerText = `${curPlayer}'s turn`
  }

  function handleBoardClick(e) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    game.playRound(row, col);
    renderGame();
  }

  boardDiv.addEventListener('click', handleBoardClick);

  function resetGame() {
    game.clear();
    renderGame();
  }

  newGameBtn.addEventListener('click', resetGame);

  renderGame();
})();

