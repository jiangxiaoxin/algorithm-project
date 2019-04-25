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

// 先把最大堆转成二叉树表示，arr已经是满足最大堆要求了
function createMaxHeap(arr) {
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
  let index = Math.floor(size/2)
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

  while(newNode.parent) {
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
