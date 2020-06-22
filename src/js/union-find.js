var n = 9;
var list = [];
list[1] = [5,6];
list[2] = [5,6];
list[3] = [7,4];
list[4] = [8,9,3];
list[5] = [1,2,6];
list[6] = [1,2,5];
list[7] = [3,9,8];
list[8] = [4,7];
list[9] = [4,7]

// 给出一堆元素，和他们之间的关系对，把它们全部区分开

// 这里数组有的是从1开始使用的，这个要注意

var out = [];
for(var i=1;i<=9;i++) {
  out[i] = false;
}


var unprocessedList = [];
for(var j=1;j<=9;j++) {
  if (out[j] == false) {
    // 没输出过。如果已经输出过，说明已经找过他的等价类
    console.log("\n\nnew class begin:\n", j);
    out[j] = true;
    unprocessedList.push(j);
    while(unprocessedList.length > 0) {
      let curr = unprocessedList.shift();
      while(list[curr].length > 0) {
        let temp = list[curr].shift();
        if (out[temp] == false) {
          console.log("  ", temp);
          out[temp] = true;
          unprocessedList.push(temp);
        }

      }
    }
  }
}