/**
 * 返回完全二叉树里，下标为i的元素其父节点的下标
 * @param i 数组元素的下标。下标是从0开始的，跟书上从1开始不一样，要修正
 */
function PARENT(i: number) {
  return Math.floor((i - 1) / 2) // i ===0， PARENT(i) === -1,所以要对父节点下标做判断的
}
/**
 * 返回完全二叉树里，下标为i的元素其左子节点的下标，如果有的话
 * @param i 
 */
function LEFT(i: number) {
  return 2 * i + 1  // 这里左节点和右节点都修正过了，因为数组下标从0开始
}

/**
 * 返回完全二叉树里，下标为i的元素其右子节点的下标，如果有的话
 * @param i 
 */
function RIGHT(i: number) {
  return LEFT(i) + 1
}

/**
 * 将数组中下标为index的元素，与它的左右两个子节点树，构成一个局部的最大堆。
 * 假设左右两个子树已经满足最大堆原则,array并不是个普通的数组，而是要满足条件才行。
 * @param array 
 * @param index 
 */
function max_heapify(array: Array<number>, index: number, heap_size: number) {
  var length = heap_size // 因为后面进行heap sort时，数组的元素并没删掉，还在数组里。如果是将最大的元素放到最后之后，把它删了，那就可以 length = array.length
  if (index < length) {  // index 必须有效才行
    var left = LEFT(index)
    var right = RIGHT(index)
    var largest = index
    if (left < length) {  //  左节点有效
      if (array[left] > array[largest]) { // 左节点比父节点大
        largest = left
      }
    }
    if (right < length) { // 右节点有效
      if (array[right] > array[largest]) {
        largest = right
      }
    }
    // 经过上面两个比较，就得出在父节点，左节点，右节点，这3个里面谁的值最大
    if (index !== largest) {  // 如果恰好index就是最大的，那都不用交换
      var temp = array[index]
      array[index] = array[largest]
      array[largest] = temp // 到这步交换后，3个节点满足最大的在父节点这个条件，但是更换后，原来的父节点到了新的位置，并不能保证这个位置就是它的地盘，还要再次调用 max_heapify

      max_heapify(array, largest, heap_size)
    }
  }
}

/**
 * 以任意数组为基础构建一个对应的最大堆
 * @param array 
 */
function build_max_heap(array: Array<number>) {
  var index = Math.floor(array.length / 2) - 1 // 第一个有子节点的元素下标
  for (var i = index; i >= 0; i--) {
    max_heapify(array, i, array.length)
  }
}

function heap_sort(array: number[]) {
  build_max_heap(array)
  // console.log('构建最大堆', array)
  var heap_size = array.length
  while(heap_size > 0) {
    var temp = array[0]
    array[0] = array[heap_size - 1]
    array[heap_size - 1] = temp
    // console.log('此轮最大值', temp)
    heap_size = heap_size - 1
    max_heapify(array, 0, heap_size)
    // console.log('重新最大堆', array)
    // console.log('-------')
  }
}

export function test() {
  var a
  // a = [3, 19, 1, 14, 8 ,7]
  a = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]

  console.log('排序前', a)

  // build_max_heap(a)
  heap_sort(a)
  console.log('排序后', a)
  
}


