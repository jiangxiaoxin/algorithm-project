
export default function sort(nums: Array<number>) {
  if (nums === null || nums === undefined) {
    return
  }

  for (let j = 1, length = nums.length; j < length ;j++ ) {
    let key = nums[j]
    let i = j -1
    while(i>=0) {
      if (nums[i] <= key) {
        break
      }
      nums[i+1] = nums[i]
      i = i-1
      console.log('交换值:', nums.join(','))
    }
    nums[i + 1] = key
    console.log('当前值：', nums.join('_'))
  }
}

import data from '../data.json'

export function test() {
  let $data: { [key:string] : number[] } = data // ts error: Element implicitly has an 'any' type because type 'xxxx' has no index signature
  Object.keys($data).forEach(key => {
    let nums = $data[key]
    console.log('\n\n');
    console.log(nums);
    sort(nums)
    console.log(nums);
  })
}