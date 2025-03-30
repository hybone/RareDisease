
const { default: toast } = require("../../../miniprogram_npm/@vant/weapp/toast/toast");

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    MAX_LIMIT:8,     //一次最多取出的比赛数(超参)
    times:1,          //当前是第几次触底(onLoard时重置)
    batchTimes:0,     //最多分几次取出比赛(由onLoad赋值)
    fieldPath:'publish_time',    //按什么属性排序
    order:'desc',          //asc：升序。desc：降序
    eventList:"",     //比赛列表
    eventidList:"",   //比赛id数组
  },

  /*生命周期函数--监听页面加载*/
  onLoad: function () {
    wx.stopPullDownRefresh()    //让刷新的三个点消失
    let that = this;
    const openid = wx.getStorageSync('openid')
    db.collection('event').limit(this.data.MAX_LIMIT).orderBy(this.data.fieldPath,this.data.order).where({'_openid': openid}).get({
      success: function(res) {
        // res.data 包含该记录的数据
        console.log(res)
        db.collection('event').count().then(Inres => {
          const countResult=Inres.total;
          console.dir("countResult:"+countResult)
          const batchTimes = Math.ceil(countResult / that.data.MAX_LIMIT)
          for(let i=0;i<res.data.length;i++){    //截取内容前40个字符
            res.data[i].description=res.data[i].description.substring(0,40)+"...";
            if(res.data[i].state == 'A') res.data[i].state = '审批已通过'
            if(res.data[i].state == 'C') res.data[i].state = '未通过审批'
            if(res.data[i].state == 'B') res.data[i].state = '等待审批中'
          }
          var eventList = res.data;
          that.setData({
            eventList:eventList,
            batchTimes:batchTimes,
            times:1
          })
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
      url: '../../event/register_detail/register_detail',
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
    
  },

  /* 页面上拉触底事件的处理函数*/
  onReachBottom: function () {
    console.dir("触发触底函数")
    const openid = wx.getStorageSync('openid')
    let times=this.data.times;
    const batchTimes=this.data.batchTimes;
    let max = this.data.MAX_LIMIT;
    const that=this;
    const _ = db.command;
    if(times < batchTimes){
      let eventList = this.data.eventList;
      db.collection('event').skip(times * max).limit(max).orderBy(this.data.fieldPath,this.data.order).where({'_openid': openid}).get({
        success: function(res) {
          // res.data 包含该记录的数据
          for(let i=0;i<res.data.length;i++){    //截取内容前30个字符
            res.data[i].description=res.data[i].description.substring(0,40);
          }
          for(let i=0;i<res.data.length;i++){
            eventList.push(res.data[i]);
          }
          that.setData({
            eventList:eventList,
            times:times+1
          })
        }
      })
    }
  },

  /* 用户点击右上角分享*/
  onShareAppMessage: function () {

  },
})