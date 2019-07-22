//var server = require('../../utils/server');
const app = getApp();
Page({
  data: {

    people: null,
    followed: false,
    goods: {},
    good: {
    },
    code: null,
    goodsList: [
      {
        id: 'hot',
        classifyName: '热销',
        goods: [0, 1, 2, 3, 4, 5, 6, 7, 8]
      },
      {
        id: 'new',
        classifyName: '新品',
        goods: [0, 2]
      },
      {
        id: 'vegetable',
        classifyName: '蔬菜',
        goods: [0, 5, 4]
      },
      {
        id: 'mushroom',
        classifyName: '荤菜',
        goods: [1, 6, 7, 8]
      },
      {
        id: 'food',
        classifyName: '主食',
        goods: [2, 3]
      }
    ],
    cart: {
      count: 0,
      total: 0,
      foodname: {},
      list: {},
      price: {},
      code: null
    },
    showCartDetail: false,
    form_id: ''
  },
  onLoad: function (options) {
    // var shopId = options.id;
    // for (var i = 0; i < app.globalData.shops.length; ++i) {
    //   if (app.globalData.shops[i].id == shopId) {
    //     this.setData({
    //       shop: app.globalData.shops[i]
    //     });
    //     break;
    //   }
    // }
  },
  onShow: function () {
    wx.showLoading({
      title: '正在加载',
    })
    const db = wx.cloud.database();
    db.collection('Menu').where({
      openid: this.data.Sopenid
    })
      .get({
        success: res => {
          wx.showToast({
            title: '加载成功',
          })
          console.log(res.data)
          //console.log(res.data)
          //console.log(res.data)
          //console.log(res.data)
          //console.log(res.data)
          this.setData({ goods: res.data })
        },
        fail: res => {
        }
      })
    db.collection('loge').where({
      _openid: this.data.Sopenid
    })
      .get({
        success: res => {
          console.log(res.data[0].followed)
          this.setData({ followed: res.dat[0].followed })
          console.log(this.data.people)
        }
      })
  },
  tapAddCart: function (e) {
    this.addCart(e.target.dataset.id);
  },
  tapReduceCart: function (e) {
    this.reduceCart(e.target.dataset.id);
  },
  addCart: function (id) {
    var num = this.data.cart.list[id] || 0;
    this.data.cart.list[id] = num + 1;
    var name = this.data.goods[id].name;
    var price = this.data.goods[id].price
    this.data.cart.foodname[id] = name;
    this.data.cart.price[id] = price;
    this.countCart();
  },
  reduceCart: function (id) {
    var num = this.data.cart.list[id] || 0;
    if (num <= 1) {
      delete this.data.cart.list[id];
      delete this.data.cart.foodname[id];
      delete this.date.cart.price[id];
    } else {
      this.data.cart.list[id] = num - 1;
    }
    this.countCart();
  },
  countCart: function () {
    // console.log(this.data.cart)
    var count = 0,
      total = 0;
    for (var id in this.data.cart.list) {
      var goods = this.data.goods[id];
      count += this.data.cart.list[id];
      total += goods.price * this.data.cart.list[id];
    }
    this.data.cart.count = count;
    this.data.cart.total = total;
    // console.log(this.data.cart.count)
    // console.log(this.data.cart.total)
    this.setData({
      cart: this.data.cart
    });
  },
  follow: function () {
    this.setData({
      followed: !this.data.followed
    });
  },
  onGoodsScroll: function (e) {
    if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
      this.setData({
        scrollDown: true
      });
    } else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
      this.setData({
        scrollDown: false
      });
    }

    var scale = e.detail.scrollWidth / 570,
      scrollTop = e.detail.scrollTop / scale,
      h = 0,
      classifySeleted,
      len = this.data.goodsList.length;
    this.data.goodsList.forEach(function (classify, i) {
      var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
      if (scrollTop >= h - 100 / scale) {
        classifySeleted = classify.id;
      }
      h += _h;
    });
    this.setData({
      classifySeleted: classifySeleted
    });
  },
  tapClassify: function (e) {
    var id = e.target.dataset.id;
    this.setData({
      classifyViewed: id
    });
    var self = this;
    setTimeout(function () {
      self.setData({
        classifySeleted: id
      });
    }, 100);
  },
  showCartDetail: function () {
    this.setData({
      showCartDetail: !this.data.showCartDetail
    });
  },
  hideCartDetail: function () {
    this.setData({
      showCartDetail: false
    });
  },
  Formid: function () {
    //console.log("杨家齐")
    console.log(this.data.form_id)
    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'wechat',
      // 传给云函数的参数
      data: {
        formId: this.data.form_id,
        openid: app.globalData.openid,
        formidname: 17770312,
        oddnumber: this.data.cart.total,
        payment: this.data.cart.total,
      },
      // 成功回调
      //complete: console.log
      success: res => {
        console.log("调用成功", res)
        complete: console.log
      },
      fail: err => {
        console.log("调用失败", err)
      }
    })
  },
  Orderform: function (e) {
    wx.showLoading({
      title: '正在提交',
    })
    const db = wx.cloud.database()
    db.collection('menu').add({
      data: {
        food: this.data.cart
      },
      success: res => {
        wx.showToast({
          title: '添加成功',
        })
        console.log(res)
      },
      fail: res => {
        // console.log("杨家齐1")
        console.log(res)
      }
    })
  },
  Addsold: function () {
    console.log(this.data.cart)
  },
  Follow: function () {
    if (this.data.followed == false) {
      this.setData({ followed: true })
      const db = wx.cloud.database()
      db.collection('loge').add({
        data: {
          followed: this.data.followed
        },
        success: res => {
          console.log(res)
        },
        fail: res => {
          console.log(res)
        }
      })
      console.log("杨佳琪")
    }
  },
  createCode() {
    var code;
    //首先默认code为空字符串
    code = '';
    //设置长度，这里看需求，我这里设置了4
    var codeLength = 4;
    //设置随机字符
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    //循环codeLength 我设置的4就是循环4次
    for (var i = 0; i < codeLength; i++) {
      //设置随机数范围,这设置为0 ~ 36
      var index = Math.floor(Math.random() * 36);
      //字符串拼接 将每次随机的字符 进行拼接
      code += random[index];
    }
    //将拼接好的字符串赋值给展示的code
    this.data.cart.code = code;
    console.log(this.data.code)
  },
  addsubmit(e) {
    //console.log(e.detail.formId);
    //console.log(this.data.cart);
    //this.setData({food:sum})
    // console.log(food);
    // this.setData({ form_id: e.detail.formId });
    // this.Formid();
    // this.Orderform();
    // this.Addsold();
    this.createCode();
    wx.navigateTo({
      url: './sucess/sucess?cart=' + JSON.stringify(this.data.cart),
    })
  }
});

