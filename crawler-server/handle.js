//该脚本用来处理数据并返回
const Tool = require('./tool')  //自定义模块
const heroHomeUrl = 'http://pvp.qq.com/';

// module.exports.getData = (req, res) => {
//   superagent.get('http://news.baidu.com/')//请求页面地址
//     .end(function (err, sres) {//页面获取到的数据
//       if (err) return next(err);
//       var $ = cheerio.load(sres.text);//用cheerio解析页面数据
//       var arr = [];
//       $(".ulist.focuslistnews").each(function (index, ele) {//下面类似于jquery的操作，前端的小伙伴们肯定很熟悉啦
//         var $eleItem = $(ele).find('.bold-item a');
//         var $eleItemSon = $(ele).find('.bold-item ~ li a')
//         arr.push(
//           {
//             title: $eleItem.text(),
//             href: $eleItem.attr('href'),
//             item: {
//               title: $eleItemSon.text(),
//               href: $eleItemSon.attr('href')
//             }
//           }
//         );
//       });
//       res.end(JSON.stringify(arr));  //输出接口
//     })
// }

//获取背景图
module.exports.getKvBg = (req, res) => {
  Tool.superAgent({
    Url: heroHomeUrl,
    callback: ($) => {
      //相当于jQuery的dom操作
      var str = $('.kv-bg').attr('style'); //获取背景图
      Tool.Success(res, str.substring(str.indexOf("(") + 1, str.indexOf(")")));
    }
  })
}
 
//获取攻略新闻list
module.exports.getNewsList = (req, res) => {
  //先得到前端传来的数据
  var param = '';
  req.on('data', (chunk) => {
    param += chunk;
  })
  req.on('end', () => {
    Tool.superAgent({
      Url: Tool.List(param),
      callback: ($) => {
        let pageInfoArr = [];
        $('.pageinfo>strong').each((index, ele) => {
          pageInfoArr.push($(ele).text());
        })
        let listInfo = [];
        $('.list-detail>li').each((index, ele) => {
          let $li = $(ele);
          listInfo.push({
            href: $li.find('a').attr('href'),
            //官网做了图片懒加载，图片地址挂在data-original属性上
            imgSrc: $li.find('a>.pic>img').attr('data-original'),
            title: $li.find('a>.info>.tit').text(),
            content: $li.find('a>.info>.desc').text(),
          })
        })
        Tool.Success(res, {
          allPage: pageInfoArr[0],
          total: pageInfoArr[1],
          data: listInfo
        });
      }
    })
  })
}







