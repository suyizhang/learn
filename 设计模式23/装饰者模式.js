var decorator = function (input, fn) {
  var input = document.getElementById(input);

  if (typeof fn === 'function') {
    var oldClickFn = input.onclick;

    input.onclick = function () {
      oldClickFn();

      fn();
    };
  } else {
    input.onclick = fn;
  }
};
