import { initMixin } from "./init";

// Vue 方法集合
function Vue(options) {
  this._init(options);
}

// 扩展 init 方法
initMixin(Vue);

export default Vue;
