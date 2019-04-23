// @ts-nocheck

class BNode {
  // @ts-ignore
  constructor(value, left, right, parent) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }
}

/**
 * 创建一棵完全二叉树
 * @param {Number} num 节点的个数
 */
function createBTree(num = 10) {
  var nodes = [];
  for (var i = 0; i < num; i++) {
    var val = i;
    var node = new BNode(val);
    node.index = i;
    nodes.push(node);
  }

  for (var j = 0; j < nodes.length; j++) {
    var node = nodes[j]
    if (!node.left) {
      var leftIndex = 2 * j + 1;
      if (leftIndex <= nodes.length - 1) {
        var left = nodes[leftIndex];
        node.left = left;
        left.parent = node;
      }
    }
    if (!node.right) {
      var rightIndex = 2 * j + 2;
      if (rightIndex <= nodes.length - 1) {
        var right = nodes[rightIndex];
        node.right = right;
        right.parent = node;
      }
    }
  }
  return nodes[0]; // root node
}

// 中序遍历
function inOrderTraverse(tree, level) {
  var node = tree;
  level = level || 0;
  if (node.left) {
    inOrderTraverse(node.left, level+1)
  }
  var space = multiSpace(level*2)
  console.log(`${space} |node index:${node.index} value:${node.value}`);
  if (node.right) {
    inOrderTraverse(node.right, level+1);
  }
}
// 先序遍历
function preOrderTraverse(tree, level) {
  var node = tree;
  level = level || 0;
  var space = multiSpace(level*2)
  console.log(`${space} |node index:${node.index} value:${node.value}`);
  if (node.left) {
    preOrderTraverse(node.left, level+1)
  }
  if (node.right) {
    preOrderTraverse(node.right, level+1);
  }
}
// 后序遍历
function postOrderTraverse(tree, level) {
  var node = tree;
  level = level || 0;
  if (node.left) {
    postOrderTraverse(node.left, level+1)
  }
  if (node.right) {
    postOrderTraverse(node.right, level+1);
  }
  var space = multiSpace(level*2)
  console.log(`${space} |node index:${node.index} value:${node.value}`);
}

// 层序遍历
function levelOrderTraverse(tree) {
  var root = tree;
  var queue = [root];
  while(queue.length > 0) {
    var current = queue.shift();
    console.log(`|node index:${current.index} value:${current.value}`);
    if (current.left) {
      queue.push(current.left);
    }
    if (current.right) {
      queue.push(current.right);
    }
  }
}
