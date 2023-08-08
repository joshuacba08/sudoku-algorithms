import "./style.css";

document.querySelector("#app").innerHTML = `
  <div>
    Sudoku
  </div>
`;

// sudoku function

const board1 = [
  [3, 0, 0, 0, 5, 4, 2, 0, 0], // row 0
  [0, 6, 0, 0, 9, 0, 0, 7, 0], // row 1
  [0, 0, 6, 0, 0, 0, 0, 0, 3], // row 2
  [0, 7, 0, 2, 1, 0, 0, 0, 0], // row 3
  [0, 0, 0, 0, 8, 0, 0, 0, 5], // row 4
  [0, 7, 0, 0, 0, 4, 0, 0, 0], // row 5
  [0, 0, 0, 5, 5, 0, 0, 0, 0], // row 6
  [0, 6, 0, 0, 1, 6, 0, 0, 0], // row 7
  [0, 0, 0, 1, 0, 0, 6, 0, 9], // row 8
];

// crea un board de sudoku valido
const board2 = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
]

// generate a sudoku board valid
const boardValid = [
  [4, 1, 3, 8, 2, 5, 6, 7, 9], // row 0
  [5, 6, 7, 1, 4, 9, 8, 3, 2], // row 1
  [2, 8, 9, 7, 3, 6, 1, 4, 5], // row 2
  [1, 9, 5, 4, 6, 2, 7, 8, 3], // row 3
  [7, 2, 6, 9, 8, 3, 5, 1, 4], // row 4
  [3, 4, 8, 5, 1, 7, 2, 9, 6], // row 5
  [8, 5, 1, 6, 9, 4, 3, 2, 7], // row 6
  [9, 7, 2, 3, 5, 8, 4, 6, 1], // row 7
  [6, 3, 4, 2, 7, 1, 9, 5, 8], // row 8
];

// criterios de validacion
// 1. no se puede repetir un numero en la misma fila
// 2. no se puede repetir un numero en la misma columna
// 3. no se puede repetir un numero en el mismo cuadrante 3x3

// Notacion en el algebra
// 1. i = fila
// 2. j = columna

// Para validar una fila es necesario recorrer todos los elementos de la fila

// 1. validar fila

const validateRow = (board, row, col, currentValue) => {
  // validate row es una funcion que tiene que validar que no se repita un numero en la misma fila
  // Si no se repite un numero en la misma fila, la funcion debe retornar true o de lo contrario false

  // es necesario recorrer la fila y comparar el valor de cada elemento con el valor que se esta ingresando
  for (let j = 0; j < 9; j++) {
    if (j !== col && board[row][j] === currentValue) {
      return false;
    }
  }
  return true;
};

const validateColumn = (board, row, col, currentValue) => {
  // validate column es una funcion que tiene que validar que no se repita un numero en la misma columna
  // Si no se repite un numero en la misma columna, la funcion debe retornar true o de lo contrario false

  // es necesario recorrer la columna y comparar el valor de cada elemento con el valor que se esta ingresando
  for (let i = 0; i < 9; i++) {
    if (i !== row && board[i][col] === currentValue) {
      return false;
    }
  }
  return true;
};

const validateSquare = (board, row, col, currentValue) => {
  // validate square es una funcion que tiene que validar que no se repita un numero en el mismo cuadrante 3x3
  // Si no se repite un numero en el mismo cuadrante, la funcion debe retornar true o de lo contrario false\

  // es necesario recorrer el cuadrante y comparar el valor de cada elemento con el valor que se esta ingresando
  // para recorrer el cuadrante es necesario saber en que cuadrante se esta ubicado el elemento
  // board[8][8]
  const rowStart = row - (row % 3); // 8 % 3 = 2
  const colStart = col - (col % 3); // 8 % 3 = 2

  // ahora que se sabe en que cuadrante se esta ubicado el elemento, es necesario recorrer el cuadrante
  // para acceder a los elementos del cuadrante es necesario recorrer la fila y la columna
  for (let i = rowStart; i < rowStart + 3; i++) {
    for (let j = colStart; j < colStart + 3; j++) {
      if (i !== row && j !== col && board[i][j] === currentValue) {
        return false;
      }
    }
  }

  return true;
};

const validSudoku = (board) => {
  // for para recorrer las filas
  for (let i = 0; i < 9; i++) {
    // for para recorrer las columnas
    for (let j = 0; j < 9; j++) {
      const currentValue = board[i][j];
      if (currentValue !== 0) {
        // validar fila
        // validar columna
        // validar cuadrante
        
        if (
          !validateRow(board, i, j, currentValue) ||
          !validateColumn(board, i, j, currentValue) ||
          !validateSquare(board, i, j, currentValue)
          ) {
          console.log("i", i, "j", j, "currentValue", currentValue);
          return "This board is not valid";
        }
      }
    }
  }

  return "This board is valid";
};

// A este tipo de for anidados se les llama for loops anidados y son comunmente utilizados para recorrer matrices

// si quisiera recorrer una matriz con metodos de array podria hacerlo de la siguiente manera

// board.forEach( (row, i) => {
//   row.forEach( (col, j) => {

console.log(validSudoku(board1)); 
console.log(validSudoku(board2)); 
console.log(validSudoku(boardValid)); 
