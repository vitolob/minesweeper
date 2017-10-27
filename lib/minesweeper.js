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

    // To be fixed:
    // Code with potential to place bombs on top of already existing ones

    var randomRowIndex = Math.floor(Math.random() * numberOfRows);
    var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

    board[randomRowIndex][randomColumnIndex] = 'B';

    numberOfBombsPlaced++;
  }

  return board;
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