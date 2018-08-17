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
        Tool.False(res);
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
            .match(/\d+/g)[0] //截取数字
        });
      });
      Tool.Success(res, arr);
    }
  });
};

//获取英雄详情
module.exports.getHeroDetail = (req, res) => {
  //先得到前端传来的数据
  var param = "";
  req.on("data", chunk => {
    param += chunk;
  });
  req.on("end", () => {
    Tool.superAgent({
      Url: Tool.heroDetailUrl(param),
      callback: $ => {
        //可以查看网页源代码  倒数第三行 <script src="//pvp.qq.com/web201706/herodetail/cssjs/page.js"></script>
        //点击进去查看js代码，搜索 pic-pf-list  你会发现他是根据 自定义属性 data-imgname 来分割展示背景的
        // console.log($(".pic-pf-list").attr("data-imgname"));
        let skinlist = $(".pic-pf-list").attr("data-imgname");
        allname = skinlist.split("|");
        var getBgArr = [];
        allname.forEach((item, i) => {
          getBgArr.push({
            nickName: item,
            bigBG: `//game.gtimg.cn/images/yxzj/img201606/skin/hero-info/${param}/${param}-bigskin-${i +
              1}.jpg`,
            smallImg: `//game.gtimg.cn/images/yxzj/img201606/heroimg/${param}/${param}-smallskin-${i +
              1}.jpg`
          });
        });


        //获取英雄属性
        let arr = [];
        $(".cover-list>li").each((i, ele) => {
          let $li = $(ele);
          arr.push({
            title: $li.find(".cover-list-text").text(),
            percent: $li
              .find(".ibar")
              .attr("style")
              .match(/\d+/g)[0]
          });
        });

        Tool.Success(res, {
          heroName: $(".cover-name").text(), //英雄名字
          heroHistory: $("#hero-story>.pop-bd").text(),
          classify: {
            class: $(".herodetail-sort>i").attr("class"),
            img: "//game.gtimg.cn/images/yxzj/web201605/page/hero-sort.png" //这是一张所有职业的图片，前端根据class判断，然后用精灵图展示
          }, //英雄分类 -- 职业
          heroBgData: getBgArr, //背景图+小头像+皮肤标题
          data: arr //英雄各属性值
        });
      }
    });
  });
};
