interface Result {
  startIndex: number,
  endIndex: number,
  max: number,
}


/**
 * 分冶法，递归查找
 * @param nums 目标数组
 * @param low 起始位
 * @param high 结束位
 */
function find3(nums:Array<number>, low: number, high: number): Result {
  if (low === high) {
    return {
      startIndex: low,
      endIndex: high,
      max: nums[low]
    }
  }
  var mid = Math.floor((low + high) / 2)
  var leftResult = find3(nums, low, mid)
  var rightResult = find3(nums, mid+1, high)
  var midResult = findMid(nums, low, high, mid)
  var result: Result
  if (leftResult.max >= midResult.max && leftResult.max >= rightResult.max) { //  左边的最大
    result = leftResult
  } else if (rightResult.max >= leftResult.max && rightResult.max >= midResult.max) { // 右边的最大
    result = rightResult
  } else if (midResult.max >= leftResult.max && midResult.max >= rightResult.max) { // 中间跨mid的最大
    result= midResult
  }
  return result! && {
    startIndex: result!.startIndex, // 断言
    endIndex: result!.endIndex,
    max: result!.max
  }
}

function findMid(nums:Array<number>, low: number, high: number, mid: number) {
  var sum = nums[mid]
  var leftMax = sum
  var leftIndex = mid
  for (var i = mid-1;i >= low; i--) {
    sum = sum + nums[i]
    if (sum >= leftMax) {
      leftMax = sum
      leftIndex = i
    }
  }

  sum = nums[mid+1]
  var rightMax = sum
  var rightIndex = mid + 1
  for (var j = mid + 2;j<=high;j++) {
    sum = sum + nums[j]
    if (sum >= rightMax) {
      rightMax = sum
      rightIndex = j
    }
  }

  return {
    startIndex: leftIndex,
    endIndex: rightIndex,
    max: leftMax + rightMax
  }
}

export function test() {
  let a, r
  a = [-2, 10, -3, 4, -1, 2, 1, -5, 4]
  r = find3(a, 0, a.length-1)
  console.log(r.startIndex, r.endIndex, r.max)
  a = [-2, 10, -3]
  r = find3(a, 0, a.length-1)
  console.log(r.startIndex, r.endIndex, r.max)
  
}
