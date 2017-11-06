class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);

    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Game over!');
      this._board.print();
    }
    else if (!this._board.hasSafeTiles()) {
      console.log('Congratulations, You won!');
    }
    else {
      console.log('Current Board: ');
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  /*
   * Flips a tile and updates the tile on the board
   */
  flipTile (rowIndex, columnIndex) {

    if (this.playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
    }
    else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this.playerBoard[rowIndex][columnIndex] = 'B';
    }
    else {
      this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }

    this._numberOfTiles--;
  }

  /*
   * Returns the number of bombs in adjacent tiles
   */
  getNumberOfNeighborBombs (rowIndex, columnIndex) {
    /* For each nested array:
     * First element - Row offset
     * Second element - Column offset
     */
    let neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];

      // Conditions for a valid neighborRowIndex & neighborColumnIndex
      let rowOffsetCondition = (neighborRowIndex >= 0) && (neighborRowIndex < numberOfRows);
      let columnOffsetCondition = (neighborColumnIndex >= 0) && (neighborColumnIndex < numberOfColumns);

      if (rowOffsetCondition && columnOffsetCondition) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs += 1;
        }
      }
    });

    return numberOfBombs;
  }

  /*
   * Checks if there are still safe tiles in the Board
   */
  hasSafeTiles() {
    return this._numberOfTiles != this._numberOfBombs;
  }

  /*
   * Takes a board array and prints it to the console
   */
  print() {
    let boardString = this.playerBoard.map(row => row.join(' | ')).join('\n');
    console.log(boardString);
  }

  /**
   * Generates a blank board of a given size
   * This board will hold the player's guesses
   */
  static generatePlayerBoard (numberOfRows, numberOfColumns) {
    // Empty board
    let board = [];

    // This loop creates a row
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [];

      // This loop creates a column
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      }
      board.push(row);
    }

    return board;
  }

  /**
   * Similar to generatePlayerBoard function
   * But it's meant to only contain bombs
   */
  static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
    // Empty board
    let board = [];

    // This loop creates a row
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [];

      // This loop creates a column
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;

    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      };
    }

    return board;
  }

}

const g = new Game(3,3,3);

g.playMove(0,0);
