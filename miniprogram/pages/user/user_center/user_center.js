// pages/user/user.js

const db = wx.cloud.database()

Page({
  data: {
    hasUserInfo: false,		//用于判断storage中是否已经有用户信息
    userInfo:{}, 		//用户信息
  },

  onLoad: function () {
    if(this.data.hasUserInfo==true){    //更新用户数据
      const userInfo=wx.getStorageSync('userInfo');
      const hasUserInfo=wx.getStorageSync('hasUserInfo');
      this.setData({
        userInfo:userInfo,
        hasUserInfo:hasUserInfo,
      })
    }
  },

  onShow: function () {
    const userInfo=wx.getStorageSync('userInfo');
    const hasUserInfo=wx.getStorageSync('hasUserInfo');
    console.log(userInfo)
    this.setData({
      userInfo,
      hasUserInfo
    })
    this.onLoad()
  },

  toLogin: function (event) {
    // 跳转到目标页面
    wx.navigateTo({
      url: '../login_pre/login_pre' // 目标页面的路径
    })
  }
})