##### 一个升序数组，元素值可能是正数、负数、0，找出其中绝对值最小的数。绝对值一样的，找出其值最小的。

```javascript
export default function find(nums: Array<number>) {
  if (!nums || nums.length == 0) {
    return null
  }
  if (nums[0] >= 0) { //  如果第一个值 >=0，根据规则，之后的值都 >= 第一个，直接返回[0]
    return nums[0]
  }
  if (nums[nums.length - 1] <= 0) { // 如果最后一个值 <=0, 那之前的数，值都 <=0,且绝对值都 >= 最后一个，直接返回[length-1]
    return nums[nums.length - 1]
  }
  let left = 0
  let right = nums.length - 1
  let mid
  while (true) {  // 这里就判断出数组里有负，有正，有0
    mid = Math.floor((left + right) / 2)  // 二分法查找
    if (mid === left) { // 因为取整，所以当left和right连在一起的时候，mid == left，根据规则，是升序，那么返回left值
      return nums[mid]
    }
    if (nums[mid] > 0) { // 如果mid>=0,则可知，要查找的值肯定不在right以后，因为right以后的肯定比mid值大，所以只要查left和mid之间就行，所以更新right值为mid
      right = mid
    } else if (nums[mid] < 0) { // 如果mid<=0,则可知，要查找的值肯定不在left之前，因为left之前的肯定绝对值比mid大，所以只要查mid和right之间就行，所以更新left值为mid
      left = mid
    } else {  // 如果mid=0，那直接返回mid，0一定是绝对值最小的值
      return nums[mid]
    }
  }
}
```