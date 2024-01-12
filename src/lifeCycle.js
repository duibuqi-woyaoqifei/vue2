import Watcher from "./observe/watcher";
import { createElementVNode, createTextVNode } from "./vdom";
import { patch } from "./vdom/patch";

export function initLifeCycle(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    const el = vm.$el;

    const prevVnode = vm._vnode;

    vm._vnode = vnode;

    if (prevVnode) {
      vm.$el = patch(prevVnode, vnode);
    } else {
      vm.$el = patch(el, vnode);
    }
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
    return this.$options.render.call(this);
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

  // 根据虚拟 dom 产生真实 dom

  // 插入 dom 到 el 元素中
}

// 调用钩子函数
export function callHook(vm, hook) {
  const handlers = vm.$options[hook];
  if (handlers) {
    handlers.forEach((handler) => handler.call(vm));
  }
}
