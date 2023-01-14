import { parseHTML } from "./parse";

function codeRoot(ast) {
  let code = `_c('${ast.tag}')`;

  return code;
}

export function compileToFunction(template) {
  // template 模板转化成 ast 语法树
  let ast = parseHTML(template);

  // 生成 render 方法返回虚拟 dom
  console.log(codeRoot(ast));
}
