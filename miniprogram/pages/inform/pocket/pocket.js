const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_money: 0,
    charge_money: 0,
    id: '',
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
        console.log("查询成功")
        that.setData({
          user_money: res.data[0].money,
          id:res.data[0]._id
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
  chargemoney1: function () {
    this.setData({
      charge_money: 100
    })
  },
  chargemoney2: function (e) {
    this.setData({
      charge_money: parseInt(e.detail.value)
    })
  },
  aaa: function () {
    const sum = parseInt(this.data.charge_money) + parseInt(this.data.user_money)
    const db = wx.cloud.database()
    db.collection('user').doc(this.data.id).update({
      // data 传入需要局部更新的数据
      data: {
        money: sum
      },
      success: res => {
        console.log("更新成功")
      },
      fail: err => {
          console.error("更新失败")
      }
    })
    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
  }
})