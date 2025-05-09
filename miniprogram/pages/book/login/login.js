// pages/book/login/login.js
import Dialog from '@vant/weapp/dialog/dialog';
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    password: ''
  },

  onChangeName(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      name: event.detail
    })
  },

  onChangePassword(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      password: event.detail
    })
  },

  register() {
    const that = this
    db.collection('book_user').where({
      name: this.data.name
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
        if(res.data.length > 0) {
          Dialog.alert({
            message: '该用户名已被注册',
          }).then(() => {   // 点击确认之后执行
            // on close
          });
        }
        else {
          that.addData()
        }
      }
    })
  },

  addData() {
    const that = this
    db.collection('book_user').add({// data 字段表示需新增的 JSON 数据
      data: {
        name: this.data.name,
        password: this.data.password
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
        that.setData({
          name: '',
          password: ''
        })
        Dialog.alert({
          message: '注册成功',
        }).then(() => {   // 点击确认之后执行
          // on close
        });
      }
    })
  },

  login() {
    db.collection('book_user').where({
      name: this.data.name,
      password: this.data.password
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
        if(res.data.length == 0) {
          Dialog.alert({
            message: '用户名或密码错误',
          }).then(() => {   // 点击确认之后执行
            // on close
          });
        }
        else {
          wx.navigateTo({
            url: '../list/list',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})