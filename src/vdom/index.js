const isReservedTag = (tag) => {
  return ['a','div','p','button','ul','li','span'].includes(tag)
}

// h() _c()
export function createElementVNode(vm, tag, data, ...children) {
  if (data === null) {
    data = {};
  }
  let key = data.key;
  if (key) {
    delete data.key;
  }
  
  if (isReservedTag(tag)) {
    return vnode(vm, tag, key, data, children);
  } else {
    let Ctor = vm.$options.components[tag]

    return createComponentVnode(vm, tag, key, data, children, Ctor)
  }
}

function createComponentVnode(vm, tag, key, data, children, Ctor) {
  if (typeof Ctor === 'object') {
    Ctor = vm.$options._base.extend(Ctor)
  }
  data.hook = {
    init(vnode) {
      let instance = vnode.componentInstance = new vnode.componentOptions.Ctor
      instance.$mount()
    }
  }

  return vnode(vm, tag, key, data, children,null, {Ctor})
}

// _v()
export function createTextVNode(vm, text) {
  return vnode(vm, undefined, undefined, undefined, undefined, text);
}

// 可增加自定义属性描述 dom
function vnode(vm, tag, key, data, children, text,componentOptions) {
  return {
    vm,
    tag,
    key,
    data,
    children,
    text,
    componentOptions
  };
}

export function isSameVnode(vnode1, vnode2) {
  return vnode1.tag === vnode2.tag && vnode1.key === vnode2.key;
}
