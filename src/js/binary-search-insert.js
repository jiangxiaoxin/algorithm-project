
/**
 * 有序数组里二分法插入新元素，找到要插入的位置。
 * 只确定插入位置，并不修改原数组
 */

var a = [5,10,12,15,17,20,50,80,98,100];

function findInsertIndex(theKey) {
  var left = 0;
  var right = a.length-1;
  var index;
  var mid;

  while(left <= right) {
    mid = Math.floor((left + right) / 2);
    if (a[mid] < theKey) {
      let _left = mid + 1;
      if (_left > right) {
        index = right + 1;
        break;
      }
      left = _left;
    } else if (a[mid] > theKey) {
      let _right = mid - 1;
      if (_right < left) {
        index = left;
        break;
      }
      right = _right;
    } else {
      index = mid;
      break;
    }
  }

  return index;
}

// var nums = [21, 1000, 1, 16];
// nums.forEach(num => {
//   let index = findInsertIndex(num);
//   console.log(`找到的插入节点 index:${index}\n`, );
// });

// let index = findInsertIndex(21);
// console.log(index);

function findInsertIndex2(theKey) {
  let i = 0;
  while(i < a.length && a[i] < theKey) {
    i++;
  }
  return i;
}

// let index = findInsertIndex2(21);
// console.log(index);


function testOnce() {
  let theKey = Math.floor(Math.random() * 1000);
  let index1 = findInsertIndex(theKey);
  let index2 = findInsertIndex2(theKey);
  if (index1 !== index2 || index1 == undefined) {
    console.log(`error: key:${theKey}, index1: ${index1}  index2:${index2}`);
  }
}

let caseNum = 1000;
for(let i = 0; i< caseNum; i++) {
  testOnce();
}

console.log("----end----");




