# 12.二叉搜索树（binary search tree BST）

一颗二叉树，如果对于每一个节点，其左边的节点树上的值都比它小（**包括等于的情况吗？不过一般遇到的问题都是不管等于这种情况的**）,并且其右边的节点数上的值都比它大，这就是一颗二叉搜索树。

> 大部分表述中将等于的情况去掉了，说树里面没有重复的值。没有的确会更简单一些,有也是可以构建出来树的,这里的讨论都排除有重复的值吧。

对于一堆数据，可以有很多种不同的二叉搜索树的表示，但是应该尽量让其**高度小一些，左右子树均衡一些**，处理起来才更有效。

二叉搜索树，它内部的任一个节点的树都满足二叉搜索树的要求。

## 二叉搜索树的中序遍历（inorder tree walk）

中序遍历，就是在遍历一棵树时，遇到一个节点，先去遍历输出它的左子树，然后输出节点，再去遍历输出右子树，这样的结果就是将一颗二叉搜索树按照从小到大的顺序，有序的输出。

```js
// 伪代码
function inorder_tree_walk(root) {
  if (root == nil) {
    return
  }

  inorder_tree_walk(root.left)
  print(root)
  inorder_tree_walk(root.right)
}
```

## BST中最大和最小的节点

BST中值最小的节点就是最左边树的端点，最大的节点就是最右边树的端点。

```js
/**
* 伪代码
* @param tree 传入的参数是根节点，一棵树可以从根节点开始遍历出来，所以用一个根节点就可以表示一棵树。
* @returns {*}
*/
function findMin(tree) {
    if (!tree) {
        return null;
    }
    if (!tree.left) {
        return tree;
    } 
    return findMin(tree.left);
}
```
```js
function findMax(tree) {
    var current = tree;
    while(current && current.right) {
        current = current.right;
    }
    return current;
}
```

> 递归的好处是原理清晰，迭代的好处是效率高

## 查询二叉搜索树

就是给定一棵二叉搜索树，和一个值，查一下这个值是不是在这个树上

```
// 传入的树，必须是棵二叉搜索树才可以。所以其实问题最关键的是如何构建一棵二叉搜索树
function tree_search(root, value) {
  if (root == nil) {  // 如果没有一颗真的树，那当然就找不到了
    return nil
  }
  if (root.value == value) {  // 如果直接相等，那就直接返回这个节点就可以了。
    return root
  } else if (root.value < value) {  // 如果root的值比查找的值小，那么就要去root的右树上找
    tree_search(root.right, value)
  } else {  // 如果root的值比查找的值大，那么就要去root的左树上找
    tree_search(root.left, value)
  }
}
```

上面是不断递归的方式，下面也可以用迭代去做

```c
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

## 前驱和后继

节点的后继，就是在二叉搜索树中，比节点x的值大，但是又最靠近它的下一个

节点的前驱，就是比节点x的值小，但是又最靠近它的前一个

### 后继

#### 分析

假设节点x有右树。那么节点x要么是x.parent的左节点，要么是x.parent的右节点，要么既不是左也不是右，就这3种情况。如果既不是左也不是右，这种就是节点x是根节点的情况。

如果x是根节点，同时x还有右树，那x的后继一定是它右树上最小的节点。

如果x是它父节点的左节点，同时x还有右树。既然是父节点的左节点，那父节点的值一定比自己和自己的右节点数都大，也就是目前后继只能出现在x的右树上。那么此时可不可能
后继出现在其他地方呢？其实是不可能的。假设此时x的父节点是x的祖父节点的左树，那么x的祖父节点和祖父节点的右树都比x和x的右树大，那么后继只能出现在x的右树上。如果此时x的父节点是x的祖父节点
的右树，那么x和x的右树都比x的祖父节点和祖父节点的左树大，也不是后继出现的地方。在往上推，x的更祖父一个几点，一层层推上去，都是x的后继出现在x的右树上。

同理，如果x是它父节点的右节点，同时x还有右树。不管x是它父节点的左树还是右树，x.parent.parent，也就是x的祖父节点只会比x和x的父节点还有x的右树的值大或者小。
如果小，那不行，因为后继是比x大才行。如果大，那也不行，因为后继要比x大但是又最靠近x，x的右树上节点比x大，并且比x的祖父节点小，所以最合适。

综合目前的分析，如果节点有右树，那么就从节点右树上找到最小节点就是节点的后继


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

## 二叉搜索树插入和删除

### 插入
```
将一个新的节点 v，插入到一棵二叉搜索树 T 中

1.如果 T是空树，那就直接指向新节点就行。
T.root = V
2.如果 T不是空树
x = T.root
while(x != nil) {
  y = x
  if (x.value > v.value) {  //去x的左支找
    x = x.left
  } else {  // 去找x的右支
    x = x.right
  }
}

// 最后跳出while时，x就是nil，而y指向最后一次比较的节点，那接下来就是比较节点 y的值跟节点 v的值

v.parent = y
if (y.value > v.value) { // y的值比v的值大，那v就是y的左子
  y.left = v
} else {  // v是 y的右子
  y.right = v
}
```

### 删除

```
从一棵二叉搜索树 T 中删除一个节点 v。这个问题稍微复杂些，要考虑不同情况

1.如果树是空的，那直接返回，这种情况是错误的，不需要考虑了
2.如果节点 v 没有左节点和右节点，那么就直接删掉 v 就行。只要更改 v的父节点的节点指向就行
if (v.left == nil && v.right == nil) {
  parent = v.parent
  if (parent == nil) {  // v就是根节点了
    root = nil // 把根节点删掉，树就空了
  } else {
    if (parent.left == v) { // v是父亲的左儿子
      parent.left = nil
    } else {  //v是父亲的右儿子
      parent.right = nil
    }
  }
}
3.如果节点 v 有左儿子，但是没有右儿子，以下图3号节点为例。
3的左数和右边部分之间是满足二叉搜索树的条件的，移除3后，只要用3的左儿子7来代替3的位置就可以了

if (v.left != nil && v.right == nil) {
  left = v.left
  parent = v.parent
  if (parent == nil) { // v是根节点
    left.parent = nil
    root = v.left
  } else {
    left.parent = parent
    parent.left = left
  }
}
```
![有左没右](./img/有左没右.png)
```
4.如果节点 v 有右儿子，但是没有左儿子.以下图节点4为例

其父节点剩下的其他节点和整个树的右边部分再加上它右儿子树，整体都满足二叉搜索树的条件。
只要将v的右儿子替换v就可以了

if (v.left == nil && v.right != nil) {
  parent = v.parent
  right = v.right
  if (parent == nil) { // 跟上面情况类似，这里不写了
    .....
  } else {
    right.parent = parent
    if (v is parent.left) {
      parent.left  = right
    } else {
      parent.right = right
    }
  }
}
```
![有右没有左](./img/有右没有左.png)

```
5.如果v既有左儿子又有右儿子，那就麻烦一点了。看下图解释
```
![有左也有右](./img/有左也有右.png)

上面的删除说的有点复杂，在`./index.html`里写了个更明显易懂的方式：`deleteX`，传入两个参数，树的根节点和要删除的节点的值。

1. 先在树中查找x的位置，如果查不到，那就说明这个节点根本不存在，直接返回，否则执行第2步
2. 如果查找到的节点没有左树也没有右树，就自己一个光杆司令，那就直接删除它，清空一些原本的关系
3. 如果节点没有左树，但有右树，删除它，然后让它的右树坐它的位置。
4. 如果节点有左树，没有右树，删除它，然后让它的左树坐它的位置。
5. 如果节点又有左树，又有右树，这种情况下可以有两种做法，以查找左树最大节点为例。同样的还可以找右树最小节点
    a. 通过`findMax(xNode.left)`在`xNode.left`上找出最大的节点，这个最大的节点一定逃不出**两种**情况：要么它没有子节点了，要么它只有左子节点，
因为如果有右节点，那这个右节点的值就会比它大，它也就不是最大节点了。
    b. 找出最大左子节点之后，调用`deleteX(xNode.left, maxNode.value)`把这个`maxNode`从`xNode.left`上删掉，然后让`maxNode`坐自己的位置，
更新各种关系

> 要注意对于`xNode.parent`的处理




## 如何构建一棵二叉搜索树

有一个简单方法：一个数组A，构建一个对应的二叉搜索树，其实只要每次从数组里拿出一个数字，然后调用二叉搜索树的插入就可以最后得到一个二叉搜索树。

但是这样构建的树性能怎么样？尽量分散了吗？不好说。
比如，一个已经排好序的数组，按照这方法，最后的树就是一根直溜溜的往左或者往右了，树的高度就是
A.length-1,但这样的树明显不好。

对于一个元素出现随机的数组，效果应该还行。但是对于排序好的数组，那就完蛋。对于排序好的数组，是不是可以每次随机一个索引，然后拿索引对应的值插入呢？
