import Watcher from "./observe/watcher";
import { createElementVNode, createTextVNode } from "./vdom";

function createElm(vnode) {
  let { tag, data, children, text } = vnode;
  if (typeof tag === "string") {
    vnode.el = document.createElement(tag);
    patchProps(vnode.el, data);
    children.forEach((child) => {
      vnode.el.appendChild(createElm(child));
    });
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

function patchProps(el, props) {
  for (let key in props) {
    if (key === "style") {
      for (let styleName in props.style) {
        el.style[styleName] = props.style[styleName];
      }
    } else {
      el.setAttribute(key, props[key]);
    }
  }
}

function patch(oldVNode, vnode) {
  const isRealElement = oldVNode.nodeType;
  if (isRealElement) {
    // 获取真实元素
    const elm = oldVNode;

    // 获取父元素
    const parentElm = elm.parentNode;
    let newElm = createElm(vnode);

    // 插入新节点
    parentElm.insertBefore(newElm, elm.nextSibling);

    // 删除旧节点
    parentElm.removeChild(elm);

    return newElm;
  } else {
  }
}

export function initLifeCycle(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    const el = vm.$el;

    // 初始化和更新
    vm.$el = patch(el, vnode);
  };
  Vue.prototype._c = function () {
    return createElementVNode(this, ...arguments);
  };
  Vue.prototype._v = function () {
    return createTextVNode(this, ...arguments);
  };
  Vue.prototype._s = function (value) {
    if (typeof value !== "object") {
      return value;
    }
    return JSON.stringify(value);
  };
  Vue.prototype._render = function () {
    return vm.$options.render.call(vm);
  };
}

export function mountComponent(vm, el) {
  // el 已经通过 querySelector 处理过
  vm.$el = el;

  // 调用 render 方法产生虚拟dom
  const updateComponent = () => {
    vm._update(vm._render());
  };

  const watcher = new Watcher(vm, updateComponent, true);

  console.log(watcher);

  // 根据虚拟 dom 产生真实 dom

  // 插入 dom 到 el 元素中
}

// 调用钩子函数
export function callHook(vm, hook) {
  const handlers = vm.$options[hook]
  if (handlers) {
    handlers.forEach(handler=>handler.call(vm))
  }
}