const {
    override,
    addWebpackAlias,
  } = require("customize-cra");
  const path = require('path');
  
  module.exports = override(
    // 扩展@指令符号
    addWebpackAlias({
      "@": path.resolve(__dirname, "src/*"),
    }),
  );