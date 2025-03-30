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
    newsInfo:{},
    newsId: "",
    userInfo:{},
    commentList:[],
    comment: '',  // 输入的评论 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const newsId=wx.getStorageSync('newsId');
    const that=this;
    wx.setStorageSync('teamInfo', '')

    db.collection('news').doc(newsId).get({   //获取活动信息
      success:function(res){
        let content = res.data.content.split(' ')
        res.data.content = content
        console.log(res.data)
        that.setData({
          newsId: newsId,
          newsInfo:res.data
        })
      }
    })

    // 获取用户信息
    const openid=wx.getStorageSync('openid')
    db.collection('user').where({'_openid':openid}).get({
      success:function(res){
        console.log(res.data[0])
        that.setData({
          userInfo:res.data[0]
        })
      }
    })

    // 获取评论
    db.collection('comment').where({'newsId':newsId}).get({
      success:function(res){
        that.setData({
          commentList:res.data
        })
      }
    })
  },

  refreshComment() {
    const that=this;
    const newsId=wx.getStorageSync('newsId');
    db.collection('comment').where({'newsId':newsId}).get({
      success:function(res){
        console.log(res.data)
        that.setData({
          commentList:res.data
        })
      }
    })
  },

  onCommentChange(e) {
    this.setData({
      comment: e.detail,
    });
  },

  // 添加评论
  addComment() {
    console.log(this.data.comment)
    var timenow=util.formatDateTime(new Date())
    var time=Date.now()
    const _ = db.command;
    const that = this;
    db.collection('comment').add({
      // data 字段表示需新增的 JSON 数据
      data: {
          content: this.data.comment,
          newsId: this.data.newsId,
          like: 0,
          publish_time:timenow,
          publish_time_mm:time,
          publisher: this.data.userInfo,
      },
      success: function(res){
        Notify({ type: 'success', duration:1000, message: '发布成功'})
        that.setData({
          comment: ''
        })
        that.refreshComment()
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