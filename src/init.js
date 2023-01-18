import { compileToFunction } from "./compiler";
import { mountComponent } from "./lifecycle";
import { initState } from "./state";

// Vue 增加 init 方法
export function initMixin(Vue) {
  // 初始化操作
  Vue.prototype._init = function (options) {
    // 用户挂载到实例
    const vm = this;
    vm.$options = options;

    // 初始化状态
    initState(vm);

    // 挂载
    if (options.el) {
      vm.$mount(options.el);
    }
  };

  Vue.prototype.$mount = function (el) {
    const vm = this;
    el = document.querySelector(el);
    let ops = vm.$options;

    // 有没有 render 函数
    if (!ops.render) {
      let template;

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
        const render = compileToFunction(template);
        ops.render = render;
      }
    }

    // 组件挂载
    mountComponent(vm, el);
  };
}
