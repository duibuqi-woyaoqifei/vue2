import Dep, { popTarget, pushTarget } from "./dep";

let id = 0;

// 渲染根实例
class Watcher {
  constructor(vm, exprOrFn, options, cb) {
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

  addDep(dep) {
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.deps.push(dep);
      this.depsId.add(id);
      dep.addSub(this);
    }
  }
  evaluate() {
    this.value = this.get();
    this.dirty = false;
  }
  get() {
    // 静态属性只有一份
    pushTarget(this);

    // 会去 vm 上取值
    let value = this.getter.call(this.vm);

    // 渲染完毕清空
    popTarget();

    return value;
  }
  depend() {
    let i = this.deps.length;

    while (i--) {
      this.deps[i].depend();
    }
  }
  update() {
    if (this.lazy) {
      this.dirty = true;
    } else {
      queueWatcher(this);
    }

    // 重新渲染
    this.get();
  }
  run() {
    let oldValue = this.value;
    let newValue = this.get();

    if (this.user) {
      this.cb.call(this.vm, oldValue, newValue);
    }
  }
}

let queue = [];
let has = {};
let pending = false;
function flushSchedulerQueue() {
  let flushQueue = queue.slice(0);
  queue = [];
  has = {};
  pending = false;
  flushQueue.forEach((q) => q.run());
}
function queueWatcher(watcher) {
  const id = watcher.id;
  if (!has[id]) {
    queue.push(watcher);
    has[id] = true;

    if (!pending) {
      setTimeout(flushSchedulerQueue, 0);
      pending = true;
    }
  }
}

let callbacks = [];
let waiting = false;
function flushCallbacks() {
  waiting = true;
  let cbs = callbacks.slice(0);
  callbacks = [];
  cbs.forEach((cb) => cb());
}

let timerFunc;
if (Promise) {
  timerFunc = () => {
    Promise.resolve().then(flushCallbacks);
  };
} else if (MutationObserver) {
  let observer = new MutationObserver(flushCallbacks);
  let textNode = document.createTextNode(1);
  observer.observe(textNode, {
    characterData: true,
  });
  timerFunc = () => {
    textNode.textContent = 2;
  };
} else if (setImmediate) {
  timerFunc = () => {
    setImmediate(flushCallbacks);
  };
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks);
  };
}

export function nextTick(cb) {
  callbacks.push(cb);
  if (!waiting) {
    setTimeout(() => {
      timerFunc();
      waiting = true;
    }, 0);
  }
}

export default Watcher;
