function Node(val) {
  this.val = val;
  this.left = this.right = null;
}

// let numbers = [1,2,3,4,5,6,7,8,9,10,11,12]
// let numbers = [1,1,1,1,1,null,1];
// let numbers = [2,2,2,null,7,2];
// let numbers = [1,2,3,null,4,5];
// let numbers = [1,null,2,2];
// let numbers = [1,1,2];
// let numbers = [6,2,8,0,4,7,9,null,null,2,6];
let numbers = [1,2,2,3,3,null,null,4,4];
let nodes = [];
for(let i=0;i<numbers.length;i++) {
  let node = new Node(numbers[i]);
  node.index = i;
  nodes.push(node);
}

/**
 * 按照leetcode上的二叉树的数组表示法，构建对应的二叉树结构
 * [1,null,2,3] 层序排列各个节点，null表示此处没有实际节点，后面层序排列时，这里就不安排节点了，
 */
let offset = 0;
for(let j=0;j<nodes.length;j++) {
  let node = nodes[j];
  if (node.val == null) {
    // 如果节点值为null，表示这个节点不存在，后面也没有了，不需要给他算左右子节点
    offset += 2;
    continue;
  }
  let left = j*2+1 - offset;
  let right = j*2+2 - offset;
  if (left >= nodes.length) {
    // 左节点的序号超界了，后面的节点就不可能有子节点了，并且当前节点也不可能有右节点
    break;
  }
  let __left = nodes[left];
  if (__left.val != null) {
    // 是个真的节点。在数组表示里，有的元素是null，表示这里就不再有节点了
    node.left = nodes[left];
  }
  if (right >= nodes.length) {
    // 右节点超界，后面的节点就不会再有子节点了
    break;
  }
  let __right = nodes[right];
  if (__right.val != null) {
    node.right = nodes[right];
  }
}

let root = nodes[0];
// console.log("root", root);

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

// let sum = sumOfLeftLeaves(root);
// console.log(sum);

var isUnivalTreeHelper = function(root) {
  if (!root) {
      return null; // 代表空树
  }
  if (root.left == null && root.right == null) {
      // 左右都没有，单一个根节点，那肯定是单值
      return root.val;
  }
  // 可能有，也可能没有
  let leftVal = isUnivalTreeHelper(root.left);
  let rightVal = isUnivalTreeHelper(root.right);
  // console.log(`root: ${root.val} index: ${root.index} leftVal: ${leftVal} rightVal:${rightVal} \n`);
  if (leftVal == null && rightVal == null) {
    return root.val;
  } else {
    if (leftVal == null && rightVal == root.val) {
      return root.val;
    }
    if (rightVal == null && leftVal == root.val) {
      return root.val;
    }
    if (leftVal == root.val  && rightVal == root.val) {
      return root.val;
    }
  }
  return -1;
}

// let res = isUnivalTreeHelper(root);
// console.log("res:", res, parseInt(res) >= 0); // res是有效值

var isUnivalTree = function(root) {
  const base = root.val;
  const stack = [];
  let node = root;
  while(node != null || stack.length > 0) {
      while(node != null) {
        console.log(`遍历 index:${node.index} val: ${node.val}`);
          if (node.val != null && node.val != base) {
            // node有值，并且跟基准值不一样才会返回false。因为node的值可能是null，是null时不考察这个node
              console.log(`false, val:${node.val} index: ${node.index}`)
              return false;
          }
          stack.push(node);
          node = node.left;
      }
      if(stack.length > 0) {
          node = stack.pop();
          node = node.right;
      }
  }
  return true;
};

// let res = isUnivalTree(root);
// console.log("res:", res);

var inOrder = function(root) {
  let stack = [];
  let node = root;
  while(node != null || stack.length > 0) {
    while(node != null) {
      stack.push(node);
      node = node.left;
    }
    if (stack.length > 0) {
      node = stack.pop();
      console.log(node.val);
      node = node.right;
    }
  }
}

// inOrder(root);

// 501
var findMode = function(root) {
  if (!root) {
    return [];
  }
  let stack = [];
  let node = root;
  let elements = [];
  while(node != null || stack.length > 0) {
      while(node != null) {
          stack.push(node);
          node = node.left;
      }
      if(stack.length > 0) {
          node = stack.pop();
          // code here...
          console.log("当前处理节点值：", node.val);
          elements.push(node.val);
          
          node = node.right;
      }
  }
  console.log("elements:", elements);
  if (elements.length == 0) {
    // 空的，没有元素
    console.log("空的，没有元素")
    return [];
  }
  let count = 1;
  let max_count = 1;
  let prev = elements[0];
  let res = [elements[0]];
  for(let i = 1;i<elements.length;i++) {
    if (elements[i] == elements[i-1]) {
      count += 1;
    } else {
      // 出现新的数了
      count = 1;
    }
    if (count > max_count) {
      res = [elements[i]];
      max_count = count;
    } else if (count == max_count) {
      res.push(elements[i]);
    } else {
      // 出现的次数反而少，不用管它
    }
  }

  return res;
};

// let res = findMode(root);
// console.log("res", res);


//面试题 04.04. 检查平衡性
var isBalanced = function(root) {
  const helper = function(root) {
    if (root == null || root.val == null) {
      return { balanced: true, height: 0};
    }
    let leftRes = helper(root.left);
    let rightRes = helper(root.right);
    let balanced = leftRes.balanced == true && rightRes.balanced == true && Math.abs(leftRes.height - rightRes.height) <= 1
    return { balanced: !!balanced, height: Math.max(leftRes.height, rightRes.height) + 1 }
  }
  return helper(root).balanced;
};
console.log(isBalanced(root));

