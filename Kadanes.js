/*

Kadane's algorithm is used to find the largest subarray sum given a valid input array.

For example:

Input: [-2,-3,4,0,1,-2,1,5,-3]
Output: 7

Explanation: 

The largest contiguous subarray sum is [4,-1,-2,1,5].

The approach behind Kadane's is to continuosly as you are iterating through the input array. 

You only want to add positives to your running sum, and can only add negatives if the runningSum 
total is still > 0.

If you encounter a point where runningSum + current element is less than 0, reset your running sum amount. 

*/

const Kadanes = arr => {
  let largestSum = 0;
  let runningSum = 0;

  for (let i = 0; i < arr.length; i++) {
    if (runningSum + arr[i] > 0) {
      runningSum += arr[i];
    } else {
      runningSum = 0;
    }
    largestSum = Math.max(largestSum, runningSum);
  }

  return largestSum;
};
