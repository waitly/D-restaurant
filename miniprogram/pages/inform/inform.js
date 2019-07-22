Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    id: {},
    hasUserInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
    var that = this;
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
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
  login: function () {
    var that = this;
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    })
  },
  pocket: function () {
    wx.navigateTo({
      url: 'pocket/pocket',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  integral: function () {
    wx.navigateTo({
      url: 'integral/integral',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  recommand: function () {
    wx.navigateTo({
      url: 'recommand/recommand',

    })
  },
  feedback: function () {
    wx.navigateTo({
      url: 'feedback/feedback',

    })
  }
})