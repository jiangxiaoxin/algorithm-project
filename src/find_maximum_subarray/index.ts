// 只能找出最大子数组的和，不能确定最大子数组是什么或者是哪些（可能几个，都是相等的呀）
function find(nums:Array<number>) {
  
  var sum = nums[0]
  var max = sum
  for (var i = 1; i < nums.length; i++) {
    if (sum < 0) {   // 最大子数组，要和最大，那么应该尽量将正的值相加，所以如果到某个数时，sum<0,再跟后面的去加，那么怎么加都不如不算这个数之前，而是重新加更可能大
      sum = 0
    }
    sum = sum + nums[i]
    if (sum >= max) {
      max = sum
    }
  }
  console.log(max)
  return max
}

export function test() {
  // let a = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
  // find(a)

  // let b = [-2, 10, -3, 4, -1, 2, 1, -5, 4]
  // find(b)

  let c = [-2, -1, -1, -2, -3]
  // find(c)

}

// 找出最大子数组的和，还有最大子数组是什么
// 对于数组里负数多的情况，这种方法并不好
// 【-1， -2， -1， -2， -3】会将每个负数做成单项放入数组做备选
function find2(nums: Array<number>) {
  var sum = 0
  var max_sum = Number.NEGATIVE_INFINITY
  var low = 0
  var high = nums.length - 1
  var start = 0
  var end = 0
  var allMax = []
  for (var i = low; i <= high; i++) {
    sum = sum + nums[i]
    if (sum >= max_sum) {
      max_sum = sum
      end = i
    }
    if (sum < 0) {
      allMax.push({
        start: start,
        end: end,
        sum: max_sum
      })
      sum = 0
      max_sum = Number.NEGATIVE_INFINITY
      start = end = i + 1
    } else
    if (i == high) {
      allMax.push({
        start: start,
        end: end,
        sum: max_sum
      })
    } 
  }

  console.log(allMax) // 所有可能的最大子数组


  var max = Number.NEGATIVE_INFINITY
  var aIndex = 0
  var bIndex = 0
  for (var j = 0; j< allMax.length;j++) {
    if (allMax[j].sum >= max) { //  只找一个？
      max = allMax[j].sum
      aIndex = allMax[j].start
      bIndex = allMax[j].end
    }
  }

  console.log(max)
  console.log(aIndex, bIndex)

}





