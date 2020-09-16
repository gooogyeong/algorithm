function walk (root) {
    if (root !== null) {
        walk(root.left)
        console.log(root.key)
        walk(root.right)
    }
}

function shuffle(arr) {
    let ctr = arr.length, temp, index
    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr)
        // Decrease ctr by 1
        ctr--
        // And swap the last element with it
        temp = arr[ctr]
        arr[ctr] = arr[index]
        arr[index] = temp
    }
    return arr
}

function getMaxHeight(root) {
    // Root being null means tree doesn't exist.
    if (!root.key) return 0

    // Get the depth of the left and right subtree
    // using recursion.
    const leftDepth = getMaxHeight(root.left)
    const rightDepth = getMaxHeight(root.right)

    // Choose the larger one and add the root to it.
    if (leftDepth > rightDepth) return leftDepth + 1
    else return rightDepth + 1
}

class Tree {
    constructor() {
        this.nil = new Node(null)
        this.root = this.nil
    }
}

class Node {
    constructor(value) {
        this.key = value
        this.parent = null
        this.left = null
        this.right = null
        this.color = null
    }
}

// time complexity: O(1)
function leftRotate (T, x) {
    let y = x.right
    x.right = y.left
    if (y.left !== T.nil) y.left.parent = x
    y.parent = x.parent
    if (x.parent === T.nil) {
        T.root = y
    } else {
        if (x === x.parent.left) x.parent.left = y
        else x.parent.right = y
    }
    y.left = x
    x.parent = y
}

function rightRotate (T, x) {
    // 체크 해봐야함
    let y = x.left
    x.left = y.right // x.right = y.left
    if (y.right !== T.nil) y.right.parent = x // if (y.left !== T.nil) y.left.parent = x
    y.parent = x.parent
    if (x.parent === T.nil) {
         T.root = y
     } else {
         if (x === x.parent.left) x.parent.left = y
         else x.parent.right = y
     }
    y.right = x
    x.parent = y
}

function insert (T, z) {
    let y = T.nil
    let x = T.root
    while (x !== T.nil) {
        y = x
        if (z.key < x.key) x = x.left
        else x = x.right
    }
    z.parent = y
    if (y === T.nil) T.root = z
    else {
        if (z.key < y.key) y.left = z
        else y.right = z
    }
    z.left = T.nil
    z.right = T.nil
    z.color = 'red'
    addFix(T, z)
}

function addFix (T, z) {
    while(z.parent && z.parent.color === 'red') {
        if(z.parent === z.parent.parent.left) {
            let y = z.parent.parent.right
            if (y.color === 'red') {
                z.parent.color = 'black'
                y.color = 'black'
                z.parent.parent.color = 'red'
                z = z.parent.parent
            }
            else {
                if (z === z.parent.right) {
                    z = z.parent
                    leftRotate(T, z) // left
                }
                z.parent.color = 'black'
                z.parent.parent.color = 'red'
                rightRotate(T, z.parent.parent) // right
            }
        } else {
            let y = z.parent.parent.left
            if (y.color === 'red') {
                z.parent.color = 'black'
                y.color = 'black'
                z.parent.parent.color = 'red'
                z = z.parent.parent
            }
            else {
                if (z === z.parent.left) {
                    z = z.parent
                    rightRotate(T, z) // left
                }
                z.parent.color = 'black'
                z.parent.parent.color = 'red'
                leftRotate(T, z.parent.parent) // right
            }
        }
    }
    T.root.color = 'black'
}

function min (node) {
    while(node.left !== null) {
        node = node.left
    }
    return node
}

function getSuccessor(x) {
    if (x.right !== null) return min (x.right)
    let y = x.parent
    while (y !== null && x === y.right) {
        x = y
        y = y.parent
    }
    return y
}

// deletion은 보류
function deleteNode(T, z) {
    let x
    let y
    if(z.left === T.nil || z.right === T.nil) y = z
    else y = getSuccessor(z)
    if (y.left !== T.nil) x = y.left
    else x = y.right
    x.parent = y.parent
    if(y.parent === T.nil) T.root = x
    else {
        if (y === y.parent.left) y.parent.left = x
        else y.parent.right = x
    }
    if (y !== z) z.key = y.key
    if (y.color === 'black') deleteFix(T, x)
    return y
}

function deleteFix(T, x) {
    while(x !== T.root && T.color === 'black') {
        if (x === x.parent.left) {
            let w = x.parent.right
            if (w.color === 'red') {
                w.color = 'black'
                w.parent.color = 'black'
                leftRotate(T, x.parent)
            }
            if (w.left.color === 'black' && w.right.color === 'black') {
                w.color = 'red'
                x = x.parent
            } else {
                if (w.right.color === 'black') {
                    w.left.color = 'black'
                    w.color = 'red'
                    rightRotate(T, w)
                    w = x.parent.right
                }
                w.color = x.parent.color
                x.parent.color = 'black'
                w.right.color = 'black'
                leftRotate(T, x.parent)
                x = T.root
            }
        } else {
            let w = x.parent.left
            if (w.color === 'red') {
                w.color = 'black'
                w.parent.color = 'black'
                rightRotate(T, x.parent)
            }
            if (w.right.color === 'black' && w.left.color === 'black') {
                w.color = 'red'
                x = x.parent
            } else {
                if (w.left.color === 'black') {
                    w.right.color = 'black'
                    w.color = 'red'
                    leftRotate(T, w)
                    w = x.parent.left
                }
                w.color = x.parent.color
                x.parent.color = 'black'
                w.left.color = 'black'
                rightRotate(T, x.parent)
                x = T.root
            }
        }
    }
}

const tree = new Tree()
// insert(tree, new Node(11))
// insert(tree, new Node(7))
// insert(tree, new Node(15))
// insert(tree, new Node(5))

// insert(tree, new Node(11))
//
// const leftNode = new Node(7)
// leftNode.color = 'red'
// leftNode.parent = tree.root
//
// const rightNode = new Node(15)
// rightNode.color = 'black'
// rightNode.parent = tree.root
//
// insert(tree, leftNode)
// insert(tree, rightNode)
// tree.root.right = {key: 15, color: 'black', parent: tree.root, left: tree.nil, right: tree.nil}
// leftRotate(tree, tree.root)
// leftRotate(tree, tree.root)
// insert(tree, new Node(6))
// rightRotate(tree, tree.root)
// console.log(tree.root.left.color)
// console.log(tree.root.right.color)

const valArray = [1, 3, 4, 5, 6]// shuffle([1, 3, 4, 5, 6])

valArray.forEach((val) => {
    insert(tree, new Node(val))
})

// console.log(getMaxHeight(tree.root))
// console.log(tree.root)
console.log(tree.root.right.right.key)
deleteNode(tree, tree.root.right.right)
console.log(tree.root.right.right.key)
// console.log(getMaxHeight(tree.root))
// console.log(tree.root.right.right.key)
