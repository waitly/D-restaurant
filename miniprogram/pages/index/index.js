//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '../../images/4.png',
      '../../images/5.png',
      '../../images/6.png'
    ],
  },
  onLoad: function () {
 },
  orderseat:function(e)
  {
    wx.navigateTo({
      url: 'seat/seat',
    })
  },
  orderfood: function (e) {
    wx.navigateTo({
      url: 'food/food',
    })
  },
  orderparty: function (e) {
    wx.navigateTo({
      url: 'party/party',
    })
  },
  ordernumber: function (e) {
    wx.navigateTo({
      url: 'number/number',
    })
  },
  orderpay: function (e) {
    wx.navigateTo({
      url: 'pay/pay',
    })
  },

})