let a = [{ b: 2 }, { b: 2 }, { b: 2 }];
let b = a.reduce((a, b) => {
  return a.b + b.b;
});

function newMy(fn, ...rest) {
  let child = Object.create(fn.prototype);
  let result = fn.apply(child, rest);
  return typeof result === 'object' ? result : child;
}

newMy(() => {}, 1);

function reduce(arr, reduceCallback, initialValue) {
  let hasInitialValue = initialValue !== undefined;

  let value = hasInitialValue ? initialValue : arr[0];

  for (let i = hasInitialValue ? 0 : i; i < arr.length; i++) {
    value = reduceCallback(value, arr[i], i, arr);
  }
  return value;
}

function flatten(arr) {
  if (!arr.length) {
    return [];
  }
  let res = [];
  for (let i = 0, length = arr.length; i < length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}

const myInstanceof = (target, origin) => {
  while (target) {
    if (target.__proto__ === origin.prototype) {
      return true;
    }
    target = target.__proto__;
  }
  return false;
};

function create(obj) {
  const A = function () {};
  A.prototype = obj;
  return new A();
}

let a = [];

function transtantTree(arr) {
  arr.forEach((v) => {
    a.push({ key: v.key, parent: v.parent });
    if (Array.isArray(v.children) && v.children.length) {
      transtantTree(v.children);
    }
  });
}

function transtList(list, parent) {
  return list.filter((item) => {
    if (item.parent === parent) {
      const childList = transtList(list, item.key);
      if (childList.length) {
        item.children = childList;
      }
      return true;
    }
    return false;
  });
}

const list = [
  { key: 'node0', parent: 'node2' },
  { key: 'node1', parent: 'node0' },
  { key: 'node2', parent: 'node13' },
  { key: 'node3', parent: 'node16' },
  { key: 'node4', parent: 'node1' },
  { key: 'node5', parent: 'node6' },
  { key: 'node6', parent: 'node0' },
  { key: 'node7', parent: null },
  { key: 'node8', parent: 'node7' },
  { key: 'node9', parent: null },
  { key: 'node10', parent: null },
  { key: 'node11', parent: 'node12' },
  { key: 'node12', parent: null },
  { key: 'node13', parent: null },
  { key: 'node14', parent: null },
  { key: 'node15', parent: null },
  { key: 'node16', parent: 'node18' },
  { key: 'node17', parent: null },
  { key: 'node18', parent: null },
  { key: 'node19', parent: null },
  { key: 'node20', parent: 'node21' },
  { key: 'node21', parent: 'node22' },
  { key: 'node22', parent: null },
  { key: 'node23', parent: null },
];

function transformsFlag (list) {
  const result = [];
  list.forEach(v => {
    if (!v.children) {
      v.children = [];
    }
    if (!v.parent) {
      result.push(v);
    }
    const target = list.filter(i => i.parent === v.key);
    v.children.push(...target);
  });
  return result;
}

function transformsTreeAgain(list) {
  const baseList = [],
    childList = [];
  list.forEach((v) => {
    if (!v.parent) {
      baseList.push(v);
    } else {
      childList.push(v);
    }
  });
  baseList.forEach((v) => {
    v.children = some(v, childList);
  });
  function some(current, list) {
    const baseList = [],
      childList = [];
    list.forEach((v) => {
      if (v.parent === current.key) {
        baseList.push(v);
      } else {
        childList.push(v);
      }
    });
    if (baseList.length) {
      baseList.forEach((v) => {
        v.children = some(v, childList);
      });
      return baseList;
    } else {
      return undefined;
    }
  }
  return baseList;
}

function fnListTransformTree(list, key = '') {
  const res = [];
  list = [...list];
  for (let i = 0; i < list.length; i++) {
    if (list[i].key === key) {
      let children = fnListTransformTree(list, list[i].key);
      if (children?.length > 0 && Array.isArray(children)) list[i].children = children;
      res.push(list[i]);
    }
  }
  return res;
}

function transformTree(list) {
  let arr = [];
  list.forEach((v, index) => {
    let currentIndex = index;
    while (list[currentIndex].parent) {
      const currentParent = list.find((i) => i.key === list[currentIndex].parent);
      currentParent.children ? currentParent.children.push(v) : (currentParent.children = [v]);
    }
  });
}

let arrayNew = [];
list.forEach((v) => {
  if (v.parent) {
    let parentItem = list.find((k) => v.parent === k.key && v.key !== k.key);
    Array.isArray(parentItem.children) ? parentItem.children.push(v) : (parentItem.children = [v]);
  } else {
    arrayNew.push(v);
  }
});

function debounce(func, wait) {
  let timeout = null;
  return function () {
    const context = this;
    const args = [...arguments];
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

function throttle(func, wait) {
  let previous = Date.now();
  return function () {
    const now = Date.now();
    const context = this;
    const args = [...arguments];
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  };
}

function clone(target, map = new WeakMap()) {
  if (typeof target === 'object' && target !== null) {
    let cloneTarget = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    for (const key in target) {
      // ???????????????????????????
      // Object.prototype.hasOwnProperty.call(target, key)
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = clone(target[key], map);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}

function consoleTable(obj) {
  const keys = Object.keys(obj);
  const values = [];
  let maxKeyLen = 0;
  let maxValueLen = 0;
  keys.forEach((v) => {
    maxKeyLen = Math.max(maxKeyLen, v.length);
    const value = obj[v];
    if (value === null || value === undefined) {
      values.push('');
    } else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string') {
      const valStr = String(value);
      values.push(valStr);
      maxValueLen = Math.max(maxValueLen, valStr.length);
    } else {
      const valStr = JSON.stringify(value);
      values.push(valStr);
      maxValueLen = Math.max(maxValueLen, valStr.length);
    }
  });

  console.log(`|${Array(maxKeyLen).join('-')}|${Array(maxValueLen).join('-')}|`);
  for (let i = 0; i < keys.length; i++) {
    console.log(`|${keys[i].padEnd(maxKeyLen)}|${values[i].padEnd(maxValueLen)}|`);
  }
}

function sleep(params, wait) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, wait, params);
  });
}

function instanceOf(left, right) {
  let proto = left.__proto__;
  let prototype = right.prototype;
  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;
    proto = proto.__proto__;
  }
}

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(executor) {
  let self = this;
  self.status = PENDING;
  self.onFulfilled = []; // ???????????????
  self.onRejected = []; // ???????????????

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED;
      self.value = value;
      self.onFulfilled.forEach((fn) => fn());
    }
  }

  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      self.reason = reason;
      self.onRejected.forEach((fn) => fn());
    }
  }

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(e);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : (reason) => {
          throw reason;
        };
  let self = this;

  let promise2 = new Promise((resolve, reject) => {
    if (self.status === FULFILLED) {
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    } else if (self.status === REJECTED) {
      setTimeout(() => {
        try {
          let x = onRejected(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    } else if (self.status === PENDING) {
      self.onFulfilled.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });

      self.onRejected.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  });

  return promise2;
};

function resolvePromise(promise2, x, resolve, reject) {
  let self = this;
  if (promise2 === x) {
    reject(new TypeError('Chaining cycle'));
  }

  if ((x && typeof x === 'object') || typeof x === 'function') {
    let used;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (used) return;
            used = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            //PromiseA+2.3.3.2
            if (used) return;
            used = true;
            reject(r);
          }
        );
      }
    } catch (error) {
      if (used) return;
      used = true;
      reject(e);
    }
  } else {
    //PromiseA+ 2.3.3.4
    resolve(x);
  }
}

Promise.resolve = function (param) {
  if (param instanceof Promise) {
    return param;
  }
  return new Promise((resolve, reject) => {
    if (param && typeof param === 'object' && typeof param.then === 'function') {
      setTimeout(() => {
        param.then(resolve, reject);
      });
    } else {
      resolve(param);
    }
  });
};

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.finally = function (callback) {
  return this.then(
    (value) => {
      return Promise.resolve(callback()).then(() => {
        return value;
      });
    },
    (err) => {
      return Promise.resolve(callback()).then(() => {
        throw err;
      });
    }
  );
};

Promise.all = function (promises) {
  promises = Array.from(promises); //?????????????????????????????????
  return new Promise((resolve, reject) => {
    let index = 0;
    let result = [];
    if (promises.length === 0) {
      resolve(result);
    } else {
      function processValue(i, data) {
        result[i] = data;
        if (++index === promises.length) {
          resolve(result);
        }
      }
      for (let i = 0; i < promises.length; i++) {
        //promises[i] ??????????????????
        Promise.resolve(promises[i]).then(
          (data) => {
            processValue(i, data);
          },
          (err) => {
            reject(err);
            return;
          }
        );
      }
    }
  });
};

Promise.race = function (promises) {
  promises = Array.from(promises); //?????????????????????????????????
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return;
    } else {
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(
          (data) => {
            resolve(data);
            return;
          },
          (err) => {
            reject(err);
            return;
          }
        );
      }
    }
  });
};

const Pending = Symbol('Pending');
const Fulfilled = Symbol('Fulfilled');
const Rejected = Symbol('Rejected');

class Promise {
  constructor(executor) {
    this.status = Pending;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilled = [];
    this.onRejected = [];
    const resolve = (value) => {
      if (this.status === Pending) {
        this.status = Fulfilled;
        this.value = value;
        this.onFulfilled.forEach((fn) => fn());
      }
    };

    const reject = (value) => {
      if (this.status === Pending) {
        this.status = Rejected;
        this.reason = value;
        this.onRejected.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err;
          };

    let promise = new Promise((resolve, reject) => {
      if (this.status === Fulfilled) {
        if (onFulfilled && typeof onFulfilled === 'function') {
          setTimeout(() => {
            let x = onFulfilled(this.value);
            handleValue(promise, x, resolve, reject);
          }, 0);
        }
      }

      if (this.status === Rejected) {
        if (onFulfilled && typeof onFulfilled === 'function') {
          setTimeout(() => {
            let x = onRejected(this.reason);
            handleValue(promise, x, resolve, reject);
          }, 0);
        }
      }
      if (this.status === Pending) {
        if (onFulfilled && typeof onFulfilled === 'function') {
          this.onFulfilled.push(() => {
            setTimeout(() => {
              let x = onFulfilled(this.value);
              handleValue(promise, x, resolve, reject);
            }, 0);
          });
        }
        if (onRejected && typeof onRejected === 'function') {
          this.onRejected.push(() => {
            setTimeout(() => {
              let x = onRejected(this.reason);
              handleValue(promise, x, resolve, reject);
            }, 0);
          });
        }
      }
    });
    return promise;
  }

  catch(onRejected) {
    this.then(null, onRejected);
  }

  static resolve(param) {
    if (param instanceof Promise) {
      return param;
    }
    return new Promise((resolve, reject) => {
      if (param && Object.prototype.toString.call(param) === '[object Object]' && typeof param.then === 'function') {
        setTimeout(() => {
          param.then(resolve, reject);
        }, 0);
      } else {
        resolve(param);
      }
    });
  }

  static reject(param) {
    return new Promise((resolve, reject) => {
      reject(param);
    });
  }

  static all(promises) {
    //?????????promises???????????????????????????
    promises = Array.from(promises);
    return new Promise((resolve, reject) => {
      const length = promises.length;
      let value = [];
      if (length) {
        value = Array.apply(null, {
          length: length,
        });
        for (let i = 0; i < length; i++) {
          Promise.resolve(promises[i]).then(
            (res) => {
              value[i] = res;
              if (value.length == length) {
                resolve(value);
              }
            },
            (err) => {
              reject(err);
              return;
            }
          );
        }
      } else {
        resolve(value);
      }
    });
  }
  static race(promises) {
    //?????????promises???????????????????????????
    promises = Array.from(promises);
    return new Promise((resolve, reject) => {
      const length = promises.length;
      if (length) {
        for (let i = 0; i < length; i++) {
          Promise.resolve(promises[i]).then(
            (res) => {
              resolve(res);
              return;
            },
            (err) => {
              reject(err);
              return;
            }
          );
        }
      } else {
        return;
      }
    });
  }
}

const handleValue = (promise, x, reslove, reject) => {
  if (promise === x) {
    return reject(new TypeError('?????????Promise?????????????????????'));
  }
  let once = false;

  if ((x !== null && typeof x === 'object') || typeof x === 'function') {
    let then = x.then;

    if (typeof then === 'function') {
      then.call(
        x,
        (y) => {
          if (once) return;
          once = true;
          handleValue(promise, y, resolve, reject);
        },
        (r) => {
          if (once) return;
          once = true;
          reject(r);
        }
      );
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
};

// TODO ?????????
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
    this.root === null ? (this.root = newNode) : this.insertNode((this.root, newNode));
  };

  insertNode = (root, newNode) => {
    if (root.key < newNode.key) {
      root.left === null ? (root.left = newNode) : this.insertNode((root.left, newNode));
    } else {
      root.right === null ? (root.right = newNode) : this.insertNode((root.right, newNode));
    }
  };

  // ??????
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

  // ??????
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
  // ??????
  postOrderTraverse = (cb) => {
    this.postOrderTraverseNode(this.rootroot, cb);
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

  // ??????????????????
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

Function.prototype.myApply = function (context, args) {
  context = context || window;
  args = args ? args : [];
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  args = args ? args : [];
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

Function.prototype.myBind = function () {};

Function.prototype.myBind = function (context, ...args) {
  if (this instanceof Function.prototype.myBind) {
    throw Error('myBind is not a constructor');
  }
  const self = this;
  // var args = Array.prototype.slice.call(arguments, 1); // ??????????????????????????????????????????????????????
  const bindFn = function () {
    self.call(this instanceof bindFn ? this : context, ...args, ...arguments);
  };
  bindFn.prototype = this.prototype;
  return bindFn;
};

function New(func) {
  let res = {};

  if (func.prototype !== null) {
    res.__proto__ = func.prototype;
  }

  let ret = func.apply(res, Array.prototype.slice.call(arguments, 1));

  if ((typeof ret === 'object' || typeof ret === 'function') && typeof ret !== null) {
    return ret;
  }

  return res;
}

// ????????????
function bubbleSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('??????????????????');
  }
  if (arr.length === 1) {
    return arr;
  }

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}

// ????????????
function quickSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('??????????????????');
  }
  if (arr.length === 1 || !arr.length) {
    return arr;
  }
  const midIndex = Math.floor(arr.length / 2);
  const mid = arr[midIndex];
  arr.splice(midIndex, 1);
  console.log(arr, mid);
  const left = [],
    right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < mid) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(mid, quickSort(right));
}

function insertSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('??????????????????');
  }

  if (arr.length === 1 || !arr.length) {
    return arr;
  }

  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j > 0 && arr[j] < arr[j + 1]; j--) {
      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
    }
  }

  return arr;
}

function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  return [...result, ...left, ...right];
}

function mergeSort(arr) {
  if (arr.length == 1) {
    //?????????????????????1???????????????
    return arr;
  }
  let mid = Math.floor(arr.length / 2); //???????????????
  let leftArr = arr.slice(0, mid); //??????????????????????????????????????????????????????8????????????????????????????????????(0,4)
  let rightArr = arr.slice(mid); //??????(4???????????????)
  return merge(mergeSort(leftArr), mergeSort(rightArr)); //??????
}

function buildHeap(arr, size) {}

// ???????????????
class Subject {
  constructor() {
    this.observerList = [];
  }

  on = (observer) => {
    this.observerList.push(observer);
  };

  emit = (params) => {
    this.observerList.forEach((v) => {
      v.accept(params);
    });
  };
}

class Observer {
  constructor(subject) {
    this.subject = subject;
    this.subject.on(this);
  }

  accept = (params) => {
    console.log('accept :>> ', `accept ${params}`);
  };
}

// ????????????
// ??????????????? ??????????????????  ????????????????????????  ???????????????????????????????????????
// ????????????Observer??????????????????Subscribe????????????Subject???????????????????????????????????????????????????Fire Event???????????????????????????
// ????????? Subject -Fire Event-> Observer  Observer -Subscribe-> Subject

// ????????????Subscriber???????????????????????????????????????Subscribe?????????????????????Event Channel?????????????????????Publisher?????????????????????Publish Event?????????????????????????????????????????????????????????????????????????????????Fire Event???????????????????????????????????????????????????
// ???????????? Subject -Fire Event-> Event Channel Subscribe -Subscribe->Event Channel   Event Channel -Fire Event->Subscribe
   

// ??????????????????
// ?????????????????????????????????????????????
// ???????????????????????????????????????????????????
const sendRequest = (chunks, limit = 4) => {
        // limit????????????
      // ????????????,?????????limit
      // [task12,task13,task4]
  return new Promise((resolve, reject) => {
    const len = chunks.length;
    let counter = 0;
    let isStop = false;
    const start = async () => {
      const task = chunks.shift();

      try {
        await new Promise((resolve, reject) => {
          setTimeout(() => {}, 3000);
        });

        if (counter === len - 1) {
          // ?????????????????? ??????
          resolve();
        } else {
          counter++;
          // ??????????????????
          start();
        }
      } catch (error) {
        if (TextTrackList.error < 3) {
          task.error++;
          // ??????????????????????????????chunks?????????????????????
          chunks.unshift(task);
          start();
        } else {
          isStop = true;
          reject();
        }
      }
    };

    while (limit > 0) {
      // ??????limit?????????
      // ??????????????????
      setTimeout(() => {
        start();
      }, Math.random() * 2000);
      limit -= 1;
    }
  });
};
