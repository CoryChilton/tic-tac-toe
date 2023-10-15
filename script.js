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

  function checkWinner() {
    const b = board.getBoard();
    const player = curPlayer === 'X' ? 'O' : 'X';
    for (let r = 0; r < 3; r++) {
      if (b[r][0] === player && b[r][0] === b[r][1] && b[r][1] === b[r][2]) {
        alert(`${player} wins!`)
        return true;
      }
    }

    for (let c = 0; c < 3; c++) {
      if (b[0][c] === player && b[0][c] === b[1][c] && b[1][c] === b[2][c]) {
        alert(`${player} wins!`)
        return true;
      }
    }

    if ( (b[0][0] === player && b[0][0] === b[1][1] && b[1][1] === b[2][2]) 
      || (b[0][2] === player && b[0][2] === b[1][1] && b[1][1] === b[2][0])) {
      alert(`${player} wins!`)
      return true;
    }

  }

  function clear() {
    board.clear();
    curPlayer = 'X';
  }

  return { getCurPlayer, playRound, clear, checkWinner, getBoard: board.getBoard };
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
    setTimeout(() => {
      if (game.checkWinner()) {
        resetGame();
      }
    }, 100);
    
  }

  boardDiv.addEventListener('click', handleBoardClick);

  function resetGame() {
    game.clear();
    renderGame();
  }

  newGameBtn.addEventListener('click', resetGame);

  renderGame();
})();

