const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count1: {},
    count:{},
    goods: {
      1: {
        id: 1,
        name: '娃娃菜',
        pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
        sold: 1014,
        price: 2
      },
      2: {
        id: 2,
        name: '宫保鸡丁',
        pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/2.jpg',
        sold: 1029,
        price: 3
      },
      3: {
        id: 3,
        name: '方便面',
        pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/2.jpg',
        sold: 1030,
        price: 2
      },
      4: {
        id: 4,
        name: '粉丝',
        pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/2.jpg',
        sold: 1059,
        price: 1
      },
      5: {
        id: 5,
        name: '茄子',
        pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/2.jpg',
        sold: 1029,
        price: 2
      },
      6: {
        id: 6,
        name: '生菜',
        pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
        sold: 1064,
        price: 2
      },
      7: {
        id: 7,
        name: '辣子鸡丁',
        pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/2.jpg',
        sold: 814,
        price: 3
      },
      8: {
        id: 8,
        name: '红烧排骨',
        pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
        sold: 124,
        price: 3
      },
      9: {
        id: 9,
        name: '酸菜鱼',
        pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
        sold: 102,
        price: 5
      }
    },
    Orderform: {
      list: {}
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.showLoading({
      title: '正在查找',
    })
    const db = wx.cloud.database()
    db.collection('menu').where({
      _openid: app.globalData.openid
    })
      .get({
        success: res => {
          wx.showToast({
            title: '查询成功',
          })
          //console.log(res.data)
          res.data.reverse()
          this.setData({ count: res.data })
          console.log(this.data.count)
        },
        fail: res => {
        },
        complete: res => {
          //this.data.count.reverse()
          console.log(this.data.count)
        }
      })
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

  }
})