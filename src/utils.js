const strats = {};
const LIFECYCLE = ["beforeCreate", "created"];
LIFECYCLE.forEach((hook) => {
  strats[hook] = function (p, c) {
    if (c) {
      if (p) {
        return p.concat(c);
      } else {
        return [c];
      }
    } else {
      return p;
    }
  };
});
strats.data = function (p, c) {
  if (!c) {
    return p;
  } else if (!p) {
    return c;
  } else {
    return { ...p, ...c };
  }
};
strats.computed = function (p, c) {
  if (!c) {
    return p;
  } else if (!p) {
    return c;
  } else {
    return { ...p, ...c };
  }
};
strats.watch = function (p, c) {
  if (!c) {
    return p;
  } else if (!p) {
    return c;
  } else {
    return { ...p, ...c };
  }
};
strats.components = function (parentVal, childVal) {
  const res = Object.create(parentVal);

  if (childVal) {
    for (let key in childVal) {
      res[key] = childVal[key];
    }
  }

  return res;
};
export function mergeOptions(parent, child) {
  const options = { ...parent, ...child };

  for (let key in parent) {
    mergeField(key);
  }

  for (let key in child) {
    if (!parent.hasOwnProperty(key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    if (strats[key]) {
      options[key] = strats[key](parent[key], child[key]);
    } else {
      // 如果 child 中没有该选项，则使用 parent 中的选项
      options[key] = child[key] || parent[key];
    }
  }

  return options;
}
