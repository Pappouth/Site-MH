const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["quasar"],

  devServer: {
    proxy: "http://localhost:3000",
  },

  configureWebpack: {
    devtool: "source-map",
  },

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
});
