let id = 0;
class Dep {
  constructor() {
    // 属性的 dep 要收集 watcher
    this.id = id++;

    // 存放当前属性对应的 watcher 有哪些
    this.subs = [];
  }
  depend() {
    Dep.target.addDep(this);
  }
  addSub(watcher) {
    this.subs.push(watcher);
  }
  notify() {
    this.subs.forEach((watcher) => watcher.update());
  }
}
Dep.target = null;
let stack = []
export function pushTarget(watcher) {
  stack.push(watcher)
  Dep.target = watcher
}
export function popTarget() {
  stack.pop()
  Dep.target = stack[stack.length - 1]
}

export default Dep;
