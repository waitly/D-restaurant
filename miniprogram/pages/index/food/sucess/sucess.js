// miniprogram/pages/index/food/sucess/sucess.js


var timestamp = Date.parse(new Date());
var nowDay = new Date(timestamp);
var x1 = nowDay.getHours();
var y1 = nowDay.getMinutes();
var dd1 = new Date();
dd1.setTime(dd1.getTime() + 60*60*1000);//获取AddDayCount天后的日期 
var x2 = dd1.getHours() ;//获取当前月份的日期 
var y2 = dd1.getMinutes();
var dd2 = new Date();
dd2.setTime(dd2.getTime() + 120* 60 * 1000);//获取AddDayCount天后的日期 
var x3 = dd2.getHours();//获取当前月份的日期 
var y3 = dd2.getMinutes();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    time: [x1 + ':' + y1, x2 + ':' + y2, x3 + ':' + y3],
    count:1,
    price:1,
    all:0,
    cut:0,
    allcut:0,
    cart:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ cart: JSON.parse(options.cart)})
    console.log(this.data.cart)
    this.setData({all:this.data.cart.total})
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
  chooseLocation:function()
  {

  },
  bindTimeChange:function(e)
  {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  addsubmit:function()
  {
    wx.navigateTo({
      url: 'sucess-to-pay/sucess-to-pay',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
  
})