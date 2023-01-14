// 重写数组部分方法

// 获取数组原型
let oldArrayProto = Array.prototype;

export let newArrayProto = Object.create(oldArrayProto);

let methods = ["push", "pop", "shift", "unshift", "sort", "splice", "reverse"];

methods.forEach((method) => {
  // 重写
  newArrayProto[method] = function (...args) {
    const result = oldArrayProto[method].call(this, ...args);

    // 新增数据劫持
    let inserted;
    let ob = this.__ob__;
    switch (method) {
      case "push":
        break;
      case "unshift":
        inserted = args;
        break;
      case "splice":
        break;
      default:
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    
    return result;
  };
});
