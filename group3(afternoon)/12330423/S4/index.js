// Generated by LiveScript 1.3.1
(function(){
  var enableBtn, disableBtn, checkReady, disableOtherBtn, enableOtherBtn, shuffle, showOrder;
  window.onload = function(){
    return reset();
  };
  enableBtn = function(btn){
    btn.setAttribute('onclick', 'getRandomNum(this)');
    return btn.style.backgroundColor = 'blue';
  };
  disableBtn = function(btn){
    btn.setAttribute('onclick', '');
    return btn.style.backgroundColor = '#666';
  };
  checkReady = function(){
    if (NUMBERS.length !== 5) {
      return false;
    }
    $('#info-bar')[0].setAttribute('onclick', 'showSum()');
    if (AUTO) {
      return showSum();
    }
  };
  disableOtherBtn = function(){
    var i$, ref$, len$, btn, results$ = [];
    for (i$ = 0, len$ = (ref$ = btns).length; i$ < len$; ++i$) {
      btn = ref$[i$];
      if (!in$(btn, CLICKED)) {
        results$.push(disableBtn(btn));
      }
    }
    return results$;
  };
  enableOtherBtn = function(){
    var i$, ref$, len$, btn, results$ = [];
    for (i$ = 0, len$ = (ref$ = btns).length; i$ < len$; ++i$) {
      btn = ref$[i$];
      if (!in$(btn, CLICKED)) {
        results$.push(enableBtn(btn));
      } else {
        results$.push(disableBtn(btn));
      }
    }
    return results$;
  };
  this.showSum = function(){
    var result, i$, ref$, len$, item, sumSpan;
    result = 0;
    for (i$ = 0, len$ = (ref$ = NUMBERS).length; i$ < len$; ++i$) {
      item = ref$[i$];
      result += item;
    }
    sumSpan = $('#sum')[0];
    sumSpan.innerText = result;
    return sumSpan.style.opacity = 1;
  };
  this.getRandomNum = function(btn, current, order){
    var num, req;
    current == null && (current = 0);
    order == null && (order = []);
    if (!AUTO) {
      $('#base')[0].setAttribute('onclick', '');
    }
    current++;
    this.CLICKED = this.CLICKED.concat([btn]);
    num = btn.getElementsByClassName('num')[0];
    num.innerText = '...';
    num.style.opacity = 1;
    btn.setAttribute('onclick', '');
    disableOtherBtn();
    req = new XMLHttpRequest();
    req.open('GET', '../getRandomNum', true);
    req.send();
    return req.onreadystatechange = function(){
      if (req.readyState === 4 && req.status === 200) {
        window.NUMBERS = window.NUMBERS.concat([Number(req.response)]);
        num.innerText = req.response;
        enableOtherBtn();
        if (AUTO && current < 5) {
          getRandomNum(btns[order[current]], current, order);
        }
        return checkReady();
      }
    };
  };
  this.reset = function(){
    var res$, i$, ref$, len$, ID, btn, results$ = [];
    this.CLICKED = [];
    this.NUMBERS = [];
    this.AUTO = false;
    this.CURRENT = 0;
    this.button = $('#button')[0];
    res$ = [];
    for (i$ = 0, len$ = (ref$ = ['A', 'B', 'C', 'D', 'E']).length; i$ < len$; ++i$) {
      ID = ref$[i$];
      res$.push($('.'.concat(ID))[0]);
    }
    this.btns = res$;
    enableOtherBtn();
    $('#sum')[0].style.opacity = 0;
    $('#order')[0].style.opacity = 0;
    button.setAttribute('onmouseleave', 'setTimeout("reset()", 1000)');
    $('#base')[0].setAttribute('onclick', 'randomClick()');
    for (i$ = 0, len$ = (ref$ = btns).length; i$ < len$; ++i$) {
      btn = ref$[i$];
      $('#info-bar')[0].setAttribute('onclick', '');
      results$.push(btn.getElementsByClassName('num')[0].style.opacity = 0);
    }
    return results$;
  };
  this.randomClick = function(){
    this.AUTO = true;
    this.CURRENT = 0;
    this.ORDER = [0, 1, 2, 3, 4].sort(shuffle);
    showOrder(ORDER);
    $('#base')[0].setAttribute('onclick', '');
    return getRandomNum(btns[ORDER[CURRENT]], CURRENT, ORDER);
  };
  shuffle = function(){
    if (Math.random() > 0.5) {
      return -1;
    } else {
      return 1;
    }
  };
  showOrder = function(order){
    var orderString, i$, len$, i;
    orderString = '';
    for (i$ = 0, len$ = order.length; i$ < len$; ++i$) {
      i = order[i$];
      orderString += ['A', 'B', 'C', 'D', 'E'][i] + ' ';
    }
    $('#order')[0].innerText = orderString;
    return $('#order')[0].style.opacity = 1;
  };
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);