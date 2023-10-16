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

function createPlayer (name, marker) {
  const getName = () => name;
  const getMarker = () => marker;
  function setName(newName) {
    name = newName;
  }
  return { getName, setName, getMarker };
}

const game = (function () {
  const board = gameBoard;
  const player1 = createPlayer('Player 1', 'X');
  const player2 = createPlayer('Player 2', 'O');
  let curPlayer = player1;

  const getCurPlayerName = () => curPlayer.getName();
  function setPlayer1Name(name) {
    player1.setName(name);
  }
  function setPlayer2Name(name) {
    player2.setName(name);
  }
  const getPlayer1Name = () => player1.getName();
  const getPlayer2Name = () => player2.getName();

  function playRound(r, c) {
    if (board.placeMarker(r, c, curPlayer.getMarker())) {
      curPlayer = curPlayer === player1 ? player2 : player1;
    }
  }

  function checkWinner() {
    const b = board.getBoard();
    const player = curPlayer.getMarker() === 'X' ? 'O' : 'X';
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

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (b[r][c] === null) {
          return false;
        }
      }
    }

    alert(`It's a tie!`)
    return true;
  }

  function clear() {
    board.clear();
    curPlayer = player1;
  }

  return { getCurPlayerName, setPlayer1Name, setPlayer2Name, getPlayer1Name, getPlayer2Name, playRound, clear, checkWinner, getBoard: board.getBoard };
})();

const displayController = (function () {
  const boardDiv = document.getElementById('board');
  const turnH2 = document.getElementById('turn');
  const newGameBtn = document.getElementById('new-game');
  const playersH3 = document.getElementById('players');
  const changeP1Input = document.getElementById('change-p1');
  const changeP2Input = document.getElementById('change-p2');

  function renderGame(){
    boardDiv.textContent = "";

    const board = game.getBoard();
    const curPlayerName = game.getCurPlayerName();
    const player1Name = game.getPlayer1Name();
    const player2Name = game.getPlayer2Name();

    board.forEach((row, r) => {
      row.forEach((val, c) => {
        const valDiv = document.createElement('div');
        valDiv.setAttribute('data-row', r);
        valDiv.setAttribute('data-col', c);
        valDiv.innerText = val || '';
        boardDiv.appendChild(valDiv);
      })
    });

    turnH2.innerText = `${curPlayerName}'s turn`
    playersH3.innerText = `${player1Name} vs. ${player2Name}`;

  }

  function handleBoardClick(e) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    game.playRound(row, col);
    renderGame();
    setTimeout(() => {
      // const winner = game.checkWinner();
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

  function changeP1Name(e) {
    game.setPlayer1Name(e.target.value);
    renderGame();
  }
  changeP1Input.addEventListener('change', changeP1Name);

  function changeP2Name(e) {
    game.setPlayer2Name(e.target.value);
    renderGame();
  }
  changeP2Input.addEventListener('change', changeP2Name);


  renderGame();
})();

