/*  工具类脚本  */
const cheerio = require("cheerio"); //引入第三方模块
const superagent = require("superagent"); //引入第三方模块
const charset = require("superagent-charset"); //引入第三方模块
charset(superagent); //设置字符

/**
 * 约定返回给前端的格式：
 *   {
 *     code: '1' || '0',       //返回1为正确，返回0为错误
 *     result: {
 *         data:  //处理后的数据
 *     }
 *   }
 */
module.exports.Success = (res, sData) => {  //成功的回调
  res.end(
    JSON.stringify({
      code: "1",
      result: {
        data: sData
      }
    })
  );
};
module.exports.False = (res) => {  //失败的回调
  res.end(
    JSON.stringify({
      code: "0",
      result: {
        data: null
      }
    })
  );
};

/**
 *  params.Url 请求地址
 *  params.callback() 回调函数
 *  params.charset   设置编码格式
 */
module.exports.superAgent = (params = {}) => {
  superagent
    .get(params.Url)
    .charset(params.charset) //设置编码格式
    .end((err, sres) => {
      if (err) return next(err);
      var $ = cheerio.load(sres.text,{ ignoreWhitespace: true, xmlMode: true, lowerCaseTags: true});
      params.callback($); //回调
    });
};

/**
 *   攻略信息根据 index翻页
 */
module.exports.List = index => {
  return `http://www.18183.com/yxzjol/gonglue/list_13161_${index}.html`;
};

/**
 *   英雄详情
 */
module.exports.heroDetailUrl = id => {
  return `http://pvp.qq.com/web201605/herodetail/${id}.shtml`;
};
