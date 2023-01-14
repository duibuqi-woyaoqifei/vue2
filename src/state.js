import { observe } from "./observe";

export function initState(vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData(vm);
  }
}
function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key];
    },
    set(newValue) {
      vm[target][key] = newValue;
    },
  });
}
function initData(vm) {
  // data 可能是函数和对象
  let data = vm.$options.data;

  data = typeof data === "function" ? data(vm) : data;

  vm._data = data;
  // 对数据进行劫持 defineProperty
  observe(data);

  // vm 代理 data 对象
  for (const key in data) {
    proxy(vm, "_data", key);
  }
}
