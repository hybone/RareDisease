// pages/user/login/login.js
const db = wx.cloud.database()
import Toast from '@vant/weapp/toast/toast';
import Notify from '@vant/weapp/notify/notify';
import Dialog from '@vant/weapp/dialog/dialog';
var util=require('../../../util/util.js')

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    agree: '',
    disease: '',
    avatarUrl: defaultAvatarUrl,
    hasUpload: false,  // 头像已上传
    hasSubmit: false,   // 用户点击注册按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.cloud.callFunction({   //页面载入时获取用户openid并保存
      name: 'getOpenID',
      complete: Res => {
        console.log('callFunction test result: ', Res.result.OPENID)
        const openid = Res.result.OPENID
        wx.setStorage({     //保存OPENID到Storage
            key:"openid",
            data:openid
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

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    Toast.loading({message: '上传中...', forbidClick: true, duration:0, selector: '#order-submit'})
    wx.cloud.uploadFile({
      cloudPath: "avatarPic/"+Date.now()+".jpg", // 上传至云端的路径
      filePath: avatarUrl, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        wx.cloud.getTempFileURL({     //换取图片临时链接用于展示预览
          fileList: [res.fileID],
          success: res => {
            const URL = res.fileList[0].tempFileURL       //URL:临时链接
            console.log(URL)
            this.setData({
              avatarUrl:URL,
              hasUpload:true
            });
          }
        })
      }
    })
    const timer = setInterval(() => {     //当成功时才停止加载指示
      if(this.data.hasUpload==true){
        clearInterval(timer);
        Toast.clear();
      }
    }, 500);
  },
  
  /*点击提交按钮*/
  onSubmit(res) {
    var {name, age} = res.detail.value
    if(this.check(res) == false) {
      return
    }
    const that = this
    const openid = wx.getStorageSync('openid')
    Toast.loading({message: '注册中...', forbidClick: true, duration:0, selector: '#order-submit'})
    wx.setStorageSync('userInfo', res.userInfo);     //保存用户信息在Storage，避免重复弹窗
    wx.setStorageSync('hasUserInfo', true);     //保存在Storage
    var timenow=util.formatDateTime(new Date())
    var time=Date.now()
    const _ = db.command;
    db.collection('user').add({
      // data 字段表示需新增的 JSON 数据
      data: {
          name,
          age,
          disease:this.data.disease,
          publish_time:timenow,
          publish_time_mm:time,
          avatarUrl:this.data.avatarUrl,
          collected_list:[],      // 用户收藏
          identity: "patient"
      },
      success: function(res){
        console.log('注册成功')
        that.setData({
          hasSubmit:true
        })
        Dialog.alert({
          title: '注册成功',
        }).then(() => {
          // 将用户信息保存到storage
          db.collection('user').where({_openid: openid}).get().then(res => {
            if(res.data.length > 0) {
              const userInfo = res.data[0]
              wx.setStorageSync('userInfo',userInfo)
              wx.setStorageSync('hasUserInfo', true)
              wx.switchTab({
                url: '../user_center/user_center',
              })
            }
          })
        });
      }
    })
    const timer = setInterval(() => {     //当成功时才停止加载指示
      if(this.data.hasSubmit==true){
        clearInterval(timer);
        Toast.clear();
      }
    }, 500);
  },

  check(res) {
    let {name, age} = res.detail.value
    if(name=="") {
      Notify({ type: 'danger', duration:1000, message: '请输入姓名'})
      return false
    }
    if(age=="") {
      Notify({ type: 'danger', duration:1000, message: '请输入年龄'})
      return false
    }
    if(this.data.disease=="") {
      Notify({ type: 'danger', duration:1000, message: '请选择所患病症'})
      return false
    }
    if(this.data.avatarUrl==defaultAvatarUrl) {
      Notify({ type: 'danger', duration:1000, message: '请上传头像'})
      return false
    }
    if(this.data.agree.length == 0){
      Toast("请仔细阅读并同意以下协议")
      return false
    }
    return true
  },

  // getPhoneNumber(e) {
  //   let cloudID = e.detail.cloudID //开放数据ID
  //   const that=this
  //   Toast.loading({message: '绑定中...', forbidClick: true, duration:0, selector: '#order-submit'})
  //   //获取手机号
  //   wx.cloud.callFunction({
  //     name: 'getPhone',
  //     data: {
  //       cloudID: cloudID
  //     }
  //   }).then(res => {
  //     let phone = res.result.list[0].data.phoneNumber
  //     that.setData({
  //       hasSubmit: true,
  //       phone
  //     })
  //   }).catch(error => {
  //   })
  //   const timer = setInterval(() => {     //当成功时才停止加载指示
  //     if(this.data.hasSubmit==true){
  //       clearInterval(timer);
  //       Toast.clear();
  //     }
  //   }, 500);
  // },

  // 同意条款
  onChange(event) {
    console.log(event.detail)
    this.setData({
      agree: event.detail,
    });
  },

  // 跳转至选择页
  jumpToDiseaseChoose() {
    wx.navigateTo({
      url: '../disease_choose/disease_choose',
    })
  }

  // onUnload(){
  //   wx.setStorageSync('disease', '')
  // }
})