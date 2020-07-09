// @ts-nocheck
class Node {
  constructor(value, left, right, parent, index) {
    this.value = value || null
    this.left = left || null
    this.right = right || null
    this.parent = parent || null
    this.index = index || 0
  }
}

// 将一个数组表示成一棵完全二叉树
// 如果传入的数组本身已经是按照最大堆的要求排序的，那得到的就是棵用来表示最大堆的二叉树
function createCompleteBinaryTreeFromArray(arr) {
  let nodeList = []
  for (let i = 0; i < arr.length; i++) {
    let node = new Node(arr[i], null, null, null, i)
    nodeList.push(node)
  }

  for (let j = 0; j < nodeList.length; j++) {
    let node = nodeList[j]
    let index = node.index
    let leftIndex = index * 2 + 1
    let rightIndex = leftIndex + 1
    let childNode = null
    if (leftIndex >= 0 && leftIndex < nodeList.length) {
      childNode = nodeList[leftIndex]
      node.left = childNode
      childNode.parent = node
    } else {
      node.left = null
    }
    if (rightIndex >= 0 && rightIndex < nodeList.length) {
      childNode = nodeList[rightIndex]
      node.right = childNode
      childNode.parent = node
    } else {
      node.right = null
    }
  }
  return nodeList
}

function maxHeapInsert(nodeList, val) {
  //创建个新节点
  var newNode = new Node(val, null, null, null, nodeList.length)
  if (nodeList.length === 0) { // 原来的最大堆是空的,把新节点插入数组后返回nodeList就行了
    nodeList.push(newNode)
    return nodeList
  }

  let size = nodeList.length
  let index = Math.floor(size / 2)
  let node = nodeList[index] // 最开始要插入的节点位置
  nodeList.push(newNode)
  if (!node.left) {
    node.left = newNode
    newNode.parent = node
  } else if (!node.right) {
    node.right = newNode
    newNode.parent = node
  } else {
    console.warn('这个父节点有左右树，这不可能，肯定哪里错了')
  }

  while (newNode.parent) {
    if (newNode.value < newNode.parent.value) {
      // 符合最大堆的要求
      break;
    } else { // 不符合最大堆的要求，那就互换位置后继续比较
      maxHeapInsertSwap(nodeList, newNode)
    }
  }
  return nodeList
}

function maxHeapInsertSwap(nodeList, node) {
  let parent = node.parent
  var parentparent = parent.parent
  nodeList[parent.index] = node
  nodeList[node.index] = parent
  let nodeIndex = node.index
  node.index = parent.index
  parent.index = nodeIndex

  let left = node.left
  let right = node.right
  if (node === parent.left) {
    node.left = parent
  }
  if (node === parent.right) {
    node.right = parent
  }
  parent.left = left
  parent.right = right
  parent.parent = node
  node.parent = parentparent
  if (parentparent) {
    if (parentparent.left === parent) {
      parentparent.left = node
    }
    if (parentparent.right === parent) {
      parentparent.right = node
    }
  }

}


// 最大堆的删除
// 执行一次，返回删除的根节点，并修改剩下的树，使之满足最大堆要求
function maxHeapDelete(nodeList) {
  if (!nodeList || nodeList.length === 0) {
    return null
  }
  let root = nodeList.shift()
  let last = nodeList.pop()
  if (last.parent) { // 如果last.parent存在，那last要去坐根节点的位置，这里要断开跟last和last.parent的关系
    if (last === last.parent.left) {
      last.parent.left = null
    }
    if (last === last.parent.right) {
      last.parent.right = null
    }
    last.parent = null
  }
  last.left = root.left
  last.right = root.right
  if (last.left === null && last.right === null) {
    // 这就是个光杆司令呀,那last此时就成了根节点了，可以退出了
  }
  if (last.left) {
    last.left.parent = last
  }
  if (last.right) {
    last.right.parent = last
  }

  nodeList.unshift(last) //把last提到最前面
  last.index = 0

  while(greaterThanChildren(last) === false) {
    let child = findBiggestChild(last)
    if (child) {
      let childLeft = child.left
      let childRight = child.right
      let childIndex = child.index

      let lastLeft  = last.left
      let lastRight = last.right
      let lastParent = last.parent
      let lastIndex = last.index

      if (last.left === child) {
        child.left = last
        child.right = lastRight
        if (lastRight) {
          lastRight.parent = child
        }
      }
      if (last.right === child) {
        child.right = last
        child.left = lastLeft
        if (lastLeft) {
          lastLeft.parent = child
        }
      }

      if (lastParent) {
        if (last === lastParent.left) {
          lastParent.left = child
        }
        if (last === lastParent.right) {
          lastParent.right = child
        }
      }

      child.parent = lastParent
      child.index = lastIndex

      last.parent = child
      last.left = childLeft
      last.right = childRight
      last.index = childIndex

      nodeList[child.index] = child
      nodeList[last.index] = last
    } else {
      console.warn('last不比children们大，但又找不到大的child，这种情况是不会出现的')
      break
    }
  }

  // 比children都大那就满足条件了，可以退出了
  root.left = null
  root.right = null
  root.index = -1
  return root
}

// 节点的值是否比左节点的值大
// 如果有左节点，那比较值。如果没有，那就认为大
function greaterThanLeft(node) {
  return node && ((node.left && node.value > node.left.value) || (!node.left))
}

function greaterThanRight(node) {
  return node && ((node.right && node.value > node.right.value) || (!node.right))
}

function greaterThanChildren(node) {
  return greaterThanLeft(node) && greaterThanRight(node)
}

function findBiggestChild(node) {
  if (node.left && node.right) {
    return node.left.value > node.right.value ? node.left : node.right
  } else if (node.left && !node.right) {
    return node.left
  } else if (!node.left && node.right) {
    return node.right
  } else {
    return null
  }
  // // 如果能确定节点的值都是非负的，那这里可以简略
  // let left = node.left || 0;
  // let right = node.right || 0;
  // // 这里不用担心left或者right可能是null的情况，因为如果是null，返回的就是null。如果不是null，返回的就是真实的节点
  // return left > right ? node.left : node.right; 
}

function hasChildren(node) {
  return !!(node && (node.left || node.right));
}

function isLeft(parent, child) {
  return parent && child && (parent.left === child);
}

function isRight(parent, child) {
  return parent && child && (parent.right === child);
}



/**
 * 从一个数组里创建一个最大堆
 * @param arr 值的数组，随便一个数组就行
 * @returns { Array } 表示最大堆的数组
 */
function createMaxHeap(arr) {
  if (!arr) { // null或者[]
    return null;
  }
  if (!arr.length) {
      return [];
  }
  let result = createCompleteBinaryTreeFromArray(arr);
  let size = result.length;

  // 从最后一个非叶子节点开始处理非常重要
  // 剩下的就是中间交换节点的时候，把相关的指针处理对就可以了

  let lastIndex = Math.floor(size/2) - 1; // 最后一个非叶子节点的索引。如果数组length=0，size=0，lastIndex=-1，这是合理的，因为此时的确没有非叶子节点呀，那唯一的子节点，是根节点，也是个叶子节点。

  while(lastIndex >= 0) {
    let lastNode = result[lastIndex];
    while (hasChildren(lastNode) === true) {
      let child = findBiggestChild(lastNode);
      if (child.value < lastNode.value) {
        // 直接就满足条件了，跳出循环，lastIndex减1，
        break;
      }
      // 根节点和子节点的大小关系不满足最大堆的要求，那么就要将child和lastNode互换
        let childIndex = child.index;
        let childLeft = child.left;
        let childRight = child.right;

        let lastNodeIndex = lastNode.index;
        let lastNodeParent = lastNode.parent;

        child.index = lastNodeIndex;
        child.parent = lastNodeParent;
        if (isLeft(lastNode, child)) {
          child.left = lastNode;
          child.right = lastNode.right;
          if (child.right) {
            child.right.parent = child;
          }
        }
        if (isRight(lastNode, child)) {
          child.right = lastNode;
          child.left = lastNode.left;
          if (child.left) {
            child.left.parent = child;
          }
        }

        if (lastNodeParent) {
            if (isLeft(lastNodeParent, lastNode)) {
                lastNodeParent.left = child;
            }
            if (isRight(lastNodeParent, lastNode)) {
              lastNodeParent.right = child;
            }
        }

        lastNode.index = childIndex;
        lastNode.left = childLeft;
        lastNode.right = childRight;
        if (childLeft) {
          childLeft.parent = lastNode;
        }
        if (childRight) {
          childRight.parent = lastNode;
        }
        lastNode.parent = child;

        result[lastNodeIndex] = child;
        result[childIndex] = lastNode;
    }
    lastIndex -= 1;
  }
  return result;
}
