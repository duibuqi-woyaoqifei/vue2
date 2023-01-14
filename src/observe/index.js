import { newArrayProto } from "./array";

class Observer {
  constructor(data) {
    // 数据添加 __ob__ 标识
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable:false  // 循环时不可枚举
    })

    if (Array.isArray(data)) {
      // 重写js数组方法
      data.__proto__ = newArrayProto;

      this.observeArray(data);
    } else {
      this.walk(data);
    }
  }

  // 循环对象，对属性依次劫持
  walk(data) {
    // 重新定义属性
    Object.keys(data).forEach((key) => defineReactive(data, key, data[key]));
  }
  observeArray(data) {
    data.forEach((item) => observe(item));
  }
}
export function defineReactive(target, key, value) {
  // 对所有对象都进行属性劫持
  observe(value);

  Object.defineProperty(target, key, {
    // 读取执行 get
    get() {
      return value;
    },

    // 修改执行 set
    set(newValue) {
      if (newValue === value) return;
      observe(newValue);
      value = newValue;
    },
  });
}

export function observe(data) {
  // 只劫持对象
  if (typeof data !== "object" || data == null) {
    return;
  }

  // 是否已劫持
  return new Observer(data);
}
