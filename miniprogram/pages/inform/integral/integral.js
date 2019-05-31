const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    integral:0,
    check1:false,
    check2:true,
    array:[
      {
        id:1,
        name:'签到得积分',
        time:'2019-01-09 00:04:53',
        count:10
      },
      {
        id: 2,
        name: '关注微信送积分',
        time: '2019-01-19 00:12:30',
        count: 100
      }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const db = wx.cloud.database()
    db.collection('user').where({
      _openid: app.globalData.openid
    }).get({
      success(res) {
        console.log(res.data)
        that.setData({
          integral: res.data[0].points,
        })
      }
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  vision1:function()
  {
    this.setData({
      check1:false,
      check2: true,
    })
  },
   vision2: function () {
    this.setData({
      check1: true,
      check2: false,
    })
  }
})