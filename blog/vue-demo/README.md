npm init
npm install
    "devDependencies": {
      "babel-core": "^6.26.3",
      "babel-loader": "^7.1.4",
      "babel-plugin-transform-runtime": "^6.23.0",
      "babel-preset-es2015": "^6.24.1",
      "babel-runtime": "^6.26.0",
      "vue": "^2.5.16",
      "vue-router": "^3.0.1",
      "vuex": "^3.0.1",
      "webpack": "^2.2.0"
    }

1. 2018/7/1
    问题：
        1）vue-loader 最新版本问题  换成@9.9.0
        2）webpack-dev-server 最新版本问题  换成@2.5.0
        3）webpack-dev-server 无法热更新  待解决
        4) extract-text-webpack-plugin 最新版本报错  换成@2.1.2
        5) webpack 命令不执行  需要全局安装webpack

    新知识：
        1）process.env.NODE_ENV === 'production'  控制环境变量 NODE_NEV ，判断 开发环境 还是 生产环境
