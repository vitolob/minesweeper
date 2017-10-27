/**
 * Generates a blank board of a given size
 * This board will hold the player's guesses
 */
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {

  // Empty board
  let board = [];

  // This loop creates a row
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {

    row = [];

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

    row = [];

    // This loop creates a column
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(null);
    }

    board.push(row);
  }

  let numberOfBombsPlaced = 0;

  while (numberOfBombsPlaced < numberOfBombs) {

    // To be fixed:
    // Code with potential to place bombs on top of already existing ones

    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

    board[randomRowIndex][randomColumnIndex] = 'B';

    numberOfBombsPlaced++;
  }

  return board;

};

/*
 * Takes a board array and prints it to the console
 */
const printBoard = (board) => {

  let boardString = board.map(row => {
    row.join(' | ') // returns an array of formatted rows
  }).join('\n'); // Joins the formatted rows into a correctly formatted board (string)

  console.log(boardString);
};
