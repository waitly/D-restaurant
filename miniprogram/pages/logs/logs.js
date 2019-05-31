//logs.js

Page({
  data: {
   array:[1,2,3,4,5,6,7,8]
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})

