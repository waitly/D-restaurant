Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:0,
    money:0,
    cart:0,
    array: [
      {
        id1: 1,
        name:'热销',
        list: [{
          id: 1,
          src: '../../../images/food/1.png',
          message: '辣椒炒肉',
          mount: 1000,
          price: 20
        }, {
          id: 2,
          src: '../../../images/food/2.png',
          message: '葱花蛋饼',
          mount: 988,
          price: 10
        },
        {
          id: 3,
          src: '../../../images/food/3.png',
          message: '红烧狮子头',
          mount: 2000,
          price: 40
        }]
      },
      {
        id: 2,
        name: '新品',
        list: [
          {
            id: 4,
            src: '../../../images/food/4.png',
            message: '皮蛋瘦肉粥',
            mount: 100,
            price: 10
          },
          {
            id: 5,
            src: '../../../images/food/5.png',
            message: '青菜瘦肉粥',
            mount: 100,
            price: 10
          },
          {
            id: 6,
            src: '../../../images/food/6.png',
            message: '小青菜',
            mount: 600,
            price: 10
          }],
      },
      {
        id1: 3,
        name: '蔬菜',
        list: [
          {
            id: 7,
            src: '../../../images/food/7.png',
            message: '大白菜',
            mount: 300,
            price: 20
          },
          {
            id: 8,
            src: '../../../images/food/8.png',
            message: '水煮牛肉',
            mount: 500,
            price: 50
          },
          {
            id: 9,
            src: '../../../images/food/9.png',
            message: '酸菜鱼',
            mount: 400,
            price: 60
          },
        ]
      },
      {
        id1: 4,
        name: '肉类',
        list: [
          {
            id: 7,
            src: '../../../images/food/7.png',
            message: '大白菜',
            mount: 300,
            price: 20
          },
          {
            id: 8,
            src: '../../../images/food/8.png',
            message: '水煮牛肉',
            mount: 500,
            price: 50
          },
          {
            id: 9,
            src: '../../../images/food/9.png',
            message: '酸菜鱼',
            mount: 400,
            price: 60
          },
        ]
      },
      {
        id1: 4,
        name: '主食',
        list: [
          {
            id: 7,
            src: '../../../images/food/7.png',
            message: '大白菜',
            mount: 300,
            price: 20
          },
          {
            id: 8,
            src: '../../../images/food/8.png',
            message: '水煮牛肉',
            mount: 500,
            price: 50
          },
          {
            id: 9,
            src: '../../../images/food/9.png',
            message: '酸菜鱼',
            mount: 400,
            price: 60
          },
        ]
      }],
    // array2: ['../../../images/19.png', '2', '3', '4', '5', '6', '7', '8', '4', '5', '6', '7', '8'],
    
   
    
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
  mewuname:function()
  {

  },
  text:function(e)
  {
    e.text="";
  }
})