/**
 * 一个有序数组，元素值可能是正数、负数、0，找出其中绝对值最小的数。绝对值一样的，找出其值最小的。
 */


export default function find(nums: Array<number>) {
  if (!nums || nums.length == 0) {
    return null
  }
  if (nums[0] >= 0) {
    return nums[0]
  }
  if (nums[nums.length - 1] <= 0) {
    return nums[nums.length - 1]
  }
  let left = 0
  let right = nums.length - 1
  let mid
  while (true) {
    mid = Math.floor((left + right) / 2)
    if (mid === left) {
      return nums[mid]
    }
    if (nums[mid] > 0) {
      right = mid
    } else if (nums[mid] < 0) {
      left = mid
    } else {
      return nums[mid]
    }
  }
}


export function test() {
  let a = [-10, -3, -2, -1, -1, 0, 1, 2, 3]
  console.log(find(a))


  let b = [-10, -3, -2, -1, -1, 0, 0, 2, 3]
  console.log(find(b))

  let c = [-10, -6, -5, -1, 1, 2, 100]
  console.log(find(c))
}

