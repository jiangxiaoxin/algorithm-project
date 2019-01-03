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
  console.log('a:', a)
  console.log(find(a))


  let b = [-10, -3, -2, -1, -1, 0, 0, 2, 3]
  console.log('b:', b)
  console.log(find(b))

  let c = [-10, -6, -5, -1, 1, 2, 100]
  console.log('c:', c)
  console.log(find(c))
}

