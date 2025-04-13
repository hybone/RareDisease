// miniprogram/pages/index/index.js
const db = wx.cloud.database()
var util=require('../../util/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{},          //存用户信息
      hasUserInfo:false,     //是否有用户信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if(this.data.hasUserInfo==true){
        const userInfo=wx.getStorageSync('userInfo');
        const hasUserInfo=wx.getStorageSync('hasUserInfo');
        this.setData({
          userInfo:userInfo,
          hasUserInfo:hasUserInfo
        })
    }
    this.loadUserInfo()
  },

  loadUserInfo(){
    wx.cloud.callFunction({   //页面载入时获取用户openid并保存
      name: 'getOpenID',
      complete: Res => {
        console.log('callFunction test result: ', Res.result.OPENID)
        const openid = Res.result.OPENID
        wx.setStorage({     //保存OPENID到Storage
            key:"openid",
            data:openid
        })
        // 若用户曾注册过，直接载入用户信息
        db.collection('user').where({_openid: openid}).get().then(res => {
          if(res.data.length > 0) {
            const userInfo = res.data[0]
            console.log(userInfo)
            this.setData({
              userInfo,
              hasUserInfo: true
            })
            wx.setStorage({
              key:"userInfo",
              data:userInfo
            })
            wx.setStorage({
              key:"hasUserInfo",
              data:true
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //刷新用户数据
    const userInfo = wx.getStorageSync('userInfo')
    const hasUserInfo = wx.getStorageSync('hasUserInfo')
    const identity = wx.getStorageSync('identity')
    this.setData({
      userInfo : userInfo,
      hasUserInfo : hasUserInfo,
      identity:identity
    })
  },

  jumpToDeepseek() {
    wx.navigateTo({
      url: "../chatBot/chatBot",
    })
  },

  jumpToPublishPre() {
    wx.navigateTo({
      url: "../news/news_publish_pre/news_publish_pre",
    })
  },

  jumpToLogin() {
    wx.navigateTo({
      url: '../calculator/calculator',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
})