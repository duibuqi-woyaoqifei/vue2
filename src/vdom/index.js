// h() _c()
export function createElementVNode(vm, tag, data, ...children) {
  if (data === null) {
    data = {};
  }
  let key = data.key;
  if (key) {
    delete data.key;
  }
  return vnode(vm, tag, key, data, children);
}

// _v()
export function createTextVNode(vm, text) {
  return vnode(vm, undefined, undefined, undefined, undefined, text);
}

// 可增加自定义属性描述 dom
function vnode(vm, tag, key, data, children, text) {
  return {
    vm,
    tag,
    key,
    data,
    children,
    text,
  };
}
