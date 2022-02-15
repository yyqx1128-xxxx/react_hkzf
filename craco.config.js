const CracoLessPlugin = require("craco-less");
// TODO:别名配置
// const path = require("path");

// const reslove = (dir) => path.resolve(__dirname, dir);

module.exports = {
  // webpack: {
  //   alias: {
  //     "@": reslove("src/*"),
  //   },
  // },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
