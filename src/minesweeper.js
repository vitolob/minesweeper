/**
 * Generates a blank board of a given size
 * This board will hold the player's guesses
 */
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
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
};

/**
 * Similar to generatePlayerBoard function
 * But it's meant to only contain bombs
 */
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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
};

/*
 * Returns the number of bombs in adjacent tiles
 */
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
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
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;

  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];

    // Conditions for a valid neighborRowIndex & neighborColumnIndex
    rowOffsetCondition = (neighborRowIndex >= 0) && (neighborRowIndex < numberOfRows);
    columnOffsetCondition = (neighborColumnIndex >= 0) && (neighborColumnIndex < numberOfColumns);

    if (rowOffsetCondition && columnOffsetCondition) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfBombs += 1;
      }
    }
  });

  return numberOfBombs;
};

/*
 * Flips a tile and updates the tile on the board
 */
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {

  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped!');
  }
  else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  }
  else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

/*
 * Takes a board array and prints it to the console
 */
const printBoard = (board) => {
  let boardString = board.map(row => row.join(' | ')).join('\n');
  console.log(boardString);
};

let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);
