import { isSameVnode } from ".";

function createComponent(vnode) {
  let i = vnode.data
  if ((i = i.hook) && (i = i.init)) {
    i(vnode)
  }

  if (vnode.componentInstance) {
    return true
  }
}

export function createElm(vnode) {
  let { tag, data, children, text } = vnode;
  if (typeof tag === "string") {

    if (createComponent(vnode)) {
      return vnode.componentInstance.$el
    }

    vnode.el = document.createElement(tag);
    patchProps(vnode.el, {}, data);
    children.forEach((child) => {
      vnode.el.appendChild(createElm(child));
    });
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

export function patchProps(el, oldProps = {}, props = {}) {
  // 删除
  let oldStyles = oldProps.style;
  let newStyles = props.style;

  for (let key in oldStyles) {
    if (newStyles) {
      if (!newStyles[key]) {
        el.style[key] = "";
      }
    }
  }

  for (let key in oldProps) {
    if (!props[key]) {
      el.removeAttribute(key);
    }
  }

  for (let key in props) {
    if (key === "style") {
      for (let styleName in props.style) {
        el.style[styleName] = props.style[styleName];
      }
    } else {
      el.setAttribute(key, props[key]);
    }
  }
}

export function patch(oldVnode, vnode) {
  if (!oldVnode) {
    return createElm(vnode)
  }

  const isRealElement = oldVnode.nodeType;
  if (isRealElement) {
    // 获取真实元素
    const elm = oldVnode;

    // 获取父元素
    const parentElm = elm.parentNode;
    let newElm = createElm(vnode);

    // 插入新节点
    parentElm.insertBefore(newElm, elm.nextSibling);

    // 删除旧节点
    parentElm.removeChild(elm);

    return newElm;
  } else {
    // diff 算法
    return patchVnode(oldVnode, vnode);
  }
}

function patchVnode(oldVnode, vnode) {
  if (!isSameVnode(oldVnode, vnode)) {
    let el = createElm(vnode);
    oldVnode.el.parentNode.replaceChild(el, oldVnode.el);
    return el;
  }

  let el = (vnode.el = oldVnode.el);
  if (!oldVnode.tag) {
    if (oldVnode.text !== vnode.text) {
      el.textContent = vnode.text;
    }
  }

  patchProps(el, oldVnode.data, vnode.data);

  let oldChildren = oldVnode.children || [];
  let newChildren = vnode.children || [];

  if (oldChildren.length > 0 && newChildren.length > 0) {
    updateChildren(el, oldChildren, newChildren);
  } else if (newChildren.length > 0) {
    mountChildren(el, newChildren);
  } else {
    el.innerHTML = "";
  }

  return el;
}

function mountChildren(el, newChildren) {
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    el.appendChild(createElm(child));
  }
}
function updateChildren(el, oldChildren, newChildren) {
  let oldStartIndex = 0;
  let newStartIndex = 0;
  let oldEndIndex = oldChildren.length - 1;
  let newEndIndex = newChildren.length - 1;

  let oldStartVnode = oldChildren[0];
  let newStartVnode = newChildren[0];

  let oldEndVnode = oldChildren[oldEndIndex];
  let newEndVnode = newChildren[newEndIndex];

  function makeIndexByKey(children) {
    let map = {};

    children.forEach((child, index) => {
      map[child.key] = index;
    });
    return map;
  }

  let map = makeIndexByKey(oldChildren);

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    // 指针
    if (!oldStartVnode) {
      oldStartVnode = oldChildren[++oldStartIndex];
    } else if (!oldEndVnode) {
      oldEndVnode = oldChildren[--oldEndIndex];
    } else if (isSameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldChildren[++oldStartIndex];
      newStartVnode = newChildren[++newStartIndex];
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldChildren[--oldEndIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode);
      el.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
      oldStartVnode = oldChildren[++oldStartIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else if (isSameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode);
      el.insertBefore(oldEndVnode.el, oldStartVnode.el);
      oldEndVnode = oldChildren[--oldEndIndex];
      newStartVnode = newChildren[++newStartIndex];
    } else {
      // 乱序比对
      let moveIndex = map[newStartVnode.key];
      if (moveIndex !== undefined) {
        let moveVnode = oldChildren[moveIndex];
        el.insertBefore(moveVnode.el, oldStartVnode.el);
        oldChildren[moveIndex] = undefined;
        patchVnode(moveVnode, newStartVnode);
      } else {
        el.insertBefore(createElm(newStartVnode), oldStartVnode.el);
      }

      newStartVnode = newChildren[++newStartIndex];
    }
  }
  if (newStartIndex <= newEndIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      let childEl = createElm(newChildren[i]);

      let anchor = newChildren[newEndIndex + 1] ? newChildren[newEndIndex + 1].el : null;
      el.insertBefore(childEl, anchor);
    }
  }
  if (oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      if (oldChildren[i]) {
        let childEl = oldChildren[i].el;
        el.removeChild(childEl);
      }
    }
  }
}
