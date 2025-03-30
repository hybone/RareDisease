const db=wx.cloud.database()
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show1: false,
    show2: false,
    show3: false,
    name: '',
    position:'',
    newName:'',
    newPosition:'',
    introduction:'',
    newIntroduction:'',
    columns: ['前锋', '中场', '后卫','门将'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const openid = wx.getStorageSync('openid')
    const that = this
    db.collection('user').where({'_openid':openid}).get({
      success:function(res){
        that.setData({
          name: res.data[0].name,
          position: res.data[0].position,
          introduction: res.data[0].introduction,
        })
      }
    })
  },

  edit1(){
    this.setData({
        show1: true
    })
  },
  changeName(event){
    this.setData({
        newName: event.detail
    })
  },
  confirm1(){
    const openid = wx.getStorageSync('openid')
    const that = this
    const userInfo=wx.getStorageSync('userInfo')
    userInfo.name = this.data.newName
    db.collection('user').where({'_openid':openid}).update({
        data:{
          name: that.data.newName
        },
        success: function(res) {
          wx.setStorageSync('userInfo', userInfo)
          that.setData({
            name: that.data.newName
          })
          Toast("更新成功")
        }
    })
  },

  // 比赛位置
  showPopup2() {
    this.setData({ show2: true });
    if(this.data.newPosition == ''){
        this.setData({
          newPosition: '前锋'
        })
    }
  },

  onClose2() {
    this.setData({ show2: false });
    const openid = wx.getStorageSync('openid')
    const that = this
    const userInfo=wx.getStorageSync('userInfo')
    userInfo.position = this.data.newPosition
    console.log(this.data.newPosition)
    db.collection('user').where({'_openid':openid}).update({
        data:{
            position: that.data.newPosition
        },
        success: function(res) {
          wx.setStorageSync('userInfo', userInfo)
          that.setData({
            position: that.data.newPosition
          })
          Toast("更新成功")
        }
    })
  },

  onChange2(event) {
    const { value, index } = event.detail;
    this.setData({
      newPosition: value
    })
  },

  edit3(){
    this.setData({
        show3: true
    })
  },
  changeIntroduction(event){
    this.setData({
        newIntroduction: event.detail
    })
  },
  confirm3(){
    console.log(this.data.newIntroduction)
    const openid = wx.getStorageSync('openid')
    const that = this
    const userInfo=wx.getStorageSync('userInfo')
    userInfo.introduction = this.data.newIntroduction
    db.collection('user').where({'_openid':openid}).update({
        data:{
            introduction: that.data.newIntroduction
        },
        success: function(res) {
          wx.setStorageSync('userInfo', userInfo)
          that.setData({
            introduction: that.data.newIntroduction
          })
          Toast("更新成功")
        }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
  },
})