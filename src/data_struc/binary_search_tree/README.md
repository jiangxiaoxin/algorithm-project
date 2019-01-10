# 12.二叉搜索树

一颗二叉树，如果对于每一个节点，其左边的节点树上的值都比它小（当然可以包括等于的情况）,并且其右边的节点数上的值都比它大，那就是一颗二叉搜索树

对于一堆数据，可以有很多种不同的二叉搜索树的表示，但是应该尽量让其高度小一些，处理起来才更有效。

## 中序遍历（inorder tree walk）
中序遍历的结果就是将一颗二叉搜索树按照从小到大的顺序，有序的输出

```
function inorder_tree_walk(root) {
  if (root == nil) {
    return
  }

  inorder_tree_walk(root.left)
  print(root)
  inorder_tree_walk(root.right)
}
```

## 查询二叉搜索树
就是给定一棵二叉搜索树，和一个值，查一下这个值是不是在这个树上

```
// 传入的树，必须是棵二叉搜索树才可以。所以其实问题最关键的是如何构建一棵二叉搜索树
function tree_search(root, value) {
  if (root == nil) {  // 如果没有一颗真的树，那当然就找不到了
    return nil
  }
  if (root.value == value) {  // 如果直接相等，那就直接返回这个节点就可以了。这里有个问题要注意：[5,5,5]这3个树也能构成一个二叉搜索树，完全满足条件，去search(5)的时候，真的就是看5到底在不在这个树上，而不是说找出5的所有位置。只是找出一个位置好交差罢了。
    return root
  } else if (root.value < value) {  // 如果root的值比查找的值小，那么就要去root的右树上找
    tree_search(root.right, value)
  } else {  // 如果root的值比查找的值大，那么就要去root的左树上找
    tree_search(root.left, value)
  }
}
```

上面是不断递归的方式，下面也可以用迭代去做

```
function iterative_tree_search(root, value) {
  while(root != nil &&　root.value != value) {
    if (root.value < value ) {
      root = root.right
    } else {
      root = root.left
    }
  }
  return root
}
```


### 前驱和后继

节点的后继，就是在二叉搜索树中，比节点x的值大，但是又最靠近它的下一个
节点的前驱，就是比节点x的值小，但是又最靠近它的前一个

#### 后继

![后继](./img/后继.png)

以节点1为例，它有右树。
1.根据二叉搜索树的性质，1的左树比它小，不符合后继的要求，可以直接不考虑了
2.节点1的右树，父节点，父节点的右树，都比节点1大。但是1的右数也在1的父节点的左树里，所以1的父节点肯定比1的右树大。父节点的右树就更比1的右树大了
3.所以，节点1的后继就出在1的右树里，只要找出1的右树里值最小的节点就可以了

如果节点没有右树呢？以节点10为例
1.节点10没有右树，不能按照上面的方式找。当然也不可能在节点10的左树上。
2.那就沿着树往上找，到了节点4，4也肯定小于10
3.那就再往上找，到了节点1，1还是小于10
4.再晚上找，到了节点0，0比10大，且在0右边的都比0还大，所以0就是后继。
上面的查找，只要找到第一个不再是右节点的就可以了

```
function tree_successor(x) {
  if (x.right != nil) {
    tree_minimum(x.right)
  } else {
    while(true) {
      y = x.parent
      if (y == nil) {
        return nil  // 对不起那真的找不到
      }

      if (x == y.right) {
        x = y
        y = y.parent
      } else if (x == y.left) {  // 找到了
        return y
      }
    }
    
  }
}
```

```
function tree_minimum(x) {
  var node = x
  while(node != nil) {
    node = node.left
  }
  return node
}
```

```
function tree_maxmium(x) {
  var node = x
  while(node != nil) {
    node = node.right
  }
  return node
}
```