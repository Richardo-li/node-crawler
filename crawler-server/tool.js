/*  工具类脚本  */
const cheerio = require('cheerio'); //引入第三方模块
const superagent = require('superagent'); //引入第三方模块


/**
 * 约定返回给前端的格式：
 *   {
 *     code: '1' || '0',       //返回1为正确，返回0为错误  
 *     result: {    
 *         data:  //处理后的数据   
 *     }  
 *   }
 */
module.exports.Success = (res, sData) => {
  res.end(JSON.stringify({
    code: '1',
    result: {
      data: sData
    }
  }))
}



/**
 *  params.Url 请求地址
 *  params.callback() 回调函数
 */
module.exports.superAgent = (params = {}) => {
  superagent.get(params.Url).end((err, sres) => {
    if (err) return next(err);
    var $ = cheerio.load(sres.text);
    params.callback($);  //回调
  })
}



/**
 *   攻略信息根据 index翻页
 */
module.exports.List = (index) => {
  return `http://www.18183.com/yxzjol/gonglue/list_13161_${index}.html`;
}




