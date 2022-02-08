webpack

# 安装和使用

1. webpack 使用模块化机制来查看分析各个模块文件的依赖，将依赖都打包或压缩。对于 es moudle,commonjs 模块等都可以兼容处理。

2. webpack 运行在 node 环境

3. webpack 将多个 js 模块打包成一个 js，可以减少浏览器中对于 js 的请求。

4. 通过`--mode`来指定 webpack 运行的环境

# 核心功能

1. 模块化兼容性

对于 es module 和 commonjs 都可以兼容

2. 编译结果

```js
(function (modules) {
  var installedModules = {};

  function _require(moduleId) {
    if (installedModules[moduleId]) {
      // 检查是否有缓存
      return installedModules[moduleId];
    }

    var func = modules[moduleId]; // 得到该模块运行的函数

    var module = {
      exports: {},
    };

    func(module, module.exports, _require); // 运行模块

    var result = module.exports; // 得到模块的导出结果

    installedModules[moduleId] = result;

    return result;
  }

  _require("./src/index.js"); // require函数相当于运行一个模块，得到模块的导出结果；
})({
  "./src/a.js": function (module, exports) {
    const a = 10;
    module.exports = a;
  },
  "./src/index.js": function (module, exports, require) {
    var a = require("./src/a.js");
    console.log(a);
  },
});
```

3. 配置文件

**_面试题_**

问： webpack 不是支持多模块化吗？为什么在配置文件里，只能使用`module.exports`

答：webpack 打包只能在 node 环境，打包过程中读取/运行配置文件内容，必须使用 commonjs。打包过程中不会运行我们的代码，所以我们的代码用什么模块化都可以兼容。

---

webpack 提供的 cli 支持很多的参数，例如`--mode`，但更多的时候，我们会使用更加灵活的配置文件来控制 webpack 的行为

默认情况下，webpack 会读取`webpack.config.js`文件作为配置文件，但也可以通过 CLI 参数`--config`来指定某个配置文件

配置文件中通过 CommonJS 模块导出一个对象，对象中的各种属性对应不同的 webpack 配置

**注意：配置文件中的代码，必须是有效的 node 代码**

当命令行参数与配置文件中的配置出现冲突时，以命令行参数为准。

**基本配置：**

1. mode：编译模式，字符串，取值为 development 或 production，指定编译结果代码运行的环境，会影响 webpack 对编译结果代码格式的处理
2. entry：入口，字符串，指定入口文件
3. output：出口，对象，指定编译结果文件

# 性能优化

1. 概述

- 构建性能。从代码打包开始，到代码渲染到页面上。
- 传输性能。打包后的 js 代码传输到浏览器经过的时间。
  - 总传输量。所有需要传输的 js 文件内容，就是从传输量，重复代码越少，总传输量越少。
  - 文件数量。当访问页面时，需要传输的 js 文件数量，数量越多，http 请求越少，响应速度越快。
  - 浏览器缓存。
- 运行性能。

2. 减少模块解析

模块解析：包括抽象语法树解析、依赖解析、替换依赖函数。

> 问：哪些模块不需要解析？
> 答：没有依赖的模块，一些已经打包好的第三方库，如 jquery。

3. 优化 loader 性能

- 缩小 loader 的应用范围。有的文件不需要 loader，如 lodash 本来就是在 es5 之前写的，不需要用 babel-loader 去转化。
- 缓存 loader 的结果。
- 为 loader 的运行开启多线程。`thread-loader`。开启和管理线程需要消耗时间，小项目不建议使用。

4. 热替换
   热替换不能降低构建时间，但可以降低代码改动到到效果呈现的时间。代码变动，重新打包后，浏览器仅请求改动的资源（而不是重新请求所有资源），再执行代码，
