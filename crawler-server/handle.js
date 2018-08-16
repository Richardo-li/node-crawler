//该脚本用来处理数据并返回
const Tool = require("./tool"); //自定义模块
const heroHomeUrl = "http://pvp.qq.com/";
const heroListUrl = "http://pvp.qq.com/web201605/herolist.shtml";

//获取背景图
module.exports.getKvBg = (req, res) => {
  Tool.superAgent({
    Url: heroHomeUrl,
    callback: $ => {
      //相当于jQuery的dom操作
      var str = $(".kv-bg").attr("style"); //获取背景图
      if (!str) {
        // str = $(".kv-bg").attr().style;
        return;
      }
      Tool.Success(res, str.substring(str.indexOf("(") + 1, str.indexOf(")")));
    }
  });
};

//获取攻略新闻list
module.exports.getNewsList = (req, res) => {
  //先得到前端传来的数据
  var param = "";
  req.on("data", chunk => {
    param += chunk;
  });
  req.on("end", () => {
    Tool.superAgent({
      Url: Tool.List(param),
      callback: $ => {
        let pageInfoArr = [];
        $(".pageinfo>strong").each((index, ele) => {
          pageInfoArr.push($(ele).text());
        });
        let listInfo = [];
        $(".list-detail>li").each((index, ele) => {
          let $li = $(ele);
          listInfo.push({
            href: $li.find("a").attr("href"),
            //官网做了图片懒加载，图片地址挂在data-original属性上
            imgSrc: $li.find("a>.pic>img").attr("data-original"),
            title: $li.find("a>.info>.tit").text(),
            content: $li.find("a>.info>.desc").text()
          });
        });
        Tool.Success(res, {
          allPage: pageInfoArr[0],
          total: pageInfoArr[1],
          data: listInfo
        });
      }
    });
  });
};

//获取英雄list
module.exports.getHeroList = (req, res) => {
  Tool.superAgent({
    Url: heroListUrl,
    charset: "gbk",
    callback: $ => {
      let arr = [];
      $(".herolist>li").each((i, ele) => {
        let $li = $(ele);
        arr.push({
          heroName: $li.find("a").text(),
          heroImg: $li.find("a>img").attr("src"),
          heroNum: $li
            .find("a")
            .attr("href")
            .match(/\d+/g)[0]
        });
      });

      Tool.Success(res, arr);
    }
  });
};
