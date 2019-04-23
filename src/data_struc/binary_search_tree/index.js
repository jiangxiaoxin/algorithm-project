/**
 * 在一棵bst上找出值是x的节点
 * @param tree
 * @param x
 * @returns {*}
 */
function findX(tree, x) {
    if (!tree) {
        return null
    }
    if (tree.value === x) {
        return tree
    }
    if (x < tree.value) {
        return findX(tree.left, x)
    }
    if (x > tree.value) {
        return findX(tree.right, x)
    }
    return null
}

//给定一个bst，找出它最小的节点
function findMin(tree) {
    var node = tree
    while(node && node.left) {
        node = node.left
    }
    return node
}
// 给定一个bst，找出它最大的节点
function findMax(tree) {
    var node = tree
    while(node && node.right) {
        node = node.right
    }
    return node
}
