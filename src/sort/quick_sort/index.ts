
function partition(array: number[], p: number, r: number): number {
  var x = array[r]
  var i = p
  for (var j = p; j < r; j++) {
    if (array[j] <= x) {
      var temp = array[i]
      array[i] = array[j]
      array[j] = temp
      i = i + 1
    }
  }

  var temp = array[i]
  array[i] = array[r]
  array[r] = temp

  return i
}

/**
 * 对数组进行快速排序。left right为要排序的元素下标
 * @param array 
 * @param left 
 * @param right 
 */
function quick_sort(array: number[], left: number, right: number) {
  if (left < right) {
    var q = partition(array, left, right)
    console.log('找到的下标', q, '\n\n')
    quick_sort(array, left, q - 1)
    quick_sort(array, q + 1, right)
  }
}

export function test() {
  var a
  a = [2, 8,7,1,3,5,6,4]
  quick_sort(a, 0, a.length-1)
  console.log('排序后', a)
}