const app = getApp()

Page({
  data: {
    imgUrls: [
      'cloud://little-y6v0c.6c69-little-y6v0c-1259261506/images/4.png',
      'cloud://little-y6v0c.6c69-little-y6v0c-1259261506/images/5.png',
      'cloud://little-y6v0c.6c69-little-y6v0c-1259261506/images/6.png'
    ],
    address:'正在位'
  },
  onLoad: function () {
    //定时器每天早上六点执行任务
    this.time()
 },
  time: function () {
    this.setData({
      timer: setTimeout(() => {
        //获取当前时间
        var timestamp = Date.parse(new Date());
        var nowDay = new Date(timestamp);
        var nowhours = nowDay.getHours();
        var nowminutes = nowDay.getMinutes();
        var nowseconds = nowDay.getSeconds();
        if (nowhours == 11 && nowminutes == 4 && nowseconds == 0)//当前时间为6:00时执行
        {
          this.aaa("1-4")
          this.aaa("5-8")
          this.aaa(">8")
          clearTimeout(this.data.timer)
        }
        this.time()
      }, 1000)
    })
  },


  aaa: function (e) {
    console.log(e)
    const db = wx.cloud.database()
    db.collection('user_book').where({
      _openid: "ot8X15Zm54bruNW3ZVVG_Ssl8qFI",
      date: 1,
      seat_type: e,
    }).get({
      success: res => {
        console.log("今日订座有：" + res.data[0].seat_number + "人")
        var num = res.data[0].seat_number
        var id = res.data[0]._id
        db.collection('seat').where({
          _openid: "ot8X15Zm54bruNW3ZVVG_Ssl8qFI",
          state: true,
          type: e
        }).get({
          success: res => {
            console.log("查询成功")
            for (var i = 0; i < num; i++) {
              db.collection('seat').doc(res.data[i]._id).update({
                data: {
                  state: false,
                },
                success: res => {
                  console.log("更新成功", res)
                },
                fail: err => {
                  console.error("更新失败", err)
                }
              })
            }
            console.log(i)
            db.collection('user_book').where({
              _openid: "ot8X15Zm54bruNW3ZVVG_Ssl8qFI",
              date: 2,
              seat_type: e,
            }).get({
              success: res => {
                db.collection('user_book').doc(res.data[0]._id).update({
                  data: {
                    date: 1
                  },
                  success: res => {
                    console.log("日期修改成功")
                  },
                  fail: err => {
                    console.log("日期修改失败")
                  }
                })
                db.collection('user_book').doc(id).update({
                  data: {
                    seat_number: 0,
                    date: 2
                  },
                  success: res => {
                    console.log("日期交换成功")
                  },
                  fail: err => {
                    console.log("日期交换失败")
                  }
                })
              }
            })
          },
          fail: err => {
            console.log("查询失败")
          }
        })
      }
    })
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
  ordermember:function(e){
    wx.navigateTo({
      url: 'member/member',
    })
  },
  tapSearch:function(){
    wx.navigateTo({ url: 'search' });
  },
  toNearby: function () {
    var self = this;
    self.setData({
      scrollIntoView: 'nearby'
    });
    self.setData({
      scrollIntoView: null
    });
    
  },

})