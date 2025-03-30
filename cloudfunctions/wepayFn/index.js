const cloud = require('wx-server-sdk')

const mch_id = '1695215178' // 商户号（收款号)
const envId = 'icloud-1-7g295fqh2b20801e'
cloud.init({env: envId})

// 云函数入口函数
exports.main = async (event, context) => {
  let nonceStr = Math.random().toString(36).substr(2,13) // 32位以内的随机字符串，此处是11位

  const result = await cloud.cloudPay.queryOrder({
    nonceStr,
    outTradeNo:event.outTradeNo,   //某个订单号
    sub_mch_id : mch_id,
  })

  // result.tradeState:
  // SUCCESS-支付成功
  // REFUND-转入退款
  // NOTPAY-未支付
  // CLOSED-已关闭
  // REVOKED-已撤销（刷卡支付）
  // USERPAYING-用户支付中
  // PAYERROR-支付失败

  return result
}