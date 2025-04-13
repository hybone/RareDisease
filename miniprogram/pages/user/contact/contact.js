// pages/orders_detail/orders_detail.jsimport Vue from 'vue';

import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
import Notify from '@vant/weapp/notify/notify';
const db = wx.cloud.database()
var util=require('../../../util/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mySide: {},  // 本人
    theySide: {},  // 对方
    messageList: [],
    message: "",  // 输入的消息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that=this;

    // 获取本人用户信息
    const openid=wx.getStorageSync('openid')
    db.collection('user').where({'_openid':openid}).get({
      success:function(res){
        that.setData({
          mySide:res.data[0]
        })
      }
    })

    // 获取对方用户信息
    const theySideOpenid=wx.getStorageSync('user_detail_openid')
    db.collection('user').doc(theySideOpenid).get({
      success:function(res){
        console.log(res.data)
        that.setData({
          theySide:res.data
        })
      }
    })

    // 获取消息
    const _ = db.command
    db.collection('message').where(
      _.or([
        _.and([
          { sender: this.data.mySide._openid },
          { receiver: this.data.theySide._openid }
        ]),
        _.and([
          { sender: this.data.theySide._openid },
          { receiver: this.data.mySide._openid }
        ])
      ])
    ).get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          messageList: res.data
        })
      }
    })
  },

  // 刷新评论
  refreshMessage() {
    const that=this;
    const _ = db.command
    db.collection('message').where(
      _.or([
        _.and([
          { sender: this.data.mySide._openid },
          { receiver: this.data.theySide._openid }
        ]),
        _.and([
          { sender: this.data.theySide._openid },
          { receiver: this.data.mySide._openid }
        ])
      ])
    ).get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          messageList: res.data
        })
      }
    })
  },

  onMessageChange(e) {
    this.setData({
      message: e.detail,
    });
  },

  // 添加评论
  addMessage() {
    console.log(this.data.message)
    if(this.data.message == '') {
      Notify({ type: 'danger', duration:1000, message: '空白内容'})
      return
    }
    var timenow=util.formatDateTime(new Date())
    var time=Date.now()
    const that = this
    const _ = db.command;
    db.collection('message').add({
      // data 字段表示需新增的 JSON 数据
      data: {
          content: this.data.message,
          sender: this.data.mySide._openid,
          senderInfo: this.data.mySide,
          receiver: this.data.theySide._openid,
          receiverInfo: this.data.theySide,
          publish_time:timenow,
          publish_time_mm:time
      },
      success: function(res){
        that.refreshMessage()
        that.setData({
          message: ""
        })
      }
    })
  },

  // 跳转到用户详情页
  jumpToUserDetail(e){
    console.log(e.currentTarget.dataset.openid)
    wx.setStorageSync('user_detail_openid', e.currentTarget.dataset.openid)
    wx.navigateTo({
      url: '../../user/user_detail/user_detail',
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

  },
})