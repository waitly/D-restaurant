// miniprogram/pages/index/number/number.js
const app = getApp();
Page({
  data: {
    little: 0,//目前排队的桌数
    littlenum: '',//当前排到的客人
    middle: 0,//
    middlenum: '',
    huge: 0,
    hugenum: '',
    anumber: 0,//今人总共排队的人数
    bnumber: 0,
    cnumber: 0
  },
  Small(e) {
    wx.showLoading({
      title: '请稍后',
    })
    var num= this.data.anumber+1
    console.log('a0' + num)
    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'shopkeeper',
      // 传给云函数的参数
      data: {
        name: 'D餐厅',
        number: 'a0' + num,//排号
        num: this.data.little +1,//目前排队的桌数
        tips: "欢迎来到，膳食备好我们会通知您哦！",
        formid: e.detail.formId,
        userid: app.globalData.openid
      },
      // 成功回调
      success: res => {
        console.log("回调成功")
        const db = wx.cloud.database()
        db.collection('line').add({
          data: {
            line_num: 'a0' + num,
            table_type: '1-4'
          },
          success: res => {
            console.log("插入成功", res)
          },
          fail: err => {
            console.log("插入失败", err)
          }
        })
        db.collection('Lodge').doc('peoplenum').update({
          data: {//这一段需放管理端运行
            anum: this.data.little + 1,
            anumber: this.data.anumber + 1,
          },
          success: res => {
            console.log("修改成功",res)
            wx.showToast({
              title: '成功',
            })
            //this.onShow()
          },
          fail: err => {
            console.log(err)
          }
        })
      }
    })
  },
  Medium(e) {
    wx.showLoading({
      title: '请稍后',
    })
    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'shopkeeper',
      // 传给云函数的参数
      data: {
        name: 'D餐厅',
        number: 'b0' + this.data.bnumber + 1,
        num: this.data.middle + 1,
        tips: "欢迎来到，膳食备好我们会通知您哦！",
        formid: e.detail.formId,
        openid: app.globalData.openid
      },
      // 成功回调
      success: res => {
        const db = wx.cloud.database()
        db.collection('line').add({
          data: {
            _openid: app.globalData.openid,
            line_num: 'b0' + this.data.bnumber + 1,
            table_type: '5-8'
          },
          success: res => {
            console.log("插入成功", res)
          },
          fail: err => {
            console.log("插入失败", err)
          }
        })
        db.collection('Lodge').doc("peoplenum").update({
          data: {
            bnum: this.data.middle + 1,
            bnumber: this.data.bnumber + 1,
          },
          success: function (res) {
            console.log(res)
            wx.showToast({
              title: '成功',
            })
            //this.onShow()
          },
          fail: res => {
            console.log(res)
          }
        })
      }
    })
  },
  Large(e) {
    wx.showLoading({
      title: '请稍后',
    })
    // var num = app.data.huge + 1;
    // app.Numberlittle(num);
    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'shopkeeper',
      // 传给云函数的参数
      data: {
        name: 'D餐厅',
        number: 'c0' + this.data.cnumber + 1,
        num: this.data.huge + 1,
        tips: "欢迎来到，膳食备好我们会通知您哦！",
        formid: e.detail.formId,
        userid: app.globalData.openid
      },
      // 成功回调
      success: res => {
        const db = wx.cloud.database()
        db.collection('line').add({
          data: {
            _openid: app.globalData.openid,
            line_num: 'c0' + this.data.cnumber + 1,
            table_type: '>8'
          },
          success: res => {
            console.log("插入成功", res)
          },
          fail: err => {
            console.log("插入失败", err)
          }
        })
        db.collection('Lodge').doc("peoplenum").update({
          data: {
            cnum: this.data.huge + 1,
            cnumber: this.data.cnumber + 1,
          },
          success: function (res) {
            console.log(res)
            wx.showToast({
              title: '成功',
            })
            //this.onShow()
          },
          fail: res => {
            console.log(res)
          }
        })
      }
    })
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },

  onShow: function () {
    wx.showLoading({
      title: '正在查询',
    })
    const db = wx.cloud.database()
    db.collection('Lodge').where({
      _id: 'peoplenum'
    })
      .get({
        success: res => {
          this.setData({
            little: res.data[0].anum,
            middle: res.data[0].bnum,
            huge: res.data[0].cnum,
            anumber: res.data[0].anumber,
            bnumber: res.data[0].bnumber,
            cnumber: res.data[0].cnumber,
          })
          db.collection('line').where({
            table_type: '1-4'
          })
            .get({
              success: res => {
                console.log("查询成功", res),
                  console.log("排号为：" + res.data[0].line_num)
                this.setData({
                  littlenum: res.data[0].line_num
                })
              },
              fail: err => {
                console.log("查询失败", err)
              }
            })
          db.collection('line').where({
            table_type: '5-8'
          })
            .get({
              success: res => {
                console.log("排号为：" + res.data[0].line_num)
                this.setData({
                  middlenum: res.data[0].line_num
                })
              },
              fail: err => {
                console.log(err)
              }
            })
          db.collection('line').where({
            table_type: '>8'
          })
            .get({
              success: res => {
                console.log("排号为：" + res.data[0].line_num)
                this.setData({
                  hugenum: res.data[0].line_num
                })
              },
              fail: err => {
                console.log(err)
              }
            })
        },
        fail: res => {
          console.log("杨家齐")
        }
      })
    wx.showToast({
      title: '成功',
    })
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },

})