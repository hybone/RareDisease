const db = wx.cloud.database()
var util=require('../../../util/util.js.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
        newsList:[],     //比赛列表
        MAX_LIMIT:10,     //一次最多取出的订单数(超参)
        times:1,          //当前是第几次触底(onLoard时重置)
        batchTimes:0,     //最多分几次取出订单(由onLoad赋值)
        fieldPath:'publish_time',    //按什么属性排序
        order:'asc',          //asc：升序。desc：降序
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.stopPullDownRefresh()    //让刷新的三个点消失
    this.loadNews()
  },

  loadNews() {
    const that = this
    const _ = db.command
    db.collection('news').limit(this.data.MAX_LIMIT).orderBy(this.data.fieldPath, this.data.order)
    .where(_.and([
        { 'state':'N'}
      ])).get({
      success: function(res) { 
        // res.data 包含该记录的数据
        console.log(res)
        db.collection('news').where(_.and([
          { 'state':'N'}
        ]))
        .count().then(Inres => {
          const countResult=Inres.total;
          console.dir("countResult:"+countResult)
          const batchTimes = Math.ceil(countResult / that.data.MAX_LIMIT)
          for(let i=0;i<res.data.length;i++){    //截取内容前30个字符
            res.data[i].content=res.data[i].content.substring(0,30)+"...";
          }
          var newsList = res.data;
          that.setData({
            newsList,
            batchTimes,
            times:1
          })
        })
      }
    })
  },

  /*点击跳转到详情页面*/
  jumpToNewsDetail(e){
    console.log(e.currentTarget.dataset)
    const newsId=e.currentTarget.dataset.newsid;
    wx.setStorage({     //保存newsId到Storage
      key:"newsId",
      data:newsId
    })
    wx.navigateTo({
      url: '../news_check_detail/news_check_detail',
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
    this.onLoad()
  },

  /* 页面上拉触底事件的处理函数*/
  onReachBottom: function () {
    console.dir("触发触底函数")
    let times=this.data.times;
    const batchTimes=this.data.batchTimes;
    let max = this.data.MAX_LIMIT;
    const that=this;
    const _ = db.command;
    if(times < batchTimes){
      let newsList = this.data.newsList;
      db.collection('news').skip(times * max).limit(max).orderBy(this.data.fieldPath,this.data.order)
      .where(_.and([
        { 'state':'N' }
      ])).get({
        success: function(res) {
          // res.data 包含该记录的数据
          for(let i=0;i<res.data.length;i++){    //截取内容前30个字符
            res.data[i].description=res.data[i].description.substring(0,30);
          }
          for(let i=0;i<res.data.length;i++){
            newsList.push(res.data[i]);
          }
          that.setData({
            newsList,
            times:times+1
          })
        }
      })
    }
},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
})