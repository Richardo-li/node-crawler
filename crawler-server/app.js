const express = require("express"); //引入第三方模块
const router = require("./router"); //引入自定义模块
const cors = require("cors");
const app = express();

//允许跨域   这个运行跨域的use要放在最前面
app.use(cors());

// 添加请求路由
app.use(router);

app.listen(8888, () => {
  console.log("success!");
});
