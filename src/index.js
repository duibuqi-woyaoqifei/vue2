import { initGlobalAPI } from "./globalAPI";
import { initMixin } from "./init";
import { initLifeCycle } from "./lifecycle";
import { nextTick } from "./observe/watcher";

// Vue 方法集合
function Vue(options) {
  this._init(options);
}

Vue.prototype.$nextTick = nextTick;
// 扩展 init 方法
initMixin(Vue);
initLifeCycle(Vue);
initGlobalAPI(Vue)


export default Vue;
