# 平衡二叉树

平衡二叉树并不就是 AVL 树，它就是一个平衡的二叉树而已，AVL 只是一种构建这种树的算法，红黑树也是种平衡二叉树呀.平衡二叉树通常是两边“almost”平衡

AVL 树：

1. 对于任一节点，其左右子树的高度差的绝对值不超过 1
2. 任意一棵子树都是 AVL 树
3. 空树也是 AVL 树

> AVL 树这个名字是以发明它的两个作者的名字简写而来，不是平常的英文缩写

[link](http://www.mathcs.emory.edu/~cheung/Courses/323/Syllabus/Trees/AVL-delete.html)

[link](https://www.geeksforgeeks.org/avl-tree-set-1-insertion/?ref=lbp)
[link](https://www.geeksforgeeks.org/avl-tree-set-2-deletion/)

## 操作

单纯的 AVL 树只是强调树的高度，并没有太多实际的使用意义。它要和二叉搜索树合在一起，构成**平衡搜索树**才有大的价值。

有的地方说 AVL 是高度平衡的二叉搜索树，本身已经强调了搜索树性质，但有的地方定义 AVL 树时又只说明它对二叉树的高度的限制，并没有说明关键字排序的问题。

其实单纯考虑高度平衡没啥大意思，AVL 的高度平衡特性主要是为了解决在查找时的效率问题，那么如果是棵普通的二叉树，那就只能遍历所有的节点之后才能直到待查值在不在，而完全没有任何办法可提升效率。所以其实使用 AVL 时还是要跟搜索树结合的。

插入和删除都有可能影响树的平衡，因此要对操作后的树进行判断，如果不平衡了，就要对树进行修正。这是总的方针

**AVL搜索树，所有的叶子节点，都必须是在最后一层，或者倒数第2层，否则就不平衡**

### 查找

利用搜索树性质查找，方法跟搜索树是一样的，只是效率会更好，毕竟树的整体高度变低了。

### 插入

单纯只考虑向树中插入没有的节点。

[link](https://www.geeksforgeeks.org/avl-tree-set-1-insertion/?ref=lbp)

### 删除

单纯只考虑删除树中存在的节点。这删除比插入麻烦多了。

[link](https://www.geeksforgeeks.org/avl-tree-set-2-deletion/)

**都是旋转**
