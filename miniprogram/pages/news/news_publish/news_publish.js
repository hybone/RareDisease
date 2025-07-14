// pages/user/login/login.js
const db = wx.cloud.database()
import Toast from '@vant/weapp/toast/toast';
import Notify from '@vant/weapp/notify/notify';
import Dialog from '@vant/weapp/dialog/dialog';
var util=require('../../../util/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},          // 发布者信息
    // ↓ 上传的图片
    fileList: [],         // 图片列表
    fileIDList:[],        // 图片OPENID列表，用于换取临时链接，达到预览目的
    hasSubmit:false,      // 判断是否点击了提交，若未提交，页面卸载时会删除存储中的图片
    hasUpload:false,      // 判断当前图片是否已上传成功
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const openid=wx.getStorageSync('openid')
    const that = this
    db.collection('user').where({'_openid':openid}).get({
      success:function(res){
        console.log(res.data[0])
        that.setData({
          userInfo:res.data[0]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let disease = wx.getStorageSync('disease')
    this.setData({
      disease
    })
  },

   /*删除图片*/
   deleteImg(event){
    let index= event.detail.index
    wx.cloud.deleteFile({
      fileList: [this.data.fileIDList[index]],
      success: res => {
        Notify({ type: 'success', duration:1000, message: '删除成功' })
      },
      fail: console.error
    })
    this.data.fileList.splice(index,1)    //去掉fileList中对应index图片1张
    this.data.fileIDList.splice(index,1)    //去掉fileID中对应的某项
    this.setData({
      fileList:this.data.fileList,
      fileIDList:this.data.fileIDList
    })
  },

  /*上传照片*/
  uploadImg(event) {
    const { file } = event.detail;
    let fileID = "";
    let URL="";
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.cloud.uploadFile({
      cloudPath: "listPictures/"+Date.now()+".jpg",
      filePath: file.url,
      success: res => {
        // 返回文件 ID
        fileID = res.fileID
        wx.cloud.getTempFileURL({     //换取图片临时链接用于展示预览
          fileList: [fileID],
          success: res => {
            URL = res.fileList[0].tempFileURL       //URL:临时链接
            const { fileList = [] } = this.data;
            const { fileIDList = []} = this.data;
            fileList.push({ ...file, url: URL});
            fileIDList.push(fileID);
            console.log(fileList)
            this.setData({
              fileList:fileList,
              fileIDList:fileIDList,
              hasUpload:true
           });
          },
          fail: console.error
        })
      },
      fail: err => {
        console.error("上传失败", err);
      }
    })
    Toast.loading({message: '图片上传中...', forbidClick: true, duration:0, selector: '#van-toast'})
    const timer = setInterval(() => {   //当图像成功上传时才停止加载指示
      if(this.data.hasUpload==true){
        clearInterval(timer);
        Toast.clear();
        this.setData({
          hasUpload:false
        })
      }
    }, 500);
  },
  
  /*点击提交按钮*/
  onSubmit(res) {
    var {title, content} = res.detail.value
    if(this.check(res) == false) {
      return
    }
    const that = this
    Toast.loading({message: '发布中...', forbidClick: true, duration:0, selector: '#submit'})
    var timenow=util.formatDateTime(new Date())
    var time=Date.now()
    const _ = db.command;
    console.log(this.data.userInfo)
    db.collection('news').add({
      // data 字段表示需新增的 JSON 数据
      data: {
          title,
          content,
          state: 'N',
          type: '分享',
          publish_time:timenow,
          publish_time_mm:time,
          image:this.data.fileIDList,
          publisher: this.data.userInfo,
      },
      success: function(res){
        console.log('发布成功')
        that.setData({
          hasSubmit:true
        })
        Dialog.alert({
          title: '发布成功',
          message: '发布的内容将在审核后公开',
        }).then(() => {
          wx.switchTab({
            url: '../news_list/news_list',
          })
        });
      }
    })
    const timer = setInterval(() => {     //当成功时才停止加载指示
      if(this.data.hasSubmit){
        clearInterval(timer);
        Toast.clear();
      }
    }, 500);
  },

  check(res) {
    let {title, content} = res.detail.value
    if(title=="") {
      Notify({ type: 'danger', duration:1000, message: '请输入标题'})
      return false
    }
    if(content=="") {
      Notify({ type: 'danger', duration:1000, message: '请输入内容'})
      return false
    }
    return true
  },
})