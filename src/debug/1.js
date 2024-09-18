function swap(nums, i, j) {
  let tmp = nums[i]
  nums[i] = nums[j]
  nums[j] = tmp
}

function partition(nums, left, right) {
  let i = left,
    j = right
  while (i < j) {
    while (i < j && nums[j] >= nums[left]) {
      j -= 1
    }
    while (i < j && nums[i] <= nums[left]) {
      i += 1
    }
    swap(nums, i, j)
  }
  swap(nums, i, left)
  return i
}

/* 快速排序 */
function quickSort(nums, left, right) {
  if (left >= right) return
  const pivot = partition(nums, left, right)
  quickSort(nums, left, pivot - 1)
  quickSort(nums, pivot + 1, right)
}

let arr = [3, 0, 2, 6, 8, 8, 8, 0, 5, 4]
quickSort(arr, 0, arr.length - 1)
