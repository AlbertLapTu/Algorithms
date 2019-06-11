// var minWindow = function(s, t) {
//   let hashMap = {};
//   for (let char of t) {
//     !hashMap[char] ? (hashMap[char] = 1) : hashMap[char++];
//   }

//   let counter = t.length;
//   let start = 0;
//   let end = 0;
//   let windowStart = 0;
//   let windowEnd = 0;
//   let distance = Number.MAX_SAFE_INTEGER;

//   while (end < s.length) {
//     let char = s[end];
//     if (hashMap[char] > 0) counter--;
//     if (hashMap[char] !== undefined) hashMap[char]--;

//     while (counter === 0) {
//       if (end - start < distance) {
//         distance = end - start;
//         windowStart = start;
//         windowEnd = end;
//       }

//       if (hashMap[s[start]] === 0) {
//         counter++;
//       }

//       if (hashMap[s[start]] < 1) hashMap[s[start]]++;
//       start++;
//     }
//     end++;
//   }
//   return distance === Number.MAX_SAFE_INTEGER ? '' : s.slice(windowStart, windowEnd + 1);
// };

// console.log(minWindow('ADOBECODEBANC', 'ABC'));

const minWindow = (s, t) => {
  let dict = {};
  for (let char of t) {
    !dict[char] ? (dict[char] = 1) : dict[char]++;
  }

  let counter = t.length;
  let start = 0;
  let end = 0;
  let startWindow = 0;
  let endWindow = 0;
  let distance = Number.MAX_SAFE_INTEGER;

  while (end < s.length) {
    let char = s[end];
    if (dict[char] > 0) {
      counter--;
    }

    if (dict[char] !== undefined) {
      dict[char]--;
    }

    while (counter === 0) {
      let temp = s[start];

      if (end - start < distance) {
        distance = end - start;
        startWindow = start;
        endWindow = end;
      }
      if (dict[temp] === 0) {
        counter++;
      }
      if (dict[temp] < 1) dict[temp]++;
      start++;
    }
    end++;
  }
  return distance === Number.MAX_SAFE_INTEGER ? '' : s.slice(startWindow, endWindow + 1);
};

console.log(minWindow('ADOBECODEBANC', 'ABC'));



var findPeakElement = function(nums) {
  let start = 0;
  let end = nums.length - 1;
  
  while (start < end) {
    let midpoint = Math.floor((start+end)/2)
    
    if (nums[midpoint] > nums[midpoint + 1]) {
      end = midpoint;
    } else {
      start = midpoint + 1;
    }
  }
  return start;
};



function findPeakElement(nums) {
  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    const mid = Math.floor((l + r) / 2);

    if (nums[mid] > nums[mid + 1]) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
}