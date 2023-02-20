// with 函数实现字符串执行 js 表达式
function sss(str) {
  const a = {
    name: "张三",
    age: 99,
  };

  let c = `with (this) {
    console.log(${str})
    console.log(name)
    console.log(age)

    return ${str}
  }`;

  let render = new Function(c);

  render.call(a);

  return render;
}

sss('`name:${name}\n` + "age:" + age');
