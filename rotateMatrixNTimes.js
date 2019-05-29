/*

Problem description: Given a matrix and a integer n, where n represents the amount of times to
rotate the matrix, return back the rotated matrix. Ignore the values that fall on the major/minor
diagonals, and only rotate the cross-sections that are created by those diagonals. 

This is a solution to a variation to the rotate matrix by 90 degrees problem. 

Constraints: 
The matrix will always be an mxm matrix. 
The matrix will always be of odd length
You will always receive a valid input.

Ex.

m = [
  [1,2,3,4,5],
  [6,7,8,9,10],
  [11,12,13,14,15],
  [16,17,18,19,20],
  [21,22,23,24,25],
]

k = 1

Output matrix: 

[
  [1,16,11,6,5],
  [22,7,12,9,10],
  [23,18,13,8,3],
  [24,17,14,19,4],
  [21,20,15,10,25]
]

Ex2:

[
  [1,2,3],
  [4,5,6],
  [7,8,9]
]

k = 2

After one rotation
[
  [1,4,3],
  [8,5,2],
  [7,6,9],
]

After second rotation
[
  [1,8,3],
  [6,5,4],
  [7,2,9]
]

*/

const rotateMatrixNTimes = (matrix, n) => {
  const length = matrix.length;
  //Any further rotations after 4 is unnecessary as there are only 4 possible rotations
  const rotations = n % 4;
  let newMatrix = matrix;

  const rotate = matrix => {
    let newMatrix = Array.from(new Array(length), () => Array.from(new Array(length)));

    for (let row = 0; row < length; row++) {
      for (let col = 0; col < length; col++) {
        //If a value falls on the diagonal axis, ignore it by setting it to itself.
        if (row === col || row + col === length - 1) {
          newMatrix[row][col] = matrix[row][col];
        } else {
          //Otherwise, rotate.
          newMatrix[col][length - 1 - row] = matrix[row][col];
        }
      }
    }
    return newMatrix;
  };

  for (let i = 0; i < rotations; i++) {
    newMatrix = rotate(newMatrix);
  }
  return newMatrix;
};
