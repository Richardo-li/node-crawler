const express = require('express');//引入第三方模块
const router=require('./router'); //引入自定义模块
const app = express();

//允许跨域   这个运行跨域的use要放在最前面
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
    res.header('Access-Control-Allow-Credentials','true');
    next();
});

// 添加请求路由
app.use(router);

app.listen(8888, () => {
    console.log('数据抓取成功！');
    console.log("http://127.0.0.1:8888");
})
 