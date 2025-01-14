const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8082, // 前端运行的端口
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // 后端地址
        changeOrigin: true, // 是否改变源
        pathRewrite: { '^/api': '/api' }, // 路径重写，保持路径不变
      },
    },
  },
});



