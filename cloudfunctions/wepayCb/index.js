// 返回支付结果
const cloud = require('wx-server-sdk')
const envId = 'icloud-1-7g295fqh2b20801e'
cloud.init({env: envId})

const db = cloud.database()

exports.main = async (event, context) => {
  console.log('event',event)
  let {
    resultCode, //SUCCESS/FAIL
    outTradeNo,
    transactionId,  //微信订单号
  } = event

  let status = resultCode ==='SUCCESS' ? 1:2
  let params = {
    event,
    transactionId,
    status
  }
  
  await db.collection("order").where({
    outTradeNo: outTradeNo
  }).update({
    data: params
  });

  return {
    code: 0,
    msg: 'success'
  }
}