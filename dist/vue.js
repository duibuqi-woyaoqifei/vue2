(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

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

  function codeRoot(ast) {
    var code = "_c('".concat(ast.tag, "')");
    return code;
  }
  function compileToFunction(template) {
    // template 模板转化成 ast 语法树
    var ast = parseHTML(template);

    // 生成 render 方法返回虚拟 dom
    console.log(codeRoot(ast));
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
    Object.defineProperty(target, key, {
      // 读取执行 get
      get: function get() {
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
        if (template) {
          // 编译模板
          var render = compileToFunction(template);
          ops.render = render;
        }
      }
      ops.render;
    };
  }

  // Vue 方法集合
  function Vue(options) {
    this._init(options);
  }

  // 扩展 init 方法
  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
