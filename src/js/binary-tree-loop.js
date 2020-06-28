function Node(val) {
  this.val = val;
  this.left = this.right = null;
}

let numbers = [1,2,3,4,5,6,7,8,9,10,11,12]
let nodes = [];
for(let i=0;i<numbers.length;i++) {
  let node = new Node(numbers[i]);
  nodes.push(node);
}

for(let j=0;j<nodes.length;j++) {
  let node = nodes[j];
  let left = j*2+1;
  let right = j*2+2;
  if (left >= nodes.length) {
    // 左节点的序号超界了，后面的节点就不可能有子节点了，并且当前节点也不可能有右节点
    break;
  }
  node.left = nodes[left];
  if (right >= nodes.length) {
    // 右节点超界，后面的节点就不会再有子节点了
    break;
  }
  node.right = nodes[right];
}

let root = nodes[0];
console.log("root", root);

function preOrder(root) {
  let stack = [];
  let node = root;
  while(node != null || stack.length > 0) {
    while(node != null) {
      console.log(node.val, "\n");
      stack.push(node);
      node = node.left;
    }
    if (stack.length > 0) {
      node = stack.pop();
      node = node.right;
    }
  }
}

// preOrder(root);

function postOrder(root) {
  let stack = [];
  let node = root;
  let lastVisit = null;
  while(node != null || stack.length > 0) {
    while(node != null) {
      stack.push(node);
      node = node.left;
    }
    node = stack[stack.length-1];
    if (node.right == null  || node.right == lastVisit) {
      console.log(node.val, "\n");
      stack.pop();
      lastVisit = node;
      node = null;
    } else {
      node = node.right;
    }
  }
}

// postOrder(root);

var sumOfLeftLeaves = function(root) {
  if(!root) {
      return 0;
  }
  let sum = 0;
  root.isLeft = false;
  let stack = [root];
  while(stack.length > 0) {
      let node = stack.shift();
      if (node.isLeft == true && node.left == null && node.right == null) {
          sum += node.val;
      }
      if (node.left) {
          node.left.isLeft = true;
          stack.push(node.left);
      }
      if (node.right) {
          node.right.isLeft = false;
          stack.push(node.right);
      }
  }

  return sum;
}

let sum = sumOfLeftLeaves(root);
console.log(sum);
