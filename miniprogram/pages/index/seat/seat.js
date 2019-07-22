var timestamp = Date.parse(new Date());
var nowDay = new Date(timestamp);
var m = nowDay.getMonth() + 1;
var d = nowDay.getDate();
var dd1 = new Date();
dd1.setDate(dd1.getDate() + 1);//获取AddDayCount天后的日期 
var m1 = dd1.getMonth() + 1;//获取当前月份的日期 
var d1 = dd1.getDate();
var dd2 = new Date();
dd2.setDate(dd2.getDate() + 2);//获取AddDayCount天后的日期 
var m2 = dd2.getMonth() + 1;//获取当前月份的日期 
var d2 = dd2.getDate();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index1: 0,
    index2: 0,
    hunman: '未设置>',
    array: ['1-4', '5-8', '>8'],
    date: [m + '月' + d + '日', m1 + '月' + d1 + '日', m2 + '月' + d2 + '日'],
    time: '12:00',
    day: '未设置>',
    location: '未设置>',
    call: '输入>',
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  submitinfo: function (e) {
    var tablenum = ""
    console.log(app.globalData.openid)
    console.log(e.detail.formId)
    console.log(this.data.array[e.detail.value.people])
    console.log(e.detail.value.date + e.detail.value.time)
    console.log(e.detail.value.window)
    console.log(e.detail.value.sex)
    console.log(e.detail.value.num)
    console.log(e.detail.value.text)
    const db = wx.cloud.database()
    if (e.detail.value.date == 0) {//判断是否是今日，若是则查询座位是否满座
      db.collection('seat').where({
        _openid: "ot8X15Zm54bruNW3ZVVG_Ssl8qFI",
        state: true,
        type: this.data.array[e.detail.value.people],
      }).get({
        success: res => {
          console.log("查询成功!")
          console.log(res.data)
          if (res.data == "") {
            //弹出消息提示框是否去排队，若是则跳转排队页面
          }
          else {//若没满则分配桌位号
            console.log(res.data[0].number)
            tablenum = res.data[0].number
            console.log(tablenum)
            db.collection('seat').doc(res.data[0]._id).update({
              // data 传入需要局部更新的数据，这一段需放管理端运行
              data: {
                state: false
              },
              success: res => {
                console.log("更新成功", res)
              },
              fail: err => {
                console.error("更新失败", err)
              }
            })


            wx.cloud.callFunction({//发送消息模板
              name: 'seats',
              data: {
                openid: app.globalData.openid,
                formid: e.detail.formId,
                people: this.data.array[e.detail.value.people],
                date: e.detail.value.date + " " + e.detail.value.time,
                window: e.detail.value.window,
                sex: e.detail.value.sex,
                num: e.detail.value.num,
                text: e.detail.value.text,
                tablenum: tablenum,
              },
              success: res => {
                console.log("调用成功", res)
                complete: console.log
              },
              fail: err => {
                console.log("调用失败", err)
              }
            })


          }
        },
        fail: err => {
          console.log("查询失败!", err)
        }
      })
    } else {//不是今天
      console.log("日期为:" + e.detail.value.date)
      db.collection('user_book').where({
        _openid: "ot8X15Zm54bruNW3ZVVG_Ssl8qFI",
        date: parseInt(e.detail.value.date),
        seat_type: this.data.array[e.detail.value.people],
      }).get({
        success: res => {
          console.log("not today")
          console.log(res)
          if (res.data[0].seat_number < res.data[0].sum_number) {//若没满则修改
            if (this.data.array[e.detail.value.people] == "1-4") {

              tablenum = "A" + 101 + res.data[0].seat_number
            } else if (this.data.array[e.detail.value.people] == "5-8") {

              tablenum = "B" + 101 + res.data[0].seat_number
            }
            else {

              tablenum = "C" + 101 + res.data[0].seat_number
            }
            db.collection('user_book').doc(res.data[0]._id).update({
              // data 传入需要局部更新的数据,这一段需在管理端运行
              data: {
                seat_number: res.data[0].seat_number + 1,
              },
              success: res => {
                console.log("更新成功", res)
              },
              fail: err => {
                console.error("更新失败", err)
              }
            })


            wx.cloud.callFunction({//发送消息模板
              name: 'seats',
              data: {
                openid: app.globalData.openid,
                formid: e.detail.formId,
                people: this.data.array[e.detail.value.people],
                date: e.detail.value.date + " " + e.detail.value.time,
                window: e.detail.value.window,
                sex: e.detail.value.sex,
                num: e.detail.value.num,
                text: e.detail.value.text,
                tablenum: tablenum,
              },
              success: res => {
                console.log("调用成功", res)
                complete: console.log
              },
              fail: err => {
                console.log("调用失败", err)
              }
            })


          }
          else {
            //消息框提示所选餐桌类型已满座
          }
        },
        fail: err => {
          console.log("查询失败!")
        }
      })
    }
  }
})