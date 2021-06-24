function findNodes(callback, callback_obj) {
  if (typeof callback === 'string') {
    callback = callback_obj[callback];
  }
  if (typeof callback === 'function') {
    callback.call(callback_obj, found);
  }
}

function hide(nodes) {
  nodes[i].style.display = 'none';
}

findNodes(hide);
