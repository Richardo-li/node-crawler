//该脚本是用来 配置请求路由的

const express = require("express"); //引入第三方模块
const handle = require("./handle"); //引入自定义模块

//创建路由对象
const router = express.Router();

router.get("/kvBg", handle.getKvBg); //获取王者荣耀官网背景图
router.post("/newsList", handle.getNewsList); //获取攻略列表
router.get("/heroList", handle.getHeroList); //获取英雄列表

module.exports = router;
