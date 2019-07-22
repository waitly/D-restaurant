//app.js
App({
  date:{
    openid:null,
    timer:'',
  },
  
  onLaunch: function () {
    
   
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
   //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    this.globalData = {}
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        this.globalData.openid = res.result.openid
        const db = wx.cloud.database()
        db.collection('user').where({
          _openid: this.globalData.openid
        }).get({
          success: res => {
            console.log("查询成功")
            if (res.data==""){
              db.collection('user').add({
                data: {
                  money: 0,
                  member: false,
                  points: 0,
                },
                success(res) {
                  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                  console.log("插入成功",res)
                },
                fail(err) {
                  console.log("插入失败",err)
                }
              })
            }
            else {
              console.log("此客户已存在信息！")
              console.log(res)
            }
          }
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  }

})