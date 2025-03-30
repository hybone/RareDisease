
const { default: toast } = require("../../../miniprogram_npm/@vant/weapp/toast/toast");

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventList:"",     //订单列表
  },
 
  /*生命周期函数--监听页面加载*/
  onLoad: function () {
    wx.stopPullDownRefresh()    //让刷新的三个点消失
    const openid=wx.getStorageSync('openid');
    let that=this;
    const _ = db.command;
    db.collection('user').where({'_openid':openid}).get({
        success: function(res) {
            console.log(res.data[0].registered_list);
            let registered = res.data[0].registered_list;
            db.collection('event').where(_.and([
                {
                    '_id': _.in(registered)
                },
                {
                    'state':'A'
                }
            ])).orderBy('publish_time','desc').get({
                success: function(res) {
                // res.data 包含该记录的数据
                console.log(res.data)
                for(let i=0;i<res.data.length;i++){    //截取内容前40个字符
                    res.data[i].description=res.data[i].description.substring(0,40)+'...';
                }
                that.setData({
                    eventList: res.data
                })
                }
            })
        }
    })
  },

  jumpToEventDetail(e){
    const eventid=e.currentTarget.dataset.eventid;
    wx.setStorage({     //保存eventid到Storage
      key:"eventid",
      data:eventid
    })
    wx.navigateTo({
      url: '../../event/event_detail/event_detail',
    })
  },

  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {

  },

  /*生命周期函数--监听页面显示*/
  onShow: function () {
      this.onLoad()
  },

  /*生命周期函数--监听页面隐藏*/
  onHide: function () {
  },

  /**生命周期函数--监听页面卸载*/
  onUnload: function () {
  },

    
  /*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {
    this.onLoad()
  },

  /* 页面上拉触底事件的处理函数*/
  onReachBottom: function () {

  },

  /* 用户点击右上角分享*/
  onShareAppMessage: function () {

  },
})