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
    disease:'',
    newName:'',
    newDisease:'',
    introduction:'',
    newIntroduction:'',
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
          disease: res.data[0].disease,
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

  jumpToDiseaseChoose() {
    wx.navigateTo({
      url: '../disease_choose/disease_choose',
    })
  },

  onClose2() {
    this.setData({ show2: false });
    const openid = wx.getStorageSync('openid')
    const userInfo=wx.getStorageSync('userInfo');
    let disease = wx.getStorageSync('disease')
    if(disease != '') {
      userInfo.disease = disease
    }
    const that = this
    console.log(disease)
    db.collection('user').where({'_openid':openid}).update({
        data:{
          disease: userInfo.disease
        },
        success: function(res) {
          wx.setStorageSync('userInfo', userInfo)
          that.setData({
            disease
          })
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
    this.onClose2()
  },
})