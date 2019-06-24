const unsortedArr = [340, 1, 3, 3, 76, 23, 4, 12, 122, 7642, 646];

const merge = (leftArr, rightArr) => {
  let sortedArr = [];

  while (leftArr.length && rightArr.length) {
    if (leftArr[0] <= rightArr[0]) {
      sortedArr.push(leftArr[0]);
      leftArr = leftArr.slice(1);
    } else {
      sortedArr.push(rightArr[0]);
      rightArr = rightArr.slice(1);
    }
  }

  while (leftArr.length) sortedArr.push(leftArr.shift());
  while (rightArr.length) sortedArr.push(rightArr.shift());

  return sortedArr;
};

const mergeSort = arr => {
  if (arr.length < 2) return arr;

  let midpoint = Math.floor(arr.length / 2);
  let leftArr = arr.slice(0, midpoint);
  let rightArr = arr.slice(midpoint, arr.length);

  return merge(mergeSort(leftArr), mergeSort(rightArr));
};
