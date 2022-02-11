# react_hkzf
create-react-app支持less
1.安装 npm i @craco/craco
2.修改packpage.json文件
----"scripts": {
    -    "start": "react-scripts start",
    -    "build": "react-scripts build",
    -    "test": "react-scripts test",
    +    "start": "craco start",
    +    "build": "craco build",
    +    "test": "craco test",
         "eject": "react-scripts eject"
    },
3.安装 less less-loader  强制安装craco-less npm i -S craco-less --force
4.项目根目录下 添加craco.config.ts