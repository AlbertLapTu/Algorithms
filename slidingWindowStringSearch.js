/*

Searching for a substring within a string can be utilized with a few techniques. Sliding window, KMP
and other string algorithms come to mind. Here is a beginner template that helps solve substring search
in linear time using sliding window technique. 

Solution below is an answer to the leetcode question: 438. Find All Anagrams in a String
Link: https://leetcode.com/problems/find-all-anagrams-in-a-string/

Approach:

Pre-process the pattern into a data structure suitable for useage as a frequency counter. JS native
hashMap, or map work although in this case a map provides a stronger argument.

Advance one pointer and ask the following questions:

Is this character part of my pattern? 
  if so, decrement character appearance in frequency counter. 
  if not, keep going. 



  If my frequency counter is 0, we've found an anagram of the pattern
    Reverse the decrement actions prior
    Check to see if our end-start is equal to pattern
    Advance our start pointer and increment our frequency counter
*/

const findAnagrams = (s, p) => {
  const result = [];
  if (p.length > s.length) return result;

  let map = new Map();
  for (let char of p) {
    map.set(char, (map.get(char) | 0) + 1);
  }

  let start = 0;
  let end = 0;
  let counter = map.size();

  while (end < s.length) {
    let char = s.charAt(end);

    if (map.has(char)) {
      map.set(char, map.get(char) - 1);
      if (map.get(char) === 0) {
        counter--;
      }
    }
    end++;

    while (counter === 0) {
      let temp = s.charAt(start);
      if (map.has(temp)) {
        map.set(temp, map.get(temp) + 1);
        if (map.get(temp) > 0) {
          counter++;
        }
      }
      if (end - start === p.length) {
        result.push(start);
      }
      start++;
    }
  }
  return result;
};

/*

Minimum window substring asks that you find a substring that contains the pattern P in linear time. 
Using the above template, we can modify it accordingly. In this example, we'll be using the native
javascript hashTable. 

*/

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
