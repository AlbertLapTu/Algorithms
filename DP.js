/*

The famous unique Paths problem helped drive my ever-growing understanding of dynamic programming and
how to build a DP grid to break down these problems into smaller pieces. This is my attempt at explaining.

UniquePaths problem (found at: https://leetcode.com/problems/unique-paths/)

Prompt below:

A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the 
bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?

Example 1:

Given m = 3 and n = 6, we have the following grid, where x is an unvisited location within the grid. 

[
  [x, x, x, x, x, x],
  [x, x, x, x, x, x],
  [x, x, x, x, x, x]
]

Thinking about the problem, we know the robot is only able to move right, and down in that each 
directional step, we can assume the robot takes 1 step. We know that the robot can move right
n times, and we know that the robot can only move down m times. We can imitate each step
the robot takes by filling out the initial grid to mimic a robots movement. 

[
  [1, 1, 1, 1, 1, 1],
  [1, B, x, x, x, x],
  [1, x, x, x, x, x],
]

If we look at position marked B, we know that in order to get there, we need to go right once,
and down once. Since we already know the steps we took to the right, and the steps we took down,
we can get the amount of steps it took to go right (1), and the amount of steps it took to go down
(1), and sum it together. If we apply the same logic throughout the DP board we'll get:

[
  [1,1,1,1,1,1],
  [1,2,3,4,5,6],
  [1,3,6,10,15,21]
]

Our end point is the last index of the DP matrix, so we can return that to give 21 unique paths. 

This solution works for any m x n matrix. Test cases only go up to where m&n <= 100. 


*/

var uniquePaths = function(m, n) {
  const dp = new Array(m).fill(new Array(n).fill([]));

  for (let row = 0; row < m; row++) {
    dp[row][0] = 1;
  }

  for (let col = 0; col < n; col++) {
    dp[0][col] = 1;
  }

  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      dp[row][col] = dp[row][col - 1] + dp[row - 1][col];
    }
  }

  return dp[dp.length - 1][n - 1];
};
