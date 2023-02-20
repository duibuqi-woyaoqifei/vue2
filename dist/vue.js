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
          tokens.push("_s(".concat(match[1], ")"));
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

  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);
      // 属性的 dep 要收集 watcher
      this.id = id++;

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
    }]);
    return Dep;
  }();
  Dep.target = null;

  var id$1 = 0;

  // 渲染根实例
  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, fn, options) {
      _classCallCheck(this, Watcher);
      this.id = id$1++;

      // 是一个渲染 watcher
      this.renderWatcher = options;

      // getter 意味着调用这个函数可以发生取值操作
      this.getter = fn;
      this.deps = [];
      this.depsId = new Set();
      this.get();
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
      key: "get",
      value: function get() {
        // 静态属性只有一份
        Dep.target = this;

        // 会去 vm 上取值
        this.getter();

        // 渲染完毕清空
        Dep.target = null;
      }
    }]);
    return Watcher;
  }(); //

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
    return vnode(vm, tag, key, data, children);
  }

  // _v()
  function createTextVNode(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text);
  }

  // 可增加自定义属性描述 dom
  function vnode(vm, tag, key, data, children, text) {
    return {
      vm: vm,
      tag: tag,
      key: key,
      data: data,
      children: children,
      text: text
    };
  }

  function createElm(vnode) {
    var tag = vnode.tag,
      data = vnode.data,
      children = vnode.children,
      text = vnode.text;
    if (typeof tag === "string") {
      vnode.el = document.createElement(tag);
      patchProps(vnode.el, data);
      children.forEach(function (child) {
        vnode.el.appendChild(createElm(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }
    return vnode.el;
  }
  function patchProps(el, props) {
    for (var key in props) {
      if (key === "style") {
        for (var styleName in props.style) {
          el.style[styleName] = props.style[styleName];
        }
      } else {
        el.setAttribute(key, props[key]);
      }
    }
  }
  function patch(oldVNode, vnode) {
    var isRealElement = oldVNode.nodeType;
    if (isRealElement) {
      // 获取真实元素
      var elm = oldVNode;

      // 获取父元素
      var parentElm = elm.parentNode;
      var newElm = createElm(vnode);

      // 插入新节点
      parentElm.insertBefore(newElm, elm.nextSibling);

      // 删除旧节点
      parentElm.removeChild(elm);
      return newElm;
    }
  }
  function initLifeCycle(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this;
      var el = vm.$el;

      // 初始化和更新
      vm.$el = patch(el, vnode);
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
      var vm = this;
      return vm.$options.render.call(vm);
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
      return result;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);
      // 数据添加 __ob__ 标识
      Object.defineProperty(data, '__ob__', {
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
  }();
  function defineReactive(target, key, value) {
    // 对所有对象都进行属性劫持
    observe(value);

    // 每一个属性都有一个 dep
    var dep = new Dep();
    Object.defineProperty(target, key, {
      // 读取执行 get
      get: function get() {
        if (Dep.target) {
          dep.depend();
        }
        return value;
      },
      // 修改执行 set
      set: function set(newValue) {
        if (newValue === value) return;
        observe(newValue);
        value = newValue;
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

  // Vue 增加 init 方法
  function initMixin(Vue) {
    // 初始化操作
    Vue.prototype._init = function (options) {
      // 用户挂载到实例
      var vm = this;
      vm.$options = options;

      // 初始化状态
      initState(vm);

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
          if (el) {
            template = ops.template;
          }
        }
        if (template && el) {
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

  return Vue;

}));
//# sourceMappingURL=vue.js.map
