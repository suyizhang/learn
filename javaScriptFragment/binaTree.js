class BinarySearchTree {
  constructor() {
    this.root = null;
    this.Node = function Node(key) {
      this.key = key;
      this.left = null;
      this.right = null;
    };
  }

  insert = (key) => {
    let newNode = new this.Node(key);
    this.root === null ? (this.root = newNode) : this.insertNode(this.root, newNode);
  };

  insertNode = (root, newNode) => {
    if (root.key < newNode.key) {
      root.left === null ? (root.left = newNode) : this.insertNode(root.left, newNode);
    } else {
      root.right === null ? (root.right = newNode) : this.insertNode(root.right, newNode);
    }
  };

  // 中序
  inOrderTraverse = (cb) => {
    this.inOrderTraverseNode(this.root, cb);
  };

  inOrderTraverseNode = (root, cb) => {
    if (node !== null) {
      this.inOrderTraverseNode(root.left, cb);
      cb(node.key);
      this.inOrderTraverseNode(root.right, cb);
    }
  };

  // 先序
  preOrderTraverse = (cb) => {
    this.preOrderTraverseNode(this.root, cb);
  };

  preOrderTraverseNode = (root, cb) => {
    if (node !== null) {
      cb(node.key);
      this.preOrderTraverseNode(root.left, cb);
      this.preOrderTraverseNode(root.right, cb);
    }
  };
  // 后序
  postOrderTraverse = (cb) => {
    this.postOrderTraverseNode(this.root, cb);
  };

  postOrderTraverseNode = (root, cb) => {
    if (node !== null) {
      this.postOrderTraverseNode(root.left, cb);
      this.postOrderTraverseNode(root.right, cb);
      cb(node.key);
    }
  };

  mini = () => {
    return this.miniNode(this.root);
  };

  miniNode = (node) => {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node.key;
    }
    return null;
  };

  max = () => {
    return this.maxNode(this.root);
  };

  maxNode = (node) => {
    if (node) {
      while (node && node.right !== null) {
        node = node.right;
      }
      return node.key;
    }
    return null;
  };

  search = (key) => {
    return this.searchNode(this.root, key);
  };

  searchNode = (node, key) => {
    if (node === null) {
      return false;
    }

    if (key < node.key) {
      return this.searchNode(node.left, key);
    } else if (key > node.key) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  };

  // 发现最小节点
  findMinNode = (node) => {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node;
    }
    return null;
  };

  remove = (key) => {
    this.root = this.removeNode(this.root, key);
  };

  removeNode = (node, key) => {
    if (node === null) {
      return null;
    }

    if (key < node.key) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      let aux = this.findMinNode(node.right);
      node.key = aux.key;
      node.right = this.removeNode(node.right, aux.key);
      return node;
    }
  };
}
