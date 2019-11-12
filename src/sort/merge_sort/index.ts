export default function sort(nums: Array<number>, left: number, right: number) {
  if (nums === null || nums === undefined) {
    return
  }
  if (left < right) {
    let mid = Math.floor((left + right) / 2)
    sort(nums, left, mid)
    sort(nums, mid + 1, right)
    merge(nums, left, mid, right)
  }
}


function merge(nums: Array<number>, left: number, mid: number, right: number) {
  let a = nums.slice(left, mid + 1)
  let b = nums.slice(mid + 1, right + 1)
  console.log('一次分割', a, b)

  let i = 0
  let j = 0
  for (let k = left; k <= right; k++) {
    if (i > a.length - 1) { // a数组已经都拿出来放入nums了，只要把b里面剩下的加入到nums就行了
      nums[k] = b[j]
      j = j+1
      continue
    }
    if (j > b.length - 1) { //b数组已经都拿出来放入nums了,只要把a里面剩下的加入到nums就行了
      nums[k] = a[i]
      i = i+1
      continue
    }
    if (a[i] <= b[j]) {
      nums[k] = a[i]
      i = i + 1
    } else {
      nums[k] = b[j]
      j = j + 1
    }
  }
  console.log('一次merge后', nums, '\n')
}

import data from '../data.json'
export function test() {
  // var r = [0,1,2,5,8,100]
  var r:number[] = []
  var times = 100
  var count = 0
  for (var i = 0; i<times;i ++) {
    // let a = [0, 1, 8, 2, 100, 5]
    let a:number[] = []
    sort(a, 0, a.length - 1)
    console.log('=========')
    console.log('=========')
    console.log('=========')
    for (var j=0;j<r.length;j++) {
      if (r[j] !== a[j]) {
        console.error('排序有问题')
        console.log('此次排序结果：', a)
        count = count+1
        break
      }
    }
    console.log(`测试 ${times} 错误 ${count}`)
  }
}