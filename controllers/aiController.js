exports.nextAiMoves = async (req, res, next) => {
  try {
    const { board } = req.body;

    const ai = "X";
    const human = "O";

    function bestMove() {
      // AI to make its turn
      let bestScore = -Infinity;
      let move;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] == "") {
            board[i][j] = ai;
            let score = minimax(board, 0, false);
            board[i][j] = "";
            if (score > bestScore) {
              bestScore = score;
              move = { i, j };
            }
          }
        }
      }

      // what we want to send
      const newBoard = [...board];
      newBoard[move.i][move.j] = ai;
      let currentPlayer = human;

     let resultWinner = checkWinner()
     

      res.json({ board: newBoard, currentPlayer,resultWinner });
    }

    let scores = {
      X: 1,
      O: -1,
      tie: 0,
    };

    function equals3(a, b, c) {
      // console.log(a,b,c);
      
      return a == b && b == c && a != "";
    }

    function checkWinner() {
      let winner = null;
  
      // horizontal
      for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
          winner = board[i][0];
        }
      }
  
      // Vertical
      for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
          winner = board[0][i];
        }
      }
  
      // Diagonal
      if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
      }
      if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
      }
  
      let openSpots = 0;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == "") {
            openSpots++;
          }
        }
      }
  
      if (winner == null && openSpots == 0) {
        return "tie";
      } else {
        return winner;
      }
    }

    function minimax(board, depth, isMaximizing) {
      // console.log("board, depth, isMaximizing",board, depth, isMaximizing);
      
      let result = checkWinner();
      if (result !== null) {
        
        return scores[result];
      }

      if (isMaximizing) {
        // ai
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            // Is the spot available?
            if (board[i][j] == "") {
              board[i][j] = ai;
              let score = minimax(board, depth + 1, false);
              board[i][j] = "";
              bestScore = Math.max(score, bestScore);
            }
          }
        }
        return bestScore;
      } else {
        // human
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            // Is the spot available?
            if (board[i][j] == "") {
              board[i][j] = human;
              let score = minimax(board, depth + 1, true);
              board[i][j] = "";
              bestScore = Math.min(score, bestScore);
            }
          }
        }
        return bestScore;
      }
    }
    bestMove();
  } catch (err) {
    next(err);
  }
};
