'use strict';

/**
 * Generates a blank board of a given size
 * This board will hold the player's guesses
 */
var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  // Empty board
  var board = [];

  // This loop creates a row
  for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    var row = [];

    // This loop creates a column
    for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
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
var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  // Empty board
  var board = [];

  // This loop creates a row
  for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    var row = [];

    // This loop creates a column
    for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(null);
    }
    board.push(row);
  }

  var numberOfBombsPlaced = 0;

  while (numberOfBombsPlaced < numberOfBombs) {
    var randomRowIndex = Math.floor(Math.random() * numberOfRows);
    var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

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
var getNumberOfNeighborBombs = function getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex) {
  /* For each nested array:
   * First element - Row offset
   * Second element - Column offset
   */
  var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  var numberOfRows = bombBoard.length;
  var numberOfColumns = bombBoard[0].length;
  var numberOfBombs = 0;

  neighborOffsets.forEach(function (offset) {
    var neighborRowIndex = rowIndex + offset[0];
    var neighborColumnIndex = columnIndex + offset[1];

    // Conditions for a valid neighborRowIndex & neighborColumnIndex
    var rowOffsetCondition = neighborRowIndex >= 0 && neighborRowIndex < numberOfRows;
    var columnOffsetCondition = neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns;

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
var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {

  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped!');
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

/*
 * Takes a board array and prints it to the console
 */
var printBoard = function printBoard(board) {
  var boardString = board.map(function (row) {
    return row.join(' | ');
  }).join('\n');
  console.log(boardString);
};

var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 1, 1);
console.log('Updated Player Board: ');
printBoard(playerBoard);