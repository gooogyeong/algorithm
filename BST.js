function insert (tree, z) {
    let y = null
    let x = tree.root
    while (x !== null) {
        y = x
        if (z.key < x.key) x = x.left
        else x = x.right
    }
    z.parent = y
    if (y === null) tree.root = z
    else {
        if (z.key < y.key) y.left = z
        else y.right = z
    }
}

function deleteNode (tree, z) {
    // 지울 노드를 정하고
    let x = null
    let y = null // toDelete
    if (z.left === null || z.right === null) y = z
    else y = successor(z)
    // 실제 지우는 과정
    if (y.left !== null) x = y.left
    else x = y.right
    if (x !== null) x.parent = y.parent
    if (y.parent === null) tree.root = x
    else {
        if (y === y.parent.left) y.parent.left = x
        else y.parent.right = x
    }
    if (y !== z) z.key = y.key
    return y
}

///////////////////////////////////

function successor (x) {
    if (x.right !== null) return min (x.right)
    const y = x.parent
    while (y !== null && x === y.right) {
        x = y
        y = y.parent
    }
    return y
}

///////////////////////////////////

// null ? undefined ?
function min (node) {
    while(node.left !== null) {
        node = node.left
    }
    return node
}

function max (node) {
    while(node.right !== null) {
        node = node.right
    }
    return node
}

///////////////////////////////////

function walk (root) {
    if (root !== null) {
        walk(root.left)
        console.log(root.key)
        walk(root.right)
    }
}

// k = key; .key와 중복되지 말라고 k라고 표기한 것
function search (node, k) {
    if (node === null || node.key === k) return node
    if (k < node.key) return search(node.left, k)
    else return search(node.right, k)
}

///////////////////////////////////

class Tree {
    constructor() {
        this.root = null
    }
}

class Node {
    constructor(value) {
        this.key = value
        this.parent = null
        this.left = null
        this.right = null
    }
}

const values = [25, 32, 1, 7, 10, 8, 20, 14, 19]
const tree = new Tree()
// values.forEach(value => {
//     insert(tree, new Node(value))
// })
// console.log(search(tree.root, 8).left)
// console.log(search(tree.root, 20).right)

// const tree = new Tree()
// insert(tree, new Node(3))
// insert(tree, new Node(2))
// insert(tree, new Node(8))
// insert(tree, new Node(1))
// insert(tree, new Node(6))
// insert(tree, new Node(5))
// insert(tree, new Node(7))
// console.log(search(tree.root, 6).left.key)

// 아래 순서로 넣으면 오른쪽으로 치우친 tree가 나옴
insert(tree, new Node(1))
insert(tree, new Node(2))
insert(tree, new Node(3))
insert(tree, new Node(5))
insert(tree, new Node(6))
insert(tree, new Node(7))
insert(tree, new Node(8))
deleteNode(tree, 8)
console.log(walk(tree.root))
// console.log(search(tree.root, 6).left)
// console.log(search(tree.root, 6).right)

