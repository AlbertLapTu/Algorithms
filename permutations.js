/*

Backtracking examples written in Javascript. The context of this will be covering: 

Subsets, permutations, and combination sums. 

*/

/**
 *
 * @param {array} nums
 * Description: Generic subset algorithm, assumes that there are no duplicate integers in nums
 */
const subSets = nums => {
  let results = [];

  const dfs = (set, index) => {
    results.push(set);
    for (let i = index; i < nums.length; i++) {
      let currentNum = nums[i];
      dfs(set.concat(currentNum), i + 1);
    }
  };
  dfs([], 0);
  return results;
};

/**
 *
 * @param {array} nums
 *
 * Description: A modification of the above subset algorithm, which generates all subsets on distinct integers, ignoring integers.
 */
const subSetsII = nums => {
  let results = [];
  nums = nums.sort((a, b) => a - b);

  const dfs = (set, index) => {
    results.push(set);

    for (let i = index; i < nums.length; i++) {
      let currentNum = nums[i];
      if (i > index && nums[i] === nums[i - 1]) {
        continue;
      }
      dfs(set.concat(currentNum), i + 1);
    }
  };

  dfs([], 0);
  return results;
};

/**
 *
 * @param {array} nums
 *
 * Description: A standard permutation function. Logic is concatenate each value of the array, while
 * remembering to skip over that value to pass onto the next recursive call.
 *
 */

const permute = nums => {
  const permutations = [];

  const generatePermutation = (permutation = [], remaining) => {
    if (remaining.length === 0) {
      permutations.push(permutation);
    }

    for (let i = 0; i < remaining.length; i++) {
      let currentNum = remaining[i];
      generatePermutation(
        permutation.concat(currentNum),
        remaining.slice(0, i).concat(remaining.slice(i + 1))
      );
    }
  };
  generatePermutation([], nums);
  return permutations;
};

/**
 *
 * @param {array} candidates
 * @param {integer} target
 *
 * Description: Prior to recursing, check to see if the current candidate subtracted from the target is
 * less than 0. If it isn't, recurse.
 */

const combinationSum = (candidates, target) => {
  const result = [];

  if (candidates.length === 0) return result;

  const permutetate = (candidates, target, index, permutations = []) => {
    if (target === 0) {
      result.push(permutations);
    }

    for (let i = index; i < candidates.length; i++) {
      let candidate = candidates[i];

      if (target - current >= 0) {
        permutetate(candidates, target - current, i, permutations.concat(candidate));
      }
    }
  };
  permutetate(candidates, target, 0, []);
  return result;
};
