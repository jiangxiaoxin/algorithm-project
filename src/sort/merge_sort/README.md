##### 归并排序

不断地将要排序的数组进行拆分，最后拆成两个小数组，然后从这两个数组里取数，比较大小，往原来的数组里合并。一次合并结束后这两个数组代表的元素就有序了，然后再往上一层层合并，最后整个数组都是有序的。

**非递归实现**