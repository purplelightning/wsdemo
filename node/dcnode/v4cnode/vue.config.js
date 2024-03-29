const path = require('path');

// 拼接路径
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/apps/frontend/' : '/',  //基本路径
  outputDir: 'dist', //构建时的输出目录
  assetsDir: 'static',//放置静态资源的目录
  indexPath: 'index.html',//html 的输出路径
  filenameHashing: true,//文件名哈希值
  lintOnSave: true,//是否在保存的时候使用 `eslint-loader` 进行检查。

  //组件是如何被渲染到页面中的？ （ast：抽象语法树；vDom：虚拟DOM）template ---> ast ---> render ---> vDom ---> 真实的Dom ---> 页面
  //runtime-only：将template在打包的时候，就已经编译为render函数runtime-compiler：在运行的时候才去编译template
  runtimeCompiler: true,//热更新

  transpileDependencies: [],//babel-loader 默认会跳过 node_modules 依赖。
  productionSourceMap: false,//是否为生产环境构建生成 source map？

  //调整内部的 webpack 配置
  configureWebpack: () => { },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('requests', resolve('src/requests'))
  },

  // 配置 webpack-dev-server 行为。
  devServer: {
    open: true, //编译后默认打开浏览器
    host: '0.0.0.0',  //域名
    port: 8888,  // 端口
    https: false,  //是否https
    //显示警告和错误
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/user': {
        target: 'http://118.31.246.131:2009/',
        changeOrigin: true, //是否跨域
        ws: false, //是否支持websocket
        secure: false, //如果是https接口，需要配置这个参数
        pathRewrite: {
          '^/user': ''
        }
      }
    }
  },
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    // extract: true, 热更新时这行注释掉，打包时取消注释
    // 是否开启 CSS source map？
    sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给 Css-loader 时，使用 `{ Css: { ... } }`。
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
        
      }
    },
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false

  },
  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,
  // PWA 插件的选项。查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
  pwa: {},
  // 三方插件的选项
  pluginOptions: {
    // ...
  }
}