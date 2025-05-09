// pages/book/list/list.js

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    batchTimes: 0,  // 分几次取
    cnt: 0,   // 当前是第几次查询
    MAX_LIMIT: 20,  // 一次取多少条数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const that = this
    const countResult = await db.collection('book').count()   // 同步查询（会等待结果才继续往下执行）
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / 100)
    this.setData({
      batchTimes
    })

    db.collection('book').skip(this.data.cnt * this.data.MAX_LIMIT).limit(this.data.MAX_LIMIT).get({
      success: function(res) {
        that.setData({
          books: res.data,
          cnt: that.data.cnt + 1
        })
      }
    })
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
    const that = this
    if(this.data.cnt > this.data.batchTimes) {
      return
    }
    db.collection('book').skip(this.data.cnt * this.data.MAX_LIMIT).limit(this.data.MAX_LIMIT).get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          books: that.data.books.concat(res.data),
          cnt: that.data.cnt + 1
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})