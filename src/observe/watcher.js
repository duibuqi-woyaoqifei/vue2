import Dep from "./dep";

let id = 0;

// 渲染根实例
class Watcher {
  constructor(vm, fn,options) {
    this.id = id++;

    // 是一个渲染 watcher
    this.renderWatcher = options

    // getter 意味着调用这个函数可以发生取值操作
    this.getter = fn;

    this.deps = []
    this.depsId = new Set()
    this.get();
  }

  addDep(dep) {
    let id = dep.id
    if (!this.depsId.has(id)) {
      this.deps.push(dep)
      this.depsId.add(id)
      dep.addSub(this)
    }
  }
  get() {
    // 静态属性只有一份
    Dep.target = this
    
    // 会去 vm 上取值
    this.getter();

    // 渲染完毕清空
    Dep.target = null
  }
}

// 

export default Watcher;
