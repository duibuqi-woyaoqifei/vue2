import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
export default {
  input: "./src/index.js",
  output: {
    file: "./dist/vue.js",
    name: "Vue",
    format: "umd",
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
  ],
};

/*
export default {
  input  # 入口
  output: {                   
    file  # 出口
    name  # global.Vue
    format  # esm es6模块 commonjs模块 iife自执行函数 umd
    sourcemap  # 可否调试源码
  },
  plugins: [
    babel({
      exclude: "node_modules/**",  # 排除node_modules下的所有文件
    }),
  ],
}
*/
