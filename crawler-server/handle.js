//该脚本用来处理数据并返回
const Tool = require("./tool"); //自定义模块

//获取王者荣耀背景图
module.exports.getKvBg = (req, res) => {
  Tool.superAgent({
    Url: Tool.heroHomeUrl,
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

//获取jq22背景图
module.exports.getJq22Bg = (req, res) => {
  Tool.Success(res, Tool.jq22Url());
}

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
            detailInfo: {
              date: $li.find("a").attr("href").match(/\d+/g)[1],
              num: $li.find("a").attr("href").match(/\d+/g)[2]
            },
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

//获取攻略新闻详情
module.exports.getNewsListDetail = (req, res) => {
  //先得到前端传来的数据
  var param = "";
  req.on("data", chunk => {
    param += chunk;
  });
  req.on("end", () => {
    param = JSON.parse(param)
    Tool.superAgent({
      Url: Tool.ListDetail(param.date, param.num),
      callback: $ => {
        let $html = $('.arc-body').html();
        // Node.js爬虫抓取数据 -- HTML 实体编码处理办法   https://www.cnblogs.com/imwtr/p/4614297.html 
        $html = unescape($html.replace(/\\u/g, "%u"));
        $html = $html.replace(/&#(x)?(\w+);/g, function ($, $1, $2) {
          return String.fromCharCode(parseInt($2, $1 ? 16 : 10));
        });
        // console.log($html);
        Tool.Success(res, $html);
      }
    });
  });
};

//获取英雄list
module.exports.getHeroList = (req, res) => {
  Tool.superAgent({
    Url: Tool.heroListUrl,
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

        //获取背景图
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

        //获取英雄故事
        // Node.js爬虫抓取数据 -- HTML 实体编码处理办法   https://www.cnblogs.com/imwtr/p/4614297.html 
        var $history = $(" .pop-bd>p").html();
        $history = unescape($history.replace(/\\u/g, "%u"));
        $history = $history.replace(/&#(x)?(\w+);/g, function ($, $1, $2) {
          return String.fromCharCode(parseInt($2, $1 ? 16 : 10));
        });


        Tool.Success(res, {
          heroName: $(".cover-name").text(), //英雄名字
          heroHistory: $history,  //英雄故事
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
