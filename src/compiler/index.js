import { parseHTML } from "./parse";

function rootProps(attrs) {
  // { name, value }
  let str = "";

  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    if (attr.name === "style") {
      let obj = {};
      attr.value.split(";").forEach((item) => {
        let [key, value] = item.split(":");
        if (key) {
          obj[key] = value;
        }
      });
      attr.value = obj;
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`;
  }

  return `{${str.slice(0, -1)}}`;
}

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // 匹配 {{ xxx }}
function root(node) {
  // 判断标签节点和文本
  if (node.type === 1) {
    return codeRoot(node);
  } else {
    let text = node.text;
    if (!defaultTagRE.test(text)) {
      return `_v(${JSON.stringify(text)})`;
    } else {
      let tokens = [];
      let match;
      defaultTagRE.lastIndex = 0;
      let lastIndex = 0;
      while ((match = defaultTagRE.exec(text))) {
        let index = match.index;

        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }
        tokens.push(`_s(${match[1]})`);

        lastIndex = index + match[0].length;
      }
      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
      }
      return `_v(${tokens.join("+")})`;
    }
  }
}
function rootChildren(children) {
  return children.map((child) => root(child)).join(",");
}

function codeRoot(ast) {
  let children = rootChildren(ast.children);
  let code = `_c('${ast.tag}',${ast.attrs.length > 0 ? rootProps(ast.attrs) : "null"}${ast.children.length ? `,${children}` : ""})`;

  return code;
}

export function compileToFunction(template) {
  // template 模板转化成 ast 语法树
  let ast = parseHTML(template);

  // 生成 render 方法返回虚拟 dom , with 函数 + new Function 实现模板引擎
  let code = codeRoot(ast);
  code = `with(this) { return ${code} }`;
  let render = new Function(code);

  return render
}
