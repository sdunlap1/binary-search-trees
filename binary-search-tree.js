class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let newNode = new Node(val);

    if (this.root === null) {
        this.root = newNode;
        return this;
    }

    let current = this.root;
    while (true) {
        if (val === current.val) return undefined; // avoid duplicates
        if (val < current.val) {
            if (current.left === null) {
                current.left = newNode;
                return this;
            }
            current = current.left;
        } else {
            if (current.right === null) {
                current.right = newNode;
                return this;
            }
            current = current.right;
        }
    }
}


  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    let newNode = new Node(val);
    
    if (this.root === null) {
        this.root = newNode;
        return this;
    }

    if (val < current.val) {
        if (current.left === null) {
            current.left = newNode;
            return this;
        } else {
            return this.insertRecursively(val, current.left);
        }
    } else {
        if (current.right === null) {
            current.right = newNode;
            return this;
        } else {
            return this.insertRecursively(val, current.right);
        }
    }
}


  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (this.root === null) return undefined;

    let current = this.root;
    while (current) {
        if (val === current.val) return current;
        if (val < current.val) {
            current = current.left;
        } else {
            current = current.right;
        }
    }
    return undefined;
}


  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (current === null) return undefined;
    
    if (val === current.val) return current;
    
    if (val < current.val) {
        return this.findRecursively(val, current.left);
    } else {
        return this.findRecursively(val, current.right);
    }
}


  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let result = [];

    function traverse(node) {
        result.push(node.val); 
        if (node.left) traverse(node.left); 
        if (node.right) traverse(node.right); 
    }

    if (this.root) traverse(this.root);
    return result;
}


  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let result = [];

    function traverse(node) {
        if (node.left) traverse(node.left);  
        result.push(node.val); 
        if (node.right) traverse(node.right); 
    }

    if (this.root) traverse(this.root);
    return result;
}


  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let result = [];

    function traverse(node) {
        if (node.left) traverse(node.left); 
        if (node.right) traverse(node.right); 
        result.push(node.val); 
    }

    if (this.root) traverse(this.root);
    return result;
}


  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let result = [];
    let queue = [];
    
    if (this.root) queue.push(this.root);

    while (queue.length) {
        let node = queue.shift(); 
        result.push(node.val); 
        if (node.left) queue.push(node.left); 
        if (node.right) queue.push(node.right); 
    }

    return result;
}


  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    this.root = removeNode(this.root, val);

    function removeNode(node, val) {
        if (node === null) return null;

        if (val < node.val) {
            node.left = removeNode(node.left, val);
            return node;
        } else if (val > node.val) {
            node.right = removeNode(node.right, val);
            return node;
        } else {
            // Node has no children
            if (node.left === null && node.right === null) {
                return null;
            }
            // Node has one child
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }
            // Node has two children
            let tempNode = getMin(node.right);
            node.val = tempNode.val;
            node.right = removeNode(node.right, tempNode.val);
            return node;
        }
    }

    function getMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }
}


  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    function checkHeight(node) {
        if (node === null) return 0;

        let leftHeight = checkHeight(node.left);
        let rightHeight = checkHeight(node.right);

        if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }
        return Math.max(leftHeight, rightHeight) + 1;
    }

    return checkHeight(this.root) !== -1;
}


  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (this.root === null || (this.root.left === null && this.root.right === null)) {
        return undefined; // No second highest if there is only one node or the tree is empty
    }

    let current = this.root;
    let parent = null;

    while (current.right) {
        parent = current;
        current = current.right;
    }

    // If the rightmost node has a left subtree, the second-highest node is the maximum node in that subtree
    if (current.left) {
        return findMax(current.left).val;
    }

    // If there is no left subtree, the second-highest is the parent of the rightmost node
    return parent.val;

    function findMax(node) {
        while (node.right) {
            node = node.right;
        }
        return node;
    }
}

}

module.exports = BinarySearchTree;
