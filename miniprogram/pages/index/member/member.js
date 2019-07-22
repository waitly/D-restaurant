// miniprogram/pages/index/member/member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    db.collection('members').where({
      openid: app.globalData.openid
    }).get({
      success: res => {
        console.log("查询成功")
        if (res.data == "") {
          this.setData({
            
          })
        }
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
  information:function()
  {
    wx:wx.navigateTo({
      url: 'information/information',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  assignment: function () {
    wx: wx.navigateTo({
      url: 'assignment/assignment',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  card: function () {
    wx: wx.navigateTo({
      url: 'card/card',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  ask: function () {
    wx: wx.navigateTo({
      url: 'ask/ask',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})