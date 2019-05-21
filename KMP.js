/*

Pre-requisite information prior to advancing to algorithm. 

KMP algorithm is useful due to pre-processing the pattern into a pre-defined table we'll call a 
partial match table (within the context of this, I'll refer to the partial match table as LPS). 


Given word: 'Snape', -- 'S', 'Sn' 'Sna', 'Snap' are prefixes.
Given word: 'Hagrid, -- 'agrid', 'grid', 'rid', 'id', 'd' are suffix's


Take for example the following pattern: 'abababca'

Find the longest proper prefix within pattern that matches proper suffix
within the same pattern

cell:  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |

char:  | a | b | a | b | a | b | c | a |

index: | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 

value: | 0 | 0 | 1 | 2 | 3 | 4 | 0 | 1 |

Ex.1 If we look at cell 3, we only care about the first 3 chars 'aba'. Within 'aba', we have
two prefixes 'a', 'ab', and two suffixes, 'ba', 'a'. The prefix 'ab' doesn't match any
suffix. The prefix 'a' matches a suffix 'a', so the longest proper prefix that matches a 
proper suffix is 1, hence we place 1 as the value within the LPS table. 

Ex.2 If we look at cell 5, we care about 'ababa'
Prefixes: 'a', 'ab', 'aba', 'abab'
Suffixes: 'baba', 'aba', 'ba', 'a'

Our matches are 'a', and 'aba'. Value in this cell should be 3.

-- We can use the LPS table to skip ahead instead of unnecessary processing --


Ex.

Pattern: 'abababca'
Text: 'bacbababaabcbab'

LPS table construction of the given pattern: 

char:  | a | b | a | b | a | b | c | a |
index: | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 
value: | 0 | 0 | 1 | 2 | 3 | 4 | 0 | 1 |

Assume partial_match is a pointer, which current points to index 1

bacbababaabcbab
 |
 abababca

This is a partial_match length of 1. The value at LPS[partial_match-1] or table[0] is 0, 
so we don't skip.

bacbababaabcbab
    |||||
    abababca

Next partial match is here, where we have a partial_match length of 5. The value at 
table[partial_match -1] (or table[4]) is 3, so we get to skip ahead:
partial_match - table[partial_match -1] or (5 - table[4] or (5-3)), resulting in:

// x denotes a skip

bacbababaabcbab
   xx|||
     abababca


*/

/*

< ---------- PSEUDOCODE ---------->

Build suffix table, where suffix pointer always goes ahead of pointer

While the suffixPointer is less than the word length
 Check if current prefix is equal to current suffix
   If characters are the same
     set the LPS[suffixIndex] to be the prefixIndex + 1
     increment both suffix/prefix
   If the prefixIndex is at the 0th position (we haven't found a match)
     set LPS[suffixIndex] to be 0
     advance suffix Index (expand the window)
   Otherwise, characters aren't the same and prefix is not at position 0
     look in LPS for the location at where to start from.
    
*/

// Time && Space complexity to build pattern array O(n) / O(n);

const buildLPS = word => {
  const LPS = [0];
  let prefixIdx = 0;
  let suffixIdx = 1;
  let length = word.length;

  while (suffixIdx < length) {
    if (word[prefixIdx] === word[suffixIdx]) {
      LPS[suffixIdx] = prefixIdx + 1;
      suffixIdx++;
      prefixIdx++;
    } else if (prefixIdx === 0) {
      LPS[suffixIdx] = 0;
      suffixIdx++;
    } else {
      prefixIdx = LPS[prefixIdx - 1];
    }
  }
  return LPS;
};

console.log(LPS('ABABABCA'));

/*
 
 Time complexity: O(n) where n === length of text.
 Space: O(n)
 
 Total KMP is O(m+n)
 
 */

/**
 *
 * @param text {text to find the pattern}
 * @param word {word is the pattern}
 *
 * Description: Building an LPS table for preprocessing makes this algorithm run in linear time (m x n). From there, advance your text pointer while
 * keeping your pattern pointer at the same position until you find a match. Once you find a match, expand both pointers (similar to the LPS approach).
 * If the pointer reaches the end, return the position where the substring can be found.
 *
 * If characters don't match, we want to move the pattern pointer back to the index logged in the LPS table.
 */

const KMP = (text, pattern) => {
  if (pattern.length === 0) return 0;

  let textIndex = 0;
  let patternIndex = 0;
  const LPS_TABLE = buildLPS(pattern);

  while (textIndex < text.length) {
    if (text[textIndex] === pattern[patternIndex]) {
      if (patternIndex === pattern.length - 1) {
        return textIndex - pattern.length + 1;
      }
      patternIndex += 1;
      textIndex += 1;
    } else if (patternIndex > 0) {
      patternIndex = LPS_TABLE[patternIndex - 1];
    } else {
      patternIndex = 0;
      textIndex += 1;
    }
  }
  return -1;
};
