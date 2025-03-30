// pages/user/user_detail/user_detail.js
import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
const db = wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        note: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const user=wx.getStorageSync('user');
        const that=this;

        db.collection('user').where({'_openid':user.openid}).get({ 
            success:function(res){
                that.setData({
                    userInfo:res.data[0],
                    note:user.note,
                })
            }
        })
    },

    ban(){
        const userid=wx.getStorageSync('userid');
        const that = this
        Dialog.confirm({
            title: 'Confirm to ban',
          })
        .then(() => {
            db.collection('user').where({'_openid':userid}).update({
                // data 传入需要局部更新的数据
                data: {
                  // 表示将 done 字段置为 true
                  isBan: true
                },
                success: function(res) {
                    Dialog.alert({
                        title: 'Ban Successfully'
                    }).then(() => {
                        that.onLoad()
                    });
                }
              })
        })
        .catch(() => {
            // on cancel
        });
        
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