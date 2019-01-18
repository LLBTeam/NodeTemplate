module.exports = {
  port: 9008,
  root: "dist",
  webpack: {
    publicPath: "/",
    output: {
      "./*html": {
        entry: "./src/main",
        commons: []
      }
    },
    commonTrunk: {
      common: [
        "vue",
        "manba",
      ]
    },
    //定义resolve，https://webpack.js.org/configuration/resolve/
    alias: {
      js: './src/js/',
      images: './src/images/',
      components: './src/components/',
    },

    //定义全局变量, https://webpack.js.org/plugins/provide-plugin
    global: {
      Utils: './src/js/common/utils',
      G: 'hey-global',
      R: './src/js/common/request',
    },

    //定义反向代理服务器，https://webpack.js.org/configuration/dev-server/#devserver-proxy
    devServer: {
      "proxy": {
        "/api": {
          target: "http://localhost:3000"
        }
      },
      historyApiFallback: true
    },
    //定义外部引用，https://webpack.js.org/configuration/externals/
    externals: {

    },
  },

  //未做关联引用的文件在build的时候复制到打包的文件夹中
  copy: [
    "./images/**/*",
  ]
};