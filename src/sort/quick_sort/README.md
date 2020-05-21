# 7.快速排序

`partition`方法是将数组的一部分[p, r]进行转化，获得一个q值，在[p,q-1]的值都比[q]小，在[q+1,r]的值都比[q]大

`quick_sort`方法就是在`partition`基础上递归处理。

先对[0,length-1]范围内进行一次操作，数组就变成了[0,q-1],[q],[q+1, length-1]这3块，且有明确的大小关系，然后分别对[0,q-1]和[q+1,length-1]再使用`quick_sort`方法，又会进行分裂，并得到一个明确的关系。这样不断的分解，到最后某个片段只有3个元素时，让这部分也满足**左边<中间<右边**。这部分有序后，再往上一层，算上找出的中间值，和右边的值也是有序了，然后依次再往上，再往上，慢慢的就都有序了，最后数组都排好序了。

`partition`方法每次都是取给定的那部分数组的最后一个元素做参考量，有种优化的方法，就是先随机选择一个下标，然后交换这个下标和最后一个元素，然后再使用`partition`

```js

function partition(array: number[], p: number, r: number): number {
 // 以传入的数组最右值[r]为准，通过遍历比较，将数组里比[r]小的挪到前面，结束后，将[i]和[r]的值互换，则数组p到r的部分，就满足针对[i],前面的比他小，后面的比他大
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
    // console.log('找到的下标', q, '\n\n')
    quick_sort(array, left, q - 1)
    quick_sort(array, q + 1, right)
  }
}

export function test() {
  var a
  a = [2, 8,7,1,3,5,6,4]
  quick_sort(a, 0, a.length-1)
  // console.log('排序后', a)
}
```