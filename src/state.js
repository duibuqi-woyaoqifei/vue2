import { observe } from "./observe";
import Dep from "./observe/dep";
import Watcher, { nextTick } from "./observe/watcher";

export function initState(vm) {
  const opts = vm.$options;
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
  let watch = vm.$options.watch;
  for (let key in watch) {
    const handler = watch[key];

    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
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

function initComputed(vm) {
  const computed = vm.$options.computed;
  const watchers = (vm._computedWatchers = {});

  for (let key in computed) {
    let userDef = computed[key];

    let fn = typeof userDef === "function" ? userDef : userDef.get;
    watchers[key] = new Watcher(vm, fn, { lazy: true });

    defineComputed(vm, key, userDef);
  }
}
function defineComputed(target, key, userDef) {
  const getter = typeof userDef === "function" ? userDef : userDef.get;
  const setter = userDef.set || (() => {});

  Object.defineProperty(target, key, {
    get: createComputedGetter(key),
    set: setter,
  });
}

function createComputedGetter(key) {
  return function () {
    const watcher = this._computedWatchers[key];
    if (watcher.dirty) {
      watcher.evaluate();
    }
    if (Dep.target) {
      watcher.depend();
    }
    return watcher.value;
  };
}

export function initStateMixin(Vue) {
  Vue.prototype.$nextTick = nextTick;
  Vue.prototype.$watch = function (exprOrFn, cb, options = {}) {
    new Watcher(this, exprOrFn, { user: true }, cb);
  };
}
