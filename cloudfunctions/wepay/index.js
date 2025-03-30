// 云函数入口文件
const cloud = require('wx-server-sdk')

const mch_id = '1695215178' // 商户号（收款号)
const envId = 'icloud-1-7g295fqh2b20801e'
cloud.init({env: envId})

// 数据库服务
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openid = wxContext.OPENID

  let { totalFee, sponsor } = event

  let body = '支付订单费用'
  let nonceStr = Math.random().toString(36).substr(2,13)  // 32位以内的随机字符串，此处是11位
  console.log('nonceStr:',nonceStr)
  let timeStamp = (Date.now() / 1000).toFixed(0).toString();
  console.log('timeStamp:',timeStamp)
  let outTradeNo = 'pay' + timeStamp + nonceStr // 商户订单号，32位以内的唯一字符串，此处是25位
  let tradeType = 'JSAPI' // 交易类型，小程序取值如下：JSAPI

  //生成预支付交易单
  const result = await cloud.cloudPay.unifiedOrder({
    body,
    nonceStr,
    tradeType,
    outTradeNo,
    spbillCreateIp: '127.0.0.1', // 调用微信支付API的机器IP
    subMchId: mch_id,
    totalFee, // 订单金额（单位：分），必须为整数
    envId: envId,
    functionName: 'wepayCb' // 接收微信支付异步通知回调的云函数名
  })

  db.collection("order").add({
    data:{
      _openid: openid,
      body,
      outTradeNo,
      totalFee,
      sponsor,
      status: 0,
      createTime: formatDateTime(new Date(Date.now() + (8 * 60 * 60 * 1000)))
    }
  });

  return result
}

function formatLeadingZeroNumber(n, digitNum = 2) {
  n = n.toString()
  const needNum = Math.max(digitNum - n.length, 0)
  return new Array(needNum).fill(0).join('') + n
}

function formatDateTime(date, withMs = false) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const ms = date.getMilliseconds()

  let ret = [year, month, day].map(value => formatLeadingZeroNumber(value, 2)).join('-') +
    ' ' + [hour, minute, second].map(value => formatLeadingZeroNumber(value, 2)).join(':')
  if (withMs) {
    ret += '.' + formatLeadingZeroNumber(ms, 3)
  }
  return ret
}