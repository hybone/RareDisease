
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
    fieldPath:'holdingDate',    //按什么属性排序
    order:'asc',          //asc：升序。desc：降序
    eventList:"",     //比赛列表
    eventidList:"",   //比赛id数组
  },
 
  /*生命周期函数--监听页面加载*/
  onLoad: function () {
    wx.stopPullDownRefresh();  // 让刷新的三个点消失
    const openid = wx.getStorageSync('openid');
    let that = this;
    let eventList = this.data.eventList;
    const _ = db.command;

    // 将获取 eventidList 操作封装为 Promise
    const getUserEventList = () => {
        return new Promise((resolve, reject) => {
            db.collection('user').where({'_openid': openid}).get({
                success: function (Res) {
                    const eventidList = Res.data[0].collected_list;
                    console.log(eventidList);
                    if (eventidList.length == 0) {
                        toast('您暂时没有关注比赛');
                        that.setData({
                            eventidList: [],
                        });
                        resolve([]);  // 如果没有收藏的比赛，返回空列表
                    } else {
                      that.setData({
                          eventidList: eventidList,
                      });
                      resolve(eventidList);  // 返回 eventidList
                    }
                },
                fail: function (err) {
                    reject(err);  // 获取失败时进行错误处理
                }
            });
        });
    };

    // 先获取 eventidList，再执行查询 event
    getUserEventList().then((eventidList) => {
        // 查询 event 集合
        db.collection('event').limit(this.data.MAX_LIMIT).orderBy(this.data.fieldPath, this.data.order).where(_.and([
            { '_id': _.or(this.data.eventidList)}
        ])).get({
            success: function (res) {
              console.log(res)
              db.collection('event').count().then(Inres => {
                const countResult=Inres.total;
                console.dir("countResult:"+countResult)
                const batchTimes = Math.ceil(countResult / that.data.MAX_LIMIT)
                for(let i=0;i<res.data.length;i++){    //截取内容前40个字符
                  res.data[i].description=res.data[i].description.substring(0,40)+"...";
                }
                var eventList = res.data;
                that.setData({
                  eventList,
                  batchTimes,
                  times:1
                })
              })
            },
            fail: function (err) {
                console.error("获取 event 数据失败", err);
            }
        });
    }).catch((err) => {
        console.error("获取 user 数据失败", err);
    });
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
    console.dir("触发触底函数")
    let times = this.data.times;
    const batchTimes = this.data.batchTimes;
    let max = this.data.MAX_LIMIT;
    const that = this;
    const _ = db.command;
    if(times < batchTimes){
      let eventList = this.data.eventList;
      db.collection('event').skip(times * max).limit(max).orderBy(this.data.fieldPath,this.data.order).where(_.and([
        { '_id': _.or(this.data.eventidList)}
      ])).get({
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