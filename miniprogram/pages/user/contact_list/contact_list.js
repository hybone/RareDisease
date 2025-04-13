const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    chatList: {},
    messageList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that=this;

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

    // 获取消息
    const _ = db.command
    db.collection('message').where(_.or([
      {
        'receiver':openid
      },
      {
        'sender':openid
      }
    ])).get({
      success:function(res){
        console.log(res.data)
        let chatList = []
        for(let i = 0; i < res.data.length; i++) {
          if(res.data[i].sender == openid) {
            let flag = false;
            for(let j = 0; j < chatList.length; j++) {
              console.log(chatList[j])
              if(chatList[j]._openid == res.data[i].receiver) {
                flag = true;
                break;
              }
            }
            if(flag) continue;
            chatList.push(res.data[i].receiverInfo)
          }
          else if(res.data[i].receiver == openid) {
            let flag = false;
            for(let j = 0; j < chatList.length; j++) {
              if(chatList[j]._openid == res.data[i].sender) {
                flag = true;
                break;
              }
            }
            if(flag) continue;
            chatList.push(res.data[i].senderInfo)
          }
        }
        console.log(chatList)
        that.setData({
          chatList,
          messageList:res.data
        })
      }
    })
  },

  openChat(e) {
    console.log(e.currentTarget.dataset.id)
    wx.setStorageSync('user_detail_openid', e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../contact/contact',
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
    this.onLoad()
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