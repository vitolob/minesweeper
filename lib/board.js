'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',


    /*
     * Flips a tile and updates the tile on the board
     */
    value: function flipTile(rowIndex, columnIndex) {

      if (this.playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this.playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }

      this._numberOfTiles--;
    }

    /*
     * Returns the number of bombs in adjacent tiles
     */

  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      /* For each nested array:
       * First element - Row offset
       * Second element - Column offset
       */
      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;

      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];

        // Conditions for a valid neighborRowIndex & neighborColumnIndex
        var rowOffsetCondition = neighborRowIndex >= 0 && neighborRowIndex < numberOfRows;
        var columnOffsetCondition = neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns;

        if (rowOffsetCondition && columnOffsetCondition) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs += 1;
          }
        }
      });

      return numberOfBombs;
    }

    /*
     * Checks if there are still safe tiles in the Board
     */

  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles != this._numberOfBombs;
    }

    /*
     * Takes a board array and prints it to the console
     */

  }, {
    key: 'print',
    value: function print() {
      var boardString = this.playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n');
      console.log(boardString);
    }

    /**
     * Generates a blank board of a given size
     * This board will hold the player's guesses
     */

  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
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
    }

    /**
     * Similar to generatePlayerBoard function
     * But it's meant to only contain bombs
     */

  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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
    }
  }]);

  return Board;
}();