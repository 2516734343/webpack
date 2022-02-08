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
