// 云函数入口文件
const cloud = require('wx-server-sdk')
//const requestpromise = require('request-promise');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
// 云函数入口函数
exports.main = async (event, context) => {
  console.log("上传的cloudID", event.cloudID)
  const res = await cloud.getOpenData({
    list:[event.cloudID]
  })
  return res
}