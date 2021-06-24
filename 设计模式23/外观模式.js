function addEvent(dom, type, fn) {
  if(dom.addEventListener) {
    dom.addEventListener(type, fn, false); // addEventListener 可以多次绑定 不冲突 
  } else if (dom.attachEvent) {
    dom.attachEvent('on' + type, fn);
  } else {
    dom['on' + type] = fn;
  }
}

var myInput = document.getElementById('myInput');
addEvent(myInput, 'click', function() {
  console.log('绑定一个事件');
});


var getEvent = function(event) {
  return event || window.event;
};

var getTarget = function(event) {
  var event = getEvent(event);
  // 标准浏览器是target  IE下为srcElement
  return event.target || event.srcElement;
};

var preventDefault = function(event) {
  var event = getEvent(event);
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
};

document.onclick = function(event) {
  preventDefault(event);

  if (getTarget(event) !== document.getElementById('myInput')) {
    hideInputSug();
  }
}

