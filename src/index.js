import { initGlobalAPI } from "./globalAPI";
import { initMixin } from "./init";
import { initLifeCycle } from "./lifecycle";
import { initStateMixin } from "./state";

// Vue 方法集合
function Vue(options) {
  this._init(options);
}

// 扩展 init 方法
initMixin(Vue);
initLifeCycle(Vue);
initGlobalAPI(Vue);
initStateMixin(Vue);

export default Vue;
