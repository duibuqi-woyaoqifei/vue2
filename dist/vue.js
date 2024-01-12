(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var strats = {};
  var LIFECYCLE = ["beforeCreate", "created"];
  LIFECYCLE.forEach(function (hook) {
    strats[hook] = function (p, c) {
      if (c) {
        if (p) {
          return p.concat(c);
        } else {
          return [c];
        }
      } else {
        return p;
      }
    };
  });
  strats.data = function (p, c) {
    if (!c) {
      return p;
    } else if (!p) {
      return c;
    } else {
      return _objectSpread2(_objectSpread2({}, p), c);
    }
  };
  strats.computed = function (p, c) {
    if (!c) {
      return p;
    } else if (!p) {
      return c;
    } else {
      return _objectSpread2(_objectSpread2({}, p), c);
    }
  };
  strats.watch = function (p, c) {
    if (!c) {
      return p;
    } else if (!p) {
      return c;
    } else {
      return _objectSpread2(_objectSpread2({}, p), c);
    }
  };
  strats.components = function (parentVal, childVal) {
    var res = Object.create(parentVal);
    if (childVal) {
      for (var key in childVal) {
        res[key] = childVal[key];
      }
    }
    return res;
  };
  function mergeOptions(parent, child) {
    var options = _objectSpread2(_objectSpread2({}, parent), child);
    for (var key in parent) {
      mergeField(key);
    }
    for (var _key in child) {
      if (!parent.hasOwnProperty(_key)) {
        mergeField(_key);
      }
    }
    function mergeField(key) {
      if (strats[key]) {
        options[key] = strats[key](parent[key], child[key]);
      } else {
        // 如果 child 中没有该选项，则使用 parent 中的选项
        options[key] = child[key] || parent[key];
      }
    }
    return options;
  }

  function initGlobalAPI(Vue) {
    // 静态方法

    Vue.options = {
      _base: Vue
    };
    Vue.mixin = function (mixin) {
      this.options = mergeOptions(this.options, mixin);
      return this;
    };
    Vue.extend = function (options) {
      function Sub() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this._init(options);
      }
      Sub.prototype = Object.create(Vue.prototype);
      Sub.prototype.constructor = Sub;
      Sub.options = mergeOptions(Vue.options, options);
      return Sub;
    };
    Vue.options.components = {};
    Vue.component = function (id, definition) {
      typeof definition === "function" ? definition : Vue.extend(definition);
      Vue.options.components[id] = definition;
    };
  }

  var ncname = "[a-zA-Z_][\\w\\-\\.]*";
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性
  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 匹配 <xxx
  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // 匹配 </xxx>
  var startTagClose = /^\s*(\/?)>/; // 匹配 <div> <br/>

  // 对模板进行编译处理
  function parseHTML(html) {
    var ELEMENT_TYPE = 1;
    var TEXT_TYPE = 3;
    var stack = []; // 存放元素
    var currentParent, root;
    function createASTElement(tag, attrs) {
      return {
        tag: tag,
        type: ELEMENT_TYPE,
        children: [],
        attrs: attrs,
        parent: null
      };
    }
    function start(tag, attrs) {
      var node = createASTElement(tag, attrs);

      // 树为空则当前是树的根节点(第一次)
      if (!root) {
        root = node;
      }
      if (currentParent) {
        node.parent = currentParent;
        currentParent.children.push(node);
      }
      stack.push(node);
      currentParent = node;
    }
    function chars(text) {
      // 去除空格
      text = text.replace(/\s/g, "");

      // 文本存放当前节点
      text && currentParent.children.push({
        type: TEXT_TYPE,
        text: text,
        parent: currentParent
      });
    }
    function end(tag) {
      // 删除最后一个 ( 倒数第二个为最后一个的 parent )
      stack.pop();
      currentParent = stack[stack.length - 1];
    }

    // 截取 html
    function advance(n) {
      html = html.substring(n);
    }

    // 解析开始标签返回 match 结果
    function parseStartTag() {
      var start = html.match(startTagOpen);
      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length);
        var tagClose, attr;
        while (!(tagClose = html.match(startTagClose)) && (attr = html.match(attribute))) {
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
          advance(attr[0].length);
        }
        if (tagClose) {
          advance(tagClose[0].length);
        }
        return match;
      }
      return false;
    }
    while (html) {
      var textEnd = html.indexOf("<");

      // textEnd 等于 0 则为标签
      if (textEnd === 0) {
        // 匹配开始标签
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        // 匹配结束标签
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          end(endTagMatch[1]);
          advance(endTagMatch[0].length);
          continue;
        }
      }

      // textEnd > 0 则为文本内容
      if (textEnd > 0) {
        var text = html.substring(0, textEnd);
        if (text) {
          chars(text);
          advance(text.length);
        }
      }
    }
    return root;
  }

  function rootProps(attrs) {
    // { name, value }
    var str = "";
    var _loop = function _loop() {
      var attr = attrs[i];
      if (attr.name === "style") {
        var obj = {};
        attr.value.split(";").forEach(function (item) {
          var _item$split = item.split(":"),
            _item$split2 = _slicedToArray(_item$split, 2),
            key = _item$split2[0],
            value = _item$split2[1];
          if (key) {
            obj[key] = value;
          }
        });
        attr.value = obj;
      }
      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    };
    for (var i = 0; i < attrs.length; i++) {
      _loop();
    }
    return "{".concat(str.slice(0, -1), "}");
  }
  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // 匹配 {{ xxx }}
  function root(node) {
    // 判断标签节点和文本
    if (node.type === 1) {
      return codeRoot(node);
    } else {
      var text = node.text;
      if (!defaultTagRE.test(text)) {
        return "_v(".concat(JSON.stringify(text), ")");
      } else {
        var tokens = [];
        var match;
        defaultTagRE.lastIndex = 0;
        var lastIndex = 0;
        while (match = defaultTagRE.exec(text)) {
          var index = match.index;
          if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
          }
          tokens.push("_s(".concat(match[1].trim(), ")"));
          lastIndex = index + match[0].length;
        }
        if (lastIndex < text.length) {
          tokens.push(JSON.stringify(text.slice(lastIndex)));
        }
        return "_v(".concat(tokens.join("+"), ")");
      }
    }
  }
  function rootChildren(children) {
    return children.map(function (child) {
      return root(child);
    }).join(",");
  }
  function codeRoot(ast) {
    var children = rootChildren(ast.children);
    var code = "_c('".concat(ast.tag, "',").concat(ast.attrs.length > 0 ? rootProps(ast.attrs) : "null").concat(ast.children.length ? ",".concat(children) : "", ")");
    return code;
  }
  function compileToFunction(template) {
    // template 模板转化成 ast 语法树
    var ast = parseHTML(template);

    // 生成 render 方法返回虚拟 dom , with 函数 + new Function 实现模板引擎
    var code = codeRoot(ast);
    code = "with(this) { return ".concat(code, " }");
    var render = new Function(code);
    return render;
  }

  var id$1 = 0;
  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);
      // 属性的 dep 要收集 watcher
      this.id = id$1++;

      // 存放当前属性对应的 watcher 有哪些
      this.subs = [];
    }
    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        Dep.target.addDep(this);
      }
    }, {
      key: "addSub",
      value: function addSub(watcher) {
        this.subs.push(watcher);
      }
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          return watcher.update();
        });
      }
    }]);
    return Dep;
  }();
  Dep.target = null;
  var stack = [];
  function pushTarget(watcher) {
    stack.push(watcher);
    Dep.target = watcher;
  }
  function popTarget() {
    stack.pop();
    Dep.target = stack[stack.length - 1];
  }

  var id = 0;

  // 渲染根实例
  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, exprOrFn, options, cb) {
      _classCallCheck(this, Watcher);
      this.id = id++;

      // 是一个渲染 watcher
      this.renderWatcher = options;

      // getter 意味着调用这个函数可以发生取值操作
      if (typeof exprOrFn === "string") {
        this.getter = function () {
          return vm[exprOrFn];
        };
      } else {
        this.getter = exprOrFn;
      }
      this.deps = [];
      this.depsId = new Set();
      this.vm = vm;
      this.cb = cb;
      this.lazy = options.lazy;
      this.user = options.user;

      // 缓存
      this.dirty = this.lazy;
      this.value = this.lazy ? undefined : this.get();
    }
    _createClass(Watcher, [{
      key: "addDep",
      value: function addDep(dep) {
        var id = dep.id;
        if (!this.depsId.has(id)) {
          this.deps.push(dep);
          this.depsId.add(id);
          dep.addSub(this);
        }
      }
    }, {
      key: "evaluate",
      value: function evaluate() {
        this.value = this.get();
        this.dirty = false;
      }
    }, {
      key: "get",
      value: function get() {
        // 静态属性只有一份
        pushTarget(this);

        // 会去 vm 上取值
        var value = this.getter.call(this.vm);

        // 渲染完毕清空
        popTarget();
        return value;
      }
    }, {
      key: "depend",
      value: function depend() {
        var i = this.deps.length;
        while (i--) {
          this.deps[i].depend();
        }
      }
    }, {
      key: "update",
      value: function update() {
        if (this.lazy) {
          this.dirty = true;
        } else {
          queueWatcher(this);
        }

        // 重新渲染
        this.get();
      }
    }, {
      key: "run",
      value: function run() {
        var oldValue = this.value;
        var newValue = this.get();
        if (this.user) {
          this.cb.call(this.vm, oldValue, newValue);
        }
      }
    }]);
    return Watcher;
  }();
  var queue = [];
  var has = {};
  var pending = false;
  function flushSchedulerQueue() {
    var flushQueue = queue.slice(0);
    queue = [];
    has = {};
    pending = false;
    flushQueue.forEach(function (q) {
      return q.run();
    });
  }
  function queueWatcher(watcher) {
    var id = watcher.id;
    if (!has[id]) {
      queue.push(watcher);
      has[id] = true;
      if (!pending) {
        setTimeout(flushSchedulerQueue, 0);
        pending = true;
      }
    }
  }
  var callbacks = [];
  var waiting = false;
  function flushCallbacks() {
    waiting = true;
    var cbs = callbacks.slice(0);
    callbacks = [];
    cbs.forEach(function (cb) {
      return cb();
    });
  }
  var timerFunc;
  if (Promise) {
    timerFunc = function timerFunc() {
      Promise.resolve().then(flushCallbacks);
    };
  } else if (MutationObserver) {
    var observer = new MutationObserver(flushCallbacks);
    var textNode = document.createTextNode(1);
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function timerFunc() {
      textNode.textContent = 2;
    };
  } else if (setImmediate) {
    timerFunc = function timerFunc() {
      setImmediate(flushCallbacks);
    };
  } else {
    timerFunc = function timerFunc() {
      setTimeout(flushCallbacks);
    };
  }
  function nextTick(cb) {
    callbacks.push(cb);
    if (!waiting) {
      setTimeout(function () {
        timerFunc();
        waiting = true;
      }, 0);
    }
  }

  var isReservedTag = function isReservedTag(tag) {
    return ['a', 'div', 'p', 'button', 'ul', 'li', 'span'].includes(tag);
  };

  // h() _c()
  function createElementVNode(vm, tag, data) {
    if (data === null) {
      data = {};
    }
    var key = data.key;
    if (key) {
      delete data.key;
    }
    for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }
    if (isReservedTag(tag)) {
      return vnode(vm, tag, key, data, children);
    } else {
      var Ctor = vm.$options.components[tag];
      return createComponentVnode(vm, tag, key, data, children, Ctor);
    }
  }
  function createComponentVnode(vm, tag, key, data, children, Ctor) {
    if (_typeof(Ctor) === 'object') {
      Ctor = vm.$options._base.extend(Ctor);
    }
    data.hook = {
      init: function init(vnode) {
        var instance = vnode.componentInstance = new vnode.componentOptions.Ctor();
        instance.$mount();
      }
    };
    return vnode(vm, tag, key, data, children, null, {
      Ctor: Ctor
    });
  }

  // _v()
  function createTextVNode(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text);
  }

  // 可增加自定义属性描述 dom
  function vnode(vm, tag, key, data, children, text, componentOptions) {
    return {
      vm: vm,
      tag: tag,
      key: key,
      data: data,
      children: children,
      text: text,
      componentOptions: componentOptions
    };
  }
  function isSameVnode(vnode1, vnode2) {
    return vnode1.tag === vnode2.tag && vnode1.key === vnode2.key;
  }

  function createComponent(vnode) {
    var i = vnode.data;
    if ((i = i.hook) && (i = i.init)) {
      i(vnode);
    }
    if (vnode.componentInstance) {
      return true;
    }
  }
  function createElm(vnode) {
    var tag = vnode.tag,
      data = vnode.data,
      children = vnode.children,
      text = vnode.text;
    if (typeof tag === "string") {
      if (createComponent(vnode)) {
        return vnode.componentInstance.$el;
      }
      vnode.el = document.createElement(tag);
      patchProps(vnode.el, {}, data);
      children.forEach(function (child) {
        vnode.el.appendChild(createElm(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }
    return vnode.el;
  }
  function patchProps(el) {
    var oldProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    // 删除
    var oldStyles = oldProps.style;
    var newStyles = props.style;
    for (var key in oldStyles) {
      if (newStyles) {
        if (!newStyles[key]) {
          el.style[key] = "";
        }
      }
    }
    for (var _key in oldProps) {
      if (!props[_key]) {
        el.removeAttribute(_key);
      }
    }
    for (var _key2 in props) {
      if (_key2 === "style") {
        for (var styleName in props.style) {
          el.style[styleName] = props.style[styleName];
        }
      } else {
        el.setAttribute(_key2, props[_key2]);
      }
    }
  }
  function patch(oldVnode, vnode) {
    if (!oldVnode) {
      return createElm(vnode);
    }
    var isRealElement = oldVnode.nodeType;
    if (isRealElement) {
      // 获取真实元素
      var elm = oldVnode;

      // 获取父元素
      var parentElm = elm.parentNode;
      var newElm = createElm(vnode);

      // 插入新节点
      parentElm.insertBefore(newElm, elm.nextSibling);

      // 删除旧节点
      parentElm.removeChild(elm);
      return newElm;
    } else {
      // diff 算法
      return patchVnode(oldVnode, vnode);
    }
  }
  function patchVnode(oldVnode, vnode) {
    if (!isSameVnode(oldVnode, vnode)) {
      var _el = createElm(vnode);
      oldVnode.el.parentNode.replaceChild(_el, oldVnode.el);
      return _el;
    }
    var el = vnode.el = oldVnode.el;
    if (!oldVnode.tag) {
      if (oldVnode.text !== vnode.text) {
        el.textContent = vnode.text;
      }
    }
    patchProps(el, oldVnode.data, vnode.data);
    var oldChildren = oldVnode.children || [];
    var newChildren = vnode.children || [];
    if (oldChildren.length > 0 && newChildren.length > 0) {
      updateChildren(el, oldChildren, newChildren);
    } else if (newChildren.length > 0) {
      mountChildren(el, newChildren);
    } else {
      el.innerHTML = "";
    }
    return el;
  }
  function mountChildren(el, newChildren) {
    for (var i = 0; i < newChildren.length; i++) {
      var child = newChildren[i];
      el.appendChild(createElm(child));
    }
  }
  function updateChildren(el, oldChildren, newChildren) {
    var oldStartIndex = 0;
    var newStartIndex = 0;
    var oldEndIndex = oldChildren.length - 1;
    var newEndIndex = newChildren.length - 1;
    var oldStartVnode = oldChildren[0];
    var newStartVnode = newChildren[0];
    var oldEndVnode = oldChildren[oldEndIndex];
    var newEndVnode = newChildren[newEndIndex];
    function makeIndexByKey(children) {
      var map = {};
      children.forEach(function (child, index) {
        map[child.key] = index;
      });
      return map;
    }
    var map = makeIndexByKey(oldChildren);
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
      // 指针
      if (!oldStartVnode) {
        oldStartVnode = oldChildren[++oldStartIndex];
      } else if (!oldEndVnode) {
        oldEndVnode = oldChildren[--oldEndIndex];
      } else if (isSameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode);
        oldStartVnode = oldChildren[++oldStartIndex];
        newStartVnode = newChildren[++newStartIndex];
      } else if (isSameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode);
        oldEndVnode = oldChildren[--oldEndIndex];
        newEndVnode = newChildren[--newEndIndex];
      } else if (isSameVnode(oldStartVnode, newEndVnode)) {
        patchVnode(oldStartVnode, newEndVnode);
        el.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
        oldStartVnode = oldChildren[++oldStartIndex];
        newEndVnode = newChildren[--newEndIndex];
      } else if (isSameVnode(oldEndVnode, newStartVnode)) {
        patchVnode(oldEndVnode, newStartVnode);
        el.insertBefore(oldEndVnode.el, oldStartVnode.el);
        oldEndVnode = oldChildren[--oldEndIndex];
        newStartVnode = newChildren[++newStartIndex];
      } else {
        // 乱序比对
        var moveIndex = map[newStartVnode.key];
        if (moveIndex !== undefined) {
          var moveVnode = oldChildren[moveIndex];
          el.insertBefore(moveVnode.el, oldStartVnode.el);
          oldChildren[moveIndex] = undefined;
          patchVnode(moveVnode, newStartVnode);
        } else {
          el.insertBefore(createElm(newStartVnode), oldStartVnode.el);
        }
        newStartVnode = newChildren[++newStartIndex];
      }
    }
    if (newStartIndex <= newEndIndex) {
      for (var i = newStartIndex; i <= newEndIndex; i++) {
        var childEl = createElm(newChildren[i]);
        var anchor = newChildren[newEndIndex + 1] ? newChildren[newEndIndex + 1].el : null;
        el.insertBefore(childEl, anchor);
      }
    }
    if (oldStartIndex <= oldEndIndex) {
      for (var _i = oldStartIndex; _i <= oldEndIndex; _i++) {
        if (oldChildren[_i]) {
          var _childEl = oldChildren[_i].el;
          el.removeChild(_childEl);
        }
      }
    }
  }

  function initLifeCycle(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this;
      var el = vm.$el;
      var prevVnode = vm._vnode;
      vm._vnode = vnode;
      if (prevVnode) {
        vm.$el = patch(prevVnode, vnode);
      } else {
        vm.$el = patch(el, vnode);
      }
    };
    Vue.prototype._c = function () {
      return createElementVNode.apply(void 0, [this].concat(Array.prototype.slice.call(arguments)));
    };
    Vue.prototype._v = function () {
      return createTextVNode.apply(void 0, [this].concat(Array.prototype.slice.call(arguments)));
    };
    Vue.prototype._s = function (value) {
      if (_typeof(value) !== "object") {
        return value;
      }
      return JSON.stringify(value);
    };
    Vue.prototype._render = function () {
      return this.$options.render.call(this);
    };
  }
  function mountComponent(vm, el) {
    // el 已经通过 querySelector 处理过
    vm.$el = el;

    // 调用 render 方法产生虚拟dom
    var updateComponent = function updateComponent() {
      vm._update(vm._render());
    };
    new Watcher(vm, updateComponent, true);

    // 根据虚拟 dom 产生真实 dom

    // 插入 dom 到 el 元素中
  }

  // 调用钩子函数
  function callHook(vm, hook) {
    var handlers = vm.$options[hook];
    if (handlers) {
      handlers.forEach(function (handler) {
        return handler.call(vm);
      });
    }
  }

  // 重写数组部分方法

  // 获取数组原型
  var oldArrayProto = Array.prototype;
  var newArrayProto = Object.create(oldArrayProto);
  var methods = ["push", "pop", "shift", "unshift", "sort", "splice", "reverse"];
  methods.forEach(function (method) {
    // 重写
    newArrayProto[method] = function () {
      var _oldArrayProto$method;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var result = (_oldArrayProto$method = oldArrayProto[method]).call.apply(_oldArrayProto$method, [this].concat(args));

      // 新增数据劫持
      var inserted;
      var ob = this.__ob__;
      switch (method) {
        case "push":
          break;
        case "unshift":
          inserted = args;
          break;
      }
      if (inserted) {
        ob.observeArray(inserted);
      }

      // 通知更新
      ob.dep.notify();
      return result;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);
      // 所有对象增加 dep
      this.dep = new Dep();

      // 数据添加 __ob__ 标识
      Object.defineProperty(data, "__ob__", {
        value: this,
        enumerable: false // 循环时不可枚举
      });

      if (Array.isArray(data)) {
        // 重写js数组方法
        data.__proto__ = newArrayProto;
        this.observeArray(data);
      } else {
        this.walk(data);
      }
    }

    // 循环对象，对属性依次劫持
    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        // 重新定义属性
        Object.keys(data).forEach(function (key) {
          return defineReactive(data, key, data[key]);
        });
      }
    }, {
      key: "observeArray",
      value: function observeArray(data) {
        data.forEach(function (item) {
          return observe(item);
        });
      }
    }]);
    return Observer;
  }(); // 递归增加数组 dep
  function dependArray(value) {
    for (var i = 0; i < value.length; i++) {
      var current = value[i];
      current.__ob__ && current.__ob__.dep.depend();
      if (Array.isArray(current)) {
        dependArray(current);
      }
    }
  }
  function defineReactive(target, key, value) {
    // 对所有对象都进行属性劫持
    var childOb = observe(value);
    var dep = new Dep();
    Object.defineProperty(target, key, {
      // 读取执行 get
      get: function get() {
        if (Dep.target) {
          dep.depend();
          if (childOb) {
            childOb.dep.depend();
            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        }
        return value;
      },
      // 修改执行 set
      set: function set(newValue) {
        if (newValue === value) return;
        observe(newValue);
        value = newValue;

        // 通知更新
        dep.notify();
      }
    });
  }
  function observe(data) {
    // 只劫持对象
    if (_typeof(data) !== "object" || data == null) {
      return;
    }

    // 是否已劫持
    return new Observer(data);
  }

  function initState(vm) {
    var opts = vm.$options;
    if (opts.data) {
      initData(vm);
    }
    if (opts.computed) {
      initComputed(vm);
    }
    if (opts.watch) {
      initWatch(vm);
    }
  }
  function initWatch(vm) {
    var watch = vm.$options.watch;
    for (var key in watch) {
      var handler = watch[key];
      if (Array.isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i]);
        }
      } else {
        createWatcher(vm, key, handler);
      }
    }
  }
  function createWatcher(vm, key, handler) {
    if (typeof handler === "string") {
      handler = vm[handler];
    }
    return vm.$watch(key, handler);
  }
  function proxy(vm, target, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[target][key];
      },
      set: function set(newValue) {
        vm[target][key] = newValue;
      }
    });
  }
  function initData(vm) {
    // data 可能是函数和对象
    var data = vm.$options.data;
    data = typeof data === "function" ? data(vm) : data;
    vm._data = data;
    // 对数据进行劫持 defineProperty
    observe(data);

    // vm 代理 data 对象
    for (var key in data) {
      proxy(vm, "_data", key);
    }
  }
  function initComputed(vm) {
    var computed = vm.$options.computed;
    var watchers = vm._computedWatchers = {};
    for (var key in computed) {
      var userDef = computed[key];
      var fn = typeof userDef === "function" ? userDef : userDef.get;
      watchers[key] = new Watcher(vm, fn, {
        lazy: true
      });
      defineComputed(vm, key, userDef);
    }
  }
  function defineComputed(target, key, userDef) {
    typeof userDef === "function" ? userDef : userDef.get;
    var setter = userDef.set || function () {};
    Object.defineProperty(target, key, {
      get: createComputedGetter(key),
      set: setter
    });
  }
  function createComputedGetter(key) {
    return function () {
      var watcher = this._computedWatchers[key];
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    };
  }
  function initStateMixin(Vue) {
    Vue.prototype.$nextTick = nextTick;
    Vue.prototype.$watch = function (exprOrFn, cb) {
      new Watcher(this, exprOrFn, {
        user: true
      }, cb);
    };
  }

  // Vue 增加 init 方法
  function initMixin(Vue) {
    // 初始化操作
    Vue.prototype._init = function (options) {
      // 用户挂载到实例
      var vm = this;
      vm.$options = mergeOptions(this.constructor.options, options);
      // vm.$options = options;

      callHook(vm, "beforeCreate");
      // 初始化状态
      initState(vm);
      callHook(vm, "created");

      // 挂载
      if (options.el) {
        vm.$mount(options.el);
      }
    };
    Vue.prototype.$mount = function (el) {
      var vm = this;
      el = document.querySelector(el);
      var ops = vm.$options;

      // 有没有 render 函数
      if (!ops.render) {
        var template;

        // 没有写模板，但是写了el
        if (!ops.template && el) {
          template = el.outerHTML;
        } else {
          template = ops.template;
        }
        if (template) {
          // 编译模板
          var render = compileToFunction(template);
          ops.render = render;
        }
      }

      // 组件挂载
      mountComponent(vm, el);
    };
  }

  // Vue 方法集合
  function Vue(options) {
    this._init(options);
  }

  // 扩展 init 方法
  initMixin(Vue);
  initLifeCycle(Vue);
  initGlobalAPI(Vue);
  initStateMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
